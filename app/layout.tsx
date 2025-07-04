import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";


export const metadata: Metadata = {
  title: "Reddit Media Dashboard",
  description: "Demo Project for e-media monitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
