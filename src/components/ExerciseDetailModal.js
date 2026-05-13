'use client';
import { categories } from '@/data/exercises';
import './ExerciseDetailModal.css';

export default function ExerciseDetailModal({ exercise, onClose, onAdd }) {
  if (!exercise) return null;
  const cat = categories.find(c => c.id === exercise.category);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edm" onClick={e => e.stopPropagation()}>
        <button className="edm-close" onClick={onClose}>✕</button>

        <div className="edm-gif-wrap">
          <img src={exercise.gif} alt={exercise.name} className="edm-gif" />
        </div>

        <div className="edm-body">
          <div className="edm-tags">
            <span className={`badge badge-${exercise.level === 'Iniciante' ? 'beginner' : exercise.level === 'Intermediário' ? 'intermediate' : 'advanced'}`}>
              {exercise.level}
            </span>
            <span className="badge badge-category">{cat?.icon} {cat?.name}</span>
          </div>

          <h2 className="edm-name">{exercise.name}</h2>

          <div className="edm-stats">
            <div className="edm-stat">
              <span className="edm-stat-icon">⏱️</span>
              <span className="edm-stat-value">{exercise.duration}s</span>
              <span className="edm-stat-label">Duração</span>
            </div>
            <div className="edm-stat">
              <span className="edm-stat-icon">🔁</span>
              <span className="edm-stat-value">{exercise.reps}</span>
              <span className="edm-stat-label">Repetições</span>
            </div>
          </div>

          <div className="edm-section">
            <h3>📋 Descrição</h3>
            <p>{exercise.description}</p>
          </div>

          <div className="edm-section edm-safety">
            <h3>⚠️ Dica de Segurança</h3>
            <p>{exercise.tips}</p>
          </div>

          {onAdd && (
            <button className="btn btn-primary btn-full btn-large" onClick={() => { onAdd(exercise); onClose(); }}>
              ➕ Adicionar ao Treino
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
