import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  onSubmit?: (data: {
    email: string;
    username: string;
    password: string;
    acceptTerms: boolean;
  }) => void;
  isLoading?: boolean;
  className?: string;
}

const SignupForm = ({
  onSubmit = () => {},
  isLoading = false,
  className = "",
}: SignupFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // In a real app, you would create the account here
    navigate("/dashboard");
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
        <Label htmlFor="username" className="text-purple-100">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
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
            placeholder="Create a password"
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, acceptTerms: checked as boolean })
          }
          className="border-purple-500/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
        />
        <label
          htmlFor="terms"
          className="text-sm text-purple-200/90 cursor-pointer"
        >
          I accept the{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        disabled={isLoading || !formData.acceptTerms}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
