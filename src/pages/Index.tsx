import { TickerHeader } from "@/components/TickerHeader";
import { WalletConnect } from "@/components/WalletConnect";
import { TreasuryChart } from "@/components/TreasuryChart";
import { MetricsGrid } from "@/components/MetricsGrid";
import { RecentSignals } from "@/components/RecentSignals";

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
      </div>
    </div>
  );
};

export default Index;
