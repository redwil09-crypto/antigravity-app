const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/build/pdf.js');

async function extractText() {
  const files = [
    'c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\Fichas de Treinos.pdf',
    'c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\Fichas Personalizadas.pdf'
  ];

  const results = {};

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`File not found: ${file}`);
      continue;
    }

    try {
      const data = new Uint8Array(fs.readFileSync(file));
      const loadingTask = pdfjsLib.getDocument({ data });
      const pdfDocument = await loadingTask.promise;
      let textContent = '';

      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        textContent += strings.join(' ') + '\n';
      }

      results[file] = textContent;
      console.log(`Extracted ${file}: ${textContent.length} chars`);
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
    }
  }

  fs.writeFileSync('c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\antigravity-app\\src\\data\\fichas_text.json', JSON.stringify(results, null, 2));
  console.log('Saved to src/data/fichas_text.json');
}

extractText();
