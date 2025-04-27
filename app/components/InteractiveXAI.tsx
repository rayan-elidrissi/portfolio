'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Feature {
  name: string;
  score: number;
}

interface MockData {
  id: string;
  title: string;
  technology: string;
  image: string;
  confidence: number;
  features: Feature[];
}

const mockData: MockData[] = [
  {
    id: 'brain-mri',
    title: 'Brain MRI Analysis',
    technology: 'Vision Transformer (ViT)',
    image: '/images/mri.png',
    confidence: 0.97,
    features: [
      { name: 'Temporal Lobe', score: 0.88 },
      { name: 'Ventricular System', score: 0.72 },
      { name: 'Corpus Callosum', score: 0.65 },
      { name: 'Cerebellum', score: 0.48 }
    ]
  },
  {
    id: 'craftsman',
    title: 'Craftsman Tool Analysis',
    technology: 'ResNet with Feature Pyramid',
    image: '/images/goldsmith.png',
    confidence: 0.94,
    features: [
      { name: 'Tool Condition', score: 0.91 },
      { name: 'Technique Pattern', score: 0.82 },
      { name: 'Material Type', score: 0.77 },
      { name: 'Work Environment', score: 0.65 }
    ]
  },
  {
    id: 'environment',
    title: 'Environmental Monitoring',
    technology: 'U-Net with Attention Gates',
    image: '/images/wildfire.png',
    confidence: 0.89,
    features: [
      { name: 'Fire Intensity', score: 0.87 },
      { name: 'Smoke Density', score: 0.79 },
      { name: 'Vegetation Type', score: 0.72 },
      { name: 'Wind Direction', score: 0.63 }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Market Analysis',
    technology: 'Temporal Fusion Transformer',
    image: '/images/chart.png',
    confidence: 0.92,
    features: [
      { name: 'Volatility Pattern', score: 0.90 },
      { name: 'Trading Volume', score: 0.83 },
      { name: 'Time Pattern', score: 0.76 },
      { name: 'Related News', score: 0.64 }
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Quality Control',
    technology: 'EfficientNet with Graph Networks',
    image: '/images/circuit.png',
    confidence: 0.95,
    features: [
      { name: 'Surface Defects', score: 0.93 },
      { name: 'Component Alignment', score: 0.84 },
      { name: 'Material Integrity', score: 0.78 },
      { name: 'Assembly Quality', score: 0.69 }
    ]
  }
];

const vizTypes = ['Heatmap', 'Gradient', 'Segmentation'];
const explanationMethods = ['Grad-CAM', 'LIME', 'SHAP', 'Integrated Gradients'];

interface FeatureBarProps {
  name: string;
  score: number;
}

const FeatureBar = ({ name, score }: FeatureBarProps) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm">{name}</span>
      <span className="text-sm">{score.toFixed(2)}</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div 
        className="h-2.5 rounded-full" 
        style={{ 
          width: `${score * 100}%`,
          background: score > 0.8 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 
                    score > 0.6 ? 'linear-gradient(90deg, #f97316, #facc15)' :
                    score > 0.4 ? 'linear-gradient(90deg, #84cc16, #10b981)' :
                    'linear-gradient(90deg, #10b981, #06b6d4)'
        }}
      ></div>
    </div>
  </div>
);

const InteractiveXAI = () => {
  const [selectedExample, setSelectedExample] = useState(mockData[0]);
  const [visualizationType, setVisualizationType] = useState(vizTypes[0]);
  const [explanationMethod, setExplanationMethod] = useState(explanationMethods[0]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 pt-24 pb-32 overflow-hidden bg-white dark:bg-gray-950">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Interactive Multimodal XAI
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore how our explainable AI techniques provide transparent insights across various imaging modalities.
          </p>
        </motion.div>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Example selector - Side panel */}
            <div className="lg:col-span-3 space-y-4">
              {mockData.map((example) => (
                <div 
                  key={example.id}
                  onClick={() => setSelectedExample(example)}
                  className={`cursor-pointer flex items-center p-3 rounded-lg ${
                    selectedExample.id === example.id 
                      ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700' 
                      : 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className="h-16 w-16 relative rounded-md overflow-hidden mr-3">
                    <Image 
                      src={example.image}
                      alt={example.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{example.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{example.technology}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Main visualization area */}
            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{selectedExample.title}</h3>
                  <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm">
                    Confidence: {selectedExample.confidence.toFixed(2)}
                  </div>
                </div>
                
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={selectedExample.image} 
                    alt={selectedExample.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {vizTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setVisualizationType(type)}
                      className={`py-2 px-4 rounded-md text-sm ${
                        visualizationType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {explanationMethods.map(method => (
                    <button
                      key={method}
                      onClick={() => setExplanationMethod(method)}
                      className={`py-1 px-3 rounded-md text-xs ${
                        explanationMethod === method
                          ? 'bg-indigo-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Feature importance panel */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-4">Feature Importance</h3>
                <div className="space-y-3">
                  {selectedExample.features.map((feature) => (
                    <FeatureBar 
                      key={feature.name} 
                      name={feature.name} 
                      score={feature.score} 
                    />
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-3">Technical Details</h4>
                  <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                    <p>Model: {selectedExample.technology}</p>
                    <p>XAI Method: {explanationMethod}</p>
                    <p>Visualization: {visualizationType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveXAI; 