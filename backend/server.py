# backend/server.py
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

from backend.restaurants import restaurants_bp
from backend.strava import strava_bp

ALLOWED_ORIGINS = {
    "https://summer-cai.com",
    "http://localhost:3000", "http://127.0.0.1:3000",
    "http://localhost:5173", "http://127.0.0.1:5173",
}

def create_app():
    app = Flask(__name__)

    # Trust Heroku's proxy headers so get_remote_address sees real client IP
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)

    # CORS (Flask-CORS will add preflight + base headers)
    CORS(app, resources={r"/*": {"origins": list(ALLOWED_ORIGINS)}}, supports_credentials=False)

    # Global rate limit
    Limiter(get_remote_address, app=app, default_limits=["30 per minute"])

    # Blueprints
    app.register_blueprint(restaurants_bp)
    app.register_blueprint(strava_bp)

    # Old callback alias if you ever used /callback in Strava settings
    @app.route("/callback")
    def _cb_alias():
        return redirect("/strava/callback?" + request.query_string.decode())

    # Liveness
    @app.route("/healthz")
    def healthz():
        return {"ok": True}, 200

    # Ensure CORS header is present even on errors
    @app.after_request
    def add_cors_headers(resp):
        origin = request.headers.get("Origin")
        if origin in ALLOWED_ORIGINS:
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Vary"] = "Origin"
        return resp

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
