import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header.js";
import AppProvider from "../components/AppContext.js";
import {Toaster} from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Fiesta Frenzy",
  description: "A food ordering website",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          
            <AppProvider>
              <Toaster />
              <Header />
              {children}
              <footer className="border-t p-8 text-center text-gray-500 mt-16">
                &copy; 2024 All rights reserved
              </footer>
            </AppProvider>
          
        </main>
      </body>
    </html>
  );
}
