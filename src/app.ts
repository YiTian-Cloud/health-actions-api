// src/app.ts
import express from "express";
import {
  createAction,
  listActions,
  resetStore,
} from "./services/actionsService";

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Optional: reset in-memory store
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
