import {
  Coins,
  Home,
  CreditCard,
  ArrowLeftRight,
  Gavel,
  LogOut,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Coins className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-white">Purple Coin</span>
            </div>

            <nav className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard/my-cards"
                className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>My Cards</span>
              </Link>
              <Link
                to="/dashboard/trade"
                className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Trade</span>
              </Link>
              <Link
                to="/dashboard/auction"
                className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
              >
                <Gavel className="w-4 h-4" />
                <span>Auction</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-purple-200 px-4 py-2 bg-purple-500/20 rounded-lg">
              <span className="font-medium">1000</span> PC
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
