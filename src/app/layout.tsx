import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Panda Kanban",
  description: "Project Management Dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-bg">
            {/* header here */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
