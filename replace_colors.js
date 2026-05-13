const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      if (content.includes('--purple-')) {
        content = content.replace(/--purple-/g, '--primary-');
        changed = true;
      }
      if (content.includes('rgba(147, 51, 234')) {
        content = content.replace(/rgba\(147,\s*51,\s*234/g, 'rgba(163, 230, 53');
        changed = true;
      }
      if (content.includes('rgba(168, 85, 247')) {
        content = content.replace(/rgba\(168,\s*85,\s*247/g, 'rgba(163, 230, 53');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

replaceInDir('./src');
console.log('Done replacing colors.');
