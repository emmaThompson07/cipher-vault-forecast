import { TickerHeader } from "@/components/TickerHeader";
import { WalletConnect } from "@/components/WalletConnect";
import { TreasuryChart } from "@/components/TreasuryChart";
import { MetricsGrid } from "@/components/MetricsGrid";
import { RecentSignals } from "@/components/RecentSignals";
import { ContractInteraction } from "@/components/ContractInteraction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TickerHeader />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Treasury Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time encrypted treasury analytics and predictions
            </p>
          </div>
          <WalletConnect />
        </div>

        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TreasuryChart />
          <RecentSignals />
        </div>

        {/* Contract Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContractInteraction />
          <div className="space-y-4">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">FHE Technology</h3>
              <p className="text-muted-foreground text-sm">
                Our platform uses Fully Homomorphic Encryption (FHE) to ensure that all treasury data 
                remains encrypted even during computation, providing maximum privacy and security.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
              <p className="text-muted-foreground text-sm">
                Deployed on Ethereum Sepolia testnet with FHE-enabled smart contracts for secure 
                treasury operations and encrypted data processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
