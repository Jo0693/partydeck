"use client";

import { useState, useEffect } from "react";
import { Card, H1, Sub, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";

type NhiCategoryId =
  | "basic"
  | "spicy"
  | "hot"
  | "hardcore"
  | "gross"
  | "illicit"
  | "travel"
  | "work_school"
  | "online"
  | "couple";

const PROMPTS_BY_CATEGORY: Record<NhiCategoryId, string[]> = {
  basic: [
    "Je n'ai jamais voyagé seul(e) à l'étranger.",
    "Je n'ai jamais dormi sur la plage.",
    "Je n'ai jamais oublié l'anniversaire d'un ami proche.",
    "Je n'ai jamais testé un sport extrême.",
    "Je n'ai jamais chanté en public.",
    "Je n'ai jamais fait de road trip spontané.",
    "Je n'ai jamais cuisiné un plat complètement raté.",
    "Je n'ai jamais fait de bénévolat.",
    "Je n'ai jamais parlé seul(e) à voix haute en pensant être seul(e).",
    "Je n'ai jamais oublié où j'avais garé ma voiture.",
    "Je n'ai jamais raté un train ou un avion.",
    "Je n'ai jamais fait de camping sauvage.",
    "Je n'ai jamais gagné un concours.",
    "Je n'ai jamais perdu mon portefeuille.",
    "Je n'ai jamais mangé quelque chose que j'avais fait tomber par terre.",
  ],
  spicy: [
    "Je n'ai jamais embrassé quelqu'un le premier soir.",
    "Je n'ai jamais eu un rencard catastrophique.",
    "Je n'ai jamais envoyé un message osé à la mauvaise personne.",
    "Je n'ai jamais menti sur mon âge sur une app de rencontre.",
    "Je n'ai jamais eu un crush sur un(e) ami(e) proche.",
    "Je n'ai jamais fait semblant d'aimer un cadeau.",
    "Je n'ai jamais eu un rencard qui a fini plus chaud que prévu.",
    "Je n'ai jamais flirté pour obtenir quelque chose.",
    "Je n'ai jamais envoyé une photo suggestive.",
    "Je n'ai jamais embrassé deux personnes le même jour.",
    "Je n'ai jamais eu un coup de cœur pour le/la partenaire d'un(e) ami(e).",
    "Je n'ai jamais eu un plan cul qui s'est transformé en relation.",
  ],
  hot: [
    "Je n'ai jamais eu une aventure d'un soir dont je ne me souviens pas vraiment.",
    "Je n'ai jamais participé à un jeu coquin en soirée.",
    "Je n'ai jamais fait quelque chose de très intime dans un lieu public.",
    "Je n'ai jamais regardé du contenu 18+ avec quelqu'un d'autre.",
    "Je n'ai jamais eu une relation purement physique sans sentiments.",
    "Je n'ai jamais envoyé une photo très osée que je regrette.",
    "Je n'ai jamais eu des fantasmes sur quelqu'un de totalement inattendu.",
    "Je n'ai jamais fait un strip poker ou un jeu similaire.",
    "Je n'ai jamais eu une relation secrète que personne ne connaissait.",
    "Je n'ai jamais trompé quelqu'un.",
    "Je n'ai jamais été attiré(e) par plusieurs personnes en même temps.",
  ],
  hardcore: [
    "Je n'ai jamais fait un truc vraiment dangereux pour épater quelqu'un.",
    "Je n'ai jamais menti à mes parents sur quelque chose de grave.",
    "Je n'ai jamais passé une nuit en garde à vue.",
    "Je n'ai jamais participé à une bagarre.",
    "Je n'ai jamais eu une crise de panique en public.",
    "Je n'ai jamais fait une connerie qui aurait pu me coûter très cher.",
    "Je n'ai jamais trahit la confiance d'un(e) ami(e) proche.",
    "Je n'ai jamais menti sur quelque chose de vraiment important.",
    "Je n'ai jamais eu envie de tout plaquer et disparaître.",
    "Je n'ai jamais fait semblant d'être quelqu'un d'autre en ligne.",
    "Je n'ai jamais fait quelque chose dont j'ai vraiment honte.",
  ],
  gross: [
    "Je n'ai jamais vomi en public à cause de l'alcool.",
    "Je n'ai jamais fait pipi dans une piscine (en étant adulte).",
    "Je n'ai jamais senti mes pieds devant d'autres personnes.",
    "Je n'ai jamais gardé le même vêtement plusieurs jours d'affilée.",
    "Je n'ai jamais mangé quelque chose qui était périmé depuis longtemps.",
    "Je n'ai jamais oublié de me brosser les dents pendant 2 jours.",
    "Je n'ai jamais eu un accident embarrassant aux toilettes.",
    "Je n'ai jamais recraché de la nourriture en public.",
    "Je n'ai jamais eu une hygiène douteuse pendant un voyage.",
    "Je n'ai jamais mangé directement dans une poubelle (type restes).",
  ],
  illicit: [
    "Je n'ai jamais conduit sans permis.",
    "Je n'ai jamais volé quelque chose dans un magasin.",
    "Je n'ai jamais utilisé une fausse identité.",
    "Je n'ai jamais fait quelque chose d'illégal que personne n'a découvert.",
    "Je n'ai jamais fraudé dans les transports en commun.",
    "Je n'ai jamais pénétré dans un lieu interdit.",
    "Je n'ai jamais vandalisé quelque chose.",
    "Je n'ai jamais consommé une substance interdite.",
    "Je n'ai jamais menti sur un document officiel.",
    "Je n'ai jamais téléchargé illégalement des films ou séries.",
  ],
  travel: [
    "Je n'ai jamais raté mon vol à cause d'une erreur de ma part.",
    "Je n'ai jamais dormi dans un aéroport.",
    "Je n'ai jamais perdu mes bagages en voyage.",
    "Je n'ai jamais voyagé sans réservation d'hébergement.",
    "Je n'ai jamais visité plus de 5 pays.",
    "Je n'ai jamais fait du stop.",
    "Je n'ai jamais dormi à la belle étoile dans un pays étranger.",
    "Je n'ai jamais eu une intoxication alimentaire en voyage.",
    "Je n'ai jamais visité un continent autre que l'Europe.",
    "Je n'ai jamais fait un voyage complètement improvisé.",
    "Je n'ai jamais pris l'avion en première classe.",
  ],
  work_school: [
    "Je n'ai jamais séché un cours ou une journée de travail sans raison.",
    "Je n'ai jamais copié sur quelqu'un lors d'un examen.",
    "Je n'ai jamais eu un crush sur un(e) prof ou collègue.",
    "Je n'ai jamais menti sur mon CV.",
    "Je n'ai jamais envoyé un email embarrassant par erreur au travail.",
    "Je n'ai jamais dormi pendant un cours ou une réunion.",
    "Je n'ai jamais fait un travail de groupe en ne faisant rien.",
    "Je n'ai jamais été viré(e) ou renvoyé(e).",
    "Je n'ai jamais pleuré au travail ou à l'école.",
    "Je n'ai jamais volé quelque chose au bureau.",
  ],
  online: [
    "Je n'ai jamais stalké mon ex sur les réseaux sociaux.",
    "Je n'ai jamais créé un faux profil en ligne.",
    "Je n'ai jamais ghosté quelqu'un après plusieurs rendez-vous.",
    "Je n'ai jamais envoyé un message privé à quelqu'un que je ne connaissais pas.",
    "Je n'ai jamais supprimé un post à cause des commentaires.",
    "Je n'ai jamais été bloqué(e) par quelqu'un sur les réseaux.",
    "Je n'ai jamais menti sur ma vie en ligne pour paraître mieux.",
    "Je n'ai jamais acheté des followers ou des likes.",
    "Je n'ai jamais passé plus de 5 heures d'affilée sur les réseaux sociaux.",
    "Je n'ai jamais eu une dispute uniquement par messages.",
  ],
  couple: [
    "Je n'ai jamais dit 'je t'aime' sans le penser vraiment.",
    "Je n'ai jamais eu une relation à distance.",
    "Je n'ai jamais espionné le téléphone de mon/ma partenaire.",
    "Je n'ai jamais menti à mon/ma partenaire sur où j'étais.",
    "Je n'ai jamais été en couple avec deux personnes en même temps.",
    "Je n'ai jamais oublié un anniversaire de couple.",
    "Je n'ai jamais fait semblant d'apprécier un(e) ami(e) de mon/ma partenaire.",
    "Je n'ai jamais rompu par message.",
    "Je n'ai jamais eu envie de rompre mais ne pas avoir osé.",
    "Je n'ai jamais eu une relation qui a duré moins d'une semaine.",
    "Je n'ai jamais été jaloux(se) au point de faire quelque chose de fou.",
  ],
};

const ALL_CATEGORIES: NhiCategoryId[] = [
  "basic",
  "spicy",
  "hot",
  "hardcore",
  "gross",
  "illicit",
  "travel",
  "work_school",
  "online",
  "couple",
];

const CATEGORY_META: { id: NhiCategoryId; label: string; accent: string }[] = [
  { id: "basic", label: "Basic 🍺", accent: "from-sky-500 to-cyan-500" },
  { id: "spicy", label: "Spicy 🔥", accent: "from-pink-500 to-rose-500" },
  { id: "hot", label: "Hot 18+ 💋", accent: "from-fuchsia-500 to-rose-500" },
  {
    id: "hardcore",
    label: "Hardcore 🤯",
    accent: "from-violet-500 to-indigo-500",
  },
  { id: "gross", label: "Trash 🤢", accent: "from-lime-500 to-emerald-500" },
  { id: "illicit", label: "Illicit 🚫", accent: "from-red-500 to-orange-500" },
  { id: "travel", label: "Travel ✈️", accent: "from-emerald-500 to-teal-500" },
  {
    id: "work_school",
    label: "Work/School 📚",
    accent: "from-amber-500 to-orange-500",
  },
  { id: "online", label: "Online 💻", accent: "from-blue-500 to-sky-500" },
  { id: "couple", label: "Couple 💞", accent: "from-rose-500 to-pink-500" },
];

type DeckCard =
  | { type: "prompt"; category: NhiCategoryId; text: string }
  | { type: "blank"; id: string };

function buildDeck(
  categories: NhiCategoryId[],
  includeBlanks: boolean
): DeckCard[] {
  const cards: DeckCard[] = [];

  categories.forEach((cat) => {
    const prompts = PROMPTS_BY_CATEGORY[cat] ?? [];
    prompts.forEach((text) => cards.push({ type: "prompt", category: cat, text }));
  });

  if (includeBlanks) {
    const BLANK_COUNT = 8;
    for (let i = 0; i < BLANK_COUNT; i++) {
      cards.push({
        type: "blank",
        id: `blank-${i}-${Math.random().toString(16).slice(2)}`,
      });
    }
  }

  return cards.sort(() => Math.random() - 0.5);
}

function getCategoryAccent(category: NhiCategoryId | "custom") {
  switch (category) {
    case "basic":
      return "from-sky-500/10 via-slate-900 to-sky-900/60 border-sky-500/40";
    case "spicy":
      return "from-pink-500/15 via-slate-900 to-rose-900/60 border-pink-500/40";
    case "hot":
      return "from-fuchsia-500/20 via-slate-900 to-rose-900/70 border-fuchsia-400/50";
    case "hardcore":
      return "from-violet-500/20 via-slate-900 to-indigo-900/70 border-violet-400/50";
    case "gross":
      return "from-lime-500/15 via-slate-900 to-emerald-900/60 border-lime-400/50";
    case "illicit":
      return "from-red-500/20 via-slate-900 to-orange-900/70 border-red-400/50";
    case "travel":
      return "from-emerald-500/15 via-slate-900 to-teal-900/60 border-emerald-400/50";
    case "work_school":
      return "from-amber-500/15 via-slate-900 to-orange-900/60 border-amber-400/50";
    case "online":
      return "from-blue-500/15 via-slate-900 to-sky-900/60 border-blue-400/50";
    case "couple":
      return "from-rose-500/20 via-slate-900 to-pink-900/70 border-rose-400/50";
    default:
      return "from-slate-700/20 via-slate-900 to-slate-900 border-slate-500/40";
  }
}

export default function NeverHaveIEverPage() {
  const [selectedCategories, setSelectedCategories] = useState<NhiCategoryId[]>([
    "basic",
  ]);
  const [includeCustomBlanks, setIncludeCustomBlanks] = useState(false);
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [cursor, setCursor] = useState(0);
  const [history, setHistory] = useState<
    { text: string; category: NhiCategoryId | "custom" }[]
  >([]);

  const [isBlankModalOpen, setIsBlankModalOpen] = useState(false);
  const [blankDraft, setBlankDraft] = useState("");
  const [overridePrompt, setOverridePrompt] = useState<string | null>(null);

  // Rebuild deck when categories or blanks change
  useEffect(() => {
    const newDeck = buildDeck(selectedCategories, includeCustomBlanks);
    setDeck(newDeck);
    setCursor(0);
    setHistory([]);
    setOverridePrompt(null);
  }, [selectedCategories, includeCustomBlanks]);

  // Open blank modal when hitting a blank card
  useEffect(() => {
    const card = deck[cursor];
    if (card && card.type === "blank" && !overridePrompt) {
      setBlankDraft("");
      setIsBlankModalOpen(true);
    }
  }, [deck, cursor, overridePrompt]);

  const currentCard = deck[cursor];
  let currentPromptText: string | null = null;
  let categoryForStyle: NhiCategoryId | "custom" = "custom";

  if (currentCard) {
    if (currentCard.type === "prompt") {
      currentPromptText = currentCard.text;
      categoryForStyle = currentCard.category;
    } else if (currentCard.type === "blank") {
      currentPromptText = overridePrompt;
      categoryForStyle = "custom";
    }
  }

  function handleToggleCategory(id: NhiCategoryId) {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((c) => c !== id);
        return next.length === 0 ? ["basic"] : next;
      } else {
        return [...prev, id];
      }
    });
  }

  function handleToggleAll() {
    setSelectedCategories((prev) =>
      prev.length === ALL_CATEGORIES.length ? ["basic"] : ALL_CATEGORIES
    );
  }

  function nextPrompt() {
    if (currentCard && currentPromptText) {
      setHistory((prev) => {
        const next = [{ text: currentPromptText, category: categoryForStyle }, ...prev];
        return next.slice(0, 8);
      });
    }

    if (cursor < deck.length - 1) {
      setCursor((c) => c + 1);
      setOverridePrompt(null);
    } else {
      // Deck terminé -> rebuild
      const newDeck = buildDeck(selectedCategories, includeCustomBlanks);
      setDeck(newDeck);
      setCursor(0);
      setHistory([]);
      setOverridePrompt(null);
    }
  }

  function resetDeck() {
    const newDeck = buildDeck(selectedCategories, includeCustomBlanks);
    setDeck(newDeck);
    setCursor(0);
    setHistory([]);
    setOverridePrompt(null);
  }

  const accentClasses = getCategoryAccent(categoryForStyle);

  return (
    <FadeIn>
      <div className="px-4 md:px-0" style={{ marginBottom: "1rem" }}>
        <H1>Never Have I Ever</H1>
        <Sub>
          Version mobile du classique « Je n'ai jamais ». Lis la phrase. Si tu l'as
          déjà fait, bois.
        </Sub>
      </div>

      <div className="px-4 md:px-0">
        {/* Theme selector */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={handleToggleAll}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              selectedCategories.length === ALL_CATEGORIES.length
                ? "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-100 shadow-lg shadow-fuchsia-500/30"
                : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-400"
            }`}
          >
            All mix 🎲
          </button>

          {CATEGORY_META.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => handleToggleCategory(cat.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? `border-transparent bg-gradient-to-r ${cat.accent} text-white shadow-lg shadow-black/30`
                    : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-400"
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          <button
            onClick={() => setIncludeCustomBlanks((v) => !v)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              includeCustomBlanks
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-lg shadow-emerald-500/30"
                : "border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-400"
            }`}
          >
            Free theme ✏️
          </button>
        </div>

        <Card>
          <div className="text-center">
            {/* Premium card */}
            <motion.div
              key={cursor}
              initial={{ opacity: 0, scale: 0.95, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative mx-auto mb-6 max-w-md rounded-[32px] border-2 bg-gradient-to-br ${accentClasses} p-6 shadow-2xl shadow-black/40`}
            >
              <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
                  PHRASE
                </span>
                <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] text-slate-200">
                  {categoryForStyle === "custom"
                    ? "Free theme ✏️"
                    : CATEGORY_META.find((c) => c.id === categoryForStyle)?.label ??
                      ""}
                </span>
              </div>

              <div className="mt-4 flex min-h-[96px] items-center justify-center px-2 text-center text-lg font-medium leading-relaxed text-slate-50">
                {currentPromptText ??
                  'Clique sur "Nouvelle phrase" pour commencer.'}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Si tu l'as déjà fait, tu bois. 🍻
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={nextPrompt}
                disabled={!currentPromptText}
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/40 disabled:cursor-not-allowed disabled:opacity-50"
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

            <div className="mt-6 text-xs text-slate-500">
              Phrase {cursor + 1} / {deck.length}
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-8 border-t border-white/5 pt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                HISTORIQUE RÉCENT
              </div>
              <div className="flex flex-col gap-2">
                {history.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2"
                  >
                    <div className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">
                      {item.category === "custom"
                        ? "Free theme ✏️"
                        : CATEGORY_META.find((c) => c.id === item.category)
                            ?.label ?? ""}
                    </div>
                    <div className="text-xs text-slate-300">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Blank card modal */}
      <BlankCardModal
        isOpen={isBlankModalOpen}
        onClose={() => {
          setIsBlankModalOpen(false);
        }}
        value={blankDraft}
        onChange={setBlankDraft}
        onConfirm={() => {
          const text = blankDraft.trim();
          if (!text) return;
          setOverridePrompt(text);
          setIsBlankModalOpen(false);
        }}
      />
    </FadeIn>
  );
}

function BlankCardModal({
  isOpen,
  onClose,
  value,
  onChange,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl">
        <h2 className="mb-1 text-lg font-semibold text-slate-50">
          Carte blanche ✏️
        </h2>
        <p className="mb-3 text-sm text-slate-300">
          Invente ton propre "Never have I ever". Si quelqu'un l'a déjà fait, il boit.
        </p>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder="Exemple : Je n'ai jamais..."
          className="mb-3 w-full rounded-xl border border-slate-600/70 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/60"
        />
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-slate-200"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={!value.trim()}
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
