export const API_URL =
  process.env.REACT_APP_API_BASE ??
  (process.env.NODE_ENV === "production"
    ? "https://summer-cai-2d1ea290d5a4.herokuapp.com"
    : "http://127.0.0.1:5000");