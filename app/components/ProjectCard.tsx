'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFileText } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  role?: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  role,
  technologies,
  imageUrl,
  githubUrl,
  demoUrl,
  paperUrl,
  index,
}: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105 scale-100"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-3">{description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          {githubUrl && (
            <a
              href={githubUrl}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub Repository"
            >
              <FiGithub size={22} />
            </a>
          )}
          
          {demoUrl && (
            demoUrl.startsWith('/') ? (
              <Link
                href={demoUrl}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Live Demo"
              >
                <FiExternalLink size={22} />
              </Link>
            ) : (
              <a
                href={demoUrl}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Live Demo"
              >
                <FiExternalLink size={22} />
              </a>
            )
          )}
          
          {paperUrl && (
            paperUrl.startsWith('/') ? (
              <Link
                href={paperUrl}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Research Paper"
              >
                <FiFileText size={22} />
              </Link>
            ) : (
              <a
                href={paperUrl}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Research Paper"
              >
                <FiFileText size={22} />
              </a>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard; 