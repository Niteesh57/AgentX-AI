const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/worldLow-pixels-hero.svg');
const content = fs.readFileSync(svgPath, 'utf8');

const countries = ['US', 'BR', 'FR', 'IN', 'JP', 'AU'];

countries.forEach(countryId => {
  const regex = new RegExp(`<g id="${countryId}"[^>]*>([\\s\\S]*?)</g>`, 'i');
  const match = content.match(regex);

  if (match) {
    const rects = [];
    const rectRegex = /<rect x="([^"]+)" y="([^"]+)"/g;
    let rectMatch;
    while ((rectMatch = rectRegex.exec(match[1])) !== null) {
      rects.push({ x: parseFloat(rectMatch[1]), y: parseFloat(rectMatch[2]) });
    }
    if (rects.length > 0) {
      const avgX = rects.reduce((sum, r) => sum + r.x, 0) / rects.length;
      const avgY = rects.reduce((sum, r) => sum + r.y, 0) / rects.length;
      console.log(`Country: ${countryId} | rects: ${rects.length} | Avg X: ${avgX.toFixed(2)} | Avg Y: ${avgY.toFixed(2)}`);
    }
  } else {
    console.log(`Country ${countryId} NOT found!`);
  }
});
