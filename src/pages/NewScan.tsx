import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createScan } from "../api/scans";

export default function NewScan() {
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const scan = await createScan(url);
      navigate(`/scans/${scan.id}`);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>New Scan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          WordPress URL
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Starting..." : "Start Scan"}
        </button>
      </form>
    </div>
  );
}
