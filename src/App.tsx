import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewScan from "./pages/NewScan";
import ScanDetail from "./pages/ScanDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scans/new" element={<NewScan />} />
        <Route path="/scans/:id" element={<ScanDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
