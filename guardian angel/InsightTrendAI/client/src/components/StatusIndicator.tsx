import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Send, AlertTriangle } from "lucide-react";

export type AlertStatus = 'idle' | 'sending' | 'sent' | 'confirmed' | 'error';

interface StatusIndicatorProps {
  status: AlertStatus;
  message?: string;
  timestamp?: Date;
}

const statusConfig = {
  idle: {
    icon: Clock,
    label: 'Ready',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50',
    borderColor: 'border-l-muted'
  },
  sending: {
    icon: Send,
    label: 'Sending Alert',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-l-blue-600 dark:border-l-blue-400'
  },
  sent: {
    icon: CheckCircle2,
    label: 'Alert Sent',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-l-green-600 dark:border-l-green-400'
  },
  confirmed: {
    icon: CheckCircle2,
    label: 'Help On The Way',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-l-green-600 dark:border-l-green-400'
  },
  error: {
    icon: AlertTriangle,
    label: 'Failed to Send',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-l-destructive'
  }
};

export default function StatusIndicator({ status, message, timestamp }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <Card className={`border-l-4 ${config.borderColor}`} data-testid={`status-${status}`}>
      <CardContent className={`p-6 ${config.bgColor}`}>
        <div className="flex items-start gap-4">
          <div className={`${config.color} mt-1`}>
            <Icon className="w-8 h-8" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold ${config.color}`}>
              {config.label}
            </h3>
            {message && (
              <p className="text-sm text-foreground/80 mt-1">
                {message}
              </p>
            )}
            {timestamp && (
              <p className="text-xs text-muted-foreground mt-2">
                {formatTime(timestamp)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
