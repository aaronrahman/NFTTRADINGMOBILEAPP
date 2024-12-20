import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useToast } from "@/components/ui/use-toast";
import { generateUniqueId } from "@/lib/utils/nft";

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  className?: string;
}

const LoginForm = ({ onSubmit = () => {}, className = "" }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes, we'll simulate a successful login
      const user = {
        id: generateUniqueId(),
        email: formData.email,
        username: formData.email.split("@")[0],
        purpleCoins: 1000,
        createdAt: new Date().toISOString(),
      };

      login(user);
      onSubmit(formData);

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });

      // Important: Navigate after the state is updated
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 bg-white/5 p-6 rounded-lg backdrop-blur-sm ${className}`}
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-purple-100">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-200/50"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-purple-100">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-200/50 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200/70 hover:text-purple-200"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center">
        <a
          href="#"
          className="text-sm text-purple-200/70 hover:text-purple-200"
        >
          Forgot your password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
