const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractPdfs() {
  const dirPath = 'c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc';
  const files = ['Fichas de Treinos.pdf', 'Fichas Personalizadas.pdf'];
  
  const results = {};

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.existsSync(fullPath)) {
      const dataBuffer = fs.readFileSync(fullPath);
      try {
        const parseFunc = typeof pdf === 'function' ? pdf : pdf.default;
        const data = await parseFunc(dataBuffer);
        results[file] = data.text;
        console.log(`Extracted ${file}: ${data.text.length} chars`);
      } catch (e) {
        console.error(`Error parsing ${file}:`, e);
      }
    } else {
      console.log(`File not found: ${fullPath}`);
    }
  }

  fs.writeFileSync('./src/data/fichas_text.json', JSON.stringify(results, null, 2));
  console.log('Saved to src/data/fichas_text.json');
}

extractPdfs();
