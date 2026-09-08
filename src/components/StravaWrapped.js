// src/components/StravaWrapped.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { API_URL } from "../api"; 

// ====== STATIC "MY STRAVA WRAPPED" DATA ======
const MY_WRAPPED = {
  miles: 247,
  runs_count: 66,
  weeks_active: 25,
  longest_run_miles: 13.38,
  total_elevation_gain_ft: 6346,
  kudos_total: 299,
  min_km_for_fastest_avg: 5,
  fastest_avg_pace: {
    pace: "8:42/mi",
    name: "Morning Run",
    url: "https://www.strava.com/activities/13522216684"
  },
  best_efforts: {
    mile_1: { time: "7:13",  name: "Evening Run", url: "https://www.strava.com/activities/14524763011", polyline: null },
    k_5:    { time: "25:15", name: "Morning Run", url: "https://www.strava.com/activities/13522216684", polyline: null },
    k_10:   { time: "52:55", name: "Morning Run", url: "https://www.strava.com/activities/13522216684", polyline: null },
    half:   { time: "1:54:01", name: "Morning Run", url: "https://www.strava.com/activities/13522216684", polyline: null },
  },
  most_kudosed_run: {
    kudos: 9,
    name: "Morning Run",
    url: "https://www.strava.com/activities/13522216684",
    polyline: null
  },
  weekly_miles: []
};

export default function StravaWrapped() {
  const [params] = useSearchParams();
  const userId = params.get("user_id");
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return [y, y - 1];
  }, []);

  const fetchWrapped = async (uid, y) => {
    setLoading(true);
    setErr("");
    setData(null);
    try {
      const res = await fetch(`${API_URL}/strava/summary?user_id=${encodeURIComponent(uid)}&year=${y}`);
      if (!res.ok) {
        let info = {};
        try { info = await res.json(); } catch {}
        if (res.status === 429 && info?.retry_after != null) {
          const mins = Math.max(1, Math.ceil(info.retry_after / 60));
          setErr(`Strava rate limit hit. Try again in ~${mins} minute${mins > 1 ? "s" : ""}.`);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch {
      setErr("Please connect Strava first or try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchWrapped(userId, year);
  }, [userId, year]);

  const connectHref = `${API_URL}/strava/auth/start`;

  return (
    <section style={{ maxWidth: 900, margin: "80px auto", padding: 20, background: "rgba(255,255,255,0.7)", borderRadius: 12 }}>
      <h2>Strava Wrapped</h2>

      {!userId && (
        <div style={{ marginTop: 12 }}>
          <p>Connect your Strava to generate your yearly summary.</p>
          <a className="btn" href={connectHref}>Connect Strava</a>
        </div>
      )}

      {userId && (
        <>
          <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0 20px" }}>
            <label htmlFor="year">Year:</label>
            <select id="year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <a className="btn" href={connectHref} style={{ marginLeft: "auto" }}>Reconnect</a>
          </div>

          {loading && <p>Loading your miles… (this will take a sec)</p>}
          {err && <p className="error">{err}</p>}

          {data && (
            <>
              <StatsGrid d={data} />

              {data.fastest_avg_pace && (
                <p>
                  <strong>Fastest avg pace (≥ {data.min_km_for_fastest_avg} km):</strong> {data.fastest_avg_pace.pace}
                  {" "}— <a href={data.fastest_avg_pace.url} target="_blank" rel="noreferrer">
                    {data.fastest_avg_pace.name || "Run"}
                  </a>
                </p>
              )}

              {data.best_efforts && <BestEfforts be={data.best_efforts} />}

              {data.most_kudosed_run?.activity_id && (
                <>
                  <p>
                    <strong>Most-kudosed run:</strong> {data.most_kudosed_run.kudos} kudos —{" "}
                    <a href={data.most_kudosed_run.url} target="_blank" rel="noreferrer">
                      {data.most_kudosed_run.name || "Run"}
                    </a>
                  </p>
                  {data.most_kudosed_run.polyline && (
                    <div style={{ marginTop: 8 }}>
                      <RouteThumb polyline={data.most_kudosed_run.polyline} />
                    </div>
                  )}
                </>
              )}

              {Array.isArray(data.weekly_miles) && data.weekly_miles.length > 0 ? (
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <LineChart data={data.weekly_miles}>
                      <XAxis dataKey="week" hide />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="miles" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p>No weekly data available.</p>
              )}
            </>
          )}
        </>
      )}

      {/* ====== STATIC "MY STRAVA WRAPPED" ====== */}
      <div style={{ marginTop: 36 }}>
        <h3 style={{ margin: "0 0 12px" }}>Summer's Strava Wrapped</h3>

        <StatsGrid d={MY_WRAPPED} />

        {MY_WRAPPED.fastest_avg_pace && (
          <p>
            <strong>Fastest avg pace (≥ {MY_WRAPPED.min_km_for_fastest_avg} km):</strong> {MY_WRAPPED.fastest_avg_pace.pace}
            {" "}— <a href={MY_WRAPPED.fastest_avg_pace.url} target="_blank" rel="noreferrer">
              {MY_WRAPPED.fastest_avg_pace.name || "Run"}
            </a>
          </p>
        )}

        {MY_WRAPPED.best_efforts && <BestEfforts be={MY_WRAPPED.best_efforts} />}

        {MY_WRAPPED.most_kudosed_run?.polyline && (
          <div style={{ marginTop: 8 }}>
            <RouteThumb polyline={MY_WRAPPED.most_kudosed_run.polyline} />
          </div>
        )}

        {Array.isArray(MY_WRAPPED.weekly_miles) && MY_WRAPPED.weekly_miles.length > 0 && (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={MY_WRAPPED.weekly_miles}>
                <XAxis dataKey="week" hide />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="miles" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Small components ---------- */

function StatsGrid({ d }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
      <Stat label="Total Miles" value={d.miles} />
      <Stat label="Runs" value={d.runs_count} />
      <Stat label="Weeks Active" value={d.weeks_active} />
      <Stat label="Longest Run (mi)" value={d.longest_run_miles} />
      <Stat label="Elevation Gain (ft)" value={d.total_elevation_gain_ft} />
      <Stat label="Total Kudos" value={d.kudos_total} />
    </div>
  );
}

function BestEfforts({ be }) {
  const items = [
    ["mile_1", "Fastest 1 mile"],
    ["k_5", "Fastest 5K"],
    ["k_10", "Fastest 10K"],
    ["half", "Fastest Half"],
  ];
  return (
    <ul>
      {items.map(([key, label]) => {
        const x = be[key];
        if (!x) return null;
        return (
          <li key={key} style={{ marginBottom: 12 }}>
            {label}: {x.time} —{" "}
            <a href={x.url} target="_blank" rel="noreferrer">{x.name || "Run"}</a>
            {x.polyline && (
              <div style={{ marginTop: 8 }}>
                <RouteThumb polyline={x.polyline} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ padding: 16, borderRadius: 10, background: "#fff" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value ?? "—"}</div>
    </div>
  );
}

/* ---------- SVG route (no Google Maps) ---------- */

function RouteThumb({ polyline, width = 320, height = 160, strokeWidth = 3 }) {
  if (!polyline) return null;
  const pts = decodePolyline(polyline);
  if (!pts.length) return null;

  const lats = pts.map(p => p[0]);
  const lngs = pts.map(p => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

  const padding = 12;
  const w = width - padding * 2;
  const h = height - padding * 2;

  const spanLng = Math.max(1e-9, maxLng - minLng);
  const spanLat = Math.max(1e-9, maxLat - minLat);
  const scale = Math.min(w / spanLng, h / spanLat);

  const d = pts.map(([lat, lng], i) => {
    const x = (lng - minLng) * scale + padding;
    const y = height - ((lat - minLat) * scale + padding); // flip Y for SVG
    return (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
  }).join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="route-thumb" style={{ borderRadius: 12, background: "#f6f7f9" }}>
      <path d={d} fill="none" stroke="#111" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Google polyline decode → array of [lat, lng]
function decodePolyline(str) {
  let index = 0, lat = 0, lng = 0, coords = [];
  while (index < str.length) {
    let b, shift = 0, result = 0;
    do { b = str.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0; result = 0;
    do { b = str.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    coords.push([lat * 1e-5, lng * 1e-5]);
  }
  return coords;
}
