# PREDICTION OF HEART DISEASE

A machine learning project that predicts heart disease using Logistic Regression.

---

## 🖥️ How to Continue This Project in VS Code

Follow these steps to open and run the notebook on your local machine using **Visual Studio Code**.

### Prerequisites

Make sure you have the following installed:

- [Python 3.8+](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [VS Code Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [VS Code Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)

---

### Step 1 – Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/aahona-16/PRIDICTION-OF-HEART-DIESEASE.git
cd PRIDICTION-OF-HEART-DIESEASE
```

### Step 2 – Add the Dataset

Download the **Heart Disease UCI** dataset CSV file (named `heart_disease_data.csv`) and place it in the **root folder** of the cloned repository (the same folder as `python_code.ipynb`).

You can find the dataset on [Kaggle – Heart Disease UCI](https://www.kaggle.com/datasets/ronitf/heart-disease-uci) or [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/heart+disease).

The file must be named exactly:
```
heart_disease_data.csv
```

### Step 3 – Create a Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 4 – Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5 – Open the Project in VS Code

```bash
code .
```

Or open VS Code and choose **File → Open Folder** and select the cloned repository folder.

### Step 6 – Select the Python Interpreter

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type **"Python: Select Interpreter"** and press Enter
3. Choose the interpreter from your virtual environment (e.g., `venv`)

### Step 7 – Run the Notebook

1. In the VS Code file explorer, click on **`python_code.ipynb`**
2. The notebook will open in the built-in Jupyter editor
3. Click **"Run All"** at the top, or run cells one by one with `Shift+Enter`

---

## 📂 Project Structure

```
PRIDICTION-OF-HEART-DIESEASE/
├── python_code.ipynb       # Main Jupyter notebook
├── heart_disease_data.csv  # Dataset (add this file manually – see Step 2)
├── requirements.txt        # Python dependencies
└── README.md
```

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `numpy` | Numerical computation |
| `pandas` | Data loading and manipulation |
| `scikit-learn` | Machine learning model (Logistic Regression) |
| `seaborn` | Data visualization |
| `matplotlib` | Plotting |
| `jupyter` / `ipykernel` | Running notebooks in VS Code |

---

## 📊 Model Overview

- **Algorithm:** Logistic Regression
- **Dataset:** Heart Disease UCI (303 records, 13 features)
- **Target:** `1` = Heart Disease, `0` = No Heart Disease
- **Train/Test Split:** 80% / 20%