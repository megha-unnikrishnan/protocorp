



import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Import Three.js components dynamically to avoid SSR issues
const ModelViewer = dynamic(() => import('../components/ModelViewer'), { ssr: false });

export default function Home() {
  const [pythonModelInfo, setPythonModelInfo] = useState(null);
  const [nextjsModelInfo, setNextjsModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from both backends
    const fetchData = async () => {
      try {
        // Fetch from Python backend
        const pythonResponse = await axios.get('http://localhost:8000/python-model-info');
        setPythonModelInfo(pythonResponse.data);

        // Fetch from Next.js API route
        const nextjsResponse = await axios.get('/api/nextjs-model-info');
        setNextjsModelInfo(nextjsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch model information. Please make sure both backends are running.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Proto Corp 3D Model Viewer</title>
        <meta name="description" content="3D Model Viewer with Integrated Backends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Proto Corp 3D Model Viewer</h1>
        
        {/* 3D Model Viewer */}
        <div className="viewerContainer">
          <ModelViewer />
        </div>

        {/* Model Information Display */}
        <div className="infoContainer">
          {loading ? (
            <p>Loading model information...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="modelInfo">
              <div className="infoSection">
                <h2>Python Backend Info</h2>
                {pythonModelInfo && (
                  <div>
                    <p><strong>Model Name:</strong> {pythonModelInfo.model_name}</p>
                    <p><strong>Vertex Count:</strong> {pythonModelInfo.vertex_count}</p>
                    <p><strong>Texture:</strong> {pythonModelInfo.texture_details.texture_name}</p>
                    <p><strong>Resolution:</strong> {pythonModelInfo.texture_details.resolution}</p>
                    <p><strong>Source:</strong> {pythonModelInfo.source}</p>
                  </div>
                )}
              </div>
              
              <div className="infoSection">
                <h2>Next.js Backend Info</h2>
                {nextjsModelInfo && (
                  <div>
                    <p><strong>Scale:</strong> X: {nextjsModelInfo.model_scale.x}, 
                       Y: {nextjsModelInfo.model_scale.y}, 
                       Z: {nextjsModelInfo.model_scale.z}</p>
                    <p><strong>Face Count:</strong> {nextjsModelInfo.face_count}</p>
                    <p><strong>Type:</strong> {nextjsModelInfo.model_type}</p>
                    <p><strong>Created:</strong> {nextjsModelInfo.creation_date}</p>
                    <p><strong>Source:</strong> {nextjsModelInfo.source}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        main {
          width: 100%;
          max-width: 1200px;
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .title {
          margin: 0 0 1rem;
          line-height: 1.15;
          font-size: 2rem;
          text-align: center;
        }

        .viewerContainer {
          width: 100%;
          height: 70vh;
          margin-bottom: 2rem;
          border-radius: 10px;
          overflow: hidden;
          background-color: #f0f0f0;
        }

        .infoContainer {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .modelInfo {
          display: flex;
          width: 100%;
          gap: 2rem;
        }

        .infoSection {
          flex: 1;
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .error {
          color: #e53e3e;
        }

        @media (max-width: 768px) {
          .modelInfo {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
