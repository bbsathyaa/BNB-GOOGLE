import { Button } from "@/components/ui/button";
import { Menu, Settings, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

interface AppHeaderProps {
  title: string;
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
}

export default function AppHeader({ title, onMenuClick, onSettingsClick }: AppHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={onMenuClick}
          data-testid="button-menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDarkMode}
          data-testid="button-theme-toggle"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onSettingsClick}
          data-testid="button-settings"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
