import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PartyDeck",
  description: "Hub de jeux de soirée — King's, Drunkopoly, High/Low, Picolo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="pd-body">
        <header className="pd-header">
          <div className="pd-header-inner">
            <Link href="/" className="pd-logo">
              <div className="pd-logo-icon">PD</div>
              <div>
                <div className="pd-logo-text-main">PartyDeck</div>
                <div className="pd-logo-text-sub">Jeux de soirée nouvelle génération</div>
              </div>
            </Link>
            <div className="pd-header-right">Boire responsable 🍻</div>
          </div>
        </header>
        <main className="pd-main">{children}</main>
      </body>
    </html>
  );
}
