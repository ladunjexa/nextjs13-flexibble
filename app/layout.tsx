import "./globals.css";

import Footer from "@/components/server/Footer";
import Navbar from "@/components/server/Navbar";

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable software projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
