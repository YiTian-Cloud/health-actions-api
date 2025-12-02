// api/members/[memberId]/actions.ts
import {
    listActions,
    createAction,
  } from "../../../src/services/actionsService";
  
  export default function handler(req: any, res: any) {
    // --- CORS headers ---
    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  
    // Preflight
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
  
    const memberId = req.query.memberId;
    if (!memberId || Array.isArray(memberId)) {
      res.status(400).json({ error: "Invalid memberId" });
      return;
    }
  
    if (req.method === "GET") {
      const actions = listActions(memberId);
      res.status(200).json(actions);
      return;
    }
  
    if (req.method === "POST") {
      const body = req.body as { type?: string };
      const type = body?.type;
  
      if (!type || typeof type !== "string") {
        res.status(400).json({ error: "Missing or invalid 'type' field" });
        return;
      }
  
      const action = createAction(memberId, type);
      res.status(201).json(action);
      return;
    }
  
    res.status(405).json({ error: "Method not allowed" });
  }
  