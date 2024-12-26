import requests

# Base URL of the API
BASE_URL = "http://127.0.0.1:8000"

# Test for the root endpoint
def test_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == {"message": "API is running"}

# Test for valid input
def test_valid_input():
    payload = {"features": [6.8, 5000, 1.2, 15.3, 0, 1]}
    response = requests.post(f"{BASE_URL}/predict", json=payload)
    
    assert response.status_code == 200
    assert "prediction" in response.json()
    assert isinstance(response.json()["prediction"], list)


# Test for invalid feature count
def test_invalid_feature_count():
    # Input with fewer features
    payload = {"features": [6.8, 5000, 1.2]}
    response = requests.post(f"{BASE_URL}/predict", json=payload)

    assert response.status_code == 400
    assert "detail" in response.json()
    assert "expects 6 features" in response.json()["detail"]

# Test for invalid data type
def test_invalid_data_type():
    # Input with strings instead of floats
    payload = {"features": ["invalid", "data", "types", 15.3, 0, 1]}
    response = requests.post(f"{BASE_URL}/predict", json=payload)

    assert response.status_code == 422
    assert "detail" in response.json()


