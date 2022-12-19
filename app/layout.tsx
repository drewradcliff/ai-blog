import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="mx-auto max-w-2xl pt-12">{children}</body>
    </html>
  );
}
