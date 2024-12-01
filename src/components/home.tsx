import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PurpleCoinLogo from "./auth/PurpleCoinLogo";
import WelcomeMessage from "./auth/WelcomeMessage";
import AuthTabs from "./auth/AuthTabs";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import BlockchainAnimation from "./auth/BlockchainAnimation";

function Home() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
      <BlockchainAnimation />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="flex justify-center">
          <PurpleCoinLogo />
        </div>

        <WelcomeMessage mode={activeTab} />

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        >
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <TabsContent value="login" className="m-0">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup" className="m-0">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
