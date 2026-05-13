const fs = require('fs');
const PDFParser = require('pdf2json');

const files = [
  'c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\Fichas de Treinos.pdf',
  'c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\Fichas Personalizadas.pdf'
];

const results = {};
let processed = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    processed++;
    if (processed === files.length) saveResults();
    return;
  }

  const pdfParser = new PDFParser(this, 1);
  
  pdfParser.on('pdfParser_dataError', errData => {
    console.error(`Error parsing ${file}:`, errData.parserError);
    processed++;
    if (processed === files.length) saveResults();
  });

  pdfParser.on('pdfParser_dataReady', pdfData => {
    results[file] = pdfParser.getRawTextContent();
    console.log(`Extracted ${file}: ${results[file].length} chars`);
    processed++;
    if (processed === files.length) saveResults();
  });

  pdfParser.loadPDF(file);
});

function saveResults() {
  fs.writeFileSync('c:\\Users\\Policial\\OneDrive\\Área de Trabalho\\app musc\\antigravity-app\\src\\data\\fichas_text.json', JSON.stringify(results, null, 2));
  console.log('Saved to src/data/fichas_text.json');
}
