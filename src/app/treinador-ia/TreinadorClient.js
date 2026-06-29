'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { exercises as allExercises } from '@/data/exercises';

export default function TreinadorClient() {
  const router = useRouter();
  const { user, createWorkout, showToast } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!user || !user.isLoggedIn) {
      showToast('Faça login para utilizar a IA.', 'error');
      return;
    }

    setIsLoading(true);
    setGeneratedWorkout(null);

    try {
      const res = await fetch('/api/gerar-treino', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userLevel: user.level })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao gerar treino.');
      }

      setGeneratedWorkout(data);
      showToast('Plano gerado com sucesso!', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWorkout = async () => {
    if (!generatedWorkout || !user) return;
    
    try {
      setIsLoading(true);

      const normalize = (s) => s ? s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";
      
      // Determina se é um plano semanal ou um treino único de forma robusta
      const workoutsToSave = generatedWorkout.workouts || (generatedWorkout.exercises ? [generatedWorkout] : []);

      if (workoutsToSave.length === 0) {
        throw new Error('Não foi possível encontrar a lista de exercícios no plano gerado.');
      }

      for (const workout of workoutsToSave) {
        const exercisesToMap = workout.exercises || [];
        const mappedExercises = exercisesToMap.map(ex => {
          const aiName = normalize(ex.name);
          const match = allExercises.find(dbEx => {
            const dbName = normalize(dbEx.name);
            return dbName.includes(aiName) || aiName.includes(dbName);
          });

          if (match) {
            return {
              exerciseId: match.id,
              restSeconds: parseInt(ex.rest) || 60,
              series: ex.series || "3",
              reps: ex.reps || "12",
              duration: ex.duration || 30,
              name: match.name
            };
          }
          return null;
        }).filter(Boolean);

        if (mappedExercises.length > 0) {
          await createWorkout({
            name: workout.workoutName,
            category: 'Planejamento IA',
            difficulty: user.level,
            exercises: mappedExercises,
            description: workout.dayOfWeek ? `Dia: ${workout.dayOfWeek}` : (workout.description || '')
          });
        }
      }

      showToast('Todo o seu planejamento foi salvo na biblioteca!', 'success');
      router.push('/treinos');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Erro ao salvar o planejamento.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="treinador-container">
      <div className="treinador-header">
        <div className="will-avatar-large">W</div>
        <h1>Will AI - Treinador Elite</h1>
        <p>Gere treinos únicos ou planejamentos semanais completos de 60 minutos.</p>
      </div>

      <div className="chat-container">
        <div className="chat-bubble will">
          Olá! Sou o Will. Posso montar seu treino de hoje ou planejar sua semana inteira com divisões inteligentes (ABC, ABCD). O que prefere?
        </div>
        
        {prompt && (
          <div className="chat-bubble user">
            {prompt}
          </div>
        )}

        {isLoading && (
          <div className="chat-bubble will loading">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
            Criando seu plano de 60 minutos...
          </div>
        )}

        {generatedWorkout && !isLoading && (
          <div className="workout-result-ai fade-in">
            <div className="workout-ai-header">
              <h3>{generatedWorkout.isWeeklyPlan ? "Seu Cronograma Semanal" : generatedWorkout.workoutName}</h3>
              <p>{generatedWorkout.planDescription || generatedWorkout.description}</p>
            </div>

            <div className="workout-ai-grid">
              {generatedWorkout.isWeeklyPlan || generatedWorkout.workouts ? (
                (generatedWorkout.workouts || []).map((w, idx) => (
                  <div key={idx} className="workout-ai-day-card">
                    <div className="day-card-header">
                      <h4>{w.workoutName}</h4>
                      {w.dayOfWeek && <span>{w.dayOfWeek}</span>}
                    </div>
                    <p className="duration-tag">⏱️ {w.estimatedDuration || '60 min'}</p>
                    <ul className="ex-list-mini">
                      {(w.exercises || []).slice(0, 5).map((ex, eIdx) => (
                        <li key={eIdx}>{ex.name} ({ex.series}x{ex.reps})</li>
                      ))}
                      {w.exercises?.length > 5 && <li>...e mais {w.exercises.length - 5} exercícios</li>}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="workout-ai-day-card single">
                   <ul className="ex-list-mini">
                      {(generatedWorkout.exercises || []).map((ex, eIdx) => (
                        <li key={eIdx}>{ex.name} - {ex.series} séries</li>
                      ))}
                    </ul>
                </div>
              )}
            </div>

            <div className="workout-ai-actions">
              <button className="btn btn-primary btn-large" onClick={handleSaveWorkout}>
                Salvar Planejamento Completo 💾
              </button>
              <button className="btn btn-secondary" onClick={() => {setGeneratedWorkout(null); setPrompt('');}}>
                Tentar outro
              </button>
            </div>
          </div>
        )}
      </div>

      {!generatedWorkout && !isLoading && (
        <form onSubmit={handleGenerate} className="treinador-form">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Monte um plano para a semana toda, treinando 1 hora por dia, foco total em emagrecimento."
            required
          />
          <button type="submit" className="btn btn-primary btn-large">
            Enviar para o Will 🚀
          </button>
        </form>
      )}
    </div>
  );
}
