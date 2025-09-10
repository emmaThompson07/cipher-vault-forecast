import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Clock, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const signals = [
  {
    id: "FHE-001",
    type: "Liquidity Alert",
    confidence: 96,
    timestamp: "2m ago",
    action: "Rebalance ETH/USDC",
    impact: "+$127K",
    status: "active",
    trend: "up"
  },
  {
    id: "FHE-002", 
    type: "Risk Warning",
    confidence: 89,
    timestamp: "15m ago",
    action: "Reduce AVAX exposure",
    impact: "-$45K risk",
    status: "processed",
    trend: "down"
  },
  {
    id: "FHE-003",
    type: "Yield Opportunity",
    confidence: 92,
    timestamp: "1h ago", 
    action: "Stake additional ETH",
    impact: "+$89K APY",
    status: "active",
    trend: "up"
  },
  {
    id: "FHE-004",
    type: "Market Signal",
    confidence: 87,
    timestamp: "2h ago",
    action: "DCA into BTC position",
    impact: "+$34K projected",
    status: "pending",
    trend: "up"
  },
  {
    id: "FHE-005",
    type: "Correlation Alert",
    confidence: 94,
    timestamp: "3h ago",
    action: "Diversify into Layer 2s",
    impact: "-$67K correlation risk",
    status: "completed",
    trend: "down"
  }
];

export const RecentSignals = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "processed": return "secondary";
      case "pending": return "outline";
      case "completed": return "secondary";
      default: return "outline";
    }
  };

  const getImpactColor = (impact: string) => {
    return impact.includes("+") ? "text-success" : "text-bearish";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-3 w-3 text-success" /> : 
      <TrendingDown className="h-3 w-3 text-bearish" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Recent Encrypted Signals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {signals.map((signal) => (
          <div 
            key={signal.id} 
            className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/20 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{signal.type}</span>
                <Badge variant={getStatusColor(signal.status)} className="text-xs">
                  {signal.status}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {signal.timestamp}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                ID: <span className="terminal-mono">{signal.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">{signal.action}</div>
                <div className={`text-xs terminal-mono ${getImpactColor(signal.impact)}`}>
                  {signal.impact}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">
                  {signal.confidence}%
                </div>
                {getTrendIcon(signal.trend)}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
            View all signals
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};