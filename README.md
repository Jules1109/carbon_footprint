# carbon_footprint
the command to launch the backend with docker
```bash
   cd app/backend
   docker build -t carbon_pred_backend . 
   docker run -p 8000:8000 carbon_pred_backend
   ```

the command to launch the frontend 

```bash
   cd app/frontend
   docker build -t carbon_pred_frontend . 
   docker run -p 3000:3000 carbon_pred_frontend
   ```