# MEDIMAPSTER

**MEDIMAPSTER** is an innovative web application designed to promote affordable healthcare by recommending generic alternatives to branded medicines and assisting users in locating nearby generic medicine stores. Built with a React frontend and a Flask backend, the application leverages machine learning to provide intelligent medicine recommendations.

![image](https://github.com/user-attachments/assets/35aaf2f4-774b-442f-8895-cfddf8fe30ce)


## 🌟 Features

* **Generic Medicine Recommendations**: Input a branded medicine name to receive a list of cost-effective generic alternatives.
* **Nearby Store Locator**: Find generic medicine stores in your vicinity using integrated location services.
* **User-Friendly Interface**: Seamless and intuitive UI/UX for effortless navigation.
* **Machine Learning Integration**: Employs a trained model to enhance recommendation accuracy.

## 🛠️ Tech Stack

* **Frontend**: React.js
* **Backend**: Flask (Python)
* **Machine Learning**: Scikit-learn
* **Data Handling**: Pandas, NumPy
* **Model Serialization**: Pickle
* **Geolocation Services**: \[Specify the service used, e.g., Google Maps API]

## 📁 Project Structure

```
MEDIMAPSTER/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── model/
│   │       ├── medicine_model.pkl
│   │       └── vectorizer.pkl
│   └── cleaned_medicines.csv
├── frontend/
│   └── Medimapster-Frontend/
│       ├── public/
│       └── src/
│           ├── components/
│           ├── App.js
│           └── index.js
├── .gitignore
├── README.md
└── package-lock.json
```

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v14 or above)
* **Python** (v3.7 or above)
* **pip** (Python package installer)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sujal-1245/MEDIMAPSTER.git
   cd MEDIMAPSTER
   ```

2. **Set Up the Backend**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app/routes.py  # Ensure this runs your Flask app
   ```

3. **Set Up the Frontend**

   ```bash
   cd frontend/Medimapster-Frontend
   npm install
   npm start
   ```

   The frontend will typically run on `http://localhost:3000/`, and the backend on `http://localhost:5000/`.

## 📊 Machine Learning Model

The application utilizes a machine learning model trained on a dataset of medicines to identify generic alternatives. The model and its vectorizer are serialized using Pickle and stored in the `backend/app/model/` directory.

* **Model File**: `medicine_model.pkl`
* **Vectorizer**: `vectorizer.pkl`
* **Dataset**: `cleaned_medicines.csv`

## 📌 Usage

1. **Search for a Medicine**: Enter the name of a branded medicine in the search bar.
2. **View Recommendations**: Receive a list of generic alternatives with relevant details.
3. **Locate Stores**: Use the integrated map to find nearby stores stocking generic medicines.

## 📷 Screenshots

![image](https://github.com/user-attachments/assets/1458ab00-8eef-4440-b979-b64e74a08fcc)


*Search for branded medicines to find generic alternatives.*

![image](https://github.com/user-attachments/assets/06e53105-4132-413f-90f5-fbd676aff2af)


*Locate nearby generic medicine stores with ease.*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

For any inquiries or feedback, please contact:

* **Name**: Sujal
* **GitHub**: [https://github.com/sujal-1245](https://github.com/sujal-1245)

---


