from flask import Blueprint, request, jsonify
import pickle
import pandas as pd
from utils import process_prescription, get_nearby_pharmacies  # Updated import

# Load the vectorizer and model
with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('medicine_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the cleaned medicine data
data = pd.read_csv('cleaned_medicines.csv')

# Function to retrieve medicines based on indices
def retrieve_medicines_by_indices(indices):
    medicines = []
    for idx in indices:
        if idx < len(data):
            row = data.iloc[idx]
            medicines.append({
                'name': row['name'],
                'price': row['price(₹)'],
                'manufacturer': row['manufacturer_name'],
                'type': row['type'],
                'pack_size': row['pack_size_label'],
                'symptoms': row['symptoms']
            })
    return medicines

api_routes = Blueprint('api_routes', __name__)

# Route for searching medicines
@api_routes.route('/api/search-medicine', methods=['POST'])
def search_medicine():
    data_request = request.get_json()

    if 'medicine_name' not in data_request:
        return jsonify({'error': 'Missing medicine_name'}), 400
    
    medicine_name = data_request['medicine_name']

    # Predict using the ML model
    query_vec = vectorizer.transform([medicine_name])
    distances, indices = model.kneighbors(query_vec)

    # Retrieve the top recommended medicines
    recommended_medicines = retrieve_medicines_by_indices(indices.flatten())

    return jsonify({'recommended_medicines': recommended_medicines}), 200

# Route for processing prescription uploads
@api_routes.route('/api/process-prescription', methods=['POST'])
def process_prescription_route():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    medicines = process_prescription(file)
    
    return jsonify(medicines)

# Route for fetching nearby pharmacies based on city
@api_routes.route('/api/get-pharmacies', methods=['POST'])
def get_pharmacies_route():
    data_request = request.get_json()
    city = data_request.get('city')

    if not city:
        return jsonify({'error': 'Missing city'}), 400
    
    pharmacies = get_nearby_pharmacies(city)
    return jsonify({'pharmacies': pharmacies})
