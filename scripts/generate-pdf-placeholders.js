const fs = require('fs');
const path = require('path');

// List of PDF resources from TeachingContent.tsx and PublicationsSection.tsx
const pdfResources = [
  // Teaching resources
  'complex-numbers.pdf',
  'linear-systems.pdf',
  'matrix-calculation.pdf',
  'limits-continuity.pdf',
  'convex-functions.pdf',
  'integration-theory.pdf',
  'random-variables.pdf',
  'expectation-variance.pdf',
  'probability-distributions.pdf',
  
  // Publications
  'medical-image-analysis.pdf',
  'crowd-counting.pdf'
];

// Read the placeholder HTML file
const placeholderPath = path.join(__dirname, '../public/docs/placeholder.html');
const placeholderContent = fs.readFileSync(placeholderPath, 'utf-8');

// Create a placeholder HTML file for each PDF
pdfResources.forEach(resource => {
  const outputPath = path.join(__dirname, '../public/docs', resource.replace('.pdf', '.html'));
  fs.writeFileSync(outputPath, placeholderContent);
  console.log(`Created placeholder for ${resource}`);
});

console.log('All placeholder files created!'); 