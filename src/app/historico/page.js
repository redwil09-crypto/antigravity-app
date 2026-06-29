'use client';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/exercises';
import './historico.css';

export default function HistoricoPage() {
  const { history, user } = useApp();

  if (!user.isLoggedIn) {
    return (
      <div className="historico-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <div className="empty-state-title">Acesso Restrito</div>
            <div className="empty-state-desc">Faça login para ver seu histórico de treinos.</div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}min ${sec}s`;
  };

  const totalWorkouts = history.length;
  const totalTime = history.reduce((a, h) => a + (h.totalDuration || 0), 0);
  const totalExercises = history.reduce((a, h) => a + (h.exerciseCount || 0), 0);

  return (
    <div className="historico-page">
      <div className="container">
        <h1 className="section-title">Histórico de <span>Treinos</span></h1>

        {/* Summary Stats */}
        <div className="hist-stats">
          <div className="hist-stat">
            <span className="hist-stat-val">{totalWorkouts}</span>
            <span className="hist-stat-label">Treinos Realizados</span>
          </div>
          <div className="hist-stat">
            <span className="hist-stat-val">{formatDuration(totalTime)}</span>
            <span className="hist-stat-label">Tempo Total</span>
          </div>
          <div className="hist-stat">
            <span className="hist-stat-val">{totalExercises}</span>
            <span className="hist-stat-label">Exercícios Feitos</span>
          </div>
        </div>

        {/* History List */}
        {history.length > 0 ? (
          <div className="hist-list stagger-children">
            {history.map(entry => (
              <div key={entry.id} className="card hist-card">
                <div className="hist-card-header">
                  <div>
                    <h3 className="hist-card-name">{entry.workoutName}</h3>
                    <span className="hist-card-date">📅 {formatDate(entry.completedAt)}</span>
                  </div>
                  <div className="hist-card-badge">✅</div>
                </div>

                <div className="hist-card-stats">
                  <span>🏋️ {entry.exerciseCount} exercícios</span>
                  <span>⏱️ {formatDuration(entry.totalDuration)}</span>
                </div>

                {entry.exercises && (
                  <div className="hist-card-exercises">
                    {entry.exercises.map((ex, i) => (
                      <span key={i} className="hist-ex-chip">
                        {categories.find(c => c.id === ex.category)?.icon} {ex.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">Nenhum treino realizado ainda</div>
            <div className="empty-state-desc">Complete seu primeiro treino para ver o histórico aqui.</div>
          </div>
        )}
      </div>
    </div>
  );
}
