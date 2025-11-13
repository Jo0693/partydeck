"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const games = [
  {
    href: "/kings-cup",
    title: "King's",
    desc: "Jeu de cartes à boire avec tes propres règles.",
    tag: "Disponible",
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl mx-4 mt-6 mb-12 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-rose-600/20 backdrop-blur-xl border border-white/10"
      >
        {/* Animated blob background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-fuchsia-500/30 to-orange-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-br from-rose-500/20 to-violet-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative px-6 py-12 sm:px-8 sm:py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-violet-100 to-fuchsia-100 bg-clip-text text-transparent leading-tight">
              La salle de jeux dans ta poche
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
              PartyDeck regroupe tes jeux de soirée préférés dans une seule app.
              Un téléphone, tout le monde joue.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200">
                📱 Optimisé mobile
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-200">
                🃏 King's disponible
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200">
                🧪 Early access
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Games Section */}
      <div className="px-4">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Jeux disponibles
          </h2>
          <p className="text-xs text-gray-500">Plus de jeux arrivent bientôt</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {games.map((game) => (
            <motion.div key={game.title} variants={item}>
              {game.active ? (
                <Link href={game.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-violet-500/50 p-6 shadow-2xl hover:shadow-violet-500/20 transition-all duration-300"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl shadow-lg shadow-violet-500/50 group-hover:shadow-violet-500/70 transition-shadow duration-300">
                          {game.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {game.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed mb-3">
                            {game.desc}
                          </p>
                          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 group-hover:text-violet-200 transition-colors">
                            Jouer maintenant
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 whitespace-nowrap">
                        {game.tag}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 p-6 opacity-60">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-3xl grayscale">
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-400 mb-1">
                          {game.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {game.desc}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/50 border border-slate-700/50 text-gray-500 whitespace-nowrap">
                      {game.tag}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 text-center text-sm text-gray-500"
      >
        PartyDeck © 2025 — Drink responsibly 🍻
      </motion.footer>
    </div>
  );
}
