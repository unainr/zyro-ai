"use client";
import { CheckCircle2, Star } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "2,400+", label: "Generated UI drafts" },
  { value: "800+", label: "Builder sessions" },
  { value: "< 10s", label: "Typical first draft" },
  { value: "10", label: "Free generations" },
];

const testimonials = [
  {
    name: "Alex M.",
    role: "Frontend developer",
    avatar: "AM",
    color: "from-cyan-500 to-blue-500",
    quote:
      "I use Zyro when a feature is still fuzzy. Sketching first keeps the layout honest, then the generated React gives me a strong starting point.",
  },
  {
    name: "Sara K.",
    role: "Indie hacker",
    avatar: "SK",
    color: "from-violet-500 to-purple-500",
    quote:
      "The useful part is the speed of the loop. I can test three landing page directions before I would normally finish the first hand-coded version.",
  },
  {
    name: "James T.",
    role: "Product designer",
    avatar: "JT",
    color: "from-emerald-500 to-teal-500",
    quote:
      "It makes handoff easier because the team can review a live interface, not just a static board. That changed how quickly we make decisions.",
  },
];

const proofPoints = [
  "Built for wireframes, screenshots, and plain-language prompts",
  "Useful for solo builders, designers, and frontend teams",
  "Designed around editable code instead of locked-in mockups",
];

const starKeys = ["one", "two", "three", "four", "five"];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-100 w-200 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-cyan-500/5 via-violet-500/5 to-blue-500/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 grid grid-cols-2 gap-4 md:mb-24 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/3 p-6 text-center"
            >
              <p className="mb-1 text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-white/42">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] text-emerald-400 uppercase mb-4">
            Social proof
          </span>
          <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            Made for builders who need
            <span className="block bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              momentum, not ceremony
            </span>
          </h2>
          <p className="text-lg leading-8 text-white/48">
            Early users lean on Zyro when they need to explore faster, hand off
            clearer, and get code into the conversation earlier.
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {proofPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm text-white/58"
            >
              <CheckCircle2 className="size-4 shrink-0 text-emerald-300" />
              {point}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-white/10 bg-white/3 p-7 transition-all duration-300 hover:border-white/20"
            >
              <div className="flex gap-1 mb-5">
                {starKeys.map((star) => (
                  <Star
                    key={star}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-7 text-white/68">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br ${t.color} text-xs font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/32">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
