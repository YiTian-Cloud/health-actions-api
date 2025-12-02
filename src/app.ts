import express from "express";
import cors from "cors";
import { createAction, listActions } from "./services/actionsService";

const app = express();

app.use(
    cors({
      origin: true, // reflect the request Origin (allows all origins in practice)
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.options("*", cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).send({ status: "ok" });
});

app.post("/members/:id/actions", (req, res) => {
  const memberId = req.params.id;
  const { type } = req.body;

  if (!type) {
    return res.status(400).send({ error: "type is required" });
  }

  const action = createAction(memberId, type);
  res.status(201).send(action);
});

app.get("/members/:id/actions", (req, res) => {
  const memberId = req.params.id;
  const actions = listActions(memberId);
  res.status(200).send(actions);
});

export default app;
