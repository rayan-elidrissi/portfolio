'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Crafting & Digital Tools",
    description: "Research on craftsmanship pedagogy enhanced by digital tools, with a focus on annotation and knowledge transfer in skilled trades.",
    role: "Research Lead",
    technologies: ["Computer Vision", "Knowledge Transfer", "HCI"],
    imageUrl: "/images/goldsmith.png",
    paperUrl: "#",
    demoUrl: "/demos/crafting-digital-tools",
    githubUrl: "https://github.com/rayan-elidrissi/caor/tree/master/augmentor"
  },
  {
    title: "Wildfire Detection & Monitoring Systems",
    description: "Development of computer vision systems for early detection and monitoring of wildfires in remote and vulnerable areas.",
    role: "Research Assistant",
    technologies: ["Computer Vision", "Remote Sensing", "Early Warning Systems"],
    imageUrl: "/images/wildfire.png",
    paperUrl: "#",
    demoUrl: "#",
    githubUrl: "https://github.com/rayan-elidrissi/UAVs-Swarms"
  },
  {
    title: "Prediction for Cache Placement Optimization in Fog and Edge Computing",
    description: "Development of predictive algorithms for optimizing cache placement in fog and edge computing environments, improving data accessibility and reducing latency in distributed systems.",
    role: "Principal Investigator",
    technologies: ["Edge Computing", "Distributed Systems", "Machine Learning", "Predictive Analytics", "Network Optimization"],
    imageUrl: "/images/edge.png",
    paperUrl: "#",
    githubUrl: "https://github.com/rayan-elidrissi/Caching-Optimization",
    demoUrl: "#"
  },
  {
    title: "LHC Data Analysis & Visualization",
    description: "Creation of interactive visualization tools for Large Hadron Collider data analysis, enabling physicists to explore complex particle collision data through intuitive visual interfaces.",
    role: "Research Collaborator",
    technologies: ["Data Visualization", "High-Energy Physics", "Big Data", "Scientific Computing", "Interactive Tools"],
    imageUrl: "/images/lhc.png",
    paperUrl: "#",
    githubUrl: "https://github.com/rayan-elidrissi/LHC-Explorer",
    demoUrl: "#"
  },
  {
    title: "Crowd-Counting & Localization Framework",
    description: "Development of density-aware feature fusion techniques for more accurate crowd counting and analysis in varying environments.",
    role: "Project Lead",
    technologies: ["Crowd Analysis", "Computer Vision", "Deep Learning"],
    imageUrl: "/images/crowd.png",
    paperUrl: "#",
    githubUrl: "https://github.com/rayan-elidrissi/Point-Based-Crowd-Counting",
    demoUrl: "#",
  },
  {
    title: "Explainable AI for Medical Imaging",
    description: "Development of transparent AI systems that provide visual explanations for medical image analysis, enhancing diagnostic accuracy and clinician trust through interactive visualization techniques.",
    role: "Principal Investigator",
    technologies: ["Explainable AI", "Medical Imaging", "Interactive Visualization", "Deep Learning", "Healthcare"],
    imageUrl: "/images/mri.png",
    paperUrl: "#",
    githubUrl: "https://github.com/rayan-elidrissi/Explainable-Image-Classifier",
    demoUrl: "/demos/xai-medical"
  },
];

const ResearchGrid = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-24 relative z-20"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Research Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Exploring the frontiers of AI research with applications in healthcare, environment, and human-computer interaction.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            index={index}
            {...project}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ResearchGrid; 