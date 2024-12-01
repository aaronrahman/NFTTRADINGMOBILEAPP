import { NFT } from "../store/useNFTStore";

export const calculateNFTValue = (nft: NFT): number => {
  // Implement value calculation logic
  // For now, increase by 10% from last price
  return Math.floor(nft.lastPrice * 1.1);
};

export const generateNFTImage = (name: string): string => {
  // For now, using dummy image service
  // In a real app, this would integrate with an AI service
  return `https://dummyimage.com/300x300/6D28D9/ffffff&text=${encodeURIComponent(
    name,
  )}`;
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} PC`;
};

export const calculateTimeLeft = (endTime: string): string => {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const distance = end - now;

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (distance < 0) return "Ended";
  return `${hours}h ${minutes}m`;
};
