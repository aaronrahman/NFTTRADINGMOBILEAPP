import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { INITIAL_NFTS } from "../utils/initialData";

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  collection: string;
  currentPrice: number;
  lastPrice: number;
  ownerId: string;
  forSale: boolean;
  forAuction: boolean;
  forTrade: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Auction {
  id: string;
  nftId: string;
  sellerId: string;
  currentBid: number;
  currentBidderId: string | null;
  startPrice: number;
  endTime: string;
  bids: Array<{
    id: string;
    bidderId: string;
    amount: number;
    timestamp: string;
  }>;
}

export interface Trade {
  id: string;
  proposerId: string;
  receiverId: string;
  proposedNftIds: string[];
  requestedNftIds: string[];
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface NFTState {
  nfts: NFT[];
  auctions: Auction[];
  trades: Trade[];
  addNFT: (nft: NFT) => void;
  updateNFT: (id: string, updates: Partial<NFT>) => void;
  removeNFT: (id: string) => void;
  addAuction: (auction: Auction) => void;
  updateAuction: (id: string, updates: Partial<Auction>) => void;
  removeAuction: (id: string) => void;
  addTrade: (trade: Trade) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  removeTrade: (id: string) => void;
}

export const useNFTStore = create<NFTState>(
  persist(
    immer((set) => ({
      nfts: INITIAL_NFTS,
      auctions: [],
      trades: [],
      addNFT: (nft) =>
        set((state) => {
          state.nfts.push(nft);
        }),
      updateNFT: (id, updates) =>
        set((state) => {
          const nft = state.nfts.find((n) => n.id === id);
          if (nft) {
            Object.assign(nft, updates);
          }
        }),
      removeNFT: (id) =>
        set((state) => {
          state.nfts = state.nfts.filter((n) => n.id !== id);
        }),
      addAuction: (auction) =>
        set((state) => {
          state.auctions.push(auction);
        }),
      updateAuction: (id, updates) =>
        set((state) => {
          const auction = state.auctions.find((a) => a.id === id);
          if (auction) {
            Object.assign(auction, updates);
          }
        }),
      removeAuction: (id) =>
        set((state) => {
          state.auctions = state.auctions.filter((a) => a.id !== id);
        }),
      addTrade: (trade) =>
        set((state) => {
          state.trades.push(trade);
        }),
      updateTrade: (id, updates) =>
        set((state) => {
          const trade = state.trades.find((t) => t.id === id);
          if (trade) {
            Object.assign(trade, updates);
          }
        }),
      removeTrade: (id) =>
        set((state) => {
          state.trades = state.trades.filter((t) => t.id !== id);
        }),
    })),
    {
      name: "nft-storage",
    },
  ),
);
