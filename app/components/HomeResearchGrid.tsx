'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

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
];

const HomeResearchGrid = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-24 relative z-20"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Exploring innovative solutions at the intersection of AI, computer vision, and human-computer interaction.</p>
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
      
      <div className="text-center mt-16">
        <Link 
          href="/research"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          View All Projects
        </Link>
      </div>
    </motion.section>
  );
};

export default HomeResearchGrid; 