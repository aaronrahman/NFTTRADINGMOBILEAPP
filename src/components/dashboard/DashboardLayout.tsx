import {
  Coins,
  Home,
  CreditCard,
  ArrowLeftRight,
  Gavel,
  LogOut,
} from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useToast } from "@/components/ui/use-toast";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  if (!user) {
    navigate("/");
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-bold text-white">Purple Coin</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive("/dashboard") ? "bg-purple-500 text-white" : "text-purple-200 hover:bg-purple-500/20"}`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/dashboard/my-cards"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive("/dashboard/my-cards") ? "bg-purple-500 text-white" : "text-purple-200 hover:bg-purple-500/20"}`}
              >
                <CreditCard className="h-4 w-4" />
                <span>My Cards</span>
              </Link>
              <Link
                to="/dashboard/trade"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive("/dashboard/trade") ? "bg-purple-500 text-white" : "text-purple-200 hover:bg-purple-500/20"}`}
              >
                <ArrowLeftRight className="h-4 w-4" />
                <span>Trade</span>
              </Link>
              <Link
                to="/dashboard/auction"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${isActive("/dashboard/auction") ? "bg-purple-500 text-white" : "text-purple-200 hover:bg-purple-500/20"}`}
              >
                <Gavel className="h-4 w-4" />
                <span>Auction</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-purple-200">
              <span className="font-medium">
                {user.purpleCoins.toLocaleString()}
              </span>{" "}
              PC
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-purple-200 hover:text-white transition"
            >
              <LogOut className="h-4 w-4" />
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
