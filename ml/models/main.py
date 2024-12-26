import onnxruntime as ort
import numpy as np

# Chemin du modèle
model_path = "/Users/edouarddickoum/Desktop/ml_in_prod/ml/models/carbon_model.onnx"

# Charger le modèle ONNX
session = ort.InferenceSession(model_path)

# Préparer les données avec le bon nombre de caractéristiques
features = [
    6.8,  # OBFCM Fuel consumption (l/100 km)
    5000, # Number of vehicles
    1.2,  # absolute gap Fuel consumption (l/100 km)
    15.3, # percentage gap Fuel consumption (%)
    0,    # Fuel Type_DIESEL/ELECTRIC
    1     # Fuel Type_PETROL
]
data = np.array(features, dtype=np.float32).reshape(1, -1)

# Nom de l'entrée
input_name = session.get_inputs()[0].name

# Faire une prédiction
predictions = session.run(None, {input_name: data})

print(f"Prédictions : {predictions[0]}")
