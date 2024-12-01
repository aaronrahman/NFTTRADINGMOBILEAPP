import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthTabsProps {
  activeTab?: "login" | "signup";
  onTabChange?: (tab: "login" | "signup") => void;
  className?: string;
}

const AuthTabs = ({
  activeTab = "login",
  onTabChange = () => {},
  className = "",
}: AuthTabsProps) => {
  return (
    <div
      className={`w-full bg-white/5 backdrop-blur-sm rounded-lg p-1 ${className}`}
    >
      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={(value) => onTabChange(value as "login" | "signup")}
      >
        <TabsList className="w-full grid grid-cols-2 bg-transparent">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-purple-200"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-purple-200"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AuthTabs;
