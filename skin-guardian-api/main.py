from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from PIL import Image
import io
import torch
import torch.nn.functional as F
from torchvision import transforms
from efficientnet_pytorch import EfficientNet

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

CLASS_NAMES = ["AK","BCC","BKL","DF","MEL","NV","SCC","VASC"]

# load model
model = EfficientNet.from_pretrained("efficientnet-b4", num_classes=len(CLASS_NAMES))
state = torch.load("skin_model.pt", map_location=device)
model.load_state_dict(state)
model.to(device)
model.eval()

preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406],
                         std =[0.229,0.224,0.225]),
])

def triage(score, label):
    high_risk = ["MEL","BCC","SCC"]
    if label in high_risk:
        if score >= 0.85:
            return "high", "Urgent referral to dermatologist within 2 weeks", "HIGH"
        elif score >= 0.65:
            return "moderate", "Refer to dermatologist within 4 weeks", "MEDIUM"
    return "low", "Routine skin check / monitor as per guidelines", "LOW"

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    img_bytes = await image.read()
    pil = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    x = preprocess(pil).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = model(x)
        probs = F.softmax(logits, dim=1)[0].cpu().numpy()

    top_idx = int(probs.argmax())
    top_score = float(probs[top_idx])
    top_label = CLASS_NAMES[top_idx]
    risk_level, recommendation, urgency = triage(top_score, top_label)

    scores = {CLASS_NAMES[i]: float(probs[i]) for i in range(len(CLASS_NAMES))}

    return {
        "scores": scores,
        "top_class": top_label,
        "top_score": top_score,
        "risk_level": risk_level,
        "triage_recommendation": recommendation,
        "urgency": urgency,
    }
