import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HUNTER FAMILY · GOLF & PARTY",
  description: "HUNTER FAMILY E-card · Golf & Party · 4 กันยายน 2569",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/hunter-patch.png",
    shortcut: "/hunter-patch.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
