import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Brain, Stethoscope, ShieldCheck, Globe, Zap, ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DisclaimerBox from "@/components/DisclaimerBox";

const steps = [
  { icon: Camera, title: "Capture", desc: "Upload a close-up photo of the skin lesion or use your webcam.", color: "from-primary to-accent" },
  { icon: Brain, title: "AI Analysis", desc: "Our advanced AI instantly scans your photo to detect and classify potential skin risks.", color: "from-accent to-[hsl(25,95%,55%)]" },
  { icon: Stethoscope, title: "Discuss with Doctor", desc: "Review AI insights and consult a qualified dermatologist.", color: "from-[hsl(25,95%,55%)] to-primary" },
];

const features = [
  { icon: ShieldCheck, title: "Early Detection", desc: "Catch potential issues early when treatment is most effective.", stat: "95%", statLabel: "Detection Rate" },
  { icon: Globe, title: "Accessible Anywhere", desc: "Screen from your browser — no special hardware needed.", stat: "180+", statLabel: "Countries" },
  { icon: Zap, title: "Real-time Analysis", desc: "Get instant AI-powered insights on skin lesion images.", stat: "<3s", statLabel: "Analysis Time" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Index() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Gradient blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="gradient-blob gradient-blob-green w-[500px] h-[500px] -top-20 right-[10%]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="gradient-blob gradient-blob-purple w-[350px] h-[350px] top-[40%] -left-[5%]"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="gradient-blob gradient-blob-orange w-[250px] h-[250px] bottom-[10%] right-[25%]"
        />

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Research Prototype
            </motion.span>

            <h1 className="font-display text-massive mb-8">
              Real-time AI assistant{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                for skin lesion
              </span>{" "}
              screening.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Check your skin health in seconds. Simply upload a photo or use your live camera, and our advanced AI will instantly highlight suspicious spots and assess your risk for three major skin cancers
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/scan">
                <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-full shadow-glow">
                  Start a Free Scan
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-full border-2">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-semibold text-primary tracking-widest uppercase">
              Process
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold mt-3">
              How It Works
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl border bg-card p-8 shadow-card overflow-hidden"
              >
                {/* Hover gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                    Step {i + 1}
                  </span>
                  <h3 className="font-display font-bold text-xl mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24 relative">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="gradient-blob gradient-blob-green w-[400px] h-[400px] top-0 right-0"
        />

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-semibold text-accent tracking-widest uppercase">
              Impact
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl md:text-5xl font-bold mt-3">
              Why It Matters
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group rounded-2xl border bg-card p-8 shadow-card hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <f.icon className="h-8 w-8 text-primary" />
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {f.stat}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl gradient-hero p-12 md:p-20 text-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full border border-primary-foreground/20"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-primary-foreground/10"
            />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Screen?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
                Upload a photo and get AI-powered insights in seconds. Free, private, and instant.
              </p>
              <Link to="/scan">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-10 py-6 text-base font-bold shadow-elevated"
                >
                  Start a Free Scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container max-w-2xl">
          <DisclaimerBox />
        </div>
      </section>
    </div>
  );
}
