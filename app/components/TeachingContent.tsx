'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

interface Resource {
  title: string;
  description: string;
  pdfUrl: string;
}

interface CategoryProps {
  title: string;
  resources: Resource[];
  accentColor: string;
}

const ResourceCard = ({ title, description, pdfUrl, accentColor }: Resource & { accentColor: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border-t-2" style={{ borderColor: accentColor }}>
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-3">
          <FiFileText style={{ color: accentColor }} className="mr-2" size={20} />
          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h4>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 space-y-3">
          {description.split('\n\n').map((bullet, index) => (
            <p key={index} className="ml-0">{bullet}</p>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-3 flex justify-end items-center gap-3">
        <Link 
          href={pdfUrl} 
          target="_blank"
          style={{ color: accentColor }}
          className="hover:opacity-80 transition-colors"
          aria-label="Preview document"
        >
          <FiExternalLink size={18} />
        </Link>
        <a 
          href={pdfUrl} 
          download
          style={{ color: accentColor }}
          className="hover:opacity-80 transition-colors"
          aria-label="Download document"
        >
          <FiDownload size={18} />
        </a>
      </div>
    </div>
  );
};

const SubjectCategory = ({ title, resources, accentColor }: CategoryProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="ml-4 h-px bg-gray-200 dark:bg-gray-700 flex-grow"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((resource, index) => (
          <ResourceCard 
            key={index}
            {...resource}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  );
};

const TeachingContent = () => {
  const teachingCategories = [
    {
      title: "Algebra & Matrix",
      accentColor: "#ea4335",
      resources: [
        {
          title: "Complex Numbers",
          description: "• 1545: First solutions for cubic equations, Gerolamo Cardano\n\n• 1748: Introduction of 'i' imaginary notation, Leonhard Euler\n\n• 1799: Complete geometric interpretation, Carl Friedrich Gauss",
          pdfUrl: "/docs/complex-numbers.pdf"
        },
        {
          title: "Linear Systems",
          description: "• 200 BCE: First systematic treatment of linear equations, Ancient Chinese mathematicians\n\n• 1750: Rule for solving linear systems, Gabriel Cramer\n\n• 1810: Gaussian elimination method, Carl Friedrich Gauss",
          pdfUrl: "/docs/linear-systems.pdf"
        },
        {
          title: "Matrix Calculation",
          description: "• 1858: First known formal matrix algebra, Arthur Cayley\n\n• 1878: Linear transformations, Georg Frobenius\n\n• 1904: Eigenvalue theory foundations, David Hilbert",
          pdfUrl: "/docs/matrix-calculation.pdf"
        }
      ]
    },
    {
      title: "Analysis & Geometry",
      accentColor: "#34a853",
      resources: [
        {
          title: "Limits & Continuity",
          description: "• 1821: Foundations of calculus and continuity, Augustin-Louis Cauchy\n\n• 1854: Riemann integral definition, Bernhard Riemann\n\n• 1860s: Epsilon-delta limit definition, Karl Weierstrass",
          pdfUrl: "/docs/limits-continuity.pdf"
        },
        {
          title: "Convex Functions",
          description: "• 1896: Foundational convex set theory, Hermann Minkowski\n\n• 1949: Convex analysis development, Werner Fenchel\n\n• 1960s: Modern convex optimization theory, R. Tyrrell Rockafellar",
          pdfUrl: "/docs/convex-functions.pdf"
        },
        {
          title: "Integration Theory",
          description: "• 1854: Riemann integral introduction, Bernhard Riemann\n\n• 1902: Measure theory and Lebesgue integral, Henri Lebesgue\n\n• 1933: Probability measure axioms, Andrey Kolmogorov",
          pdfUrl: "/docs/integration-theory.pdf"
        }
      ]
    },
    {
      title: "Probability & Applications",
      accentColor: "#4285f4",
      resources: [
        {
          title: "Random Variables",
          description: "• 1654: Probability foundations, Blaise Pascal and Pierre Fermat\n\n• 1713: Law of large numbers, Jacob Bernoulli\n\n• 1933: Axiomatization with measure theory, Andrey Kolmogorov",
          pdfUrl: "/docs/random-variables.pdf"
        },
        {
          title: "Expectation & Variance",
          description: "• 1718: Theory of deviations, Abraham de Moivre\n\n• 1809: Error theory and normal distribution, Carl Friedrich Gauss\n\n• 1812: Probability theory formalization, Pierre-Simon Laplace",
          pdfUrl: "/docs/expectation-variance.pdf"
        },
        {
          title: "Probability Distributions",
          description: "• 1713: Binomial distribution, Jacob Bernoulli\n\n• 1837: Poisson distribution, Siméon Denis Poisson\n\n• 1925: Statistical distributions theory, Ronald Fisher",
          pdfUrl: "/docs/probability-distributions.pdf"
        }
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-24 relative z-20"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Teaching</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Sharing mathematical foundations with students in undergraduate programs and French preparatory classes.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {teachingCategories.map((category, index) => (
          <SubjectCategory 
            key={index}
            title={category.title}
            resources={category.resources}
            accentColor={category.accentColor}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default TeachingContent;