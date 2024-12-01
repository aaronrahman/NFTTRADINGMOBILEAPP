import { Coins } from "lucide-react";

interface PurpleCoinLogoProps {
  size?: number;
  className?: string;
}

const PurpleCoinLogo = ({
  size = 120,
  className = "",
}: PurpleCoinLogoProps) => {
  return (
    <div
      className={`bg-white/10 rounded-full p-6 backdrop-blur-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full relative animate-spin-slow">
        <Coins
          className="w-full h-full text-purple-500"
          style={{
            filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))",
          }}
        />
      </div>
    </div>
  );
};

export default PurpleCoinLogo;
