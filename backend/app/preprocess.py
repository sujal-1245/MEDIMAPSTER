# preprocess.py

import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # directory of this file
csv_path = os.path.join(BASE_DIR, 'A_Z_medicines_dataset_of_India.csv')

# Load the dataset
data = pd.read_csv(csv_path)

# Check required columns
required_columns = ['name', 'price(₹)', 'manufacturer_name', 'type', 'pack_size_label']
for col in required_columns:
    if col not in data.columns:
        raise ValueError(f"Missing required column: {col}")

# Function to create synthetic symptoms intelligently
def generate_symptoms(row):
    name = str(row['name']).lower()
    type_ = str(row['type']).lower()

    symptoms = []

    # Based on name
    if 'paracetamol' in name:
        symptoms += ['fever', 'headache', 'pain']
    if 'ibuprofen' in name:
        symptoms += ['pain', 'inflammation', 'fever']
    if 'aspirin' in name:
        symptoms += ['heart attack', 'blood clot', 'pain']
    if 'amoxicillin' in name:
        symptoms += ['infection', 'bacterial infection']
    if 'cetirizine' in name:
        symptoms += ['allergy', 'sneezing', 'runny nose']
    if 'metformin' in name:
        symptoms += ['diabetes', 'blood sugar']
    if 'omeprazole' in name:
        symptoms += ['acidity', 'gastric problem']
    if 'azithromycin' in name:
        symptoms += ['infection', 'bacterial infection']
    if 'loratadine' in name:
        symptoms += ['allergy', 'hives', 'itching']
    
    # Based on type
    if 'antibiotic' in type_:
        symptoms += ['infection', 'bacteria']
    if 'analgesic' in type_:
        symptoms += ['pain', 'headache']
    if 'antipyretic' in type_:
        symptoms += ['fever']

    # If still empty
    if not symptoms:
        symptoms = [type_]  # fallback

    return ', '.join(set(symptoms))  # remove duplicates

# Create the smart symptoms column
data['symptoms'] = data.apply(generate_symptoms, axis=1)

# Create 'search_field' for model
data['search_field'] = (
    data['name'].fillna('') + ' ' +
    data['manufacturer_name'].fillna('') + ' ' +
    data['type'].fillna('') + ' ' +
    data['pack_size_label'].fillna('') + ' ' +
    data['symptoms'].fillna('')
)

data['search_field'] = data['search_field'].str.strip()
data = data[data['search_field'] != '']

# Vectorize
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(data['search_field'])

# Model
model = NearestNeighbors(n_neighbors=5, metric='cosine')
model.fit(X)

# Save vectorizer, model, and cleaned data
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

with open('medicine_model.pkl', 'wb') as f:
    pickle.dump(model, f)

data.to_csv('cleaned_medicines.csv', index=False)

print("✅ Smart preprocessing done. Vectorizer, model, and new CSV saved.")
