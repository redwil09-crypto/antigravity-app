import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const maxDuration = 60; // Configuração para Vercel (se aplicável), permite execução mais longa

export async function POST(req) {
  try {
    const { prompt, userLevel } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave da API do Gemini (GEMINI_API_KEY) não configurada no .env.local' },
        { status: 500 }
      );
    }

    // Lê os textos das fichas (são o conhecimento base da IA)
    const filePath = path.join(process.cwd(), 'src', 'data', 'fichas_text.json');
    let fichasContext = '';
    if (fs.existsSync(filePath)) {
      const fichasRaw = fs.readFileSync(filePath, 'utf8');
      fichasContext = fichasRaw;
    } else {
      console.warn("fichas_text.json não encontrado");
    }

    // Lê os nomes dos exercícios reais do banco para injetar no prompt
    const exercisesPath = path.join(process.cwd(), 'src', 'data', 'exercises.js');
    let realExerciseNames = [];
    if (fs.existsSync(exercisesPath)) {
        const content = fs.readFileSync(exercisesPath, 'utf8');
        // Extrai nomes que estão entre aspas simples ou duplas dentro de arrays
        const matches = content.match(/['"](.*?.gif)['"]/g) || [];
        realExerciseNames = matches.map(m => m.replace(/['"]/g, '').replace('.gif', '').replace(/_/g, ' ').trim());
    }

    // Prompt do sistema
    const systemInstruction = `Você é o "Treinador Will" (Will AI). Você tem acesso a um REPERTÓRIO REAL de 277 exercícios.
    
REGRAS PARA TREINOS DE ELITE:
1. FOCO EM NÍVEL: Priorize exercícios de nível "Intermediário" e "Avançado". Evite o básico se o usuário quiser algo completo.
2. DENSIDADE MÁXIMA: Quando o usuário pedir um treino completo, forneça o máximo de variações possíveis (8 a 12 exercícios por dia).
3. SEM LIMITES: Explore todo o catálogo de 277 exercícios. Use variações no Smith, Polias, Unilaterais e Articulados.
4. PERIODIZAÇÃO: Se for semanal, divida com inteligência para cobrir todos os 277 exercícios ao longo do mês se possível.

CATÁLOGO REAL:
${realExerciseNames.join(', ')}

O nível do usuário é: ${userLevel || 'Intermediário'}.

FORMATO OBRIGATÓRIO (JSON APENAS):
{
  "isWeeklyPlan": true/false,
  "planDescription": "Descrição estratégica focada em nível avançado",
  "workouts": [
    {
      "workoutName": "Nome do Treino (Ex: Treino A - Força Bruta)",
      "dayOfWeek": "Dia da Semana",
      "exercises": [
        { "name": "NOME DO CATÁLOGO", "series": "4", "reps": "8-12", "duration": 40, "rest": "60", "tips": "Dica técnica avançada" },
        ... (MÍNIMO 8 EXERCÍCIOS DENSOS)
      ]
    }
  ]
}
`;

    // Chamada para a API do Gemini via fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
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
            parts: [{ text: `Crie um treino para mim. Meu pedido: ${prompt}` }]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.7,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json({ error: 'Erro na API do Gemini', details: data }, { status: 500 });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    
    // Garantir que é um JSON parseável (caso o Gemini retorne com blocos de código mesmo pedindo para não)
    let jsonStr = aiText;
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '');
    }

    const workoutPlan = JSON.parse(jsonStr);

    return NextResponse.json(workoutPlan);

  } catch (error) {
    console.error("Erro na rota gerar-treino:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
