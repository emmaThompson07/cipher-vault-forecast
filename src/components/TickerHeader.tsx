import { Shield, Lock, TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { symbol: "ETH/USD", price: "2,384.75", change: "+2.3%", trend: "up" },
  { symbol: "BTC/USD", price: "43,726.82", change: "-0.8%", trend: "down" },
  { symbol: "MATIC/USD", price: "0.8547", change: "+5.7%", trend: "up" },
  { symbol: "ARB/USD", price: "1.2834", change: "+1.2%", trend: "up" },
  { symbol: "OP/USD", price: "2.4561", change: "-1.5%", trend: "down" },
  { symbol: "AVAX/USD", price: "36.89", change: "+3.4%", trend: "up" },
];

export const TickerHeader = () => {
  return (
    <div className="bg-card border-b border-border">
      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FHE Confidential Finance
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Encrypted Treasury Analytics</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="text-muted-foreground">
            Market Status: <span className="text-success">Open</span>
          </div>
          <div className="terminal-mono text-muted-foreground">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="bg-muted/20 border-t border-border overflow-hidden relative h-8">
        <div className="ticker-scroll flex items-center h-full gap-8 whitespace-nowrap">
          {[...tickerData, ...tickerData].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{item.symbol}</span>
              <span className="terminal-mono font-medium">${item.price}</span>
              <div className={`flex items-center gap-1 ${
                item.trend === "up" ? "text-bullish" : "text-bearish"
              }`}>
                {item.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="terminal-mono text-xs">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};