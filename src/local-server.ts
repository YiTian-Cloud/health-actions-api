// src/local-server.ts
import app from "./app";

const port = 5000;

app.listen(port, () => {
  console.log(`Local server running at http://localhost:${port}`);
});
