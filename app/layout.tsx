import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Book summaries for busy readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
