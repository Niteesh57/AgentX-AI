const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/worldLow-pixels-hero.svg');
const content = fs.readFileSync(svgPath, 'utf8');

const regex = /<g id="AU"[^>]*>([\s\S]*?)<\/g>/i;
const match = content.match(regex);

if (match) {
  console.log('Found AU group!');
  const rects = [];
  const rectRegex = /<rect x="([^"]+)" y="([^"]+)"/g;
  let rectMatch;
  while ((rectMatch = rectRegex.exec(match[1])) !== null) {
    rects.push({ x: parseFloat(rectMatch[1]), y: parseFloat(rectMatch[2]) });
  }
  console.log(`Total rects: ${rects.length}`);
  if (rects.length > 0) {
    const minX = Math.min(...rects.map(r => r.x));
    const maxX = Math.max(...rects.map(r => r.x));
    const minY = Math.min(...rects.map(r => r.y));
    const maxY = Math.max(...rects.map(r => r.y));
    const avgX = rects.reduce((sum, r) => sum + r.x, 0) / rects.length;
    const avgY = rects.reduce((sum, r) => sum + r.y, 0) / rects.length;
    console.log(`X range: ${minX} to ${maxX} (avg: ${avgX})`);
    console.log(`Y range: ${minY} to ${maxY} (avg: ${avgY})`);
  }
} else {
  console.log('AU group NOT found!');
}
