import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Data Collection",
    content: "DermaGuard AI processes images locally in your browser or sends them to our analysis API. We do not permanently store uploaded images unless you explicitly save a report.",
  },
  {
    title: "2. Use of Data",
    content: "Any data collected is used solely for the purpose of providing AI-assisted lesion analysis. We do not sell or share personal data with third parties.",
  },
  {
    title: "3. Data Security",
    content: "We implement reasonable security measures to protect transmitted data. However, no system is completely secure, and we cannot guarantee absolute data security.",
  },
  {
    title: "4. Contact",
    content: "For privacy concerns, contact us at privacy@dermaguard.ai.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-purple w-[350px] h-[350px] -top-10 right-[10%]"
      />

      <div className="container relative z-10 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">Privacy Policy</h1>
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
          [This is a placeholder privacy policy for a research prototype. Replace with real legal text before any public deployment.]
        </motion.p>
      </div>
    </div>
  );
}
