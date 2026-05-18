"use client";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const included = [
  "10 free generations",
  "Unlimited boards",
  "React + Tailwind output",
];

export function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-100 w-175 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.075] to-white/2 p-8 text-center md:p-16"
        >
          <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5"
          >
            <Zap className="size-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-400">
              Free to start. No credit card.
            </span>
          </motion.div>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Turn the next rough idea
            <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              into a working UI
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-8 text-white/48">
            Open the canvas, sketch the screen, and let Zyro produce a
            previewable React interface you can keep shaping.
          </p>

          <div className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {included.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/58"
              >
                <Check className="size-3.5 text-emerald-300" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="primary" size="lg" asChild className="h-12 px-7">
                <Link href="/sign-in">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 border-white/12 bg-white/5 px-7 text-white/72 hover:bg-white/10 hover:text-white"
              >
                <Link href="/pricing">
                  View pricing
                  <Sparkles className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
