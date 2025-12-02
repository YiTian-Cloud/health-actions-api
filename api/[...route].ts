// api/[...route].ts
import app from "../src/app";

export default function handler(req: any, res: any) {
  // Strip /api so Express sees /health or /members/...
  if (req.url.startsWith("/api")) {
    req.url = req.url.slice(4) || "/";
  }

  return app(req as any, res as any);
}
