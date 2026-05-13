'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { exercises, categories } from '@/data/exercises';
import ExerciseDetailModal from '@/components/ExerciseDetailModal';
import './treinos.css';

function CreateWorkoutView({ onBack }) {
  const { createWorkout } = useApp();
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [restTime, setRestTime] = useState(30);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [previewEx, setPreviewEx] = useState(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      if (search && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (catFilter && ex.category !== catFilter) return false;
      return true;
    });
  }, [search, catFilter]);

  const addExercise = (ex) => {
    if (selectedExercises.find(s => s.id === ex.id)) return;
    setSelectedExercises(prev => [...prev, { ...ex, restSeconds: restTime }]);
  };

  const removeExercise = (id) => {
    setSelectedExercises(prev => prev.filter(e => e.id !== id));
  };

  const moveExercise = (index, direction) => {
    const newList = [...selectedExercises];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newList.length) return;
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    setSelectedExercises(newList);
  };

  const handleSave = () => {
    if (!name.trim() || selectedExercises.length === 0) return;
    createWorkout({
      name: name.trim(),
      exercises: selectedExercises.map((ex, i) => ({
        exerciseId: ex.id, order: i + 1, restSeconds: ex.restSeconds,
      })),
      restTime,
    });
    onBack();
  };

  return (
    <div className="create-workout">
      <button className="btn btn-ghost" onClick={onBack}>← Voltar</button>
      <h1 className="section-title">Criar <span>Novo Treino</span></h1>
      <div className="cw-layout">
        <div className="cw-selected">
          <div className="form-group">
            <label>Nome do Treino</label>
            <input type="text" placeholder="Ex: Treino de Costas A" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Descanso entre exercícios (segundos)</label>
            <input type="number" min={5} max={300} value={restTime} onChange={e => setRestTime(parseInt(e.target.value) || 30)} />
          </div>
          <h3 className="cw-section-title">Exercícios Selecionados ({selectedExercises.length})</h3>
          {selectedExercises.length === 0 ? (
            <div className="cw-empty">Adicione exercícios da lista ao lado →</div>
          ) : (
            <div className="cw-exercise-list">
              {selectedExercises.map((ex, i) => (
                <div key={`${ex.id}-${i}`} className="cw-exercise-item">
                  <span className="cw-order">{i + 1}</span>
                  <img src={ex.gif} alt={ex.name} className="cw-thumb" />
                  <div className="cw-item-info">
                    <span className="cw-item-name">{ex.name}</span>
                    <span className="cw-item-cat">{categories.find(c => c.id === ex.category)?.name}</span>
                  </div>
                  <div className="cw-item-actions">
                    <button onClick={() => moveExercise(i, -1)} className="cw-move" disabled={i === 0}>▲</button>
                    <button onClick={() => moveExercise(i, 1)} className="cw-move" disabled={i === selectedExercises.length - 1}>▼</button>
                    <button onClick={() => removeExercise(ex.id)} className="cw-remove">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="btn btn-primary btn-full btn-large" onClick={handleSave}
            disabled={!name.trim() || selectedExercises.length === 0}
            style={{ marginTop: '16px', opacity: (!name.trim() || selectedExercises.length === 0) ? 0.5 : 1 }}>
            💾 Salvar Treino
          </button>
        </div>
        <div className="cw-browser">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Buscar exercício..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-chips" style={{ marginTop: '8px', marginBottom: '12px' }}>
            <button className={`chip ${!catFilter ? 'active' : ''}`} onClick={() => setCatFilter('')}>Todas</button>
            {categories.map(cat => (
              <button key={cat.id} className={`chip ${catFilter === cat.id ? 'active' : ''}`}
                onClick={() => setCatFilter(catFilter === cat.id ? '' : cat.id)}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          <div className="cw-browse-list">
            {filteredExercises.map(ex => {
              const isAdded = selectedExercises.some(s => s.id === ex.id);
              return (
                <div key={ex.id} className={`cw-browse-item ${isAdded ? 'added' : ''}`}>
                  <img src={ex.gif} alt={ex.name} className="cw-thumb" onClick={() => setPreviewEx(ex)} />
                  <div className="cw-item-info" onClick={() => setPreviewEx(ex)}>
                    <span className="cw-item-name">{ex.name}</span>
                    <span className="cw-item-cat">{categories.find(c => c.id === ex.category)?.name}</span>
                  </div>
                  <button className={`btn ${isAdded ? 'btn-ghost' : 'btn-secondary'} btn-icon`}
                    onClick={() => isAdded ? removeExercise(ex.id) : addExercise(ex)}>
                    {isAdded ? '✓' : '+'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {previewEx && <ExerciseDetailModal exercise={previewEx} onClose={() => setPreviewEx(null)} onAdd={addExercise} />}
    </div>
  );
}

export default function TreinosContent() {
  const searchParams = useSearchParams();
  const { workouts, deleteWorkout, toggleFavorite } = useApp();
  const [showCreate, setShowCreate] = useState(searchParams.get('new') === 'true');
  const [filter, setFilter] = useState('all');

  if (showCreate) return (
    <div className="treinos-page"><div className="container"><CreateWorkoutView onBack={() => setShowCreate(false)} /></div></div>
  );

  const filtered = filter === 'favorites' ? workouts.filter(w => w.favorite) : workouts;

  return (
    <div className="treinos-page">
      <div className="container">
        <div className="treinos-header">
          <div>
            <h1 className="section-title">Meus <span>Treinos</span></h1>
            <p className="treinos-sub">{workouts.length} treino{workouts.length !== 1 ? 's' : ''} salvo{workouts.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>➕ Novo Treino</button>
        </div>
        {workouts.length > 0 && (
          <div className="treinos-filters">
            <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todos</button>
            <button className={`chip ${filter === 'favorites' ? 'active' : ''}`} onClick={() => setFilter('favorites')}>⭐ Favoritos</button>
          </div>
        )}
        {filtered.length > 0 ? (
          <div className="treinos-grid">
            {filtered.map(workout => {
              const exCount = workout.exercises?.length || 0;
              const totalDuration = workout.exercises?.reduce((acc, e) => {
                const ex = exercises.find(x => x.id === e.exerciseId);
                return acc + (ex?.duration || 30) + (e.restSeconds || 30);
              }, 0) || 0;
              return (
                <div key={workout.id} className="card workout-card">
                  <div className="wc-header">
                    <div>
                      <h3 className="wc-name">{workout.name}</h3>
                      <span className="wc-meta">{exCount} exercícios · ~{Math.ceil(totalDuration / 60)} min</span>
                    </div>
                    <button className="wc-fav" onClick={() => toggleFavorite(workout.id)}>
                      {workout.favorite ? '⭐' : '☆'}
                    </button>
                  </div>
                  <div className="wc-preview">
                    {workout.exercises?.slice(0, 4).map((e, i) => {
                      const ex = exercises.find(x => x.id === e.exerciseId);
                      return ex ? <img key={i} src={ex.gif} alt={ex.name} className="wc-preview-thumb" /> : null;
                    })}
                    {exCount > 4 && <span className="wc-more">+{exCount - 4}</span>}
                  </div>
                  <div className="wc-actions">
                    <Link href={`/executar/${workout.id}`} className="btn btn-primary" style={{ flex: 1 }}>▶️ Iniciar</Link>
                    <button className="btn btn-danger btn-icon" onClick={() => deleteWorkout(workout.id)} title="Excluir">🗑️</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🏋️</div>
            <div className="empty-state-title">{filter === 'favorites' ? 'Nenhum treino favorito' : 'Nenhum treino criado'}</div>
            <div className="empty-state-desc">{filter === 'favorites' ? 'Marque treinos como favorito.' : 'Crie seu primeiro treino personalizado!'}</div>
            {filter === 'all' && <button className="btn btn-primary" onClick={() => setShowCreate(true)}>➕ Criar Treino</button>}
          </div>
        )}
      </div>
    </div>
  );
}
