"use client";

import Link from "next/link";
import { Card, H1, Sub, Badge, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";

const games = [
  {
    href: "/kings-cup",
    title: "King's",
    desc: "Jeu de cartes à boire avec tes propres règles.",
    tag: "Actif",
    icon: "🃏",
    active: true,
  },
  {
    href: "#",
    title: "Drunkopoly",
    desc: "Plateau inspiré du Monopoly, version alcoolisée.",
    tag: "Bientôt",
    icon: "🎲",
    active: false,
  },
  {
    href: "#",
    title: "High / Low",
    desc: "Plus haut / plus bas, avec gorgées en jeu.",
    tag: "Bientôt",
    icon: "📈",
    active: false,
  },
  {
    href: "#",
    title: "Picolo-like",
    desc: "Prompts fun, duo, spicy selon l'humeur.",
    tag: "Bientôt",
    icon: "🍹",
    active: false,
  },
];

export default function HomePage() {
  return (
    <FadeIn className="pd-home">
      {/* Hero */}
      <Card className="pd-card--hero" >
        <div className="pd-card--hero-gradient" />
        <div className="pd-card-inner">
          <div className="pd-hero">
            <div style={{ maxWidth: "30rem" }}>
              <H1>La salle de jeux dans ta poche.</H1>
              <Sub>
                PartyDeck regroupe tes jeux de soirée dans une seule app.
                Un téléphone, tout le monde joue.
              </Sub>
              <div className="pd-hero-pill-row">
                <Badge>📱 Optimisé mobile</Badge>
                <Badge intent="success">🃏 King's disponible</Badge>
                <Badge>🧪 Early access</Badge>
              </div>
            </div>
            <div className="pd-hero-highlight">
              <div className="pd-hero-highlight-glow" />
              <div className="pd-hero-highlight-card">
                <div style={{ fontSize: "1.6rem" }}>🃏</div>
                <div style={{ fontSize: "0.7rem" }}>Jeu actif</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>King's</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Liste de jeux */}
      <div style={{ marginTop: "1.8rem" }}>
        <div className="pd-games-header">
          <div className="pd-section-title">Jeux</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>
            Plus de jeux arrivent bientôt.
          </div>
        </div>
        <div className="pd-games-grid">
          {games.map((g) => {
            const inner = (
              <div
                className={
                  "pd-game-card" + (g.active ? " pd-game-card--active" : "")
                }
              >
                {g.active && <div className="pd-game-card-glow" />}
                <div className="pd-game-card-inner">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <div
                      className={
                        "pd-game-icon" + (g.active ? " pd-game-icon--active" : "")
                      }
                    >
                      {g.icon}
                    </div>
                    <div>
                      <div className="pd-game-title">{g.title}</div>
                      <div className="pd-game-desc">{g.desc}</div>
                    </div>
                  </div>
                  <Badge intent={g.active ? "success" : "default"}>{g.tag}</Badge>
                </div>
              </div>
            );

            return g.active ? (
              <motion.div
                key={g.title}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <Link href={g.href}>{inner}</Link>
              </motion.div>
            ) : (
              <div key={g.title}>{inner}</div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}
