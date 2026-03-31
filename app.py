import os
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Train the model once when the app starts
# ---------------------------------------------------------------------------
DATASET_PATH = os.path.join(os.path.dirname(__file__), "heart_disease_data.csv")

heart_data = pd.read_csv(DATASET_PATH)
X = heart_data.drop(columns="target")
Y = heart_data["target"]

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, stratify=Y, random_state=2
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, Y_train)

train_acc = accuracy_score(Y_train, model.predict(X_train))
test_acc = accuracy_score(Y_test, model.predict(X_test))
print(f"Model ready — Train accuracy: {train_acc:.4f}  |  Test accuracy: {test_acc:.4f}")


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    """Accept JSON body with the 13 feature values and return a prediction."""
    data = request.get_json(force=True)

    feature_order = [
        "age", "sex", "cp", "trestbps", "chol",
        "fbs", "restecg", "thalach", "exang",
        "oldpeak", "slope", "ca", "thal",
    ]

    try:
        features = [float(data[f]) for f in feature_order]
    except KeyError:
        return jsonify({"error": "One or more required features are missing."}), 400
    except ValueError:
        return jsonify({"error": "Feature values must be numeric."}), 400

    input_df = pd.DataFrame([dict(zip(feature_order, features))])
    prediction = int(model.predict(input_df)[0])
    probability = float(model.predict_proba(input_df)[0][prediction])

    result = {
        "prediction": prediction,
        "label": "Heart Disease Detected" if prediction == 1 else "No Heart Disease",
        "confidence": round(probability * 100, 2),
        "model_train_accuracy": round(train_acc * 100, 2),
        "model_test_accuracy": round(test_acc * 100, 2),
    }
    return jsonify(result)


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(debug=debug, port=5000)
