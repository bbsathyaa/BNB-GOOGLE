import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PanicButtonProps {
  onActivate: () => void;
  disabled?: boolean;
}

export default function PanicButton({ onActivate, disabled = false }: PanicButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdDuration = 3000;

  useEffect(() => {
    if (!isHolding) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setIsHolding(false);
        onActivate();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isHolding, onActivate]);

  const handleStart = () => {
    if (!disabled) {
      setIsHolding(true);
    }
  };

  const handleEnd = () => {
    setIsHolding(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg className="absolute -inset-2 w-56 h-56 -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="104"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {isHolding && (
            <circle
              cx="112"
              cy="112"
              r="104"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(progress / 100) * 653.45} 653.45`}
              className="transition-all duration-75"
            />
          )}
        </svg>
        
        <Button
          size="icon"
          variant="destructive"
          className="w-52 h-52 rounded-full shadow-xl hover-elevate active-elevate-2 relative overflow-visible"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          disabled={disabled}
          data-testid="button-panic"
        >
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="w-16 h-16" />
            <span className="text-2xl font-bold">SOS</span>
          </div>
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {isHolding ? "Keep holding..." : "Press and hold for 3 seconds to send emergency alert"}
      </p>
    </div>
  );
}
