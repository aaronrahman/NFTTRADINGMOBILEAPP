import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

const Trade = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Trade NFTs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 border-purple-500/20 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your NFTs</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-purple-500/10 rounded-lg">
              <img
                src="https://dummyimage.com/100x100/6D28D9/ffffff&text=Mystic+Wolf"
                alt="Mystic Wolf"
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">Mystic Wolf</h3>
                <p className="text-purple-200/70 text-sm">Value: 550 PC</p>
              </div>
              <Button
                variant="outline"
                className="text-purple-200 border-purple-200/20"
              >
                Select
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-black/40 border-purple-500/20 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Available for Trade
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-purple-500/10 rounded-lg">
              <img
                src="https://dummyimage.com/100x100/6D28D9/ffffff&text=Crystal+Unicorn"
                alt="Crystal Unicorn"
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">Crystal Unicorn</h3>
                <p className="text-purple-200/70 text-sm">Value: 600 PC</p>
              </div>
              <Button
                variant="outline"
                className="text-purple-200 border-purple-200/20"
              >
                Select
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-purple-500 hover:bg-purple-600 mt-4"
          size="lg"
          disabled
        >
          <ArrowLeftRight className="w-4 h-4 mr-2" />
          Propose Trade
        </Button>
      </div>
    </div>
  );
};

export default Trade;
