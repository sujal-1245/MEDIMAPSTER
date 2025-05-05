from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)

# Load assets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data = pd.read_csv(os.path.join(BASE_DIR, 'cleaned_medicines.csv'))

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
with open('medicine_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/api/search-medicine', methods=['POST'])
def search_medicine():
    req_data = request.json
    if 'medicine_name' not in req_data:
        return jsonify({'error': 'Missing medicine_name'}), 400

    medicine_name = req_data['medicine_name']
    input_vector = vectorizer.transform([medicine_name])
    distances, indices = model.kneighbors(input_vector)

    recommended_medicines = data.iloc[indices[0]].copy()

    # Sort by price descending to get branded/high-cost medicine first
    recommended_medicines.sort_values(by='price(₹)', ascending=False, inplace=True)
    branded = recommended_medicines.head(1)  # Top branded
    generics = recommended_medicines.iloc[1:].sort_values(by='price(₹)').head(8)  # Cheapest generics

    final_results = pd.concat([branded, generics]).head(9)  # Ensure multiple of 3

    result = final_results[['name', 'price(₹)', 'type']].to_dict(orient='records')
    return jsonify({'recommended_medicines': result}), 200

if __name__ == "__main__":
    app.run(debug=True)
