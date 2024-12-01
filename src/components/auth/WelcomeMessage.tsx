interface WelcomeMessageProps {
  mode?: "login" | "signup";
  className?: string;
}

const WelcomeMessage = ({
  mode = "login",
  className = "",
}: WelcomeMessageProps) => {
  return (
    <div
      className={`text-center space-y-2 bg-white/5 p-4 rounded-lg backdrop-blur-sm ${className}`}
    >
      <h1 className="text-2xl font-bold text-white">
        {mode === "login" ? "Welcome Back!" : "Join Purple Coin"}
      </h1>
      <p className="text-purple-200/90">
        {mode === "login"
          ? "Sign in to continue trading NFTs"
          : "Sign up now and get 1000 Purple Coins free!"}
      </p>
      {mode === "signup" && (
        <div className="text-sm text-purple-300/70 mt-2">
          Start your NFT trading journey today
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;
