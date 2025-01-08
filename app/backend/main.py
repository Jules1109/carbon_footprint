from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import onnxruntime as ort
from fastapi.middleware.cors import CORSMiddleware



# Load the ONNX model
try:
    session = ort.InferenceSession("carbon_model.onnx")
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
except Exception as e:
    raise RuntimeError(f"Error loading the ONNX model: {e}")

# Define the structure for incoming requests
class PredictionRequest(BaseModel):
    features: list[float]

# Initialize the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://jules1109.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message":"API is running"}

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        # Validate input dimensions
        if len(request.features) != session.get_inputs()[0].shape[1]:
            raise HTTPException(
                status_code=400,
                detail=f"The model expects {session.get_inputs()[0].shape[1]} features, but {len(request.features)} were provided.",
            )

        # Convert input data to a NumPy tensor
        input_data = np.array(request.features, dtype=np.float32).reshape(1, -1)

        # Perform prediction using the ONNX model
        prediction = session.run([output_name], {input_name: input_data})[0]
        return {"prediction": prediction.tolist()}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

#my test1