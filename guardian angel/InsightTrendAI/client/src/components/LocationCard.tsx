import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, RefreshCw } from "lucide-react";
import { useState } from "react";

interface LocationCardProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  lastUpdated?: Date;
  onRefresh?: () => void;
}

export default function LocationCard({ 
  latitude, 
  longitude, 
  address, 
  lastUpdated,
  onRefresh 
}: LocationCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatTime = (date?: Date) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Card data-testid="card-location">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Current Location</CardTitle>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleRefresh}
          disabled={isRefreshing}
          data-testid="button-refresh-location"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
          <MapPin className="w-12 h-12 text-primary relative z-10" />
        </div>
        
        <div className="space-y-2">
          {address && (
            <p className="text-sm font-medium" data-testid="text-address">
              {address}
            </p>
          )}
          {latitude && longitude && (
            <p className="text-xs text-muted-foreground" data-testid="text-coordinates">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Last updated: {formatTime(lastUpdated)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
