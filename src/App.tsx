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
    <Suspense fallback={<p>Loading...</p>}>
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
