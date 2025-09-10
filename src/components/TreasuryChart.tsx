import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';
import { TrendingUp, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const treasuryData = [
  { date: '2024-01', value: 24500000, encrypted: 28000000, confidence: 85 },
  { date: '2024-02', value: 26800000, encrypted: 30200000, confidence: 88 },
  { date: '2024-03', value: 25200000, encrypted: 29400000, confidence: 82 },
  { date: '2024-04', value: 28900000, encrypted: 33100000, confidence: 91 },
  { date: '2024-05', value: 31200000, encrypted: 35800000, confidence: 89 },
  { date: '2024-06', value: 33600000, encrypted: 38200000, confidence: 93 },
  { date: '2024-07', value: 32100000, encrypted: 36900000, confidence: 87 },
  { date: '2024-08', value: 35400000, encrypted: 40600000, confidence: 94 },
  { date: '2024-09', value: 38700000, encrypted: 44200000, confidence: 96 },
];

export const TreasuryChart = () => {
  const [showEncrypted, setShowEncrypted] = useState(true);

  const formatValue = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 border border-border bg-card/95 backdrop-blur-sm">
          <div className="text-xs text-muted-foreground mb-1">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{entry.name}:</span>
              <span className="terminal-mono">{formatValue(entry.value)}</span>
            </div>
          ))}
        </Card>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Treasury Prediction Model
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEncrypted(!showEncrypted)}
            className="flex items-center gap-2"
          >
            {showEncrypted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            FHE Layer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold terminal-mono text-primary">
              {formatValue(treasuryData[treasuryData.length - 1].value)}
            </div>
            <div className="text-xs text-muted-foreground">Current Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold terminal-mono text-success flex items-center justify-center gap-1">
              <TrendingUp className="h-5 w-5" />
              +15.8%
            </div>
            <div className="text-xs text-muted-foreground">30d Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold terminal-mono text-accent">
              96%
            </div>
            <div className="text-xs text-muted-foreground">Confidence</div>
          </div>
        </div>

        <div className="h-64 chart-grid">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={treasuryData}>
              <defs>
                <linearGradient id="treasuryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="encryptedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#treasuryGradient)"
                strokeWidth={2}
                name="Public Value"
              />
              {showEncrypted && (
                <Area
                  type="monotone"
                  dataKey="encrypted"
                  stroke="hsl(var(--accent))"
                  fillOpacity={1}
                  fill="url(#encryptedGradient)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Encrypted Prediction"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};