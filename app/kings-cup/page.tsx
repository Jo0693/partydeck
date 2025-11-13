"use client";

import cfg from "@/data/kings_cup.config.json";
import { useState, useEffect } from "react";
import { Card, H1, Sub, FadeIn, PrimaryButton, Badge } from "@/components/UI";
import PlayerSetup from "@/components/PlayerSetup";
import { usePartyStore, type Player } from "@/lib/state";
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
  const { players, currentIndex, nextTurn, alliances } = usePartyStore();

  // États pour la gestion du deck
  const [deckCount, setDeckCount] = useState(1);
  const [deck, setDeck] = useState<{ rank: string; suit: string }[]>([]);
  const [cardsLeft, setCardsLeft] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // État pour capturer le joueur qui a tiré la carte affichée
  const [lastDrawer, setLastDrawer] = useState<Player | null>(null);

  // États pour le modal "Pote de soirée"
  const [isPoteModalOpen, setIsPoteModalOpen] = useState(false);
  const [poteCandidateId, setPoteCandidateId] = useState<string | null>(null);

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
    setLastDrawer(null);

    // Réinitialiser le tour des joueurs et les alliances
    try {
      const store = usePartyStore.getState();
      if (store.resetTurn) store.resetTurn();
      if (store.resetAlliances) store.resetAlliances();
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

    // Capturer le joueur qui TIRE la carte (avant nextTurn)
    const currentPlayer = players.length > 0
      ? players[currentIndex % players.length]
      : null;

    const [next, ...rest] = deck;
    const rule = conf.rule_map[next.rank];

    setDeck(rest);
    setCardsLeft(rest.length);

    setLast({ ...next, rule });
    setHistory((h) => [{ rank: next.rank, suit: next.suit }, ...h].slice(0, 8));

    // Sauvegarder qui a tiré cette carte
    setLastDrawer(currentPlayer);

    // Passer au joueur suivant
    if (players.length > 0) nextTurn();

    // Si c'est un Roi, ouvrir le modal pour choisir un pote de soirée
    if (next.rank === "K" && currentPlayer && players.length > 1) {
      setPoteCandidateId(null);
      setIsPoteModalOpen(true);
    }

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
                    Prochain : <b style={{ marginLeft: 4 }}>{activePlayer.name}</b>
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
                {/* Affichage clair du joueur qui a tiré + prochain */}
                <div style={{ fontSize: "0.85rem", color: "var(--text-soft)", marginBottom: "0.5rem" }}>
                  {lastDrawer ? (
                    <>
                      <div>
                        Carte tirée par{" "}
                        <span style={{ fontWeight: 600, color: "var(--text-main)" }}>
                          {lastDrawer.name}
                        </span>
                      </div>
                      {activePlayer && players.length > 1 && (
                        <div style={{ marginTop: 2 }}>
                          Prochain :{" "}
                          <span style={{ fontWeight: 500 }}>
                            {activePlayer.name}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>Commence par tirer une carte pour lancer la partie.</div>
                  )}
                </div>

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

          {/* Section alliances */}
          {alliances.length > 0 && (
            <div className="mt-4 border-t border-white/5 pt-3 text-xs text-slate-300">
              <div className="mb-1 flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                <span>🍻 Potes de soirée</span>
              </div>
              <div className="flex flex-col gap-1">
                {alliances.map((group) => {
                  const members = group.memberIds
                    .map((id) => players.find((p) => p.id === id))
                    .filter(Boolean) as Player[];

                  if (members.length < 2) return null;

                  return (
                    <div
                      key={group.id}
                      className="inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-600/70 bg-slate-900/70 px-2 py-1"
                    >
                      <span className="text-[11px] text-slate-400">Team :</span>
                      {members.map((m) => (
                        <span
                          key={m.id}
                          className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-100"
                        >
                          {m.name}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modal Pote de soirée */}
      <PoteDeSoireeModal
        isOpen={isPoteModalOpen}
        onClose={() => setIsPoteModalOpen(false)}
        players={players}
        currentPlayerId={lastDrawer?.id ?? activePlayer?.id ?? ""}
        selectedId={poteCandidateId}
        setSelectedId={setPoteCandidateId}
        onConfirm={() => {
          if (!poteCandidateId) return;
          const store = usePartyStore.getState();
          const baseId = lastDrawer?.id ?? activePlayer?.id;
          if (!baseId) return;

          store.addAlliance(baseId, poteCandidateId);
          setIsPoteModalOpen(false);
        }}
      />
    </FadeIn>
  );
}

// Composant Modal pour choisir son pote de soirée
function PoteDeSoireeModal({
  isOpen,
  onClose,
  players,
  currentPlayerId,
  onConfirm,
  selectedId,
  setSelectedId,
}: {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  currentPlayerId: string;
  onConfirm: () => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) {
  if (!isOpen) return null;

  const poteOptions = players.filter((p) => p.id !== currentPlayerId);

  if (poteOptions.length === 0) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl">
        <h2 className="mb-1 text-lg font-semibold text-slate-50">
          Tu as tiré un Roi 👑
        </h2>
        <p className="mb-4 text-sm text-slate-300">
          Choisis ton pote de soirée. Chaque fois que l'un de vous boit, l'autre boit aussi.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {poteOptions.map((p) => {
            const isActive = selectedId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(isActive ? null : p.id)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  isActive
                    ? "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-100"
                    : "border-slate-600 bg-slate-800/80 text-slate-200 hover:border-slate-400"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-slate-200"
          >
            Plus tard
          </button>
          <button
            onClick={onConfirm}
            disabled={!selectedId}
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Valider le pote
          </button>
        </div>
      </div>
    </div>
  );
}
