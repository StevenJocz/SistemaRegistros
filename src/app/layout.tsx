import type { Metadata } from "next";
import "../style/globals.css"

export const metadata: Metadata = {
  title: "SISTEMA DE REGISTRO",
  description: "Sistema de registro de usuarios",
  icons: {
    icon: ['./favicon.ico'],
    apple: ['./favicon.ico'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
