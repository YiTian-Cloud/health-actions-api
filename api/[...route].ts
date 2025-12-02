// api/[...route].ts
import app from "../src/app";

export default function handler(req: any, res: any) {
  // CORS headers for all origins (simple for a demo)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS requests immediately
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Strip leading `/api` so Express sees `/health` and `/members/...`
  if (req.url.startsWith("/api")) {
    req.url = req.url.slice(4) || "/";
  }

  return app(req as any, res as any);
}
