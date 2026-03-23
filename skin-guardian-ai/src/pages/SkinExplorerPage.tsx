import { useState } from "react";
import { motion } from "framer-motion";

interface SkinLayer {
  name: string;
  color: string;
  y: number;
  height: number;
}

interface LesionInfo {
  name: string;
  layer: string;
  description: string;
  riskNotes: string;
  markerY: number;
  color: string;
}

const layers: SkinLayer[] = [
  { name: "Epidermis", color: "hsl(30, 60%, 80%)", y: 0, height: 80 },
  { name: "Dermis", color: "hsl(15, 50%, 70%)", y: 80, height: 140 },
  { name: "Subcutis", color: "hsl(40, 40%, 85%)", y: 220, height: 80 },
];

const lesions: LesionInfo[] = [
  {
    name: "Melanoma",
    layer: "Epidermis",
    description:
      "Melanoma develops in melanocytes at the basal layer of the epidermis. It's the most dangerous skin cancer due to its ability to metastasize.",
    riskNotes: "Look for asymmetry, border irregularity, color variation, diameter >6mm, and evolution (ABCDE rule).",
    markerY: 50,
    color: "#dc2626",
  },
  {
    name: "Basal Cell Carcinoma",
    layer: "Epidermis / Dermis",
    description:
      "BCC originates from basal cells at the junction of epidermis and dermis. Most common skin cancer. Rarely metastasizes but can cause local tissue damage.",
    riskNotes: "Pearly or waxy bumps, flat flesh-colored lesions, bleeding or scabbing sores that heal and recur.",
    markerY: 80,
    color: "#f59e0b",
  },
  {
    name: "Squamous Cell Carcinoma",
    layer: "Epidermis",
    description:
      "SCC arises from squamous cells in the upper epidermis. Second most common skin cancer. Can spread if neglected.",
    riskNotes: "Firm red nodules, flat lesions with scaly/crusted surfaces, typically on sun-exposed areas.",
    markerY: 30,
    color: "#22c55e",
  },
];

export default function SkinExplorerPage() {
  const [selected, setSelected] = useState<LesionInfo | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating blobs */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-orange w-[400px] h-[400px] -top-10 right-[5%]"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-green w-[300px] h-[300px] bottom-10 -left-10"
      />

      <div className="container relative z-10 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold text-accent tracking-widest uppercase">Education</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">3D Skin Layer Explorer</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Explore where common skin cancers typically arise in the skin layers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: lesion list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h2 className="font-display font-bold text-lg mb-4">Select a Lesion Type</h2>
            {lesions.map((l, i) => (
              <motion.button
                key={l.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelected(l)}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${
                  selected?.name === l.name
                    ? "border-primary shadow-elevated bg-primary/5"
                    : "bg-card shadow-card hover:border-primary/50 hover:shadow-elevated"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: l.color }} />
                  <span className="font-display font-bold text-lg">{l.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 ml-8">{l.layer}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Right: skin cross-section visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border bg-card p-8 shadow-card">
              <h3 className="font-display font-bold text-sm mb-6 text-center tracking-widest uppercase text-muted-foreground">
                Skin Cross-Section
              </h3>
              <svg viewBox="0 0 400 320" className="w-full">
                {layers.map((layer) => (
                  <g key={layer.name}>
                    <rect
                      x="50"
                      y={layer.y + 10}
                      width="300"
                      height={layer.height}
                      fill={layer.color}
                      rx="8"
                      stroke="hsl(30, 20%, 60%)"
                      strokeWidth="1"
                    />
                    <text x="60" y={layer.y + 30} fontSize="12" fontWeight="600" fill="hsl(30, 30%, 30%)">
                      {layer.name}
                    </text>
                  </g>
                ))}
                {selected && (
                  <motion.g
                    key={selected.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <circle cx="250" cy={selected.markerY + 10} r="16" fill={selected.color} opacity="0.3" />
                    <circle cx="250" cy={selected.markerY + 10} r="8" fill={selected.color} />
                    <line x1="266" y1={selected.markerY + 10} x2="340" y2={selected.markerY + 10} stroke={selected.color} strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="342" y={selected.markerY + 14} fontSize="10" fill={selected.color} fontWeight="600">
                      {selected.name.split(" ")[0]}
                    </text>
                  </motion.g>
                )}
              </svg>
            </div>

            {/* Detail panel */}
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border bg-card p-8 shadow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selected.color }} />
                  <h3 className="font-display font-bold text-xl">{selected.name}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{selected.description}</p>
                <div className="rounded-xl bg-secondary p-4">
                  <p className="text-xs font-bold mb-1.5 tracking-widest uppercase text-muted-foreground">Risk Indicators</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.riskNotes}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
