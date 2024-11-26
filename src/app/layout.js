
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar"; // Import Navbar from your components folder
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smora-AI",
  description: "AI Voice Generator",
  icons: {
    icon: "/logo.svg", // Path to your logo in the public folder
    shortcut: "/logo.svg", // Optional: Specify a shortcut icon
  },
  
};

export default function RootLayout({ children }) {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <Navbar /> {/* Navbar persists across all pages */}
          <main>{children}</main> {/* Renders the page content */}
        </ClerkProvider>
      </body>
    </html>
  );
}
