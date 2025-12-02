import express from "express";
import cors from "cors";
import {
  createAction,
  listActions,
  resetStore,
} from "./services/actionsService";

const app = express();

const corsHandler = cors({
  origin: true, // echo the Origin (works for Vercel prod + previews)
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(corsHandler);

// Explicit OPTIONS handler for the actions route (this fixes preflight)
app.options("/members/:memberId/actions", corsHandler);

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Optional: reset store
app.post("/debug/reset", (req, res) => {
  resetStore();
  res.status(204).end();
});

// List actions
app.get("/members/:memberId/actions", (req, res) => {
  const { memberId } = req.params;
  const actions = listActions(memberId);
  res.json(actions);
});

// Create action
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
