import express from "express";
import cors from "cors";
import {
  createAction,
  listActions,
  resetStore,
} from "./services/actionsService";

const app = express();

// CORS config that works for Vercel prod + previews
const corsHandler = cors({
  origin: true, // reflect request origin automatically
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(corsHandler);
//app.options("*", corsHandler);

app.use(express.json());

// Simple health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Optional helper to reset in-memory store (useful for testing)
app.post("/debug/reset", (req, res) => {
  resetStore();
  res.status(204).end();
});

// List actions for a member
app.get("/members/:memberId/actions", (req, res) => {
  const { memberId } = req.params;
  const actions = listActions(memberId);
  res.json(actions);
});

// Create an action for a member
app.post("/members/:memberId/actions", (req, res) => {
  const { memberId } = req.params;
  const { type } = req.body;

  if (!type || typeof type !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'type' field" });
  }

  const action = createAction(memberId, type);
  res.status(201).json(action);
});

export default app;
