import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SAMPLE_NFTS = [
  {
    id: 1,
    name: "Cosmic Dragon",
    price: 500,
    image: "https://dummyimage.com/300x300/6D28D9/ffffff&text=Cosmic+Dragon",
    collection: "Mythical Beasts",
  },
  {
    id: 2,
    name: "Digital Phoenix",
    price: 750,
    image: "https://dummyimage.com/300x300/6D28D9/ffffff&text=Digital+Phoenix",
    collection: "Mythical Beasts",
  },
  {
    id: 3,
    name: "Crystal Unicorn",
    price: 600,
    image: "https://dummyimage.com/300x300/6D28D9/ffffff&text=Crystal+Unicorn",
    collection: "Mythical Beasts",
  },
];

const Marketplace = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="text-purple-200 border-purple-200/20"
          >
            Latest
          </Button>
          <Button
            variant="outline"
            className="text-purple-200 border-purple-200/20"
          >
            Popular
          </Button>
          <Button
            variant="outline"
            className="text-purple-200 border-purple-200/20"
          >
            Price: Low to High
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_NFTS.map((nft) => (
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
              <div className="flex justify-between items-center">
                <div className="text-purple-200">
                  <span className="font-medium text-lg">{nft.price}</span> PC
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
