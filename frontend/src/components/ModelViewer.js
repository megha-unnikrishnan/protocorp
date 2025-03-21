import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ModelViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001f3f);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create a texture loader
    const textureLoader = new THREE.TextureLoader();
    let material = new THREE.MeshStandardMaterial({ color: 0x4A90E2 }); // Soft Blue


    // Load texture (first attempt to load from public/textures)
    textureLoader.load(
      '/textures/car_texture.jpg',
      (texture) => {
        material.map = texture;
        material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.log('Texture loading error, using default cube with a basic texture pattern');
        // Create a fallback procedural texture
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Draw a checkered pattern
        const s = canvas.width / 8;
        for (let i = 0; i < canvas.width; i += s) {
          for (let j = 0; j < canvas.height; j += s) {
            context.fillStyle = ((i + j) % (s * 2) === 0) ? '#ddd' : '#aaa';
            context.fillRect(i, j, s, s);
          }
        }
        
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        material.map = fallbackTexture;
        material.needsUpdate = true;
      }
    );

    // Load OBJ model
    const objLoader = new OBJLoader();
    
    // Try to load the model from public/models
    objLoader.load(
      '/models/cube.obj',
      (object) => {
        // Apply material with texture to all mesh children
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });
        scene.add(object);
      },
      undefined,
      (error) => {
        console.log('Model loading error, creating a default cube:', error);
        // Create a default cube if loading fails
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ModelViewer;