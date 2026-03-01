import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listScans, type Scan } from "../api/scans";

export default function Dashboard() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listScans()
      .then(setScans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Scans</h1>
      <Link to="/scans/new">New Scan</Link>

      {loading && <p>Loading...</p>}

      {!loading && scans.length === 0 && <p>No scans yet.</p>}

      {scans.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan.id}>
                <td>{scan.url}</td>
                <td>{scan.status}</td>
                <td>{new Date(scan.created_at).toLocaleString()}</td>
                <td>
                  <Link to={`/scans/${scan.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
