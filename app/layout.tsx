import "./tailwind.css";

import { DM_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "~/app/_components/theme-provider";
import { CanvasProvider } from "~/lib/data/rendering";
import { flags } from "~/lib/flags";
import { cn } from "~/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sans",
  display: "swap",
});

const dm_mono = DM_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const RootLayout = ({ children }: { readonly children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link as="image" href="https://lulu.dev/avatar.png" rel="preload" />
      {flags.map(([name, url]) => (
        <link as="image" href={url} key={name} rel="preload" />
      ))}
    </head>

    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
        dm_mono.variable,
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <CanvasProvider>{children}</CanvasProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
