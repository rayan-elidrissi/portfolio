'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import AnimatedBackground from './AnimatedBackground';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Set up particle exclusion zone around text
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Function to create an invisible repeller div
    const createRepeller = (element: HTMLElement, extraBuffer: number = 30) => {
      const rect = element.getBoundingClientRect();
      const buffer = extraBuffer; // Buffer space around the text
      
      const repeller = document.createElement('div');
      repeller.classList.add('particle-repeller');
      repeller.style.position = 'absolute';
      repeller.style.left = `${rect.left - buffer}px`;
      repeller.style.top = `${rect.top - buffer}px`;
      repeller.style.width = `${rect.width + (buffer * 2)}px`;
      repeller.style.height = `${rect.height + (buffer * 2)}px`;
      repeller.style.zIndex = '5';
      repeller.style.pointerEvents = 'none';
      
      // Debug style (uncomment to see the repulsion areas)
      // repeller.style.border = '1px solid rgba(255, 0, 0, 0.2)';
      // repeller.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
      
      // Add data attribute for tsparticles to detect
      repeller.setAttribute('data-repel', 'true');
      
      document.body.appendChild(repeller);
      return repeller;
    };

    // Function to create a protective shield around text
    const createShield = () => {
      const textContainer = textContainerRef.current;
      if (!textContainer) return [];
      
      const repellers: HTMLElement[] = [];
      
      // Create a large central shield
      const containerRect = textContainer.getBoundingClientRect();
      const centralShield = document.createElement('div');
      centralShield.classList.add('particle-repeller');
      centralShield.style.position = 'absolute';
      centralShield.style.left = `${containerRect.left - 100}px`;
      centralShield.style.top = `${containerRect.top - 100}px`;
      centralShield.style.width = `${containerRect.width + 200}px`;
      centralShield.style.height = `${containerRect.height + 200}px`;
      centralShield.style.zIndex = '5';
      centralShield.style.pointerEvents = 'none';
      centralShield.style.borderRadius = '20px';
      
      // Debug style
      // centralShield.style.border = '2px solid rgba(255, 0, 0, 0.3)';
      // centralShield.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
      
      centralShield.setAttribute('data-repel', 'true');
      document.body.appendChild(centralShield);
      repellers.push(centralShield);
      
      // Add specific shields for each text element
      const heading = textContainer.querySelector('h1');
      const description = textContainer.querySelector('.description-text');
      const buttons = textContainer.querySelectorAll('.hero-button');
      
      if (heading && heading instanceof HTMLElement) {
        repellers.push(createRepeller(heading, 3));
      }
      
      if (description && description instanceof HTMLElement) {
        repellers.push(createRepeller(description, 3));
      }
      
      buttons.forEach(button => {
        if (button && button instanceof HTMLElement) {
          repellers.push(createRepeller(button, 3));
        }
      });
      
      // Add shields for the container backgrounds - fix the selector to avoid brackets
      const bgContainers = textContainer.querySelectorAll('div[class*="backdrop-blur"]');
      bgContainers.forEach(container => {
        if (container && container instanceof HTMLElement) {
          repellers.push(createRepeller(container, 2));
        }
      });
      
      return repellers;
    };
    
    // Initial shield creation
    let repellers = createShield();
    
    // Add left and right vertical barriers to guide particles around the text
    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const containerRect = textContainerRef.current?.getBoundingClientRect();
      
      if (containerRect) {
        // Create left barrier
        const leftBarrier = document.createElement('div');
        leftBarrier.classList.add('particle-repeller');
        leftBarrier.style.position = 'absolute';
        leftBarrier.style.left = `${containerRect.left - 80}px`;
        leftBarrier.style.top = `${sectionRect.top}px`;
        leftBarrier.style.width = '20px';
        leftBarrier.style.height = `${sectionRect.height}px`;
        leftBarrier.style.zIndex = '5';
        leftBarrier.style.pointerEvents = 'none';
        
        // Debug style
        // leftBarrier.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
        
        leftBarrier.setAttribute('data-repel', 'true');
        document.body.appendChild(leftBarrier);
        repellers.push(leftBarrier);
        
        // Create right barrier
        const rightBarrier = document.createElement('div');
        rightBarrier.classList.add('particle-repeller');
        rightBarrier.style.position = 'absolute';
        rightBarrier.style.left = `${containerRect.right + 60}px`;
        rightBarrier.style.top = `${sectionRect.top}px`;
        rightBarrier.style.width = '20px';
        rightBarrier.style.height = `${sectionRect.height}px`;
        rightBarrier.style.zIndex = '5';
        rightBarrier.style.pointerEvents = 'none';
        
        // Debug style
        // rightBarrier.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
        
        rightBarrier.setAttribute('data-repel', 'true');
        document.body.appendChild(rightBarrier);
        repellers.push(rightBarrier);
      }
    }
    
    // Function to update all shields on resize
    const updateShields = () => {
      // Remove old shields
      repellers.forEach(r => {
        if (r && r.parentNode) {
          r.parentNode.removeChild(r);
        }
      });
      
      // Create new shields
      repellers = createShield();
      
      // Add barriers again
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const containerRect = textContainerRef.current?.getBoundingClientRect();
        
        if (containerRect) {
          // Create left barrier
          const leftBarrier = document.createElement('div');
          leftBarrier.classList.add('particle-repeller');
          leftBarrier.style.position = 'absolute';
          leftBarrier.style.left = `${containerRect.left - 80}px`;
          leftBarrier.style.top = `${sectionRect.top}px`;
          leftBarrier.style.width = '20px';
          leftBarrier.style.height = `${sectionRect.height}px`;
          leftBarrier.style.zIndex = '5';
          leftBarrier.style.pointerEvents = 'none';
          leftBarrier.setAttribute('data-repel', 'true');
          document.body.appendChild(leftBarrier);
          repellers.push(leftBarrier);
          
          // Create right barrier
          const rightBarrier = document.createElement('div');
          rightBarrier.classList.add('particle-repeller');
          rightBarrier.style.position = 'absolute';
          rightBarrier.style.left = `${containerRect.right + 60}px`;
          rightBarrier.style.top = `${sectionRect.top}px`;
          rightBarrier.style.width = '20px';
          rightBarrier.style.height = `${sectionRect.height}px`;
          rightBarrier.style.zIndex = '5';
          rightBarrier.style.pointerEvents = 'none';
          rightBarrier.setAttribute('data-repel', 'true');
          document.body.appendChild(rightBarrier);
          repellers.push(rightBarrier);
        }
      }
    };
    
    // Handle window resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateShields, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
      repellers.forEach(r => {
        if (r && r.parentNode) {
          r.parentNode.removeChild(r);
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[110vh] flex items-center justify-center px-6 pt-24 pb-32 relative overflow-hidden">
      {/* Animated background that extends beyond the section */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={textContainerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="backdrop-blur-[2px] py-3 px-5 rounded-xl bg-white/5 dark:bg-gray-900/5 mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI & HCI Research Scientist
            </h1>
          </div>
          
          <div className="relative mb-8 inline-block backdrop-blur-[2px] rounded-3xl bg-white/5 dark:bg-gray-900/5 p-1">
            <div 
              className="absolute inset-0 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10" 
              style={{ 
                borderRadius: '25px',
                transform: 'scale(1.03)',
              }}
            ></div>
            <p className="relative text-lg md:text-xl text-gray-700/90 dark:text-gray-300/90 px-5 py-3 description-text">
              Building human-centered AI systems that bridge technical innovation with user needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 backdrop-blur-[2px] py-3 px-5 rounded-xl bg-white/5 dark:bg-gray-900/5">
            <Link 
              href="/research" 
              className="hero-button px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              View Research
              <FiArrowRight />
            </Link>
            
            <Link 
              href="/about" 
              className="hero-button px-8 py-4 text-lg rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              About Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 