import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import type { AlertStatus } from "./StatusIndicator";

export interface AlertHistoryEntry {
  id: string;
  status: AlertStatus;
  timestamp: Date;
  location: string;
  contactsNotified: number;
}

interface AlertHistoryItemProps {
  alert: AlertHistoryEntry;
  onClick?: () => void;
}

const statusLabels: Record<AlertStatus, string> = {
  idle: 'Ready',
  sending: 'Sending',
  sent: 'Sent',
  confirmed: 'Confirmed',
  error: 'Failed'
};

const statusVariants: Record<AlertStatus, "default" | "secondary" | "destructive"> = {
  idle: 'secondary',
  sending: 'default',
  sent: 'default',
  confirmed: 'default',
  error: 'destructive'
};

export default function AlertHistoryItem({ alert, onClick }: AlertHistoryItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer" 
      onClick={onClick}
      data-testid={`alert-${alert.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={statusVariants[alert.status]} data-testid={`badge-status-${alert.id}`}>
                {statusLabels[alert.status]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {alert.contactsNotified} contacts notified
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground" data-testid={`text-time-${alert.id}`}>
                {formatDate(alert.timestamp)}
              </span>
            </div>
            
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-muted-foreground truncate" data-testid={`text-location-${alert.id}`}>
                {alert.location}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
