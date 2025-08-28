// import React from 'react'

// const Hero3DIMLI = () => {
//   return (
//     <>

//     </>
//   )
// }

// export default Hero3DIMLI
// Hero3DIMLI.tsx
// A pixel-conscious recreation of the 3DIMLI hero section using Next.js-friendly React + Tailwind + Framer Motion.
// Drop this file into a Next.js app (App Router), e.g., app/page.tsx or components/Hero3DIMLI.tsx and import it.
// Notes:
// - Uses semantic HTML, keyboard-accessible nav, and motion reduced for prefers-reduced-motion.
// - Animations via Framer Motion; gentle fade/slide with stagger to match calm product vibe.
// - Tailwind utility tokens are tuned to closely match the reference spacing, sizes, and radii.
// - The background grid + radial glow emulate the site's subtle depth without heavy images.

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Upload, ShoppingCart, User, Compass } from 'lucide-react'

// -----------------------------
// Design tokens (keep tweaks centralized for quick adjustments)
// -----------------------------
const TOKENS = {
  maxW: 'max-w-[1200px]', // hero container width (close to reference)
  padX: 'px-6 md:px-10',
  heroTopPad: 'pt-28 md:pt-36',
  heroBotPad: 'pb-16 md:pb-24',
  heading: 'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight',
  sub: 'text-base md:text-lg text-neutral-300',
  badgeTitle: 'text-sm font-semibold text-white',
  badgeText: 'text-xs text-neutral-300',
}

// -----------------------------
// Utility: focus outline helper
// -----------------------------
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-black rounded-xl'

// -----------------------------
// Navbar
// -----------------------------
function Navbar() {
  const [open, setOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Explore', href: '#explore' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <nav aria-label="Primary" className={`${TOKENS.maxW} ${TOKENS.padX} mx-auto h-16 md:h-20 flex items-center justify-between`}>
        <a href="#home" className={`flex items-center gap-2 ${focusRing}`}>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white text-black text-[10px] font-black">3D</span>
          <span className="text-white font-semibold">3DIMLI</span>
          <span aria-label="beta badge" className="ml-2 rounded-md border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/80">Beta 1.0.1</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-7 text-sm text-white/80">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={`transition hover:text-white ${focusRing}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#upload" className={`group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white text-black px-4 py-2 text-sm font-semibold leading-none transition active:scale-[.98] ${focusRing}`}>
              <Upload className="h-4 w-4" aria-hidden="true" />
              Upload
            </a>
            <a href="#cart" className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10 ${focusRing}`} aria-label="Cart">
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#profile" className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10 ${focusRing}`} aria-label="Profile">
              <User className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/15 text-white/90 ${focusRing}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="i-bar block h-[2px] w-5 bg-white" />
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="absolute right-0 top-0 h-full w-72 bg-neutral-950 border-l border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-semibold">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className={`h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/15 text-white/80 ${focusRing}`}>
                  ✕
                </button>
              </div>
              <ul className="space-y-3 text-white/90">
                {navItems.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className={`block rounded-lg px-3 py-2 hover:bg-white/5 ${focusRing}`} onClick={() => setOpen(false)}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <a href="#explore" className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold px-4 py-2 ${focusRing}`}>
                  <Compass className="h-4 w-4" /> Explore
                </a>
                <a href="#upload" className={`inline-flex items-center justify-center rounded-xl border border-white/15 text-white font-medium px-4 py-2 hover:bg-white/5 ${focusRing}`}>Upload</a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// -----------------------------
// Hero
// -----------------------------
function StatBadge({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className={TOKENS.badgeTitle}>{title}</div>
      <p className={TOKENS.badgeText}>{text}</p>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero3DIMLI() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <main id="home" className="relative min-h-screen bg-black text-white">
      {/* Decorative background: grid + radial spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(120,119,198,0.25),transparent_60%),radial-gradient(40%_30%_at_80%_10%,rgba(56,189,248,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,transparent_95%,rgba(255,255,255,0.05)_95%),linear-gradient(to_bottom,transparent,transparent_95%,rgba(255,255,255,0.05)_95%)] bg-[size:24px_24px] opacity-[0.25]" />
      </div>

      <Navbar />

      {/* Hero content */}
      <section className={`${TOKENS.maxW} ${TOKENS.padX} ${TOKENS.heroTopPad} ${TOKENS.heroBotPad} mx-auto relative z-10`}
        aria-labelledby="hero-title"
      >
        <motion.div
          initial="hidden"
          animate={prefersReducedMotion ? 'show' : 'show'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1 id="hero-title" className={`${TOKENS.heading}`}
            // variants={fadeUp}
          >
            Your one‑stop digital platform for{' '}
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">3D models</span>
            {' '}and digital creations.
          </motion.h1>

          <motion.p className={`${TOKENS.sub} mt-5 leading-relaxed`} 
          //variants={fadeUp}
          >
            Join our community of creators and collectors today.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" 
          // variants={fadeUp}
          >
            <a
              href="#explore"
              className={`inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition active:scale-[.98] ${focusRing}`}
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore all products
            </a>
          </motion.div>
        </motion.div>

        {/* Secondary headline area ("Meet 3DIMLI" + blurb) */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <motion.p className="text-xs uppercase tracking-[0.2em] text-white/60" 
          //variants={fadeUp}
          >Meet 3DIMLI</motion.p>
          <motion.h2 className="mt-3 text-2xl md:text-3xl font-bold" 
          //variants={fadeUp}
          >
            Your <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">All‑in‑one</span> Digital Commerce Platform
          </motion.h2>
          <motion.p className="mt-4 text-sm md:text-base text-neutral-300 leading-relaxed" 
          //variants={fadeUp}
          >
            Sell 3D Models, E‑books, and digital products effortlessly. Manage your store, deliver products seamlessly, and reach a global audience.
          </motion.p>
          <motion.div className="mt-8" 
          //variants={fadeUp}
          >
            <a href="#start" className={`inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 ${focusRing}`}>
              Start Selling Now
            </a>
          </motion.div>
        </div>

        {/* Feature badges (Global / Earnings / Support) */}
        <motion.div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06 } },
          }}
        >
          <motion.div 
          //variants={fadeUp}
          ><StatBadge title="Global" text="For creators worldwide." /></motion.div>
          <motion.div 
          //variants={fadeUp}
          ><StatBadge title="Earnings" text="Keep 100% of what you earn." /></motion.div>
          <motion.div 
          //variants={fadeUp}
          ><StatBadge title="Support" text="We've got your back." /></motion.div>
        </motion.div>
      </section>
    </main>
  )
}

// -----------------------------
// Tailwind setup reminders (not executed here):
// 1) tailwind.config.ts -> content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"]
// 2) globals.css -> @tailwind base; @tailwind components; @tailwind utilities;
// 3) Add <html className="bg-black"> to maintain correct backdrop color.
// 4) Install: npm i tailwindcss framer-motion lucide-react
// 5) Accessibility: prefers-reduced-motion respected; focus rings visible; semantic roles provided.
