import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Zap, 
  Lock, 
  Activity,
  AlertTriangle,
  DollarSign
} from "lucide-react";

const metrics = [
  {
    title: "Total Value Locked",
    value: "$38.7M",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    description: "Across all protocols"
  },
  {
    title: "Risk Score",
    value: "Low",
    change: "-2.1%",
    trend: "up",
    icon: Shield,
    description: "Composite risk assessment",
    color: "success"
  },
  {
    title: "Yield Efficiency",
    value: "94.2%",
    change: "+5.7%",
    trend: "up",
    icon: Zap,
    description: "vs benchmark strategies"
  },
  {
    title: "Active Positions",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Activity,
    description: "Cross-chain positions"
  },
  {
    title: "Encrypted Signals",
    value: "127",
    change: "+8",
    trend: "up",
    icon: Lock,
    description: "FHE computations today",
    color: "primary"
  },
  {
    title: "Alert Level",
    value: "Green",
    change: "Stable",
    trend: "neutral",
    icon: AlertTriangle,
    description: "No active warnings",
    color: "success"
  }
];

export const MetricsGrid = () => {
  const getIcon = (IconComponent: any, color?: string) => {
    const colorClass = color === "success" ? "text-success" : 
                      color === "primary" ? "text-primary" : 
                      "text-foreground";
    return <IconComponent className={`h-4 w-4 ${colorClass}`} />;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-bearish" />;
    return null;
  };

  const getBadgeVariant = (color?: string) => {
    if (color === "success") return "default";
    if (color === "primary") return "secondary";
    return "outline";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            {getIcon(metric.icon, metric.color)}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold terminal-mono">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge 
                  variant={getBadgeVariant(metric.color)}
                  className="flex items-center gap-1 text-xs"
                >
                  {getTrendIcon(metric.trend)}
                  {metric.change}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};