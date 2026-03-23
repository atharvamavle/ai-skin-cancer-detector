import DisclaimerBox from "@/components/DisclaimerBox";
import { motion } from "framer-motion";
import { Users, Target, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", desc: "Leveraging deep learning for accurate lesion classification and early risk detection." },
  { icon: Users, title: "Accessibility", desc: "Making AI-assisted screening available to anyone with a browser." },
  { icon: Heart, title: "Care", desc: "Supporting early detection to save lives through technology." },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating blobs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-green w-[450px] h-[450px] -top-20 right-[5%]"
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-purple w-[300px] h-[300px] bottom-40 -left-10"
      />

      <div className="container relative z-10 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">About</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">About DermaGuard AI</h1>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border bg-card p-8 md:p-10 shadow-card mb-8"
          >
            <div className="space-y-5 text-muted-foreground leading-relaxed">
  <p>
    DermaGuard AI is an <strong className="text-foreground">advanced computer vision research project</strong> developed to demonstrate the application of [EfficientNet-B4, a state-of-the-art CNN (Convolutional Neural Network)] in healthcare.
  </p>
  <p>
    Trained on comprehensive public datasets like HAM10000 and the ISIC Archive, the model is optimized to identify and classify three primary skin lesions: melanoma, basal cell carcinoma (BCC), and squamous cell carcinoma (SCC).
  </p>
  <p>
    While internal validation demonstrates a 90–95% accuracy across these target classes, this application is strictly a proof-of-concept. Inspired by clinical tools like DermaSensor, DermaGuard AI is <strong className="text-foreground">not a TGA-approved medical device</strong>, has not undergone clinical trials, and <strong className="text-foreground">must never substitute professional medical diagnosis</strong>.
  </p>
</div>

          </motion.div>

          {/* Values */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl font-bold mb-6"
          >
            Our Mission
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-muted-foreground leading-relaxed mb-8 text-lg"
          >
            We believe AI can play a supportive role in early skin cancer screening, especially in
            underserved areas with limited access to dermatologists.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border bg-card p-6 shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          <DisclaimerBox />
        </div>
      </div>
    </div>
  );
}
