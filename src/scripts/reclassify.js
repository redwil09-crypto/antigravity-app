const fs = require('fs');
const path = require('path');

const exercisesContent = fs.readFileSync(path.join(__dirname, '../data/exercises.js'), 'utf8');

const match = exercisesContent.match(/const exerciseFiles = (\{[\s\S]*?\});\s*let/);
if (!match) process.exit(1);

let exerciseFiles;
try {
  const jsonStr = match[1].replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:/g, '"$2": ').replace(/'/g, '"').replace(/,\s*([\]}])/g, '$1');
  exerciseFiles = JSON.parse(jsonStr);
} catch (e) {
  exerciseFiles = eval('(' + match[1] + ')');
}

const refundiniContent = fs.readFileSync(path.join(__dirname, '../data/refundini.js'), 'utf8');
const eliteMatch = refundiniContent.match(/export const eliteData = (\{[\s\S]*?\});\s*\/\//);
let eliteData = eval('(' + eliteMatch[1] + ')');

const eliteList = [];
eliteData.muscleGroups.forEach(group => {
  group.exercises.forEach(ex => {
    eliteList.push({
      originalEliteName: ex.name,
      groupId: group.id,
      equipment: ex.equipment,
      score: ex.ratings ? ex.ratings.overall : 0,
      keywords: ex.name.toLowerCase().split(' ')
    });
  });
});

// Banco de Correções Manuais Absolutas para nomes horríveis
const explicitCorrections = {
  'rosca concentrada 2': 'Rosca Concentrada',
  'biceps concentrado unilateral no cross': 'Rosca Concentrada no Cabo',
  'biceps polia alta dupla': 'Rosca no Cabo Dupla Alta',
  'biceps unilateral com banco scort no cross': 'Rosca Scott Unilateral no Cabo',
  'biceps unilateral cross': 'Rosca Unilateral no Cabo',
  'biceps unilateral polia alta cross': 'Rosca Unilateral Polia Alta',
  'rosca  direta no banco scort': 'Rosca Scott Máquina',
  'rosca consentrada unilateral  no banco declinado': 'Rosca Concentrada Declinada',
  'rosca dierata pegada invertida barra w': 'Rosca Inversa Barra W',
  'rosca dierta pegada aberta': 'Rosca Direta Pegada Aberta',
  'rosca dierta pegada fechada': 'Rosca Direta Pegada Fechada',
  'rosca direta apaiada no banco barra w': 'Rosca Scott Barra W',
  'rosca neutra  unilateral no banco scort': 'Rosca Scott Pegada Neutra',
  'rosca no banco scort aparelho': 'Rosca Scott Máquina',
  'rosca no scort': 'Rosca Scott Máquina',
  
  'remanda curvada barra': 'Remada Curvada com Barra',
  'remanda unil com apoio banco': 'Remada Unilateral com Halter',
  'banco romano sem peso': 'Extensão de Tronco (Banco Romano)',
  'banco romano': 'Extensão de Tronco com Peso',
  'barra no gravitan': 'Barra Fixa no Graviton',
  'barra no graviton em pe': 'Barra Fixa no Graviton',
  'pulley costa maquina': 'Puxada Máquina Articulada',
  'pulley pegaga fechda pronada': 'Pulley Frente Pegada Fechada',
  'remada cavalinha pegada aberta': 'Remada Cavalinho Pegada Aberta',
  'remada cavalino com barra': 'Remada Cavalinho com Barra',
  'remada inclinda no banco pegada supinda puxada fechada': 'Remada Inclinada Supinada',
  
  'panturrinha no leg press': 'Panturrilha no Leg Press',
  'stiff unil com medball': 'Stiff Unilateral com Medball',
  'stiff no smth unilateral': 'Stiff Unilateral no Smith',
  'stiff no smth': 'Stiff no Smith',
  
  'crucifixo i nvertido polia alta': 'Crucifixo Invertido no Cabo',
  'desenvolmento frontal com elastico': 'Desenvolvimento Frontal com Elástico',
  'desenvolmento maquina': 'Desenvolvimento Máquina',
  'desenvolmento com halteres': 'Desenvolvimento com Halteres',
  'desenvolvimento na barra': 'Desenvolvimento com Barra',
  'remanda alta com barra': 'Remada Alta com Barra',
  'elevaçao letaral com haltrers': 'Elevação Lateral com Halteres',
  
  'supino incliado maquina': 'Supino Inclinado Máquina',
  'crucifixo beixo no croos em pe': 'Crossover na Polia Baixa',
  'flex de cotovelo completa': 'Flexão de Braço (Apoio)',
  'peito na paralela': 'Paralelas / Mergulho',
  'supindo reto barra': 'Supino Reto Barra',
  'supino articulado maquina': 'Supino Máquina Articulado',
  'supino declinado barrapegada aberta': 'Supino Declinado Pegada Aberta',
  'supino declinado no smit': 'Supino Declinado no Smith',
  'supino inclinado banco no smith': 'Supino Inclinado no Smith',
  'supino reto  no cross': 'Supino Reto no Cabo',
  
  'triceps frances barra w': 'Tríceps Francês Barra W',
  'triceps afundo no banco': 'Tríceps no Banco',
  'triceps apoaiado na pareda': 'Tríceps na Parede',
  'triceps françes bilateral no cross': 'Tríceps Francês no Cabo',
  'triceps françes unilateral no corss': 'Tríceps Francês Unilateral no Cabo',
  'triceps na paralela maquiba': 'Tríceps Paralela Máquina',
  'triceps no aparelho scort': 'Tríceps Máquina',
  'triceps patada blateral com halteres': 'Tríceps Coice Bilateral',
  'triceps patada unilateral com halteres': 'Tríceps Coice Unilateral',
  'triceps pateda com alteres': 'Tríceps Coice com Halteres',
  'triceps pegada pronada uniatres no cross': 'Tríceps Unilateral Pronado no Cabo',
  'triceps tresta com halteres': 'Tríceps Testa com Halteres'
};

const eliteMapOverrides = {
  'supino inclinado com halteres': 'Supino Inclinado com Halteres (30°)',
  'supino articulado maquina': 'Supino Máquina Articulado',
  'crucifixo maquina': 'Crucifixo Máquina (Peck Deck)',
  'crucifixo no cross polia alta': 'Crossover na Polia',
  'crucifixo no cross em pe': 'Crossover na Polia',
  'crucifixo beixo no croos em pe': 'Crossover na Polia', // Pode ser crossover baixo, mas encaixa
  'pulley frente pegada supinada': 'Pulley Frente',
  'pulley pegada aberta pronada': 'Pulley Frente',
  'pulley pegada aberta': 'Pulley Frente',
  'puxada maquina': 'Pulley Frente',
  'remada baixa no pulley pegada aberta supinada': 'Remada Baixa',
  'remada articulada': 'Remada Máquina Articulada',
  'remada articulada pegada supinada': 'Remada Máquina Articulada',
  'elevaçao letaral com haltrers': 'Elevação Lateral',
  'elevacao lateral sentado no banco': 'Elevação Lateral',
  'desenvolmento maquina': 'Desenvolvimento Máquina',
  'elevaçao unilateral no cross': 'Elevação Lateral no Cabo',
  'crucifixo inverso no cross no banco reto': 'Crucifixo Invertido Máquina',
  'rosca scott maquina': 'Rosca Scott Máquina',
  'rosca direta apaiada no banco barra w': 'Rosca Scott Máquina',
  'rosca dierta pegada aberta': 'Rosca Direta',
  'rosca dierta pegada fechada': 'Rosca Direta',
  'rosca direta barra w': 'Rosca Direta',
  'triceps françes bilateral no cross': 'Tríceps Francês',
  'triceps frances barra w': 'Tríceps Francês',
  'triceps no cross deitado no banco reto': 'Tríceps Pulley', // Pulley/Cabo
  'triceps testa com barra': 'Tríceps Testa',
  'leg press pes afastados': 'Leg Press 45°',
  'leg press': 'Leg Press 45°',
  'agachamento livre com barra': 'Agachamento',
  'agachamento barra': 'Agachamento',
  'agachamento na maquina': 'Hack Machine',
  'cadeira extensora': 'Cadeira Extensora',
  'mesa flex': 'Mesa Flexora',
  'cadeira flex': 'Cadeira Flexora',
  'stiff com barra': 'Stiff',
  'stiff': 'Stiff',
  'afundo livre': 'Afundo',
  'panturrinha no leg press': 'Panturrilha no Leg Press',
  'abdominal com carga': 'Abdominal Máquina',
  'abd concentrado braços estendidos': 'Crunch Máquina',
  'elevação pelvica livre': 'Elevação Pélvica',
  'extensão de quadril em pé na polia': 'Extensão de Quadril na Polia'
};

function capitalize(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function basicClean(filename) {
  return filename
    .replace('.gif', '')
    .replace(/\s*\(\d+\)\s*/g, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();
}

const mappingResult = [];
let globalId = 1;

Object.keys(exerciseFiles).forEach(cat => {
  exerciseFiles[cat].forEach(file => {
    const rawClean = basicClean(file);
    
    // 1. Applica correção manual de digitação para gerar um DetectedName limpo
    let cleanDetected = explicitCorrections[rawClean];
    if (!cleanDetected) {
      // capitalizar default
      cleanDetected = capitalize(rawClean);
    }
    
    // 2. Verifica se é Elite
    let isElite = false;
    let confidence = 0;
    let eliteGroup = cat;
    let equipment = 'machine';
    let score = null;
    let finalDetectedName = cleanDetected;

    // Tenta direct override
    let eliteNameMatch = eliteMapOverrides[rawClean];
    
    if (!eliteNameMatch) {
      // Tenta achar nas palavras chave
      let bestMatch = null;
      let maxMatches = 0;
      eliteList.forEach(elite => {
        let matches = 0;
        elite.keywords.forEach(kw => {
          if (kw.length > 3 && rawClean.includes(kw)) matches++;
        });
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = elite.originalEliteName;
        }
      });
      if (maxMatches >= 2) {
        eliteNameMatch = bestMatch;
        confidence = 75;
      } else {
        confidence = 40;
      }
    } else {
      confidence = 95;
    }

    if (eliteNameMatch) {
      const eliteObj = eliteList.find(e => e.originalEliteName === eliteNameMatch);
      if (eliteObj) {
        isElite = true;
        eliteGroup = eliteObj.groupId;
        equipment = eliteObj.equipment;
        score = eliteObj.score;
        finalDetectedName = eliteNameMatch; // Substitui o nome pelo nome Elite oficial!
      }
    } else {
      // Equipamento default
      if (rawClean.includes('halteres')) equipment = 'dumbbell';
      else if (rawClean.includes('barra')) equipment = 'barbell';
      else if (rawClean.includes('cross') || rawClean.includes('pulley') || rawClean.includes('polia')) equipment = 'cable';
      else if (rawClean.includes('livre') || rawClean.includes('peso corporal') || rawClean.includes('apoio')) equipment = 'bodyweight';
    }

    mappingResult.push({
      id: globalId++,
      originalName: file, 
      detectedName: finalDetectedName,
      muscleGroup: eliteGroup,
      equipment: equipment,
      confidenceLevel: confidence,
      isElite: isElite,
      eliteScore: score,
      gif: `/exercises/${cat}/${file}`
    });
  });
});

fs.writeFileSync(path.join(__dirname, '../data/eliteMapping.json'), JSON.stringify(mappingResult, null, 2));

console.log(`Successfully processed ${mappingResult.length} videos.`);
console.log(`Elite exercises detected: ${mappingResult.filter(r => r.isElite).length}`);
