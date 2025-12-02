import { useState } from "react";

type HealthAction = {
  id: string;
  memberId: string;
  type: string;
  status: "pending" | "completed";
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function App() {
  const [memberId, setMemberId] = useState("member-1");
  const [type, setType] = useState("flu_shot");
  const [actions, setActions] = useState<HealthAction[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createAction() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/members/${encodeURIComponent(memberId)}/actions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed with ${res.status}`);
      }

      const data: HealthAction = await res.json();
      setMessage(`Created action ${data.id} (${data.type})`);
      // Optionally refresh the list
      await loadActions();
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadActions() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/members/${encodeURIComponent(memberId)}/actions`
      );
      if (!res.ok) {
        throw new Error(`Request failed with ${res.status}`);
      }
      const data: HealthAction[] = await res.json();
      setActions(data);
      setMessage(`Loaded ${data.length} action(s) for ${memberId}`);
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: 8,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>Health Actions Tester</h1>
      <p style={{ color: "#555" }}>
        Call your <code>health-actions-api</code> from a simple UI.
      </p>

      <div style={{ marginTop: "1rem" }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Member ID:
          <input
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "0.4rem",
              marginTop: 4,
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Action Type:
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. flu_shot"
            style={{
              display: "block",
              width: "100%",
              padding: "0.4rem",
              marginTop: 4,
            }}
          />
        </label>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button onClick={createAction} disabled={loading}>
            {loading ? "Creating..." : "Create Action"}
          </button>
          <button onClick={loadActions} disabled={loading}>
            {loading ? "Loading..." : "Load Actions"}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ marginTop: "1rem", color: "#1a5" }}>{message}</div>
      )}

      <h2 style={{ marginTop: "1.5rem" }}>Actions</h2>
      {actions.length === 0 ? (
        <p style={{ color: "#777" }}>No actions loaded yet.</p>
      ) : (
        <ul>
          {actions.map((a) => (
            <li key={a.id}>
              <strong>{a.type}</strong> — {a.status} (member: {a.memberId}, id:{" "}
              {a.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
