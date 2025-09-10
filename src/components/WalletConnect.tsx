import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { formatEther } from "viem";

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const viewOnEtherscan = () => {
    if (address) {
      window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    });
  };

  if (!isConnected) {
    return <ConnectButton />;
  }

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-mono text-sm">{shortAddress}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <Card className="p-3 mb-2">
            <div className="text-xs text-muted-foreground mb-1">Connected Wallet</div>
            <div className="font-mono text-sm font-medium">{shortAddress}</div>
            {balance && (
              <div className="text-xs text-muted-foreground mt-1">
                {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
              </div>
            )}
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span>Sepolia Testnet</span>
            </div>
          </Card>
          
          <DropdownMenuItem onClick={copyAddress} className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={viewOnEtherscan} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View on Etherscan
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleDisconnect} className="flex items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};