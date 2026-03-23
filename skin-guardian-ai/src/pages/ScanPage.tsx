
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Camera, Loader2, Download, BarChart3 } from "lucide-react";
import ConfidenceBar from "@/components/ConfidenceBar";
import DisclaimerBox from "@/components/DisclaimerBox";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import type { YoloDetection, ScanResult } from "@/services/yoloApi";


// --- Backend API types ---
type ApiScores = {
  AK: number;
  BCC: number;
  BKL: number;
  DF: number;
  MEL: number;
  NV: number;
  SCC: number;
  VASC: number;
};

type PredictResponse = {
  scores: ApiScores;
  top_class: string;
  top_score: number;
  risk_level: string; // "high" | "moderate" | "low"
  triage_recommendation: string;
  urgency: string;
};

// Call FastAPI backend
async function callBackend(file: File): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return (await res.json()) as PredictResponse;
}

export default function ScanPage() {
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);

  // helper to convert backend risk string to "Low" | "Moderate" | "High"
  const mapRisk = (risk: string): "Low" | "Moderate" | "High" => {
    if (risk === "high") return "High";
    if (risk === "moderate") return "Moderate";
    return "Low";
  };

  // ==== IMAGE FROM FILE (UPLOAD) – now uses FastAPI ====
  const handleFile = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      setLoading(true);

      try {
        const backend = await callBackend(file);

        const detections: YoloDetection[] = [
          {
            class: "Melanoma",
            confidence: backend.scores.MEL,
            riskLevel: mapRisk(backend.risk_level),
            description: backend.triage_recommendation,
            color: "#dc2626",
            bbox: { x: 120, y: 80, width: 160, height: 140 },
          },
          {
            class: "Basal Cell Carcinoma",
            confidence: backend.scores.BCC,
            riskLevel: "Moderate",
            description: backend.triage_recommendation,
            color: "#f59e0b",
            bbox: { x: 300, y: 200, width: 120, height: 100 },
          },
          {
            class: "Squamous Cell Carcinoma",
            confidence: backend.scores.SCC,
            riskLevel: "Low",
            description: backend.triage_recommendation,
            color: "#22c55e",
            bbox: { x: 50, y: 250, width: 100, height: 90 },
          },
        ];

        const res: ScanResult = {
          timestamp: new Date().toISOString(),
          detections,
          imageUrl: dataUrl,
        };

        setResult(res);
      } catch (err) {
        console.error(err);
        alert("Error calling backend");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // ==== CAMERA MODE (still uses same backend call) ====
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      alert("Unable to access camera.");
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      const dataUrl = canvas.toDataURL("image/jpeg");
      setPreviewUrl(dataUrl);
      setLoading(true);
      (video.srcObject as MediaStream)?.getTracks().forEach((t) => t.stop());
      setStreaming(false);

      try {
        const backend = await callBackend(file);

        const detections: YoloDetection[] = [
          {
            class: "Melanoma",
            confidence: backend.scores.MEL,
            riskLevel: mapRisk(backend.risk_level),
            description: backend.triage_recommendation,
            color: "#dc2626",
            bbox: { x: 120, y: 80, width: 160, height: 140 },
          },
          {
            class: "Basal Cell Carcinoma",
            confidence: backend.scores.BCC,
            riskLevel: "Moderate",
            description: backend.triage_recommendation,
            color: "#f59e0b",
            bbox: { x: 300, y: 200, width: 120, height: 100 },
          },
          {
            class: "Squamous Cell Carcinoma",
            confidence: backend.scores.SCC,
            riskLevel: "Low",
            description: backend.triage_recommendation,
            color: "#22c55e",
            bbox: { x: 50, y: 250, width: 100, height: 90 },
          },
        ];

        const res: ScanResult = {
          timestamp: new Date().toISOString(),
          detections,
          imageUrl: dataUrl,
        };
        setResult(res);
      } catch (err) {
        console.error(err);
        alert("Error calling backend");
      } finally {
        setLoading(false);
      }
    }, "image/jpeg");
  };

  const drawOverlay = (detections: YoloDetection[], imgEl: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = imgEl.naturalWidth;
    canvas.height = imgEl.naturalHeight;
    ctx.drawImage(imgEl, 0, 0);

    // For now we skip drawing boxes; can be added later
  };

  const generatePDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("DermaGuard AI — Scan Report", 20, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${new Date(result.timestamp).toLocaleString()}`, 20, 35);
    doc.setFontSize(12);
    doc.text("Detected Lesions:", 20, 50);
    result.detections.forEach((d, i) => {
      const y = 60 + i * 25;
      doc.setFont("helvetica", "bold");
      doc.text(`${d.class}`, 25, y);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Confidence: ${(d.confidence * 100).toFixed(1)}%  |  Risk: ${d.riskLevel}`,
        25,
        y + 7
      );
      doc.text(d.description.slice(0, 100), 25, y + 14);
    });
    const disclaimerY = 60 + result.detections.length * 25 + 15;
    doc.setTextColor(200, 0, 0);
    doc.setFontSize(9);
    doc.text(
      "DISCLAIMER: This is a research prototype. It cannot diagnose cancer.",
      20,
      disclaimerY
    );
    doc.text(
      "Always consult a qualified healthcare professional.",
      20,
      disclaimerY + 6
    );
    doc.save("dermaguard-report.pdf");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating blobs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-green w-[400px] h-[400px] -top-20 -right-20"
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="gradient-blob gradient-blob-purple w-[300px] h-[300px] bottom-20 -left-20"
      />

      <div className="container relative z-10 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase">
            Analysis
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">
            Skin Lesion Scan
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Upload an image or use your camera for AI-assisted analysis.
          </p>
        </motion.div>

        {/* Agreement gate */}
        {!agreed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg"
          >
            <div className="rounded-2xl border bg-card p-8 shadow-card">
              <DisclaimerBox />
              <label className="flex items-center gap-3 mt-6 cursor-pointer">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(!!v)}
                />
                <span className="text-sm">
                  I understand this is not medical advice and is a research
                  prototype only.
                </span>
              </label>
            </div>
          </motion.div>
        )}

        {agreed && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: image/camera area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3 space-y-4"
            >
              {/* Tabs */}
              <div className="flex gap-2">
                <Button
                  variant={mode === "upload" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setMode("upload")}
                >
                  <Upload className="h-4 w-4 mr-1" /> Upload Photo
                </Button>
                <Button
                  variant={mode === "camera" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setMode("camera")}
                >
                  <Camera className="h-4 w-4 mr-1" /> Live Camera
                </Button>
              </div>

              {mode === "upload" && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all bg-card shadow-card"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Click or drag & drop a close-up photo of the lesion
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Supports JPG, PNG, WEBP
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFile(e.target.files[0])
                    }
                  />
                </motion.div>
              )}

              {mode === "camera" && (
                <div className="space-y-3">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-2xl border bg-card shadow-card"
                  />
                  <div className="flex gap-2">
                    {!streaming && (
                      <Button
                        onClick={startCamera}
                        variant="scan"
                        className="rounded-full"
                      >
                        Start Camera
                      </Button>
                    )}
                    {streaming && (
                      <Button
                        onClick={captureFrame}
                        variant="hero"
                        className="rounded-full"
                      >
                        Capture & Analyze
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Preview with overlay */}
              {previewUrl && (
                <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                  <canvas ref={canvasRef} className="w-full rounded-2xl" />
                  <img
                    src={previewUrl}
                    alt="Scan preview"
                    className={result ? "hidden" : "w-full rounded-2xl"}
                    onLoad={(e) =>
                      result && drawOverlay(result.detections, e.currentTarget)
                    }
                  />
                </div>
              )}

              {loading && (
                <div className="flex items-center justify-center py-16 rounded-2xl bg-card border shadow-card">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground font-medium">
                    Analyzing lesion…
                  </span>
                </div>
              )}
            </motion.div>

            {/* Right: results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl gradient-vibrant flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <h2 className="font-display font-bold text-lg">
                        Detection Results
                      </h2>
                    </div>

                    {result.detections.map((d) => (
                      <ConfidenceBar key={d.class} detection={d} />
                    ))}

                    {/* Chart */}
                    <div className="rounded-2xl border bg-card p-6 shadow-card">
                      <h3 className="font-display font-bold text-sm mb-4">
                        Confidence Comparison
                      </h3>
                      <div className="space-y-3">
                        {result.detections.map((d) => (
                          <div
                            key={d.class}
                            className="flex items-center gap-3"
                          >
                            <span className="text-xs font-medium w-20 truncate">
                              {d.class.split(" ")[0]}
                            </span>
                            <div className="flex-1 h-7 bg-muted rounded-lg overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${d.confidence * 100}%`,
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full rounded-lg"
                                style={{ backgroundColor: d.color }}
                              />
                            </div>
                            <span className="text-xs font-bold w-12 text-right">
                              {(d.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={generatePDF}
                      variant="outline"
                      className="w-full rounded-full border-2"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download PDF Report
                    </Button>

                    <DisclaimerBox compact />
                  </motion.div>
                )}
              </AnimatePresence>

              {!result && !loading && (
                <div className="text-center py-16 rounded-2xl bg-card border shadow-card">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload or capture an image to see analysis results here.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
