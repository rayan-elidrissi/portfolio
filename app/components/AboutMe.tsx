'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiDownload, FiPlayCircle } from 'react-icons/fi';
import { useState, useRef } from 'react';

const AboutMe = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const skills = {
    technical: [
      "Python", "R", "C++", "SQL", "C#", "JavaScript", "HTML/CSS"
    ],
    frameworks: [
      "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "Spark", "AWS", "Kubernetes", "Docker"
    ],
    languages: [
      "English (TOEIC C1)", "French (Native)", "German (Basic)", "Arabic (Basic)"
    ],
    research: [
      "Computer Vision", "Machine Learning", "Human-Computer Interaction", "Edge Computing", "Explainable AI"
    ]
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-28 relative z-20"
    >
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 mb-20">
          <div className="md:w-1/3">
            <div className="relative h-72 w-full md:h-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-1">
              <div className="h-full w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/me.png"
                  alt="Rayan El Idrissi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              I am a Master Engineering Student at ESILV in Paris majoring in Computer Science and enrolled in the Research Track program.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              My research interests lie at the intersection of Computer Vision, Human-Computer Interaction and Distributed Systems.
            </p>
            <ul className="list-disc pl-8 text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-3">
              <li>Developing transparent AI systems for computer vision applications</li>
              <li>Creating human-centered interfaces for AI-driven analysis</li>
              <li>Exploring edge computing strategies for distributed AI systems</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Experience</h3>
            <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
          </div>
          
          <div className="space-y-10">
            {/* Experience 1 */}
            <div className="border-l-2 border-blue-500 dark:border-blue-400 pl-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">April 2025 — Present</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Computer Vision & HCI Research Intern</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">Mines Paris - PSL | Paris, France</p>
              <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>• Contributing to the European UNESCO cultural heritage project ReSource</li>
                <li>• Developing an automated video annotation model for craftsmanship pedagogical purposes</li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="border-l-2 border-cyan-500 dark:border-cyan-400 pl-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">April 2025 — Present</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Head of AI</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">KRYPTOSPHERE® DeVinci | Paris, France</p>
              <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>• Contributing to the European UNESCO cultural heritage project ReSource</li>
                <li>• Developing an automated video annotation model for craftsmanship pedagogical purposes</li>
              </ul>
            </div>
            
            {/* Experience 3 */}
            <div className="border-l-2 border-pink-500 dark:border-pink-400 pl-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Jul 2024 — Present</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Applied Mathematics & Optimization Research Assistant</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">De Vinci Research Center | La Défense, France</p>
              <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>• Developing an AI-based density estimation model</li>
                <li>• Applying computational mathematics for decentralized caching algorithms in edge computing frameworks</li>
              </ul>
            </div>
            
            {/* Experience 4 */}
            <div className="border-l-2 border-green-500 dark:border-green-400 pl-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Jul 2024 — Aug 2024</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Machine Learning Intern</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">TAQA Group | Casablanca, Morocco</p>
              <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>• Engineered a predictive machine learning-based model for the Middle East & North Africa's largest thermal power facility</li>
                <li>• Increased electrical failures predictive accuracy by over 20%</li>
              </ul>
            </div>
            
            {/* Experience 5 */}
            <div className="border-l-2 border-amber-500 dark:border-amber-400 pl-6">
              <div className="mb-2">
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Jan 2024 — April 2025</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Student Financial Strategist</h4>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">De Vinci Partners | La Défense, France</p>
              <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>• Managed financial strategy for HR meetups and career fairs</li>
                <li>• Directly impacted 10,000 students and over 400 firms through strategic financial planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {/*
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Watch My Research Overview</h3>
          <div className="w-full rounded-xl overflow-hidden bg-gray-900 shadow-xl relative">
            <div className="aspect-w-16 aspect-h-9 relative">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/video-thumbnail.jpg"
                controls={isVideoPlaying}
                onEnded={() => setIsVideoPlaying(false)}
              >
                <source src="/videos/research-overview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="text-white text-center">
                    <FiPlayCircle className="mx-auto mb-2" size={64} />
                    <p className="text-xl font-medium">Play Video</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4 italic">
            A brief overview of my research focus and methodologies
          </p>
        </div>
        */}
        
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Skills</h3>
            <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <h4 className="text-xl font-bold mb-4 mt-6 text-gray-900 dark:text-white">Frameworks & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Research Areas</h4>
              <div className="flex flex-wrap gap-2">
                {skills.research.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <h4 className="text-xl font-bold mb-4 mt-6 text-gray-900 dark:text-white">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 
        <div className="text-center mt-20">
          <a
            href="/docs/Rayan_El_Idrissi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 text-xl rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Download CV
            <FiDownload size={24} />
          </a>
        </div>
        */}
      </div>
    </motion.section>
  );
};

export default AboutMe; 