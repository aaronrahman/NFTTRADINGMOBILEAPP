import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNFTStore } from "@/lib/store/useNFTStore";
import { useNFTActions } from "@/lib/hooks/useNFTActions";
import { formatPrice } from "@/lib/utils/nft";

type SortOption = "latest" | "popular" | "price-asc" | "price-desc";

const Marketplace = () => {
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const nfts = useNFTStore((state) =>
    state.nfts.filter((nft) => nft.forSale && !nft.forAuction && !nft.forTrade),
  );
  const { buyNFT, isLoading } = useNFTActions();

  const sortedNFTs = [...nfts].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return b.currentPrice - a.currentPrice;
      case "price-asc":
        return a.currentPrice - b.currentPrice;
      case "price-desc":
        return b.currentPrice - a.currentPrice;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
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
            variant={sortOption === "popular" ? "default" : "outline"}
            onClick={() => setSortOption("popular")}
            className={
              sortOption === "popular"
                ? "bg-purple-500 hover:bg-purple-600"
                : "text-purple-200 border-purple-200/20"
            }
          >
            Popular
          </Button>
          <Button
            variant={sortOption === "price-asc" ? "default" : "outline"}
            onClick={() => setSortOption("price-asc")}
            className={
              sortOption === "price-asc"
                ? "bg-purple-500 hover:bg-purple-600"
                : "text-purple-200 border-purple-200/20"
            }
          >
            Price: Low to High
          </Button>
          <Button
            variant={sortOption === "price-desc" ? "default" : "outline"}
            onClick={() => setSortOption("price-desc")}
            className={
              sortOption === "price-desc"
                ? "bg-purple-500 hover:bg-purple-600"
                : "text-purple-200 border-purple-200/20"
            }
          >
            Price: High to Low
          </Button>
        </div>
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
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                <p className="text-purple-200/70 text-sm">{nft.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-purple-200">
                    <span className="font-medium text-lg">
                      {formatPrice(nft.currentPrice)}
                    </span>
                  </div>
                  {nft.lastPrice < nft.currentPrice && (
                    <div className="text-xs text-green-400">
                      +
                      {Math.round(
                        ((nft.currentPrice - nft.lastPrice) / nft.lastPrice) *
                          100,
                      )}
                      %
                    </div>
                  )}
                </div>
                <Button
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => buyNFT(nft)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedNFTs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200">
            No NFTs available in the marketplace.
          </p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
