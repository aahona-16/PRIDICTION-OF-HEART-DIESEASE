# ❤️ Heart Disease Prediction — Fullstack Web App

## 📌 Overview
A fullstack web application that predicts heart disease risk from clinical measurements.
The backend trains a **Logistic Regression** model (scikit-learn) at startup and exposes a REST API.
The frontend is a clean, responsive HTML/CSS/JS form that calls the API and displays the prediction.

## 🗂 Project Structure
```
├── app.py                  # Flask backend (API + model training)
├── heart_disease_data.csv  # Training dataset (303 records, 13 features)
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html          # Frontend – prediction form
└── static/
    ├── css/style.css       # Styling
    └── js/script.js        # Client-side logic
```

## 🧠 ML Model
| Item | Detail |
|------|--------|
| Algorithm | Logistic Regression |
| Features | 13 clinical measurements |
| Dataset | UCI Cleveland Heart Disease (303 samples) |
| Split | 80 % train / 20 % test, stratified |

**Features used:**
`age`, `sex`, `cp` (chest pain), `trestbps` (resting BP), `chol` (cholesterol),
`fbs` (fasting blood sugar), `restecg` (resting ECG), `thalach` (max heart rate),
`exang` (exercise angina), `oldpeak` (ST depression), `slope`, `ca` (major vessels), `thal`

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Python · Flask |
| ML | Scikit-learn · Pandas · NumPy |
| Frontend | HTML5 · CSS3 · Vanilla JS |

## 🚀 How to Run

```bash
# 1 – Clone
git clone https://github.com/aahona-16/PRIDICTION-OF-HEART-DIESEASE.git
cd PRIDICTION-OF-HEART-DIESEASE

# 2 – Install dependencies
pip install -r requirements.txt

# 3 – Start the server
python app.py

# 4 – Open in browser
http://127.0.0.1:5000
```

## 🔌 REST API

### `POST /predict`
Submit patient features and receive a prediction.

**Request body (JSON):**
```json
{
  "age": 54, "sex": 1, "cp": 2, "trestbps": 130, "chol": 240,
  "fbs": 0, "restecg": 0, "thalach": 150, "exang": 0,
  "oldpeak": 1.5, "slope": 2, "ca": 0, "thal": 2
}
```

**Response:**
```json
{
  "prediction": 1,
  "label": "Heart Disease Detected",
  "confidence": 82.45,
  "model_train_accuracy": 75.21,
  "model_test_accuracy": 65.57
}
```

### `GET /health`
Returns `{"status": "ok"}` when the server is running.

## ⚠️ Disclaimer
This tool is for **educational purposes only** and does **not** replace professional medical advice.
