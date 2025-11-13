"use client";

import cfg from "@/data/kings_cup.config.json";
import { useState, useEffect } from "react";
import { Card, H1, Sub, FadeIn, PrimaryButton, Badge } from "@/components/UI";
import PlayerSetup from "@/components/PlayerSetup";
import { usePartyStore } from "@/lib/state";
import { motion } from "framer-motion";

type Action = Record<string, any>;
type Rule = { label: string; action: Action; hint?: string };
type Config = { rule_map: Record<string, Rule> };

const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS = ["♠","♥","♦","♣"];
const isRed = (s: string) => s === "♥" || s === "♦";

function buildDeck(deckCount: number) {
  const cards: { rank: string; suit: string }[] = [];
  for (let d = 0; d < deckCount; d++) {
    for (const rank of RANKS) {
      for (const suit of SUITS) {
        cards.push({ rank, suit });
      }
    }
  }
  // Shuffle (Fisher–Yates)
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function KingsPage() {
  const conf = cfg as unknown as Config;
  const [last, setLast] = useState<null | { rank: string; suit: string; rule: Rule }>(null);
  const [history, setHistory] = useState<{ rank: string; suit: string }[]>([]);
  const { players, currentIndex, nextTurn } = usePartyStore();

  // États pour la gestion du deck
  const [deckCount, setDeckCount] = useState(1);
  const [deck, setDeck] = useState<{ rank: string; suit: string }[]>([]);
  const [cardsLeft, setCardsLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const activePlayer = players.length ? players[currentIndex % players.length] : null;

  function resetGame(newDeckCount?: number) {
    const count = newDeckCount ?? deckCount;
    const newDeck = buildDeck(count);

    setDeckCount(count);
    setDeck(newDeck);
    setCardsLeft(newDeck.length);

    setLast(null);
    setHistory([]);
    setGameStarted(false);

    // Réinitialiser le tour des joueurs
    try {
      const store = usePartyStore.getState();
      if (store.resetTurn) store.resetTurn();
    } catch {}
  }

  // Initialiser le deck au montage
  useEffect(() => {
    resetGame(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDraw = () => {
    if (deck.length === 0) return;

    setGameStarted(true);

    const [next, ...rest] = deck;
    const rule = conf.rule_map[next.rank];

    setDeck(rest);
    setCardsLeft(rest.length);

    setLast({ ...next, rule });
    setHistory((h) => [{ rank: next.rank, suit: next.suit }, ...h].slice(0, 8));

    if (players.length > 0) nextTurn();

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      (navigator as any).vibrate?.(25);
    }
  };

  return (
    <FadeIn className="pd-kings">
      <div style={{ marginBottom: "1rem" }}>
        <H1>King's</H1>
        <Sub>
          Tes règles perso, sans King's Cup centrale. Ajoute les joueurs, tire des cartes, et laisse la soirée faire le reste.
        </Sub>
      </div>

      <div className="pd-kings-grid">
        {/* Panel principal */}
        <Card className="pd-kings-main" >
          {/* Bouton tirer + contrôles */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <PrimaryButton onClick={onDraw} disabled={deck.length === 0}>
              {deck.length === 0 ? "Plus de cartes" : "🃏 Tirer une carte"}
            </PrimaryButton>

            <Badge intent="outline">
              {activePlayer
                ? (
                  <>
                    Tour de <b style={{ marginLeft: 4 }}>{activePlayer.name}</b>
                  </>
                )
                : "Ajoute des joueurs pour suivre les tours"}
            </Badge>

            <div style={{ fontSize: "0.8rem", color: "var(--text-soft)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Paquets :
              {[1, 2, 3].map((n) => {
                const isActive = n === deckCount;
                const disabled = gameStarted && !isActive;

                return (
                  <button
                    key={n}
                    onClick={() => {
                      if (disabled) return;
                      resetGame(n);
                    }}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      border: isActive
                        ? "1px solid #6366f1"
                        : "1px solid rgba(148,163,184,0.6)",
                      background: isActive
                        ? "rgba(99,102,241,0.18)"
                        : "rgba(15,23,42,0.9)",
                      color: disabled ? "rgba(148,163,184,0.6)" : "#e5e7eb",
                      fontSize: "0.75rem",
                      cursor: disabled ? "default" : "pointer",
                      opacity: disabled ? 0.6 : 1,
                    }}
                  >
                    {n}x
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>
              Cartes restantes : <b>{cardsLeft}</b>
            </div>

            {deck.length === 0 && (
              <button
                onClick={() => resetGame()}
                style={{
                  fontSize: "0.8rem",
                  color: "#a5b4fc",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Remélanger et recommencer
              </button>
            )}
          </div>

          {last ? (
            <div className="pd-kings-card-layout">
              <motion.div
                key={`${last.rank}${last.suit}`}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pd-play-card-wrapper"
              >
                <div className="pd-play-card-shadow" />
                <div className="pd-play-card">
                  <div
                    className="pd-play-card-top"
                    style={{ color: isRed(last.suit) ? "#dc2626" : "#111827" }}
                  >
                    {last.rank}
                    {last.suit}
                  </div>
                  <div
                    className="pd-play-card-suit"
                    style={{ color: isRed(last.suit) ? "#dc2626" : "#111827" }}
                  >
                    {last.suit}
                  </div>
                  <div
                    className="pd-play-card-bottom"
                    style={{ color: isRed(last.suit) ? "#dc2626" : "#111827" }}
                  >
                    {last.rank}
                  </div>
                </div>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div className="pd-section-title">Règle tirée</div>
                <div style={{ fontSize: "1.15rem", fontWeight: 600 }}>{last.rule.label}</div>
                {last.rule.hint && (
                  <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    {last.rule.hint}
                  </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.5rem" }}>
                  {Object.keys(last.rule.action || {}).map((k) => (
                    <Badge key={k}>{k}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Clique sur <b>"Tirer une carte"</b> pour lancer la partie.
              Tu peux déjà ajouter les participants à droite.
            </div>
          )}

          <div style={{ marginTop: "1.4rem" }}>
            <div className="pd-section-title" style={{ marginBottom: "0.4rem" }}>
              Historique récent
            </div>
            <div className="pd-history-grid">
              {history.length === 0 && (
                <span style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>
                  Aucun tirage pour l'instant.
                </span>
              )}
              {history.map((h, i) => (
                <div key={i} className="pd-history-chip">
                  <span style={{ color: isRed(h.suit) ? "#f87171" : "#e5e7eb" }}>
                    {h.rank}
                    {h.suit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Panel joueurs */}
        <Card>
          <div style={{ marginBottom: "0.5rem" }}>
            <div className="pd-section-title">Participants</div>
            <Sub>Nom, sexe, âge — pour savoir à qui c'est le tour.</Sub>
          </div>
          <PlayerSetup />
        </Card>
      </div>
    </FadeIn>
  );
}
