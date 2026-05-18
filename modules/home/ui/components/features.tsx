"use client";
import {
  Braces,
  Code,
  Download,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Monitor,
  WandSparkles,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Wireframe-first canvas",
    desc: "Use a familiar Excalidraw-style board for screens, flows, notes, and quick layout exploration.",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    glow: "group-hover:from-violet-500/5",
    large: true,
  },
  {
    icon: Code,
    title: "Clean React output",
    desc: "Generate React components with Tailwind classes that are easy to read, edit, and move into your app.",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    glow: "group-hover:from-cyan-500/5",
    large: false,
  },
  {
    icon: Monitor,
    title: "Live preview",
    desc: "See the generated UI render immediately, so layout problems show up while the idea is still fresh.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "group-hover:from-emerald-500/5",
    large: false,
  },
  {
    icon: ImageIcon,
    title: "Screenshot and sketch input",
    desc: "Upload a screenshot, mockup, or exported board and turn the visual reference into a working interface.",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    glow: "group-hover:from-orange-500/5",
    large: true,
  },
  {
    icon: MessageSquare,
    title: "Prompt to UI",
    desc: "Add plain-English guidance for copy, sections, behavior, and styling without opening another tool.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
    glow: "group-hover:from-pink-500/5",
    large: false,
  },
  {
    icon: Download,
    title: "Export the useful bits",
    desc: "Keep the board as an image, copy the generated code, or use preview to decide what to refine.",
    color: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/20",
    iconColor: "text-sky-400",
    glow: "group-hover:from-sky-500/5",
    large: false,
  },
];

const builderModes = [
  {
    icon: WandSparkles,
    label: "AI generation",
    value: "Prompt, image, or sketch",
  },
  { icon: Braces, label: "Developer handoff", value: "React + Tailwind" },
  { icon: Monitor, label: "Review loop", value: "Preview before copy" },
];

export function Features() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 h-125 w-125 rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] text-violet-400 uppercase mb-4">
            Features
          </span>
          <h2 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            The fastest way to move
            <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              from idea to front end
            </span>
          </h2>
          <p className="text-lg leading-8 text-white/48">
            Zyro combines the early messy part of product thinking with the
            practical developer output you need after the idea starts to work.
          </p>
        </motion.div>

        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {builderModes.map((mode, i) => (
            <motion.div
              key={mode.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/6">
                <mode.icon className="size-4 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{mode.label}</p>
                <p className="text-xs text-white/38">{mode.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`group relative rounded-xl border border-white/10 bg-white/3 p-7 transition-all duration-300 hover:border-white/20 ${f.large ? "md:col-span-2" : ""}`}
            >
              <div
                className={`absolute inset-0 rounded-xl bg-linear-to-br ${f.glow} to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg border bg-linear-to-br ${f.color} ${f.border}`}
                >
                  <f.icon className={`size-5 ${f.iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <p className="text-sm leading-6 text-white/45">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
