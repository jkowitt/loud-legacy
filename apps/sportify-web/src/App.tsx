import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { DashboardPage } from "./pages/Dashboard";
import { EventsPage } from "./pages/Events";
import { EventDetailPage } from "./pages/EventDetail";
import { LiveViewPage } from "./pages/LiveView";
import { AssetsPage } from "./pages/Assets";
import { SponsorsPage } from "./pages/Sponsors";
import { TeamPage } from "./pages/Team";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route path="live/:eventId" element={<LiveViewPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="sponsors" element={<SponsorsPage />} />
        <Route path="team" element={<TeamPage />} />
      </Route>
    </Routes>
  );
}

export default App;
