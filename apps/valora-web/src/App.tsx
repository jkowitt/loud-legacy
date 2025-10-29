import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./layout/AppLayout";
import { AdminPage } from "./pages/Admin";
import { BulkToolsPage } from "./pages/BulkTools";
import { DashboardPage } from "./pages/Dashboard";
import { UsagePage } from "./pages/Usage";
import { ValuationsPage } from "./pages/Valuations";
import { MarketplacePage } from "./pages/Marketplace";
import { PlansPage } from "./pages/Plans";
import { ExplorePage } from "./pages/Explore";
import { LoginPage } from "./pages/Login";
import { AboutPage } from "./pages/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="valuations" element={<ValuationsPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="bulk" element={<BulkToolsPage />} />
        <Route path="usage" element={<UsagePage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
