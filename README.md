# DermaGuard AI

DermaGuard AI is a full-stack skin lesion analysis project that combines a React frontend, a FastAPI backend, and deep learning models to support early skin cancer risk awareness. The repository is organized into separate app, API, and model modules on the `main` branch.

## Project Purpose
DermaGuard AI was built to improve accessibility to early skin cancer awareness. Many people delay skin checks because consultations can be expensive, time-consuming, or difficult to access. This project provides a quick AI-assisted first-level screening workflow so users can act earlier and seek proper medical attention sooner.

This system is designed as a support tool for awareness and education. It is not a replacement for clinical diagnosis.

## Problem Being Solved
Skin cancer can become dangerous when warning signs are ignored. In many cases, people delay action because:

- Initial consultations may be costly.
- Access to specialists may be limited.
- People may not know whether a lesion looks serious.
- There are not enough simple and accessible screening-style tools for quick first-step guidance.

DermaGuard AI addresses this by offering:

- Image upload and AI-based lesion analysis.
- Fast prediction output for awareness.
- A report generation workflow.
- Nearby hospital or clinic guidance.
- A usable full-stack product structure instead of only a notebook model.

## What I Built
This project is split into multiple parts inside one repository:

```bash
ai-skin-cancer-detector/
├── .vscode/
├── skin-guardian-ai/
├── skin-guardian-api/
├── skin-guardian-model/
├── .gitignore
└── README.md
```

### Repository Modules
- `skin-guardian-ai/` — frontend application for user interaction.
- `skin-guardian-api/` — FastAPI backend for inference and application logic.
- `skin-guardian-model/` — model-related code, experiments, or training assets.

This structure shows the project was developed as a proper modular system rather than a single script.

## Tech Stack
### Frontend
- React
- TypeScript
- CSS

### Backend
- FastAPI
- Python
- PyTorch

### AI/ML
- EfficientNet-B4 is described in the repository README as the main model used for skin lesion classification.
- The repository description also presents the project as a computer vision web app for classifying skin lesions such as Melanoma, BCC, and SCC.

### External Support
- Google Places API for nearby hospital or clinic suggestions.
- PDF generation pipeline for downloadable output.

## What the Model Does
The model takes an uploaded skin lesion image, preprocesses it, runs inference, and returns a prediction to the user-facing application. The goal is to provide faster awareness so that suspicious lesions are not ignored.

Based on the repository description and existing README, the project focuses on skin lesion classification and awareness for categories including Melanoma, BCC, and SCC.

## How the Project Works
1. A user opens the frontend web app.
2. The user uploads an image of a skin lesion.
3. The frontend sends the image to the FastAPI backend.
4. The backend preprocesses the image and runs model inference.
5. The model returns a classification-related output.
6. The application displays the result to the user.
7. A report can be generated.
8. The app can guide the user toward nearby hospitals or clinics.

## My Contribution
This project demonstrates end-to-end AI product development. Your contribution can be presented clearly as:

- Built the full-stack architecture across frontend, backend, and model modules.
- Developed a React-based interface for image upload and result display.
- Built a FastAPI backend for handling model inference.
- Integrated deep learning inference into an application workflow.
- Designed the project around real-world healthcare accessibility.
- Added reporting and guidance-oriented features.
- Created a project demo video for presentation and portfolio use.

## Why This Project Matters
### Real-World Value
- Encourages people to act earlier on suspicious skin changes.
- Improves accessibility of first-step awareness tools.
- Reduces hesitation caused by uncertainty, delay, or cost.
- Supports a socially relevant healthcare use case.

### Portfolio Value
- Demonstrates applied computer vision.
- Shows full-stack AI deployment ability.
- Connects model inference with user-facing product design.
- Highlights product thinking, social impact, and engineering execution together.

## How Someone Else Can Use It
### For Users
- Open the application.
- Upload a clear skin lesion image.
- Wait for the analysis result.
- Review the prediction output.
- Download the report if available.
- Use nearby clinic or hospital support for next steps.

### For Developers
1. Clone the repository:
```bash
git clone https://github.com/atharvamavle/ai-skin-cancer-detector.git
cd ai-skin-cancer-detector
```

2. Set up the backend dependencies inside the API project.
3. Set up the frontend dependencies inside the frontend project.
4. Add environment variables such as API keys and model paths.
5. Start the backend server.
6. Start the frontend development server.
7. Connect model weights and test the upload pipeline.

## Suggested Setup Flow
Because this repository is modular, a contributor should typically work module by module.

### Backend
```bash
cd skin-guardian-api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend
```bash
cd skin-guardian-ai
npm install
npm run dev
```

If your actual entrypoint or script names differ, replace them with the exact commands used in your codebase.

## Required Configuration
Someone using this project will usually need:

- Python
- Node.js and npm
- Git
- Model weights/checkpoints
- Environment variables
- API key configuration for location features if enabled

A `.env.example` file is recommended for public use.

## How It Helps Users
DermaGuard AI helps by:

- Giving quicker first-step awareness.
- Encouraging early action instead of delay.
- Providing a practical AI-assisted workflow.
- Making health-support technology more accessible.
- Demonstrating how AI can support preventive healthcare experiences.

## Improvements for the Future
### Model Improvements
- Train on larger and more diverse dermatology datasets.
- Add explainability such as Grad-CAM.
- Improve calibration and uncertainty estimation.
- Report medical validation metrics more clearly.

### Product Improvements
- Add authentication and saved report history.
- Improve mobile responsiveness.
- Add multilingual support.
- Add telehealth or dermatologist referral workflows.
- Deploy a stable cloud-hosted version.

### Engineering Improvements
- Add Docker support.
- Add CI/CD.
- Add automated testing.
- Improve monitoring and error logging.
- Add better project documentation for each submodule.

## Medical Disclaimer
This project is a research and awareness tool only. It is not a replacement for a licensed doctor or dermatologist. Any suspicious lesion or concerning result should always be reviewed by a qualified healthcare professional.
ed on accessible skin cancer risk awareness.
