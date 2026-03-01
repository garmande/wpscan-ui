const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api/v1";

export interface Scan {
  id: string;
  url: string;
  status: "pending" | "running" | "done" | "failed";
  results?: unknown;
  error?: string;
  created_at: string;
  updated_at: string;
}

export async function createScan(url: string): Promise<Scan> {
  const res = await fetch(`${API_BASE}/scans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(`Failed to create scan: ${res.statusText}`);
  return res.json();
}

export async function listScans(): Promise<Scan[]> {
  const res = await fetch(`${API_BASE}/scans`);
  if (!res.ok) throw new Error(`Failed to list scans: ${res.statusText}`);
  return res.json();
}

export async function getScan(id: string): Promise<Scan> {
  const res = await fetch(`${API_BASE}/scans/${id}`);
  if (!res.ok) throw new Error(`Failed to get scan: ${res.statusText}`);
  return res.json();
}
