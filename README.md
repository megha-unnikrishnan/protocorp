# 🔷 Proto Corp 3D Model Viewer

A comprehensive web application that displays interactive 3D models with textures, leveraging both Next.js and Python backends for metadata retrieval.

## ✨ Features

  - ⚡ **Dual Backends**: Integrated Python and Next.js backends providing model metadata
    
  - 🔄 **Real-time 3D Rendering**: Interactive 3D model viewer with orbit controls

  - 🧩 **Texture Support**: Full texture mapping for realistic model appearance
    
  - 📱 **Responsive Design**: Adapts to different screen sizes and devices
    
  - 🔧 **Modular Architecture**: Clean separation of frontend and backend components

## 🛠️ Prerequisites

  - Node.js (v14 or higher)
  - Python (v3.7 or higher)
  - npm 
  - Git

## 🚀 Setup Instructions

### Clone the Repository

   - git clone https://github.com/megha-unnikrishnan/protocorp.git
   - 
   - cd protocorp

### 1️⃣ Python Backend

  1) Navigate to the python-backend directory:

      - cd backend
    
  2)Create a virtual environment:

      - python -m venv venv

  3)Activate the virtual environment:

    On Windows:
        
      - venv\Scripts\activate

    Linux:
  
      - venv/bin/activate

4) Install dependencies:

     - pip install -r requirements.txt

5) Start the Fast API:
   
    uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   
   
###  2️⃣ Frontend Setup (Next.js)

    1)Navigate to the frontend directory:

    - cd frontend

    2)Install dependencies:

    - npm install

    3)Start the development server:

    - npm run 
    
## 📌 Usage

      - Access the frontend at: http://localhost:3000
      
      - API backend runs at: http://127.0.0.1:8000

## 📜 License

This project is licensed under the MIT License.

    
