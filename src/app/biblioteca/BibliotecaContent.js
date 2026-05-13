'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, exercises } from '@/data/exercises';
import ExerciseDetailModal from '@/components/ExerciseDetailModal';
import './biblioteca.css';

export default function BibliotecaContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialExercise = searchParams.get('exercise');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(
    initialExercise ? exercises.find(e => e.id === parseInt(initialExercise)) : null
  );

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      if (search && !ex.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && ex.category !== selectedCategory) return false;
      if (selectedLevel && ex.level !== selectedLevel) return false;
      return true;
    });
  }, [search, selectedCategory, selectedLevel]);

  return (
    <div className="biblioteca-page">
      <div className="container">
        <div className="bib-header">
          <h1 className="section-title">Biblioteca de <span>Exercícios</span></h1>
          <p className="bib-subtitle">{exercises.length} exercícios disponíveis em {categories.length} categorias</p>
        </div>

        <div className="bib-filters">
          <div className="search-wrapper bib-search">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Buscar exercício..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <span className="filter-label">Categoria:</span>
              <div className="filter-chips">
                <button className={`chip ${!selectedCategory ? 'active' : ''}`} onClick={() => setSelectedCategory('')}>Todas</button>
                {categories.map(cat => (
                  <button key={cat.id} className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Nível:</span>
              <div className="filter-chips">
                <button className={`chip ${!selectedLevel ? 'active' : ''}`} onClick={() => setSelectedLevel('')}>Todos</button>
                {['Iniciante', 'Intermediário', 'Avançado'].map(level => (
                  <button key={level} className={`chip ${selectedLevel === level ? 'active' : ''}`}
                    onClick={() => setSelectedLevel(selectedLevel === level ? '' : level)}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bib-results-header">
          <span className="bib-count">{filtered.length} exercício{filtered.length !== 1 ? 's' : ''}</span>
          {(search || selectedCategory || selectedLevel) && (
            <button className="btn btn-ghost" onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedLevel(''); }}>
              Limpar filtros ✕
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="bib-grid stagger-children">
            {filtered.map(ex => (
              <div key={ex.id} className="bib-card card-clickable" onClick={() => setSelectedExercise(ex)}>
                <div className="bib-card-gif">
                  <img src={ex.gif} alt={ex.name} loading="lazy" />
                  <div className="bib-card-overlay">
                    <span className="bib-card-view">👁️ Ver detalhes</span>
                  </div>
                </div>
                <div className="bib-card-body">
                  <h3 className="bib-card-name">{ex.name}</h3>
                  <div className="bib-card-tags">
                    <span className={`badge badge-${ex.level === 'Iniciante' ? 'beginner' : ex.level === 'Intermediário' ? 'intermediate' : 'advanced'}`}>
                      {ex.level}
                    </span>
                    <span className="badge badge-category">{categories.find(c => c.id === ex.category)?.name}</span>
                  </div>
                  <div className="bib-card-meta">
                    <span>⏱️ {ex.duration}s</span>
                    <span>🔁 {ex.reps} reps</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">Nenhum exercício encontrado</div>
            <div className="empty-state-desc">Tente ajustar os filtros ou buscar por outro nome.</div>
          </div>
        )}
      </div>

      {selectedExercise && (
        <ExerciseDetailModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}
    </div>
  );
}
