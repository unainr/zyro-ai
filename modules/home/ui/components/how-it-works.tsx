"use client";
import { ArrowRight, Code2, Eye, ImageUp, PencilLine } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: PencilLine,
    step: "01",
    title: "Sketch the screen",
    desc: "Start with boxes, labels, flows, and annotations on an infinite Excalidraw canvas.",
  },
  {
    icon: ImageUp,
    step: "02",
    title: "Send it to Zyro",
    desc: "Export the board or upload a screenshot so the AI has visual context, not just a prompt.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Generate UI code",
    desc: "Get React and Tailwind components with sensible layout, spacing, and responsive structure.",
  },
  {
    icon: Eye,
    step: "04",
    title: "Preview and refine",
    desc: "Inspect the result beside the code, then iterate with another sketch or instruction.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-6 py-28 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] text-cyan-400 uppercase mb-4">
            Workflow
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            From messy sketch
            <span className="block bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              to usable interface
            </span>
          </h2>
          <p className="text-white/48 text-lg leading-8">
            Zyro keeps the loop short: rough out the idea, generate the UI,
            preview the result, and keep improving it without rebuilding from
            scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="relative h-full rounded-xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/5">
                <div className="absolute inset-0 rounded-xl bg-linear-to-b from-cyan-500/0 to-cyan-500/0 transition-all duration-300 group-hover:from-cyan-500/5 group-hover:to-transparent" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-500/20 bg-linear-to-br from-cyan-500/20 to-blue-500/20">
                      <step.icon className="size-5 text-cyan-400" />
                    </div>
                    <span className="text-3xl font-bold text-white/6 transition-all group-hover:text-white/12">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-white/45">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/55 md:flex-row"
        >
          <span>
            Best for dashboards, SaaS screens, landing sections, forms, and
            product prototypes.
          </span>
          <span className="inline-flex items-center gap-2 text-cyan-300">
            Iterate in minutes
            <ArrowRight className="size-4" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
