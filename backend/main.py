from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/python-model-info")
def get_model_info():
    """Return hardcoded model information"""
    return {
        "model_name": "Prototype Cube",
        "vertex_count": 24,
        "texture_details": {
            "texture_name": "cube_texture.jpg",
            "resolution": "2048x2048",
            "format": "JPG",
            "color_space": "sRGB"
        },
        "source": "Python Backend (FastAPI)"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)