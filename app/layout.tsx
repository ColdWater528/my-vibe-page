import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Corner",
  description: "用 Vibe Coding 的方式，把想法变成属于我的数字角落。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-[#08090a] text-[#f5f5f7] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
