
import os, time, requests
from flask import Blueprint, request, jsonify, redirect
from urllib.parse import urlencode
from collections import defaultdict
from datetime import datetime, timezone

STRAVA_CLIENT_ID = os.getenv("STRAVA_CLIENT_ID")
STRAVA_CLIENT_SECRET = os.getenv("STRAVA_CLIENT_SECRET")
STRAVA_REDIRECT_URI = os.getenv("STRAVA_REDIRECT_URI") 
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

strava_bp = Blueprint("strava", __name__, url_prefix="/strava")

def _meters_to_miles(m): 
    return round((m or 0) / 1609.344, 2)

def _meters_to_feet(m):
    return int(round((m or 0) * 3.28084))

def _fmt_duration(seconds):
    if seconds is None:
        return None
    s = int(round(seconds))
    h, rem = divmod(s, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"

def _pace_from_speed(speed_mps):
    if not speed_mps or speed_mps <= 0:
        return None
    sec_per_mile = 1609.344 / speed_mps
    return _fmt_duration(sec_per_mile) + "/mi"

def _year_bounds_utc(year: int):
    start = int(datetime(year, 1, 1, tzinfo=timezone.utc).timestamp()) 
    before = int(datetime(year + 1, 1, 1, tzinfo=timezone.utc).timestamp()) 
    return start, before

def _activity_local_dt(a):
    s = a.get("start_date_local") or a.get("start_date")
    if not s: 
        return None
    return datetime.fromisoformat(s.replace("Z", "+00:00"))

_tokens = {}  # { user_id: {access_token, refresh_token, expires_at} }

def _exchange_code_for_token(code):
    r = requests.post("https://www.strava.com/oauth/token", data={
        "client_id": STRAVA_CLIENT_ID,
        "client_secret": STRAVA_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
    })
    r.raise_for_status()
    return r.json()

def _refresh_token(user_id):
    tok = _tokens[user_id]
    if time.time() < tok["expires_at"] - 60:
        return tok["access_token"]
    r = requests.post("https://www.strava.com/oauth/token", data={
        "client_id": STRAVA_CLIENT_ID,
        "client_secret": STRAVA_CLIENT_SECRET,
        "grant_type": "refresh_token",
        "refresh_token": tok["refresh_token"],
    })
    r.raise_for_status()
    data = r.json()
    tok.update({
        "access_token": data["access_token"],
        "refresh_token": data.get("refresh_token", tok["refresh_token"]),
        "expires_at": data["expires_at"],
    })
    return tok["access_token"]

@strava_bp.route("/auth/start")
def auth_start():
    params = {
        "client_id": STRAVA_CLIENT_ID,
        "redirect_uri": STRAVA_REDIRECT_URI,
        "response_type": "code",
        "scope": "read,activity:read_all",
        "approval_prompt": "auto",
    }
    return redirect("https://www.strava.com/oauth/authorize?" + urlencode(params))

@strava_bp.route("/callback")
def auth_callback():
    code = request.args.get("code")
    if not code:
        return "Missing code", 400
    data = _exchange_code_for_token(code)
    athlete = data["athlete"]
    user_id = str(athlete["id"])
    _tokens[user_id] = {
        "access_token": data["access_token"],
        "refresh_token": data["refresh_token"],
        "expires_at": data["expires_at"],
    }
    return redirect(f"{FRONTEND_URL}/strava-wrapped?user_id={user_id}")

def _get_activities(access_token, after_ts=None, before_ts=None, types=None):
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"per_page": 200, "page": 1}
    if after_ts is not None: params["after"]  = int(after_ts)
    if before_ts is not None: params["before"] = int(before_ts)

    acts = []
    while True:
        resp = requests.get("https://www.strava.com/api/v3/athlete/activities",
                            headers=headers, params=params)
        resp.raise_for_status()
        chunk = resp.json()
        if not chunk: break
        if types: chunk = [a for a in chunk if a.get("type") in types]
        acts.extend(chunk)
        if len(chunk) < params["per_page"]: break
        params["page"] += 1
    return acts

def _get_activity_detail(access_token, activity_id):
    resp = requests.get(
        f"https://www.strava.com/api/v3/activities/{activity_id}",
        headers={"Authorization": f"Bearer {access_token}"},
        params={"include_all_efforts": "false"}  # we just need best_efforts & kudos
    )
    resp.raise_for_status()
    return resp.json()

def _effort_key(name: str):
    if not name: return None
    n = "".join(ch for ch in name.lower() if ch.isalnum())
    # normalize common variants
    if n in ("1mile", "1mi"): return "mile_1"
    if n in ("5k", "5km"):    return "k_5"
    if n in ("10k","10km"):   return "k_10"
    if n in ("halfmarathon","half"): return "half"
    return None


@strava_bp.route("/summary")
def summary():
    user_id = request.args.get("user_id")
    if not user_id or user_id not in _tokens:
        return jsonify({"error": "not_authenticated"}), 401

    # Params
    try:
        year = int(request.args.get("year", datetime.now(timezone.utc).year))
    except ValueError:
        year = datetime.now(timezone.utc).year
    try:
        min_km = float(request.args.get("min_km", 5))
    except ValueError:
        min_km = 5.0
    min_m = min_km * 1000.0

    access = _refresh_token(user_id)
    after_ts, before_ts = _year_bounds_utc(year)

    # Pull only the window + only Runs
    runs = _get_activities(access, after_ts=after_ts, before_ts=before_ts, types={"Run"})

    filtered = []
    for a in runs:
        dt = _activity_local_dt(a)
        if dt and dt.year == year:
            filtered.append((a, dt))
    runs = [a for a, _ in filtered]

    # core: totals
    total_miles = _meters_to_miles(sum(a.get("distance", 0) for a in runs))
    total_elev_m = sum(a.get("total_elevation_gain", 0) for a in runs)
    total_elev_ft = _meters_to_feet(total_elev_m)
    runs_count = len(runs)
    longest_miles = _meters_to_miles(max((a.get("distance", 0) for a in runs), default=0))

    # weekly miles and active weeks
    by_week_m = defaultdict(float)
    for a, dt in filtered:
        iso = dt.isocalendar()  # (year, week, weekday)
        if iso.year != year: 
            continue
        key = f"{iso.year}-W{iso.week:02d}"
        by_week_m[key] += (a.get("distance", 0) or 0.0)

    weekly_miles = [
        {"week": wk, "miles": _meters_to_miles(m)}
        for wk, m in sorted(by_week_m.items())
    ]
    weeks_active = len([1 for _, m in by_week_m.items() if m > 0])

    # fastest avg
    fastest_avg = None  # {"pace": "mm:ss/mi", "activity_id": id, "date": str, "name": str}
    best_sec_per_mile = None
    for a, dt in filtered:
        if (a.get("distance") or 0) < min_m: 
            continue
        speed = a.get("average_speed")
        if not speed or speed <= 0: 
            continue
        sec_per_mile = 1609.344 / speed
        if best_sec_per_mile is None or sec_per_mile < best_sec_per_mile:
            best_sec_per_mile = sec_per_mile
            fastest_avg = {
                "pace": _fmt_duration(sec_per_mile) + "/mi",
                "activity_id": a.get("id"),
                "date": dt.isoformat(),
                "name": a.get("name"),
                "url": f"https://www.strava.com/activities/{a.get('id')}"
            }

    # best efforts and social stats
    kudos_total = 0
    most_kudosed = {"kudos": -1, "activity_id": None, "name": None, "date": None, "url": None}
    summary_has_kudos = "kudos_count" in (runs[0] if runs else {})

    if summary_has_kudos:
        for a, dt in filtered:
            kc = a.get("kudos_count", 0) or 0
            kudos_total += kc
            if kc > most_kudosed["kudos"]:
                most_kudosed = {
                    "kudos": kc,
                    "activity_id": a.get("id"),
                    "name": a.get("name"),
                    "date": dt.isoformat(),
                    "url": f"https://www.strava.com/activities/{a.get('id')}"
                }

    # personal-bests from best_efforts
    best_efforts = {
        "mile_1": None,  # {"time": "mm:ss", "seconds": int, "activity_id": id, "date": str, "name": str, "url": str}
        "k_5": None,
        "k_10": None,
        "half": None
    }

    for a, dt in filtered:
        detail = _get_activity_detail(access, a["id"])
        # kudos if not in summary
        if not summary_has_kudos:
            kc = detail.get("kudos_count", 0) or 0
            kudos_total += kc
            if kc > (most_kudosed["kudos"] or -1):
                most_kudosed = {
                    "kudos": kc,
                    "activity_id": detail.get("id"),
                    "name": detail.get("name"),
                    "date": dt.isoformat(),
                    "url": f"https://www.strava.com/activities/{detail.get('id')}"
                }

        # best efforts
        for effort in (detail.get("best_efforts") or []):
            key = _effort_key(effort.get("name"))
            if key not in best_efforts:
                continue
            et = effort.get("elapsed_time")
            poly = (detail.get("map") or {}).get("summary_polyline")
            if et is None: 
                continue
            prev = best_efforts[key]
            if prev is None or et < prev["seconds"]:
                best_efforts[key] = {
                    "time": _fmt_duration(et),
                    "seconds": et,
                    "activity_id": detail.get("id"),
                    "date": dt.isoformat(),
                    "name": detail.get("name"),
                    "url": f"https://www.strava.com/activities/{detail.get('id')}",
                    "polyline": poly
                }

    return jsonify({
        "runs_count": runs_count,
        "miles": total_miles,
        "total_elevation_gain_ft": total_elev_ft,
        "total_elevation_gain_m": int(round(total_elev_m)),
        "longest_run_miles": longest_miles,
        "weeks_active": weeks_active,

        "best_efforts": best_efforts,          # { mile_1, k_5, k_10, half }
        "fastest_avg_pace": fastest_avg,       # { pace, activity_id, date, name, url }
        "min_km_for_fastest_avg": min_km,

        "kudos_total": kudos_total,
        "most_kudosed_run": most_kudosed,      # { kudos, activity_id, name, date, url }

        "weekly_miles": weekly_miles
    })

@strava_bp.route("/polyline")
def get_polyline():
    user_id = request.args.get("user_id")
    activity_id = request.args.get("id")
    if not user_id or user_id not in _tokens:
        return jsonify({"error": "not_authenticated"}), 401
    access = _refresh_token(user_id)
    detail = _get_activity_detail(access, activity_id)
    poly = (detail.get("map") or {}).get("summary_polyline")
    return jsonify({"polyline": poly})