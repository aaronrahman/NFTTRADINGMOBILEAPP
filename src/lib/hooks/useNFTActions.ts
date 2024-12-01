import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNFTStore, NFT, Trade, Auction } from "../store/useNFTStore";
import { generateUniqueId, calculateNFTValue } from "../utils/nft";
import { useToast } from "@/components/ui/use-toast";

export const useNFTActions = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user, updatePurpleCoins } = useAuthStore();
  const {
    addNFT,
    updateNFT,
    removeNFT,
    addAuction,
    updateAuction,
    removeAuction,
    addTrade,
    updateTrade,
  } = useNFTStore();

  const buyNFT = async (nft: NFT) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to buy NFTs",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (user.purpleCoins < nft.currentPrice) {
        throw new Error("Insufficient funds");
      }

      // Update ownership and price
      const newPrice = calculateNFTValue(nft);
      updateNFT(nft.id, {
        ownerId: user.id,
        lastPrice: nft.currentPrice,
        currentPrice: newPrice,
        forSale: false,
        updatedAt: new Date().toISOString(),
      });

      // Update user's balance
      updatePurpleCoins(-nft.currentPrice);

      toast({
        title: "Success",
        description: `You've successfully purchased ${nft.name}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createAuction = async (
    nft: NFT,
    startPrice: number,
    duration: number,
  ) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create auctions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + duration);

      const auction: Auction = {
        id: generateUniqueId(),
        nftId: nft.id,
        sellerId: user.id,
        currentBid: startPrice,
        currentBidderId: null,
        startPrice,
        endTime: endTime.toISOString(),
        bids: [],
      };

      addAuction(auction);
      updateNFT(nft.id, { forAuction: true });

      toast({
        title: "Success",
        description: `Auction created for ${nft.name}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const placeBid = async (auction: Auction, bidAmount: number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to place bids",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (bidAmount <= auction.currentBid) {
        throw new Error("Bid must be higher than current bid");
      }

      if (user.purpleCoins < bidAmount) {
        throw new Error("Insufficient funds");
      }

      // Return coins to previous bidder if exists
      if (auction.currentBidderId) {
        // In a real app, you'd need to handle this properly
        // updatePurpleCoins(auction.currentBid, auction.currentBidderId);
      }

      // Update auction
      updateAuction(auction.id, {
        currentBid: bidAmount,
        currentBidderId: user.id,
        bids: [
          ...auction.bids,
          {
            id: generateUniqueId(),
            bidderId: user.id,
            amount: bidAmount,
            timestamp: new Date().toISOString(),
          },
        ],
      });

      // Lock user's coins
      updatePurpleCoins(-bidAmount);

      toast({
        title: "Success",
        description: `Bid placed successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const proposeTrade = async (proposedNfts: NFT[], requestedNfts: NFT[]) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to propose trades",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const receiverId = requestedNfts[0].ownerId;

      const trade: Trade = {
        id: generateUniqueId(),
        proposerId: user.id,
        receiverId,
        proposedNftIds: proposedNfts.map((nft) => nft.id),
        requestedNftIds: requestedNfts.map((nft) => nft.id),
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addTrade(trade);

      // Mark NFTs as being in trade
      [...proposedNfts, ...requestedNfts].forEach((nft) => {
        updateNFT(nft.id, { forTrade: true });
      });

      toast({
        title: "Success",
        description: `Trade proposal sent!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const respondToTrade = async (trade: Trade, accept: boolean) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to respond to trades",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (accept) {
        // Swap ownership of NFTs
        trade.proposedNftIds.forEach((nftId) => {
          updateNFT(nftId, {
            ownerId: trade.receiverId,
            forTrade: false,
            updatedAt: new Date().toISOString(),
          });
        });

        trade.requestedNftIds.forEach((nftId) => {
          updateNFT(nftId, {
            ownerId: trade.proposerId,
            forTrade: false,
            updatedAt: new Date().toISOString(),
          });
        });
      } else {
        // Release NFTs from trade
        [...trade.proposedNftIds, ...trade.requestedNftIds].forEach((nftId) => {
          updateNFT(nftId, { forTrade: false });
        });
      }

      updateTrade(trade.id, {
        status: accept ? "accepted" : "rejected",
        updatedAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: `Trade ${accept ? "accepted" : "rejected"}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    buyNFT,
    createAuction,
    placeBid,
    proposeTrade,
    respondToTrade,
  };
};
