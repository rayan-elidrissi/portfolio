'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const examples = [
  {
    id: 'example1',
    title: 'Brain MRI Analysis',
    image: '/images/brain.png',
    explanation: 'The model identifies potential anomalies in this T1-weighted brain MRI scan, highlighting regions associated with abnormal tissue density that may indicate pathological conditions.',
    modelType: 'Vision Transformer (ViT)',
    confidenceScore: 0.97,
    featureImportance: [
      { name: 'Temporal Lobe', score: 0.88, color: 'rgb(239, 71, 111)' },
      { name: 'Ventricular System', score: 0.72, color: 'rgb(255, 209, 102)' },
      { name: 'Corpus Callosum', score: 0.65, color: 'rgb(6, 214, 160)' },
      { name: 'Cerebellum', score: 0.48, color: 'rgb(17, 138, 178)' },
    ],
    attentionMaps: [
      { name: 'Layer 1', value: 0.4 },
      { name: 'Layer 4', value: 0.6 },
      { name: 'Layer 8', value: 0.8 },
      { name: 'Layer 12', value: 0.95 },
    ],
  },
  {
    id: 'example2',
    title: 'Craftsman Tool Analysis',
    image: '/images/goldsmith.png',
    explanation: 'Our model identifies craftsmanship quality patterns in custom woodworking tools, detecting subtle characteristics that differentiate master-crafted items from mass-produced alternatives.',
    modelType: 'ResNet with Feature Pyramid',
    confidenceScore: 0.95,
    featureImportance: [
      { name: 'Edge Geometry', score: 0.91, color: 'rgb(239, 71, 111)' },
      { name: 'Material Grain', score: 0.83, color: 'rgb(255, 209, 102)' },
      { name: 'Handle Ergonomics', score: 0.71, color: 'rgb(6, 214, 160)' },
      { name: 'Finish Quality', score: 0.68, color: 'rgb(17, 138, 178)' },
    ],
    attentionMaps: [
      { name: 'Layer 1', value: 0.45 },
      { name: 'Layer 4', value: 0.67 },
      { name: 'Layer 8', value: 0.85 },
      { name: 'Layer 12', value: 0.78 },
    ],
  },
  {
    id: 'example3',
    title: 'Environmental Monitoring',
    image: '/images/wildfire.png',
    explanation: 'This visualization shows how our model processes satellite imagery to detect early indicators of wildfire risk, highlighting vegetation stress patterns and thermal anomalies that precede visible fire activity.',
    modelType: 'U-Net with Attention Gates',
    confidenceScore: 0.93,
    featureImportance: [
      { name: 'Vegetation Density', score: 0.89, color: 'rgb(239, 71, 111)' },
      { name: 'Thermal Hotspots', score: 0.85, color: 'rgb(255, 209, 102)' },
      { name: 'Moisture Content', score: 0.76, color: 'rgb(6, 214, 160)' },
      { name: 'Wind Patterns', score: 0.64, color: 'rgb(17, 138, 178)' },
    ],
    attentionMaps: [
      { name: 'Layer 1', value: 0.55 },
      { name: 'Layer 4', value: 0.75 },
      { name: 'Layer 8', value: 0.92 },
      { name: 'Layer 12', value: 0.7 },
    ],
  },
  {
    id: 'example4',
    title: 'Financial Market Analysis',
    image: '/images/finance.png',
    explanation: 'Our model analyzes complex trading patterns and market sentiment indicators to identify potential market anomalies, providing transparent reasoning for its predictive signals to financial analysts.',
    modelType: 'Temporal Fusion Transformer',
    confidenceScore: 0.92,
    featureImportance: [
      { name: 'Volume Patterns', score: 0.88, color: 'rgb(239, 71, 111)' },
      { name: 'Price Momentum', score: 0.81, color: 'rgb(255, 209, 102)' },
      { name: 'Volatility Index', score: 0.75, color: 'rgb(6, 214, 160)' },
      { name: 'News Sentiment', score: 0.67, color: 'rgb(17, 138, 178)' },
    ],
    attentionMaps: [
      { name: 'Layer 1', value: 0.38 },
      { name: 'Layer 4', value: 0.6 },
      { name: 'Layer 8', value: 0.86 },
      { name: 'Layer 12', value: 0.79 },
    ],
  },
  {
    id: 'example5',
    title: 'Manufacturing Quality Control',
    image: '/images/lhc.png',
    explanation: 'This system inspects semiconductor components for manufacturing defects by analyzing surface patterns, material stress indicators, and dimensional consistency at microscopic levels for quality assurance.',
    modelType: 'EfficientNet with Graph Networks',
    confidenceScore: 0.96,
    featureImportance: [
      { name: 'Edge Precision', score: 0.93, color: 'rgb(239, 71, 111)' },
      { name: 'Surface Texture', score: 0.87, color: 'rgb(255, 209, 102)' },
      { name: 'Solder Quality', score: 0.79, color: 'rgb(6, 214, 160)' },
      { name: 'Dimensional Fit', score: 0.72, color: 'rgb(17, 138, 178)' },
    ],
    attentionMaps: [
      { name: 'Layer 1', value: 0.48 },
      { name: 'Layer 4', value: 0.67 },
      { name: 'Layer 8', value: 0.94 },
      { name: 'Layer 12', value: 0.85 },
    ],
  }
];

const XAIDemo = () => {
  const [activeExample, setActiveExample] = useState(examples[0]);
  const [visualizationMode, setVisualizationMode] = useState('heatmap');
  const [attentionLayerIdx, setAttentionLayerIdx] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [threshold, setThreshold] = useState(0.5);
  const [explainMethod, setExplainMethod] = useState('gradcam');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to simulate drawing different visualization types
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Create a radial gradient to simulate attention
      const createAttentionPattern = () => {
        // Generate between 3-5 focus points based on feature importance
        const focusPoints = activeExample.featureImportance
          .filter(f => f.score >= threshold)
          .map(feature => {
            return {
              x: Math.random() * width * 0.8 + width * 0.1,
              y: Math.random() * height * 0.8 + height * 0.1,
              radius: feature.score * width * 0.3,
              color: feature.color,
              opacity: Math.min(0.7, feature.score)
            };
          });
          
        // Draw each focus point
        focusPoints.forEach(point => {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, point.radius
          );
          
          gradient.addColorStop(0, point.color.replace('rgb', 'rgba').replace(')', `,${point.opacity})`));
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      };
      
      // Create a gradient map visualization
      const createGradientMap = () => {
        // Create horizontal gradient from blue to red
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(0, 0, 255, 0.5)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.5)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add noise pattern for realistic look
        for (let i = 0; i < width * height * 0.1; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 3 + 1;
          const opacity = Math.random() * 0.2;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillRect(x, y, size, size);
        }
      };
      
      // Create a segmentation mask visualization
      const createSegmentation = () => {
        // Clear any previous drawings
        ctx.clearRect(0, 0, width, height);
        
        // Create a semi-transparent overlay for the segmentation base
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw regions based on feature importance with improved segmentation aesthetics
        activeExample.featureImportance.forEach((feature, index) => {
          if (feature.score < threshold) return;
          
          // Use different positioning strategies for different examples to create variety
          let regionCenterX, regionCenterY, regionSize;
          
          // Adjust region positions based on example type to better match the image content
          if (activeExample.id === 'example1') { // Brain MRI
            // Position segments in anatomically relevant areas for brain
            const positions = [
              { x: 0.4, y: 0.35 }, // Temporal lobe
              { x: 0.5, y: 0.5 },  // Ventricular system
              { x: 0.5, y: 0.3 },  // Corpus callosum
              { x: 0.6, y: 0.7 }   // Cerebellum
            ];
            regionCenterX = width * positions[index].x;
            regionCenterY = height * positions[index].y;
            regionSize = feature.score * width * 0.2;
          } else if (activeExample.id === 'example2') { // Craftsman Tool
            // Position segments along the tool's structure
            const positions = [
              { x: 0.3, y: 0.3 },  // Edge geometry
              { x: 0.5, y: 0.5 },  // Material grain
              { x: 0.7, y: 0.4 },  // Handle ergonomics
              { x: 0.6, y: 0.6 }   // Finish quality
            ];
            regionCenterX = width * positions[index].x;
            regionCenterY = height * positions[index].y;
            regionSize = feature.score * width * 0.15;
          } else {
            // For other examples, use a more generic approach with slight randomization
            regionCenterX = width * (0.3 + index * 0.15 + Math.random() * 0.1);
            regionCenterY = height * (0.3 + (index % 3) * 0.15 + Math.random() * 0.1);
            regionSize = feature.score * width * 0.18;
          }
          
          // Create more natural-looking segmentation shapes
          ctx.beginPath();
          
          // For a more realistic segmentation, use bezier curves instead of straight lines
          const numPoints = 10; // More points for smoother edges
          const angleStep = (Math.PI * 2) / numPoints;
          
          // First point
          const startAngle = Math.random() * Math.PI;
          const startRadius = regionSize * (0.85 + Math.random() * 0.3);
          const startX = regionCenterX + Math.cos(startAngle) * startRadius;
          const startY = regionCenterY + Math.sin(startAngle) * startRadius;
          
          ctx.moveTo(startX, startY);
          
          // Create bezier curve segments for more organic shape
          for (let i = 1; i <= numPoints; i++) {
            const angle = startAngle + i * angleStep;
            const nextAngle = startAngle + (i + 1) * angleStep;
            
            // Add some controlled randomness to the radius
            const radius = regionSize * (0.85 + Math.sin(i * 2) * 0.1 + Math.random() * 0.2);
            const nextRadius = regionSize * (0.85 + Math.sin((i+1) * 2) * 0.1 + Math.random() * 0.2);
            
            const x = regionCenterX + Math.cos(angle) * radius;
            const y = regionCenterY + Math.sin(angle) * radius;
            
            // Control points for bezier curve
            const cp1x = regionCenterX + Math.cos(angle - angleStep/3) * (radius * 1.1);
            const cp1y = regionCenterY + Math.sin(angle - angleStep/3) * (radius * 1.1);
            
            // Add the curve
            if (i === numPoints) {
              // Connect back to start point
              ctx.quadraticCurveTo(cp1x, cp1y, startX, startY);
            } else {
              const nextX = regionCenterX + Math.cos(nextAngle) * nextRadius;
              const nextY = regionCenterY + Math.sin(nextAngle) * nextRadius;
              ctx.quadraticCurveTo(cp1x, cp1y, nextX, nextY);
            }
          }
          
          ctx.closePath();
          
          // Create a more realistic segmentation appearance with gradient fill
          const segGradient = ctx.createRadialGradient(
            regionCenterX, regionCenterY, 0,
            regionCenterX, regionCenterY, regionSize * 1.2
          );
          
          // Get the base color
          const baseColor = feature.color.match(/\d+/g);
          if (baseColor && baseColor.length >= 3) {
            const r = parseInt(baseColor[0], 10);
            const g = parseInt(baseColor[1], 10);
            const b = parseInt(baseColor[2], 10);
            
            // Create a subtle gradient for more realistic look
            segGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
            segGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.6)`);
            segGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.2)`);
          } else {
            // Fallback if color parsing fails
            segGradient.addColorStop(0, feature.color.replace('rgb', 'rgba').replace(')', ', 0.8)'));
            segGradient.addColorStop(1, feature.color.replace('rgb', 'rgba').replace(')', ', 0.2)'));
          }
          
          ctx.fillStyle = segGradient;
          ctx.fill();
          
          // Add segment border for better visibility
          ctx.strokeStyle = feature.color.replace('rgb', 'rgba').replace(')', ', 0.9)');
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Add segment label with improved positioning and styling
          const labelX = regionCenterX;
          const labelY = regionCenterY;
          
          // Create background for text to improve readability
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.beginPath();
          const textWidth = ctx.measureText(feature.name).width;
          ctx.roundRect(labelX - textWidth/2 - 4, labelY - 8, textWidth + 8, 16, 4);
          ctx.fill();
          
          // Draw text
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(feature.name, labelX, labelY);
        });
      };
      
      // Display visualization based on mode
      switch (visualizationMode) {
        case 'heatmap':
          createAttentionPattern();
          break;
        case 'gradient':
          createGradientMap();
          break;
        case 'segmentation':
          createSegmentation();
          break;
        default:
          createAttentionPattern();
      }
      
    }, 500);
  }, [activeExample, visualizationMode, attentionLayerIdx, threshold]);

  return (
    <section className="pt-4 pb-16 bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Interactive Multimodal XAI
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore how our explainable AI techniques provide transparent insights
            across various imaging modalities.
          </p>
        </div>
        
        {/* Demo section with blue background */}
        <div className="bg-blue-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Grid layout for the demo interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch p-6">
              {/* Left sidebar - example selector - matched to center height */}
              <div className="lg:col-span-3 flex flex-col">
                <div className="flex flex-col gap-4 h-full">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      className={`p-4 border rounded-lg transition-all duration-200 w-full ${
                        example.id === activeExample.id 
                          ? 'border-blue-500 shadow-md bg-white dark:bg-gray-800' 
                          : 'border-blue-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-700 bg-blue-50/50 dark:bg-gray-800'
                      }`}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setActiveExample(example);
                          setIsLoading(false);
                        }, 300);
                      }}
                    >
                      <div className="flex h-full items-center">
                        {/* Square image on the left */}
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md mr-4">
                          <Image 
                            src={example.image} 
                            alt={example.title}
                            width={80}
                            height={80}
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        
                        {/* Text content on the right - vertically centered */}
                        <div className="text-left flex-grow flex flex-col justify-center">
                          <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">{example.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{example.modelType}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center main visualization area */}
              <div className="lg:col-span-6 bg-blue-200 dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {activeExample.title}
                  </h3>
                  <span className="text-sm bg-blue-300 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 rounded-full">
                    Confidence: {activeExample.confidenceScore.toFixed(2)}
                  </span>
                </div>
                
                <div className="relative mb-5 mx-auto border border-blue-300 dark:border-gray-700 rounded-lg overflow-hidden w-full max-w-md bg-gray-800">
                  <div className="aspect-square flex items-center justify-center">
                    {/* Base image */}
                    <Image 
                      src={activeExample.image} 
                      alt="Base image" 
                      className="rounded-lg"
                      width={512}
                      height={512}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        aspectRatio: '1/1'
                      }}
                      priority
                    />
                    
                    {/* Canvas overlay for visualization */}
                    <canvas 
                      ref={canvasRef} 
                      width={512} 
                      height={512} 
                      className="absolute inset-0 rounded-lg mix-blend-screen"
                    />
                  </div>
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-200/50 dark:bg-black/50 backdrop-blur-sm z-10">
                      <div className="w-10 h-10 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 dark:border-t-blue-400 animate-spin"></div>
                        <div className="absolute inset-1 rounded-full border-2 border-transparent border-r-blue-300 dark:border-r-blue-600 animate-spin" style={{ animationDuration: '1s' }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls section */}
                <div className="mb-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Visualization Type
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {['heatmap', 'gradient', 'segmentation'].map(mode => (
                          <button
                            key={mode}
                            className={`py-2 px-4 text-sm rounded-md ${
                              visualizationMode === mode 
                                ? 'bg-blue-600 text-white font-medium' 
                                : 'bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setVisualizationMode(mode)}
                          >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Explanation Method
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['gradcam', 'lime', 'shap', 'integrated'].map(method => (
                          <button
                            key={method}
                            className={`px-3 py-1 text-sm rounded-md ${
                              explainMethod === method 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-blue-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-blue-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-600'
                            }`}
                            onClick={() => setExplainMethod(method)}
                          >
                            {method === 'gradcam' ? 'Grad-CAM' : 
                             method === 'lime' ? 'LIME' :
                             method === 'shap' ? 'SHAP' : 'Integrated Gradients'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Attention Layer: {activeExample.attentionMaps[attentionLayerIdx].name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="range" 
                            min="0" 
                            max="3" 
                            step="1"
                            value={attentionLayerIdx}
                            onChange={(e) => setAttentionLayerIdx(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Threshold: {threshold.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05"
                            value={threshold}
                            onChange={(e) => setThreshold(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{activeExample.explanation}</p>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 italic mt-auto pt-2">
                  Model architecture: {activeExample.modelType} • Attention visualization: {activeExample.attentionMaps[attentionLayerIdx].name}
                </div>
              </div>
              
              {/* Right sidebar - feature importance */}
              <div className="lg:col-span-3 bg-blue-200 dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col">
                <h4 className="font-semibold mb-5 text-gray-900 dark:text-white">Feature Importance <span className="float-right text-xs text-gray-500 mt-1">Score</span></h4>
                
                <div className="space-y-4 mb-6">
                  {activeExample.featureImportance.map((feature, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-800 dark:text-gray-200">{feature.name}</span>
                        <span className="font-mono text-gray-700 dark:text-gray-300">{feature.score.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-blue-300 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{
                            width: `${feature.score * 100}%`,
                            backgroundColor: feature.color,
                            opacity: feature.score >= threshold ? 1 : 0.3
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Technical Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-100 dark:bg-gray-700/50 p-2 rounded flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Attention Maps</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{activeExample.attentionMaps.length}</span>
                    </div>
                    <div className="bg-blue-100 dark:bg-gray-700/50 p-2 rounded flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Key Features</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{activeExample.featureImportance.length}</span>
                    </div>
                    <div className="bg-blue-100 dark:bg-gray-700/50 p-2 rounded flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Layer Depth</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">12</span>
                    </div>
                    <div className="bg-blue-100 dark:bg-gray-700/50 p-2 rounded flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Attn. Heads</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">16</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-300 dark:border-gray-700">
                  <a 
                    href="#" 
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View research paper
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XAIDemo; 