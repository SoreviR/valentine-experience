// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Valentine",
  description: "A small experience",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
