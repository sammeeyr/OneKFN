import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OKFN Admin",
  description: "Administration portal for One Kingdom Family Network",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
