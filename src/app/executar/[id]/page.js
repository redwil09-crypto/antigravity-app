'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { exercises as allExercises, categories } from '@/data/exercises';
import './executar.css';

export default function ExecutarPage() {
  const params = useParams();
  const router = useRouter();
  const { workouts, addToHistory } = useApp();
  const workout = workouts.find(w => String(w.id) === String(params.id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready, exercise, rest, complete
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime] = useState(Date.now());
  const timerRef = useRef(null);

  const workoutExercises = workout?.exercises?.map(e => {
    // Tenta encontrar o exercício no banco pelo ID ou pelo Nome (para treinos da IA)
    const dbExercise = allExercises.find(x => x.id === e.exerciseId) || 
                       allExercises.find(x => x.name.toLowerCase().includes(e.name?.toLowerCase()));
    
    return {
      ...e,
      // Se encontrou no banco, usa os dados do banco (GIF, etc), senão usa o que veio da IA
      exercise: dbExercise || {
        name: e.name,
        category: e.category,
        description: e.obs || 'Siga as instruções do seu treinador.',
        level: workout.difficulty || 'Iniciante',
        duration: 30, // Padrão se não houver no banco
        reps: e.reps || '10-12',
        tips: 'Mantenha a postura e controle a respiração.'
      }
    };
  }) || [];

  const currentItem = workoutExercises[currentIndex];
  const totalExercises = workoutExercises.length;
  const progress = totalExercises > 0 ? ((currentIndex) / totalExercises) * 100 : 0;

  const startExercise = useCallback(() => {
    if (!currentItem) return;
    setPhase('exercise');
    setTimeLeft(currentItem.exercise.duration || 30);
    setIsPaused(true); // Começa pausado para o usuário ler
  }, [currentItem]);

  const startRest = useCallback(() => {
    if (currentIndex >= totalExercises - 1) {
      setPhase('complete');
      return;
    }
    setPhase('rest');
    setTimeLeft(currentItem?.restSeconds || 30);
    setIsPaused(false);
  }, [currentIndex, totalExercises, currentItem]);

  const nextExercise = useCallback(() => {
    if (currentIndex >= totalExercises - 1) {
      setPhase('complete');
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setPhase('exercise');
      const next = workoutExercises[nextIdx];
      setTimeLeft(next?.exercise?.duration || 30);
      setIsPaused(true); // Começa pausado para o usuário ler o próximo
    }
  }, [currentIndex, totalExercises, workoutExercises]);

  // Timer
  useEffect(() => {
    if (phase === 'ready' || phase === 'complete' || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (phase === 'exercise') {
            setTimeout(startRest, 300);
          } else if (phase === 'rest') {
            setTimeout(nextExercise, 300);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, isPaused, startRest, nextExercise]);

  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    addToHistory({
      workoutId: workout.id,
      workoutName: workout.name,
      exerciseCount: totalExercises,
      totalDuration: duration,
      exercises: workoutExercises.map(e => ({ name: e.exercise.name, category: e.exercise.category })),
    });
    router.push('/historico');
  };

  if (!workout) {
    return (
      <div className="exec-page">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <div className="empty-state-title">Treino não encontrado</div>
          <button className="btn btn-primary" onClick={() => router.push('/treinos')}>Voltar aos Treinos</button>
        </div>
      </div>
    );
  }

  // Ready screen
  if (phase === 'ready') {
    return (
      <div className="exec-page exec-ready">
        <div className="exec-ready-content">
          <span className="exec-ready-icon">🏋️</span>
          <h1 className="exec-ready-title">{workout.name}</h1>
          <p className="exec-ready-info">{totalExercises} exercícios · ~{Math.ceil(workoutExercises.reduce((a, e) => a + (e.exercise?.duration || 30) + (e.restSeconds || 30), 0) / 60)} min</p>
          <div className="exec-ready-list">
            {workoutExercises.map((e, i) => (
              <div key={i} className="exec-ready-item-visual">
                <div className="exec-ready-thumb-wrap">
                  <img src={e.exercise.gif} alt={e.exercise.name} className="exec-ready-thumb" />
                  <span className="exec-ready-num">{i + 1}</span>
                </div>
                <div className="exec-ready-item-info">
                  <h4 className="exec-ready-item-name">{e.exercise.name}</h4>
                  <div className="exec-ready-item-meta">
                    <span>🎯 {e.exercise.reps} reps</span>
                    <span>⏱️ {e.exercise.duration}s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-large btn-full" onClick={startExercise}>
            ▶️ Iniciar Treino
          </button>
          <button className="btn btn-ghost" onClick={() => router.push('/treinos')}>← Voltar</button>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    const duration = Math.round((Date.now() - startTime) / 1000);
    return (
      <div className="exec-page exec-complete">
        <div className="exec-complete-content">
          <span className="exec-complete-icon">🏆</span>
          <h1 className="exec-complete-title">Parabéns!</h1>
          <p className="exec-complete-sub">Você completou o treino!</p>
          <div className="exec-complete-stats">
            <div className="exec-cs"><span className="exec-cs-val">{totalExercises}</span><span className="exec-cs-label">Exercícios</span></div>
            <div className="exec-cs"><span className="exec-cs-val">{Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}</span><span className="exec-cs-label">Duração</span></div>
          </div>
          <button className="btn btn-primary btn-large btn-full" onClick={handleComplete}>
            📊 Salvar no Histórico
          </button>
          <button className="btn btn-ghost" onClick={() => router.push('/treinos')}>Voltar sem salvar</button>
        </div>
      </div>
    );
  }

  // Exercise / Rest phase
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className={`exec-page exec-active ${phase === 'rest' ? 'exec-rest-phase' : ''}`}>
      {/* Progress Bar */}
      <div className="exec-progress-bar">
        <div className="exec-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <div className="exec-header">
        <button className="btn btn-ghost" onClick={() => router.push('/treinos')}>✕</button>
        <span className="exec-counter">Exercício {currentIndex + 1} de {totalExercises}</span>
        <button className="btn btn-ghost" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
      </div>

      {phase === 'rest' ? (
        /* Rest Screen */
        <div className="exec-rest">
          <span className="exec-rest-icon">😮‍💨</span>
          <h2 className="exec-rest-title">Descanse</h2>
          <div className="exec-timer-big">{formatTime(timeLeft)}</div>
          <p className="exec-rest-next">
            Próximo: <strong>{workoutExercises[currentIndex + 1]?.exercise?.name}</strong>
          </p>
          <button className="btn btn-primary btn-large" onClick={nextExercise}>
            Pular Descanso ⏭️
          </button>
        </div>
      ) : (
        /* Exercise Screen */
        <div className="exec-exercise">
          <div className="exec-gif-container">
            {currentItem?.exercise?.gif && (
              <img src={currentItem.exercise.gif} alt={currentItem.exercise.name} className="exec-gif" />
            )}
          </div>
 
          <div className="exec-info">
            <div className="exec-tags">
              <span className={`badge badge-${currentItem?.exercise?.level === 'Iniciante' ? 'beginner' : currentItem?.exercise?.level === 'Intermediário' ? 'intermediate' : 'advanced'}`}>
                {currentItem?.exercise?.level}
              </span>
              <span className="badge badge-category">
                {categories.find(c => c.id === currentItem?.exercise?.category)?.name}
              </span>
            </div>
 
            <h2 className="exec-name">{currentItem?.exercise?.name}</h2>
 
            <div className="exec-stats-row">
              <div className="exec-stat-item">
                <span className="exec-stat-label">🔢 Séries</span>
                <span className="exec-stat-value">{currentItem?.exercise?.series || '3'}</span>
              </div>
              <div className="exec-stat-item">
                <span className="exec-stat-label">🎯 Meta</span>
                <span className="exec-stat-value">{currentItem?.exercise?.reps} reps</span>
              </div>
              <div className="exec-stat-item">
                <span className="exec-stat-label">⏱️ Tempo</span>
                <span className="exec-stat-value">{currentItem?.exercise?.duration}s</span>
              </div>
            </div>
 
            <div className="exec-instructions-expanded">
              <h3>Como executar:</h3>
              <p className="exec-desc-large">{currentItem?.exercise?.description}</p>
              
              <div className="exec-tips-highlight">
                <div className="tips-header">
                  <span>💡</span>
                  <h4>Dicas do Will</h4>
                </div>
                <p>{currentItem?.exercise?.tips}</p>
              </div>
            </div>
 
            <div className="exec-btn-row">
              <button className="btn btn-primary btn-large btn-full" onClick={startRest}>
                {currentIndex < totalExercises - 1 ? 'Concluir e Próximo ⏭️' : 'Finalizar Treino 🏆'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
