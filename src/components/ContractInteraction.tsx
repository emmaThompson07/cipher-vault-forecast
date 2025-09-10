import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CIPHER_VAULT_FORECAST_ADDRESS, CIPHER_VAULT_FORECAST_ABI } from "@/lib/contracts";
import { generateInputProof } from "@/lib/fhe-utils";
import { useToast } from "@/hooks/use-toast";
import { Plus, TrendingUp, Users } from "lucide-react";

export const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { toast } = useToast();

  const [forecastTitle, setForecastTitle] = useState("");
  const [forecastDescription, setForecastDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedForecastId, setSelectedForecastId] = useState("");

  const createForecast = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create a forecast",
        variant: "destructive",
      });
      return;
    }

    try {
      await writeContract({
        address: CIPHER_VAULT_FORECAST_ADDRESS,
        abi: CIPHER_VAULT_FORECAST_ABI,
        functionName: "createForecast",
        args: [
          forecastTitle,
          forecastDescription,
          BigInt(targetAmount),
          BigInt(duration) * 86400, // Convert days to seconds
        ],
      });

      toast({
        title: "Forecast Created",
        description: "Your forecast has been submitted to the blockchain",
      });
    } catch (error) {
      console.error("Error creating forecast:", error);
      toast({
        title: "Error",
        description: "Failed to create forecast",
        variant: "destructive",
      });
    }
  };

  const makeInvestment = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make an investment",
        variant: "destructive",
      });
      return;
    }

    try {
      const amount = parseInt(investmentAmount);
      const { encryptedValue, proof } = await generateInputProof(amount);

      await writeContract({
        address: CIPHER_VAULT_FORECAST_ADDRESS,
        abi: CIPHER_VAULT_FORECAST_ABI,
        functionName: "makeInvestment",
        args: [
          BigInt(selectedForecastId),
          encryptedValue,
          proof,
        ],
        value: BigInt(amount * 1e18), // Convert to wei
      });

      toast({
        title: "Investment Made",
        description: "Your investment has been submitted to the blockchain",
      });
    } catch (error) {
      console.error("Error making investment:", error);
      toast({
        title: "Error",
        description: "Failed to make investment",
        variant: "destructive",
      });
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Interaction</CardTitle>
          <CardDescription>
            Connect your wallet to interact with the Cipher Vault Forecast contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Please connect your wallet to access contract functions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Forecast
          </CardTitle>
          <CardDescription>
            Create a new encrypted treasury forecast
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Forecast Title</Label>
              <Input
                id="title"
                value={forecastTitle}
                onChange={(e) => setForecastTitle(e.target.value)}
                placeholder="Enter forecast title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (ETH)</Label>
              <Input
                id="targetAmount"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={forecastDescription}
              onChange={(e) => setForecastDescription(e.target.value)}
              placeholder="Describe your forecast..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="30"
            />
          </div>
          <Button 
            onClick={createForecast} 
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending || isConfirming ? "Creating..." : "Create Forecast"}
          </Button>
        </CardContent>
      </Card>

      {/* Make Investment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Make Investment
          </CardTitle>
          <CardDescription>
            Invest in an existing forecast with encrypted amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="forecastId">Forecast ID</Label>
              <Input
                id="forecastId"
                value={selectedForecastId}
                onChange={(e) => setSelectedForecastId(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentAmount">Investment Amount (ETH)</Label>
              <Input
                id="investmentAmount"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="1.0"
              />
            </div>
          </div>
          <Button 
            onClick={makeInvestment} 
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending || isConfirming ? "Investing..." : "Make Investment"}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction Status */}
      {hash && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Transaction Hash:</strong> {hash}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {isConfirming ? "Confirming..." : isSuccess ? "Confirmed" : "Pending"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
