import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AIChatbot } from "@/components/ui/ai-chatbot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Codepacker Catalog - Portofolio Siswa RPL SMKN 4 Malang",
  description: "Platform modern untuk menampilkan katalog dan portofolio siswa RPL SMKN 4 Malang. Temukan karya-karya terbaik dari developer masa depan.",
  keywords: ["RPL", "SMKN 4 Malang", "portofolio", "siswa", "programming", "web development", "mobile development"],
  authors: [{ name: "SMKN 4 Malang" }],
  creator: "Siswa RPL SMKN 4 Malang",
  openGraph: {
    title: "Codepacker Catalog - Portofolio Siswa RPL",
    description: "Platform modern untuk menampilkan katalog dan portofolio siswa RPL SMKN 4 Malang",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codepacker Catalog - Portofolio Siswa RPL",
    description: "Platform modern untuk menampilkan katalog dan portofolio siswa RPL SMKN 4 Malang",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
