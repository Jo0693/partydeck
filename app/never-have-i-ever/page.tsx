"use client";

import { useState } from "react";
import { Card, H1, Sub, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";

const prompts: string[] = [
  "Je n'ai jamais voyagé seul(e) à l'étranger.",
  "Je n'ai jamais dormi sur la plage.",
  "Je n'ai jamais envoyé un message à la mauvaise personne.",
  "Je n'ai jamais menti sur mon âge pour entrer quelque part.",
  "Je n'ai jamais oublié l'anniversaire d'un ami proche.",
  "Je n'ai jamais pris un vol sans enregistrer de bagage.",
  "Je n'ai jamais fait une nuit blanche pour travailler ou réviser.",
  "Je n'ai jamais quitté une soirée sans dire au revoir.",
  "Je n'ai jamais testé un sport extrême.",
  "Je n'ai jamais perdu mon téléphone en soirée.",
  "Je n'ai jamais chanté en public.",
  "Je n'ai jamais raté un rendez-vous important.",
  "Je n'ai jamais gardé un secret pendant plus d'un an.",
  "Je n'ai jamais fait de road trip spontané.",
  "Je n'ai jamais cuisiné un plat complètement raté.",
  "Je n'ai jamais dormi dans un aéroport.",
  "Je n'ai jamais fait de bénévolat.",
  "Je n'ai jamais parlé seul(e) à voix haute en pensant être seul(e).",
  "Je n'ai jamais refusé une invitation que je regrettais.",
  "Je n'ai jamais oublié où j'avais garé ma voiture.",
];

export default function NeverHaveIEverPage() {
  const [order, setOrder] = useState<number[]>(() =>
    prompts.map((_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [cursor, setCursor] = useState(0);

  const currentPrompt = prompts[order[cursor]];
  const history = order
    .slice(Math.max(0, cursor - 5), cursor)
    .map((idx) => prompts[idx]);

  function nextPrompt() {
    if (cursor < order.length - 1) {
      setCursor(cursor + 1);
    } else {
      // Deck fini -> remélanger
      const newOrder = prompts.map((_, i) => i).sort(() => Math.random() - 0.5);
      setOrder(newOrder);
      setCursor(0);
    }
  }

  function resetDeck() {
    const newOrder = prompts.map((_, i) => i).sort(() => Math.random() - 0.5);
    setOrder(newOrder);
    setCursor(0);
  }

  return (
    <FadeIn>
      <div className="px-4 md:px-0" style={{ marginBottom: "1rem" }}>
        <H1>Never Have I Ever</H1>
        <Sub>
          Version mobile du classique « Je n'ai jamais ». Lis la phrase. Si tu l'as déjà fait, bois.
        </Sub>
      </div>

      <div className="px-4 md:px-0">
        <Card>
          <div className="text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              PHRASE
            </div>

            <motion.div
              key={cursor}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-slate-700/70 bg-white p-8 shadow-2xl"
            >
              <p className="text-lg font-medium leading-relaxed text-slate-900">
                {currentPrompt}
              </p>
            </motion.div>

            <p className="mb-6 text-sm text-slate-400">
              Si tu l'as déjà fait, tu bois.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={nextPrompt}
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/40"
              >
                Nouvelle phrase
              </button>
              <button
                onClick={resetDeck}
                className="rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-xs text-slate-200 transition-all hover:border-slate-400"
              >
                Remettre le deck à zéro
              </button>
            </div>

            <div className="mt-8 text-xs text-slate-500">
              Phrase {cursor + 1} / {prompts.length}
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-8 border-t border-white/5 pt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                HISTORIQUE RÉCENT
              </div>
              <div className="flex flex-col gap-2">
                {history.reverse().map((prompt, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-xs text-slate-300"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </FadeIn>
  );
}
