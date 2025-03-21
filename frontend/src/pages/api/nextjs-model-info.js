export default function handler(req, res) {
    // Hardcoded model information
    const modelInfo = {
      model_scale: {
        x: 1.0,
        y: 1.0,
        z: 1.0
      },
      face_count: 12,
      model_type: "Primitive",
      creation_date: "2025-03-21",
      source: "Next.js API Route"
    };
  
    res.status(200).json(modelInfo);
  }