import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CarbonPredictionApp() {
  const [formData, setFormData] = useState({
    obfcmConsumption: '',
    numVehicles: '',
    absoluteGap: '',
    percentageGap: '',
    isDieselElectric: false,
    isPetrol: false
  });
  
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const features = [
      parseFloat(formData.obfcmConsumption),
      parseFloat(formData.numVehicles),
      parseFloat(formData.absoluteGap),
      parseFloat(formData.percentageGap),
      formData.isDieselElectric ? 1 : 0,
      formData.isPetrol ? 1 : 0
    ];

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data.prediction[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carbon Emission Predictor</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              OBFCM Fuel Consumption (l/100 km)
            </label>
            <input
              type="number"
              name="obfcmConsumption"
              value={formData.obfcmConsumption}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Vehicles
            </label>
            <input
              type="number"
              name="numVehicles"
              value={formData.numVehicles}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Absolute Gap Fuel Consumption (l/100 km)
            </label>
            <input
              type="number"
              name="absoluteGap"
              value={formData.absoluteGap}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Percentage Gap Fuel Consumption (%)
            </label>
            <input
              type="number"
              name="percentageGap"
              value={formData.percentageGap}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDieselElectric"
                checked={formData.isDieselElectric}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">
                Diesel/Electric Vehicle
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPetrol"
                checked={formData.isPetrol}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium">
                Petrol Vehicle
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Calculating...' : 'Predict Carbon Emission'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded flex items-center">
          <AlertCircle className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {prediction !== null && !error && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded flex items-center">
          <CheckCircle2 className="mr-2" />
          <span>Predicted Carbon Emission: {prediction}</span>
        </div>
      )}
    </div>
  );
}