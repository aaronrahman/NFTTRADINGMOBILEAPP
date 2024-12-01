import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gavel, Timer } from "lucide-react";

const ACTIVE_AUCTIONS = [
  {
    id: 1,
    name: "Digital Phoenix",
    currentBid: 800,
    timeLeft: "2h 45m",
    image: "https://dummyimage.com/300x300/6D28D9/ffffff&text=Digital+Phoenix",
    bids: 12,
  },
];

const Auction = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">NFT Auctions</h1>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <Gavel className="w-4 h-4 mr-2" />
          Create Auction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVE_AUCTIONS.map((auction) => (
          <Card
            key={auction.id}
            className="bg-black/40 border-purple-500/20 overflow-hidden"
          >
            <img
              src={auction.image}
              alt={auction.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {auction.name}
                </h3>
                <div className="flex items-center space-x-2 text-purple-200/70">
                  <Timer className="w-4 h-4" />
                  <span>{auction.timeLeft} left</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-purple-200">
                  <span>Current Bid:</span>
                  <span className="font-medium">{auction.currentBid} PC</span>
                </div>
                <div className="flex justify-between text-purple-200/70 text-sm">
                  <span>Total Bids:</span>
                  <span>{auction.bids}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter bid amount"
                  className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-200/50"
                />
                <Button className="bg-purple-500 hover:bg-purple-600 whitespace-nowrap">
                  Place Bid
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {ACTIVE_AUCTIONS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200">No active auctions at the moment.</p>
          <Button className="mt-4 bg-purple-500 hover:bg-purple-600">
            Create an Auction
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auction;
