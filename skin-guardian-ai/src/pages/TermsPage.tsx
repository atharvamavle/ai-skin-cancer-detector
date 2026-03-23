import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance",
    content: "By using DermaGuard AI, you acknowledge that this is a research prototype and not a certified medical device.",
  },
  {
    title: "2. No Medical Advice",
    content: "DermaGuard AI does not provide medical advice, diagnosis, or treatment. Results are for informational purposes only. Always consult a qualified healthcare professional.",
  },
  {
    title: "3. Limitation of Liability",
    content: "We are not liable for any decisions made based on the tool's output. Use at your own risk.",
  },
  {
    title: "4. Changes",
    content: "We may update these terms at any time. Continued use constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-orange w-[350px] h-[350px] -top-10 right-[15%]"
      />

      <div className="container relative z-10 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold text-accent tracking-widest uppercase">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="rounded-2xl border bg-card p-6 shadow-card"
            >
              <h2 className="font-display font-bold text-lg mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground/60 mt-8 text-center"
        >
          [This is a placeholder terms page for a research prototype. Replace with real legal text before any public deployment.]
        </motion.p>
      </div>
    </div>
  );
}
