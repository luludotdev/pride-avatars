"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export const ThemeButton = () => {
  const { themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {themes.map((theme) => (
          <ThemeItem key={theme} theme={theme} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ThemeItem = ({ theme }: { readonly theme: string }) => {
  const { theme: current, setTheme } = useTheme();
  const label = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <DropdownMenuItem
      className={cn(theme === current && "font-bold")}
      onClick={() => setTheme(theme)}
    >
      {label}
    </DropdownMenuItem>
  );
};
