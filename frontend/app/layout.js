import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AccountContext from "../context/accountContext";
import { SessionProvider } from "../context/sessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Joelbanken - Your Personal Bank App",
  description: "A secure and easy-to-use banking app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <AccountContext>{children}</AccountContext>
        </SessionProvider>
      </body>
    </html>
  );
}
