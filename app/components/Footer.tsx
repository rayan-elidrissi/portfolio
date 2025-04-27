'use client';

import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Let's Collaborate</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Open to research opportunities and collaborations.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <a
              href="mailto:contact@rayanelid.com"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FiMail className="mr-2" />
              contact@rayanelid.com
            </a>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <FiGithub size={20} />
              </a>
              
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin size={20} />
              </a>
              
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter Profile"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-200 dark:border-gray-800 my-8" />
        
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          © {currentYear} Rayan El Idrissi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 