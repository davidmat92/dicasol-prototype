import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import NavigationWrapper from "./components/NavigationWrapper";

export const metadata: Metadata = {
  title: "DICASOL - Pflege-Monitoring",
  description: "Intelligentes Pflege-Monitoring fuer eine sichere Betreuung",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#080c1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NavigationWrapper>{children}</NavigationWrapper>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
