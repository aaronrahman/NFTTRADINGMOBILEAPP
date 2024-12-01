import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Marketplace from "./components/dashboard/Marketplace";
import MyCards from "./components/dashboard/MyCards";
import Trade from "./components/dashboard/Trade";
import Auction from "./components/dashboard/Auction";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Marketplace />} />
          <Route path="my-cards" element={<MyCards />} />
          <Route path="trade" element={<Trade />} />
          <Route path="auction" element={<Auction />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
