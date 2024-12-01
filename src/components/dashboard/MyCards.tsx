import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNFTStore } from "@/lib/store/useNFTStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { formatPrice } from "@/lib/utils/nft";
import { useNavigate } from "react-router-dom";

type SortOption = "latest" | "value-asc" | "value-desc" | "profit";

const MyCards = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const user = useAuthStore((state) => state.user);
  const myNFTs = useNFTStore((state) =>
    state.nfts.filter((nft) => nft.ownerId === user?.id),
  );

  const totalValue = myNFTs.reduce((sum, nft) => sum + nft.currentPrice, 0);
  const totalProfit = myNFTs.reduce(
    (sum, nft) => sum + (nft.currentPrice - nft.lastPrice),
    0,
  );

  const sortedNFTs = [...myNFTs].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "value-asc":
        return a.currentPrice - b.currentPrice;
      case "value-desc":
        return b.currentPrice - a.currentPrice;
      case "profit":
        return b.currentPrice - b.lastPrice - (a.currentPrice - a.lastPrice);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My NFT Collection</h1>
        <div className="space-y-1 text-right">
          <div className="text-purple-200">
            Total Value:{" "}
            <span className="font-medium">{formatPrice(totalValue)}</span>
          </div>
          {totalProfit > 0 && (
            <div className="text-sm text-green-400">
              Total Profit: +{formatPrice(totalProfit)}
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={sortOption === "latest" ? "default" : "outline"}
          onClick={() => setSortOption("latest")}
          className={
            sortOption === "latest"
              ? "bg-purple-500 hover:bg-purple-600"
              : "text-purple-200 border-purple-200/20"
          }
        >
          Latest
        </Button>
        <Button
          variant={sortOption === "value-desc" ? "default" : "outline"}
          onClick={() => setSortOption("value-desc")}
          className={
            sortOption === "value-desc"
              ? "bg-purple-500 hover:bg-purple-600"
              : "text-purple-200 border-purple-200/20"
          }
        >
          Highest Value
        </Button>
        <Button
          variant={sortOption === "value-asc" ? "default" : "outline"}
          onClick={() => setSortOption("value-asc")}
          className={
            sortOption === "value-asc"
              ? "bg-purple-500 hover:bg-purple-600"
              : "text-purple-200 border-purple-200/20"
          }
        >
          Lowest Value
        </Button>
        <Button
          variant={sortOption === "profit" ? "default" : "outline"}
          onClick={() => setSortOption("profit")}
          className={
            sortOption === "profit"
              ? "bg-purple-500 hover:bg-purple-600"
              : "text-purple-200 border-purple-200/20"
          }
        >
          Most Profitable
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNFTs.map((nft) => (
          <Card
            key={nft.id}
            className="bg-black/40 border-purple-500/20 overflow-hidden group hover:border-purple-500/40 transition"
          >
            <div className="relative">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              {nft.collection && (
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  {nft.collection}
                </div>
              )}
              {(nft.forTrade || nft.forAuction) && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  {nft.forTrade ? "In Trade" : "In Auction"}
                </div>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                <p className="text-purple-200/70 text-sm">{nft.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-200/70">
                  <span>Purchase Price:</span>
                  <span>{formatPrice(nft.lastPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-purple-200">
                  <span>Current Value:</span>
                  <span>{formatPrice(nft.currentPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>Profit:</span>
                  <span>+{formatPrice(nft.currentPrice - nft.lastPrice)}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                  variant="default"
                  onClick={() => navigate("/dashboard/trade")}
                  disabled={nft.forTrade || nft.forAuction}
                >
                  Trade
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => navigate("/dashboard/auction")}
                  disabled={nft.forTrade || nft.forAuction}
                >
                  Auction
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedNFTs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200">You don't own any NFTs yet.</p>
          <Button
            className="mt-4 bg-purple-500 hover:bg-purple-600"
            onClick={() => navigate("/dashboard")}
          >
            Browse Marketplace
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCards;
