# utils.py

import pandas as pd
import os
from PIL import Image
import pytesseract

# Load your medicine dataset properly
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, 'A_Z_medicines_dataset_of_India.csv')

medicine_data = pd.read_csv(csv_path)

def retrieve_medicines_by_indices(indices):
    medicines = []
    for idx in indices:
        if idx < len(medicine_data):
            row = medicine_data.iloc[idx]
            medicines.append({
                'Medicine_Name': row['Medicine_Name'],
                'Type': row.get('Type', 'Generic'),
                'Price': row.get('Price', 100)  # Fallback if no price
            })
    return medicines

def process_prescription(file):
    image = Image.open(file)
    text = pytesseract.image_to_string(image)

    medicines = extract_medicines_from_text(text)
    return {"medicines": medicines}

def extract_medicines_from_text(text):
    words = text.split()
    medicines = [word for word in words if word.istitle()]  # Simple heuristic
    return medicines

def get_nearby_pharmacies(city):
    # Placeholder, but should connect to Overpass API or Google Maps API
    return [
        {"name": "Pharmacy A", "address": f"Main St, {city}"},
        {"name": "Pharmacy B", "address": f"Market Road, {city}"}
    ]
