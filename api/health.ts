// api/health.ts
export default function handler(req: any, res: any) {
    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  
    // Preflight
    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      res.end();
      return;
    }
  
    // Normal GET
    res.status(200).json({ status: "ok" });
  }
  