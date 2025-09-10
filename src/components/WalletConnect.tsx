import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const connectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setAddress("0x742d35Cc6B7C8d12...3a9F");
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Wallet has been disconnected",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6B7C8d12abc3e456f78901234567890abc123def456789012345a9F");
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} variant="outline" className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span className="terminal-mono text-sm">{address}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <Card className="p-3 mb-2">
            <div className="text-xs text-muted-foreground mb-1">Connected Wallet</div>
            <div className="terminal-mono text-sm font-medium">0x742d...a9F</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-success rounded-full" />
              <span>Ethereum Mainnet</span>
            </div>
          </Card>
          
          <DropdownMenuItem onClick={copyAddress} className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View on Etherscan
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={disconnectWallet} className="flex items-center gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};