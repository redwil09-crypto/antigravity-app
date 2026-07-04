import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const maxDuration = 60; // Allow longer execution time

export async function POST(req) {
  try {
    const { images } = await req.json();

    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'Nenhuma imagem enviada.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave da API do Gemini não configurada.' },
        { status: 500 }
      );
    }

    // Load exercises from data/exercises.js to provide context to Gemini
    const exercisesPath = path.join(process.cwd(), 'src', 'data', 'exercises.js');
    let realExerciseNames = [];
    if (fs.existsSync(exercisesPath)) {
        const content = fs.readFileSync(exercisesPath, 'utf8');
        const matches = content.match(/['"](.*?.gif)['"]/g) || [];
        realExerciseNames = matches.map(m => m.replace(/['"]/g, '').replace('.gif', '').replace(/_/g, ' ').trim());
    }

    const systemInstruction = `Você é um especialista em equipamentos de musculação.
Sua tarefa é analisar imagens ou frames de vídeo de uma academia e identificar todos os equipamentos de musculação visíveis.

O aplicativo "Montador de Treino Elite" suporta exercícios que utilizam os seguintes equipamentos ou movimentos (referência):
${realExerciseNames.join(', ')}

Categorias permitidas: "Máquina", "Cabo", "Peso Livre", "Banco", "Cardio", "Acessório".

RETORNE APENAS UM JSON (sem formatação markdown \`\`\`json) no seguinte formato:
{
  "equipments": [
    {
      "name": "Nome do equipamento (ex: Leg Press 45, Hack Machine, Crossover, Supino Reto)",
      "category": "Máquina",
      "confidence": 95
    }
  ]
}

Seja muito observador. Se for uma máquina com placas de peso, é "Máquina". Se tiver cabos e polias ajustáveis, é "Cabo". Halteres e anilhas são "Peso Livre".`;

    const imageParts = images.map(imgBase64 => {
      // Remove data:image/jpeg;base64, if present
      const base64Data = imgBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      return {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      };
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: "user",
            parts: [
              ...imageParts,
              { text: `Identifique os equipamentos nas imagens desta academia e retorne o JSON estruturado.` }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2, // Low temperature for more deterministic identification
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Vision API Error:", data);
      return NextResponse.json({ error: 'Erro na API de Visão do Gemini', details: data }, { status: 500 });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    
    let jsonStr = aiText;
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const inventory = JSON.parse(jsonStr);

    return NextResponse.json(inventory);

  } catch (error) {
    console.error("Erro na rota scan-gym:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
