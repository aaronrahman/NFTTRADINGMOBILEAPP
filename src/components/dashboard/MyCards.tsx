import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MY_NFTS = [
  {
    id: 1,
    name: "Mystic Wolf",
    value: 550,
    purchasePrice: 500,
    image: "https://dummyimage.com/300x300/6D28D9/ffffff&text=Mystic+Wolf",
    collection: "Mythical Beasts",
  },
];

const MyCards = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My NFT Collection</h1>
        <div className="text-purple-200">
          Total Value: <span className="font-medium">550</span> PC
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MY_NFTS.map((nft) => (
          <Card
            key={nft.id}
            className="bg-black/40 border-purple-500/20 overflow-hidden"
          >
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                <p className="text-purple-200/70">{nft.collection}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-200/70">
                  <span>Purchase Price:</span>
                  <span>{nft.purchasePrice} PC</span>
                </div>
                <div className="flex justify-between text-sm text-purple-200">
                  <span>Current Value:</span>
                  <span>{nft.value} PC</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>Profit:</span>
                  <span>+{nft.value - nft.purchasePrice} PC</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                  variant="default"
                >
                  Trade
                </Button>
                <Button className="flex-1" variant="outline">
                  Auction
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {MY_NFTS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200">You don't own any NFTs yet.</p>
          <Button className="mt-4 bg-purple-500 hover:bg-purple-600">
            Browse Marketplace
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCards;
