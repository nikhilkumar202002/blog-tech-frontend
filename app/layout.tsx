import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import Frame from "./components/common/Frame";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";
import Pagetransition from "./components/common/Pagetransition";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blogtecsoftware.com"),
  title: "Blogtec Software | Jewellery ERP & Management Solutions",
  description:
    "Streamline your jewellery operations with Blogtec Software. Our ERP solutions manage inventory, billing, schemes, and accounts in one platform.",
  icons: {
    icon: "/fav-icon-2.jpg",
    shortcut: "/fav-icon-2.jpg",
    apple: "/fav-icon-2.jpg",
  },
  openGraph: {
    title: "Blogtec Software | Jewellery ERP & Management Solutions",
    description:
      "Streamline your jewellery operations with Blogtec Software. Our ERP solutions manage inventory, billing, schemes, and accounts in one platform.",
    images: [
      {
        url: "/fav-icon.jpg",
        width: 1200,
        height: 630,
        alt: "Blogtec Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogtec Software | Jewellery ERP & Management Solutions",
    description:
      "Streamline your jewellery operations with Blogtec Software. Our ERP solutions manage inventory, billing, schemes, and accounts in one platform.",
    images: ["/fav-icon.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${inter.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f8f8]">
        <Preloader />
        <div className="relative min-h-screen bg-[#f8f8f8] flex items-center justify-center p-3 md:p-5">
          <Header position="fixed" />
          <Frame id="site-frame" contentClassName="p-0">
            <Pagetransition>
              {children}
            </Pagetransition>
            <Footer />
          </Frame>
        </div>
      </body>
    </html>
  );
}
