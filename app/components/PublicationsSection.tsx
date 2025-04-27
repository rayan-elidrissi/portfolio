'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiDownload } from 'react-icons/fi';

interface Publication {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  pdfUrl?: string;
  externalUrl?: string;
}

const PublicationCard = ({ publication, index }: { publication: Publication; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
          {publication.date}
        </span>
        <h3 className="text-xl font-bold mb-3">{publication.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {publication.summary}
        </p>
        
        {publication.tags && publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {publication.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 mt-5">
          {publication.pdfUrl && (
            <a 
              href={publication.pdfUrl}
              download
              className="flex items-center text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiDownload className="mr-1" size={14} />
              PDF
            </a>
          )}
          
          {publication.externalUrl && (
            <a 
              href={publication.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
            >
              <FiExternalLink className="mr-1" size={14} />
              View Publication
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const PublicationsSection = () => {
  const publications = [
    {
      title: "Enhancing Medical Diagnostics with Explainable AI and Interactive Visualizations",
      summary: "This paper presents a novel framework for visualization of AI interpretations in medical imagery, enabling clinicians to better understand diagnostic predictions and improve decision-making processes.",
      tags: ["Explainable AI", "Medical Imaging", "Interactive Visualization", "Healthcare"],
      date: "2023",
      pdfUrl: "#",
      externalUrl: "#"
    },
    {
      title: "Towards Explainable Deep Learning for Medical Image Analysis",
      summary: "This paper presents a novel approach to making deep learning models for medical image analysis more transparent and interpretable, addressing the 'black box' problem in AI diagnostics.",
      tags: ["Deep Learning", "Medical Imaging", "Explainable AI"],
      date: "2022",
      pdfUrl: "#",
      externalUrl: "#"
    },
    {
      title: "Efficient Point-Based Crowd Counting with Density-Aware Feature Fusion",
      summary: "We present a novel approach to crowd counting that leverages point annotations and multi-scale feature fusion to accurately estimate crowd density in challenging scenarios with varying crowd densities and perspective distortions.",
      tags: ["Crowd Analysis", "Computer Vision", "Deep Learning"],
      date: "Under Review, 2025",
      pdfUrl: "/docs/crowd-counting.pdf",
      externalUrl: "#"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-20"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">Publications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {publications.map((publication, index) => (
          <PublicationCard 
            key={index}
            publication={publication}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default PublicationsSection; 