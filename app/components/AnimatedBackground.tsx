'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine, IParticle } from 'tsparticles-engine';
import { useTheme } from 'next-themes';

// Throttle function to limit how often a function can be called
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const AnimatedBackground = () => {
  const { resolvedTheme } = useTheme();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const cleanupRef = useRef<(() => void) | null>(null);

  const isDarkMode = resolvedTheme === 'dark';
  
  // Handle resize events with proper debouncing
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Throttle resize events to improve performance
    const throttledHandleResize = throttle(handleResize, 100);
    
    // Add event listener
    window.addEventListener('resize', throttledHandleResize);
    
    // Initial call
    handleResize();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);

  // Cleanup effect for particle exclusion zones
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Container loaded callback
  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      // When particles container loads, ensure it's properly initialized
      container.refresh();
      
      // After particles are loaded, set up exclusion zones
      // Commented out: setupExclusionZones(container);
    }
  }, [windowSize.width, windowSize.height]);
  
  // Function to set up manual particle exclusion zones
  const setupExclusionZones = (container: Container) => {
    // First, wait for DOM to be fully loaded
    setTimeout(() => {
      try {
        /* Commented out exclusion zone functionality
        // Find all text elements that need exclusion zones
        const headings = document.querySelectorAll('h1');
        const descriptions = document.querySelectorAll('.description-text');
        const buttons = document.querySelectorAll('.hero-button');
        const repellers = document.querySelectorAll('[data-repel="true"]');
        
        // Collect all elements that need protection
        const allElements = [...Array.from(headings), 
                            ...Array.from(descriptions), 
                            ...Array.from(buttons),
                            ...Array.from(repellers)];
        
        // Create exclusion rectangles                    
        const exclusionZones: Array<{x: number, y: number, width: number, height: number}> = [];
        
        allElements.forEach(element => {
          if (element instanceof HTMLElement) {
            const rect = element.getBoundingClientRect();
            const buffer = 20; // Buffer around element
            
            exclusionZones.push({
              x: rect.left - buffer,
              y: rect.top - buffer,
              width: rect.width + (buffer * 2),
              height: rect.height + (buffer * 2)
            });
          }
        });
        
        // Apply the exclusion zones by moving particles out of them
        const moveParticlesOutOfZones = () => {
          if (!container) return;
          
          // For each particle, check if it's in an exclusion zone
          const particles = container.particles.filter(() => true); // Get all particles
          
          particles.forEach((particle: IParticle) => {
            for (const zone of exclusionZones) {
              if (
                particle.position.x >= zone.x && 
                particle.position.x <= zone.x + zone.width &&
                particle.position.y >= zone.y && 
                particle.position.y <= zone.y + zone.height
              ) {
                // Particle is in exclusion zone - move it outside
                // Find the nearest edge and move particle outside
                const distToLeft = particle.position.x - zone.x;
                const distToRight = zone.x + zone.width - particle.position.x;
                const distToTop = particle.position.y - zone.y;
                const distToBottom = zone.y + zone.height - particle.position.y;
                
                // Find the minimum distance
                const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
                
                // Move particle outside based on nearest edge
                if (minDist === distToLeft) {
                  particle.position.x = zone.x - 5; // 5px outside
                } else if (minDist === distToRight) {
                  particle.position.x = zone.x + zone.width + 5;
                } else if (minDist === distToTop) {
                  particle.position.y = zone.y - 5;
                } else {
                  particle.position.y = zone.y + zone.height + 5;
                }
                
                // Slightly adjust velocity to move away from zone
                if (minDist === distToLeft || minDist === distToRight) {
                  particle.velocity.x = -particle.velocity.x;
                } else {
                  particle.velocity.y = -particle.velocity.y;
                }
                
                break; // We've moved the particle, no need to check other zones
              }
            }
          });
        };
        
        // Set up an interval to keep particles out of the exclusion zones
        const intervalId = setInterval(moveParticlesOutOfZones, 100);
        
        // Handle window resize - update exclusion zones
        const updateZones = () => {
          exclusionZones.length = 0; // Clear array
          
          allElements.forEach(element => {
            if (element instanceof HTMLElement) {
              const rect = element.getBoundingClientRect();
              const buffer = 20;
              
              exclusionZones.push({
                x: rect.left - buffer,
                y: rect.top - buffer,
                width: rect.width + (buffer * 2),
                height: rect.height + (buffer * 2)
              });
            }
          });
        };
        
        window.addEventListener('resize', updateZones);
        
        // Clean up when container is destroyed
        const cleanUp = () => {
          clearInterval(intervalId);
          window.removeEventListener('resize', updateZones);
        };
        
        // Store cleanup function in ref for component unmount
        cleanupRef.current = cleanUp;
        */
        
        // No exclusion zones are being created, only initializing the container
        cleanupRef.current = () => {}; // Empty cleanup function
        
      } catch (error) {
        console.error("Error setting up particle exclusion zones:", error);
      }
    }, 500); // Wait 500ms for DOM to be ready
  };

  return (
    <>
      {/* Add a style tag with CSS to prevent mouse events on buttons from reaching the particles canvas */}
      <style jsx global>{`
        .hero-button {
          position: relative;
          z-index: 10;
          pointer-events: auto;
        }
        #tsparticles {
          pointer-events: auto;
        }
        /* Prevent particle canvas from receiving events when hovering buttons */
        .hero-button:hover ~ #tsparticles {
          pointer-events: none;
        }
        /* Prevent particle canvas from receiving events when hovering the AI & HCI research scientist section */
        [data-section="research-scientist"]:hover ~ #tsparticles,
        [data-section="research-scientist"] *:hover ~ #tsparticles,
        .research-scientist-section:hover ~ #tsparticles,
        .research-scientist-section *:hover ~ #tsparticles {
          pointer-events: none;
        }
      `}</style>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="absolute inset-0 w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
      options={{
        fullScreen: false,
        background: {
          color: {
            value: isDarkMode ? '#111827' : '#ffffff',
          },
        },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          color: {
            value: isDarkMode ? 
              ['#00FFFF', '#FF00FF', '#FFFF00', '#FF0000', '#00FF00', '#0088FF'] : 
              ['#E91E63', '#2196F3', '#1DB954', '#FF5722', '#7B1FA2', '#FFC107'],
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: windowSize.width < 768 ? 50 : 100,
          },
          opacity: {
            value: isDarkMode ? 0.7 : 0.8,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1.5, max: 6 },
          },
          links: {
            color: isDarkMode ? '#6b7280' : '#9CA3AF',
            distance: 180,
            enable: true,
            opacity: isDarkMode ? 0.5 : 0.65,
            width: isDarkMode ? 1.2 : 1.5,
          },
          collisions: {
            enable: true,
            mode: "bounce"
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 50
                }
              }
            }
          }
        ],
        pauseOnOutsideViewport: true
      }}
    />
    </>
  );
};

export default AnimatedBackground; 