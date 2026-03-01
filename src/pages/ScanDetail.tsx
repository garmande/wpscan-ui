import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getScan, type Scan } from "../api/scans";

export default function ScanDetail() {
  const { id } = useParams<{ id: string }>();
  const [scan, setScan] = useState<Scan | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const poll = setInterval(() => {
      getScan(id)
        .then((s) => {
          setScan(s);
          if (s.status === "done" || s.status === "failed") {
            clearInterval(poll);
          }
        })
        .catch((err) => {
          setError(err.message);
          clearInterval(poll);
        });
    }, 2000);

    getScan(id).then(setScan).catch((err) => setError(err.message));

    return () => clearInterval(poll);
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!scan) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Back to Dashboard</Link>
      <h1>Scan: {scan.url}</h1>
      <p>Status: {scan.status}</p>
      <p>Created: {new Date(scan.created_at).toLocaleString()}</p>

      {scan.error && <p>Error: {scan.error}</p>}

      {scan.results && (
        <pre>{JSON.stringify(scan.results, null, 2)}</pre>
      )}
    </div>
  );
}
