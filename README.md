# DermaGuard AI

AI-powered skin cancer risk assessment web application for early awareness, accessibility, and faster guidance.

## Demo Video
Add your demo video link here after upload:

- Demo Video: [Watch the project demo](PASTE_YOUR_VIDEO_LINK_HERE)

## Project Overview
DermaGuard AI is a full-stack medical AI project built to make early skin cancer risk awareness more accessible to everyone. The idea behind the project is simple: many people ignore suspicious skin changes because dermatologist consultations can be expensive, delayed, or hard to access. This project gives users a fast first-level AI-based skin lesion risk assessment using an uploaded image, followed by a report and guidance to seek medical help when necessary.

This project was created with the goal of supporting **early awareness**, not replacing doctors. It helps users take the first step sooner, especially in cases where cost, distance, or delay might stop them from getting checked.

## Problem It Solves
Skin cancer is one of the most serious and common health concerns, especially in countries like Australia where UV exposure is high. Many people do not act early because:

- Skin checks can cost money.
- Specialist appointments may take time.
- People often ignore warning signs until the condition gets worse.
- There is limited immediate access to basic risk screening tools for everyone.

DermaGuard AI addresses this gap by providing:

- A simple image-based risk screening workflow.
- Faster awareness about suspicious lesions.
- Easy access through a web application.
- A downloadable report for reference.
- Nearby hospital or clinic discovery support.

## What I Built
This project is a complete end-to-end AI application with both frontend and backend components.

### Core Features
- Upload a skin lesion image through the web interface.
- Run AI-based classification on the uploaded image.
- Display prediction results and confidence insights.
- Generate a PDF report for the user.
- Help users find nearby hospitals or clinics.
- Deliver the system through a clean full-stack workflow.

### Full-Stack Architecture
- **Frontend:** React
- **Backend:** FastAPI
- **Model Inference:** PyTorch
- **Model Used:** EfficientNet-B4
- **Location Support:** Google Places API
- **Report Generation:** PDF generation pipeline

## Models Used
Based on your project details, DermaGuard AI uses PyTorch-based models, with EfficientNet-B4 being the main model highlighted for the skin cancer detection workflow.

### Main Model
- **EfficientNet-B4** for image-based skin lesion classification.

### Why EfficientNet-B4
EfficientNet-B4 is a strong choice for medical image classification because it balances accuracy and efficiency well. It is capable of learning rich image features while still being practical for deployment in an application workflow.

### Model Role in the Project
The model analyzes the uploaded skin image and predicts lesion-related risk categories. That prediction is then used to provide a user-facing output that supports awareness and encourages further clinical consultation if needed.

### Additional Note
You also mentioned that your broader project setup includes two PyTorch models: one for the medical AI component and another thinner model for the skin guardian API layer. If your repository exposes both clearly, include that detail in the final public documentation.

## How the Project Works
The workflow is designed to be simple for a normal user.

1. The user opens the DermaGuard AI web application.
2. The user uploads a skin lesion image.
3. The backend receives the file through FastAPI.
4. The model preprocesses the image and runs inference.
5. The application returns prediction results.
6. A PDF report can be generated.
7. The user can also view nearby hospitals or clinics for next steps.

## Why This Project Matters
This project has both technical and social value.

### User Impact
- Makes first-level screening awareness more accessible.
- Encourages earlier action instead of delay.
- Reduces dependence on immediate expensive initial screening.
- Can help people take suspicious symptoms seriously sooner.

### Technical Impact
- Shows how AI can be integrated into a real healthcare support workflow.
- Demonstrates full-stack AI deployment skills.
- Combines computer vision, backend APIs, frontend development, and external APIs in one project.
- Creates a portfolio-ready real-world AI system.

## What I Did in This Project
This section explains your actual contribution clearly.

- Designed and built the full project architecture.
- Developed the frontend interface for image upload and result display.
- Built the FastAPI backend for inference and API handling.
- Integrated the PyTorch model into the prediction pipeline.
- Used EfficientNet-B4 for skin lesion classification.
- Added PDF report generation.
- Integrated hospital discovery support using Google Places API.
- Positioned the project around real-world accessibility and early detection.
- Created a demo video to present the working system.

## Repository
Your GitHub repository for this project is:

- GitHub Repo: https://github.com/atharvamavle/ai-skin-cancer-detector.git

### Branch
Use your actual working branch for the public project. If you have not created a separate feature branch, your main public branch is most likely:

- `main`

If your final code is on another branch, replace this in the README with the exact branch name.

## Project Structure
Example structure for your repository:

```bash
ai-skin-cancer-detector/
├── backend/
├── frontend/
├── models/
├── reports/
├── assets/
├── README.md
├── requirements.txt
├── package.json
└── .env.example
```

Adjust the structure above to match your actual repository.

## Installation and Setup
These steps help another person run the project.

### Prerequisites
A user should have:

- Python installed
- Node.js and npm installed
- Git installed
- A Google Places API key if location features are enabled
- Required model weights or checkpoint files
- Environment variable configuration

### Backend Setup
```bash
git clone https://github.com/atharvamavle/ai-skin-cancer-detector.git
cd ai-skin-cancer-detector

# create virtual environment
python -m venv venv

# activate environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# install backend dependencies
pip install -r requirements.txt
```

### Frontend Setup
```bash
# move to frontend directory if separate
cd frontend
npm install
npm run dev
```

### Run Backend
```bash
# from backend directory or project root, depending on your structure
uvicorn app:app --reload
```

### Environment Variables
Create a `.env` file and add values such as:

```env
GOOGLE_PLACES_API_KEY=your_key_here
MODEL_PATH=path_to_model_weights
```

Use a `.env.example` file in the repository so other users know what is needed without exposing secrets.

## How Someone Can Use It
This project is designed for simple usage.

### For End Users
- Open the web application.
- Upload a clear image of the skin lesion.
- Wait for the AI result.
- Review the output and confidence information.
- Download the report if needed.
- Use the nearby hospital suggestion feature for medical follow-up.

### For Developers
- Clone the repository.
- Install frontend and backend dependencies.
- Add the required environment variables.
- Add the trained model weights.
- Start backend and frontend servers.
- Test the upload and prediction pipeline.

## Important Medical Disclaimer
DermaGuard AI is not a replacement for a licensed dermatologist or medical professional. It is an awareness and support tool for early screening guidance only. Any suspicious lesion or high-risk result should always be reviewed by a qualified healthcare provider.

## How It Helps
DermaGuard AI helps in several practical ways:

- Increases awareness of possible skin cancer risk.
- Encourages early action.
- Makes initial guidance more accessible.
- Supports users who may delay visits because of cost or uncertainty.
- Demonstrates how AI can support healthcare accessibility.

## Future Improvements
There are many ways this project can be improved further.

### Model Improvements
- Train on larger and more diverse dermatology datasets.
- Improve class balance and robustness.
- Add explainability methods such as Grad-CAM.
- Evaluate with stronger medical validation metrics.
- Add uncertainty estimation for safer predictions.

### Product Improvements
- Add user authentication and secure report history.
- Add multilingual support.
- Add mobile-first optimization.
- Add telehealth or doctor referral integration.
- Improve hospital and clinic recommendations.
- Add cloud deployment for wider public access.

### Engineering Improvements
- Containerize with Docker.
- Add CI/CD pipelines.
- Add automated testing for backend and frontend.
- Improve model serving performance.
- Add logging, monitoring, and analytics.

## Suggested README Video Section
You said you created a demo video for this project. Add a section like this in GitHub:

```md
## Demo Video
Watch the working demo here: [Project Demo](PASTE_YOUR_VIDEO_LINK_HERE)
```

If you upload the demo to YouTube, Loom, Google Drive, or LinkedIn, replace the placeholder with the real URL.

## Best Use Cases
This project can be useful for:

- AI/ML portfolio showcasing.
- Healthcare AI demonstrations.
- Early screening awareness prototypes.
- Academic capstone presentations.
- Startup prototype validation.

## What Makes This Project Strong
- Solves a real-world healthcare accessibility problem.
- Combines AI with practical product thinking.
- Uses a full-stack architecture instead of only model training.
- Shows social impact and technical depth together.
- Has clear potential for future scaling and refinement.

## For Recruiters and Reviewers
This project demonstrates:

- Applied computer vision skills.
- PyTorch model integration.
- FastAPI backend development.
- React frontend development.
- API integration skills.
- Product-oriented AI thinking.
- Real-world healthcare problem solving.

## Final Notes
Before publishing this README publicly, update these items:

- Add your live demo link if available.
- Add your demo video link.
- Confirm the exact branch name.
- Confirm the exact file structure.
- Confirm the exact FastAPI entrypoint (`app:app` or another module path).
- Add screenshots if available.
- Add model performance metrics if you want stronger technical credibility.

---

Built by Atharva Santosh Mavale as an applied AI project focused on accessible early skin cancer risk awareness.
