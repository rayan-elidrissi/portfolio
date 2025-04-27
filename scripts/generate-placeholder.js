const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Generate a simple SVG placeholder
function generateSVG(text, width, height, bgColor, textColor) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">
      ${text}
    </text>
  </svg>`;
}

// Project images
const projectImages = [
  { name: 'crafting.jpg', title: 'Crafting', color: '#3B82F6' },
  { name: 'wildfire.jpg', title: 'Wildfire', color: '#EF4444' },
  { name: 'mri.jpg', title: 'MRI', color: '#8B5CF6' },
  { name: 'globe.jpg', title: 'Globe', color: '#10B981' },
  { name: 'crowd.jpg', title: 'Crowd', color: '#F59E0B' }
];

// Blog/publication images
const blogImages = [
  { name: 'medical-image-analysis.jpg', title: 'Medical Image Analysis', color: '#8B5CF6' },
  { name: 'crowd-counting.jpg', title: 'Crowd Counting', color: '#F59E0B' }
];

// Profile image
const profileImage = { name: 'profile.jpg', title: 'Profile', color: '#3B82F6' };

// Create project images
const projectDir = path.join(__dirname, '../public/images/projects');
ensureDirectoryExists(projectDir);

projectImages.forEach(img => {
  const svg = generateSVG(img.title, 800, 600, img.color, 'white');
  fs.writeFileSync(path.join(projectDir, img.name.replace('.jpg', '.svg')), svg);
  console.log(`Created ${img.name}`);
});

// Create blog images
const blogDir = path.join(__dirname, '../public/images/blog');
ensureDirectoryExists(blogDir);

blogImages.forEach(img => {
  const svg = generateSVG(img.title, 800, 600, img.color, 'white');
  fs.writeFileSync(path.join(blogDir, img.name.replace('.jpg', '.svg')), svg);
  console.log(`Created ${img.name}`);
});

// Create profile image
const imageDir = path.join(__dirname, '../public/images');
ensureDirectoryExists(imageDir);
const profileSvg = generateSVG('Profile', 400, 400, profileImage.color, 'white');
fs.writeFileSync(path.join(imageDir, profileImage.name.replace('.jpg', '.svg')), profileSvg);
console.log(`Created ${profileImage.name}`);

console.log('All placeholder images created successfully!'); 