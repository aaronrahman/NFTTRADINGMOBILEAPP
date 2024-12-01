import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";

interface BlockchainAnimationProps {
  className?: string;
  numCubes?: number;
}

const BlockchainAnimation = ({
  className = "",
  numCubes = 5,
}: BlockchainAnimationProps) => {
  const [cubes, setCubes] = useState<number[]>([]);

  useEffect(() => {
    setCubes(Array.from({ length: numCubes }, (_, i) => i));
  }, [numCubes]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none bg-purple-900/20 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {cubes.map((index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
          >
            <Boxes
              className="text-purple-500"
              style={{
                width: 20 + Math.random() * 30,
                height: 20 + Math.random() * 30,
                filter: "blur(1px)",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainAnimation;
