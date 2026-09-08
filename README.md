# sumzfolio

My personal portfolio site — [summer-cai.com](https://summer-cai.com).

## Sections

- **About** — who I am, currently a Software Engineer at PayPal
- **Projects** — WeFit (social fitness app) and a Caltrans computer-vision
  traffic detection system
- **Resume** — downloadable PDF
- **Coffee Shops** — a ranked, region-tabbed list of favorite coffee spots
  (Bay Area, Austin, Japan)
- **Restaurant Recs** — same format, for restaurants (Bay Area, Austin,
  Japan, New York)
- **Contact**

## Tech stack

- **React** (Create React App) + **react-router-dom**
- Deployed on **Netlify**, auto-building from `main`

## Running locally

```
npm install
npm start
```

Opens at `http://localhost:3000`.

## Deployment

Netlify builds automatically on push to `main` (`npm ci && npm run build`,
see `netlify.toml`). `.python-version` and `PYTHON_VERSION` in
`netlify.toml` pin the Python version Netlify's build image uses — a Python
backend also lives in this repo (`backend/`, deployed separately to Heroku
via the `Procfile`), and Netlify's build image auto-detects and tries to
install its `requirements.txt` even though the frontend build doesn't need
it, so the version needs pinning to avoid unrelated Python build failures.
