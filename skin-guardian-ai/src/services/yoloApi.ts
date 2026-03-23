export interface YoloDetection {
  class: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
  riskLevel: "Low" | "Moderate" | "High";
  description: string;
  color: string;
}

export interface ScanResult {
  detections: YoloDetection[];
  timestamp: string;
  imageUrl: string;
}

const MOCK_DETECTIONS: YoloDetection[] = [
  {
    class: "Melanoma",
    confidence: 0.87,
    bbox: { x: 120, y: 80, width: 160, height: 140 },
    riskLevel: "High",
    description:
      "Melanoma is the most dangerous form of skin cancer. It develops in the melanocytes (pigment-producing cells). Early detection is critical for successful treatment.",
    color: "#dc2626",
  },
  {
    class: "Basal Cell Carcinoma",
    confidence: 0.62,
    bbox: { x: 300, y: 200, width: 120, height: 100 },
    riskLevel: "Moderate",
    description:
      "Basal cell carcinoma (BCC) is the most common form of skin cancer. It rarely metastasizes but can cause significant local tissue damage if left untreated.",
    color: "#f59e0b",
  },
  {
    class: "Squamous Cell Carcinoma",
    confidence: 0.34,
    bbox: { x: 50, y: 250, width: 100, height: 90 },
    riskLevel: "Low",
    description:
      "Squamous cell carcinoma (SCC) arises from squamous cells in the epidermis. It is generally treatable when caught early but can spread if neglected.",
    color: "#22c55e",
  },
];

// Replace this URL with your real YOLO API endpoint
const YOLO_API_URL = "";

export async function analyzeImage(imageDataUrl: string): Promise<ScanResult> {
  if (YOLO_API_URL) {
    try {
      const response = await fetch(YOLO_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      });
      const data = await response.json();
      return {
        detections: data.detections,
        timestamp: new Date().toISOString(),
        imageUrl: imageDataUrl,
      };
    } catch (error) {
      console.error("YOLO API error, falling back to mock:", error);
    }
  }

  // Mock response with realistic delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    detections: MOCK_DETECTIONS,
    timestamp: new Date().toISOString(),
    imageUrl: imageDataUrl,
  };
}
