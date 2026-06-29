'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { eliteData, getEquipmentLabel, getEquipmentIcon } from '@/data/refundini';
import eliteMapping from '@/data/eliteMapping.json';
import { exercises } from '@/data/exercises';
import ExerciseDetailModal from '@/components/ExerciseDetailModal';
import './biblioteca-elite.css';

export default function BibliotecaEliteContent() {
  const searchParams = useSearchParams();
  const initialGroup = searchParams.get('group') || eliteData.muscleGroups[0].id;
  
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const [equipmentFilter, setEquipmentFilter] = useState('');
  const [selectedSubs, setSelectedSubs] = useState(null);
  const [playingExercise, setPlayingExercise] = useState(null);

  // Sync state with URL when using back/forward buttons or banner links
  useEffect(() => {
    const groupFromUrl = searchParams.get('group');
    if (groupFromUrl) {
      setActiveGroup(groupFromUrl);
    }
  }, [searchParams]);

  const activeData = eliteData.muscleGroups.find(g => g.id === activeGroup);
  
  // Aggregate real videos into Elite Concepts
  const enrichedExercises = useMemo(() => {
    if (!activeData) return [];
    
    // Find all real videos mapped to this group that are Elite
    const groupVideos = eliteMapping.filter(m => m.muscleGroup === activeData.id && m.isElite);
    
    const enriched = groupVideos.map(video => {
      // Find the corresponding elite concept to get ratings, focus, substitutions
      const eliteConcept = activeData.exercises.find(e => e.name === video.detectedName);
      
      return {
        ...eliteConcept, // Spread concept first (focus, ratings, substitutions)
        name: video.detectedName, // Use detected name as main title
        realVideoId: video.id,
        gifUrl: video.gif,
        originalVideoName: video.originalName,
        confidence: video.confidenceLevel,
        equipment: video.equipment,
        // Ensure ratings exist even if concept isn't found for some reason
        ratings: eliteConcept?.ratings || { overall: 8.0, hypertrophy: 8, stability: 8, safety: 8, ease: 8 },
        focus: eliteConcept?.focus || 'Foco muscular geral',
        substitutions: eliteConcept?.substitutions || []
      };
    });
    
    // Sort by Elite Score
    return enriched.sort((a, b) => b.ratings.overall - a.ratings.overall);
  }, [activeData]);

  const availableEquipments = [...new Set(enrichedExercises.map(e => e.equipment))].filter(Boolean);

  const filteredExercises = enrichedExercises.filter(ex => 
    !equipmentFilter || ex.equipment === equipmentFilter
  );

  const featuredExercise = enrichedExercises.length > 0 ? enrichedExercises[0] : null;

  return (
    <div className="elite-page">
      {/* Netflix-style Hero Section */}
      <div className="elite-hero">
        <div className="elite-hero-glow" />
        <div className="container">
          <div className="elite-badge-top">
            <span>🏆</span> BIBLIOTECA ELITE
          </div>
          <h1 className="elite-title">
            Centro de <span>Excelência Muscular</span>
          </h1>
          <p className="elite-subtitle">
            Os exercícios mais eficientes para hipertrofia. Conectados diretamente aos vídeos reais do seu aplicativo.
          </p>
          
          <div className="hero-stats-row">
            <div className="hero-stat">
              <strong>+{eliteMapping.length}</strong>
              <span>vídeos analisados</span>
            </div>
            <div className="hero-stat divider"></div>
            <div className="hero-stat">
              <strong>+{eliteMapping.filter(m => m.isElite).length}</strong>
              <span>exercícios Elite</span>
            </div>
            <div className="hero-stat divider"></div>
            <div className="hero-stat">
              <strong>+1.500</strong>
              <span>combinações</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container elite-main">
        {/* Sidebar / Muscle Groups */}
        <div className="elite-sidebar">
          <h3 className="sidebar-title">Grupamentos</h3>
          <div className="group-list">
            {eliteData.muscleGroups.map(group => {
              // Count real mapped videos for this group
              const realCount = eliteMapping.filter(m => m.muscleGroup === group.id && m.isElite).length;
              return (
                <button
                  key={group.id}
                  className={`group-btn ${activeGroup === group.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveGroup(group.id);
                    setEquipmentFilter('');
                    setSelectedSubs(null);
                  }}
                  style={{ '--group-color': group.color }}
                >
                  <span className="group-btn-icon">{group.icon}</span>
                  <span className="group-btn-name">{group.name}</span>
                  <span className="group-btn-count">{realCount}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="elite-content">
          
          {/* Featured Exercise (Netflix Style) */}
          {featuredExercise && !equipmentFilter && (
            <div className="featured-exercise-container" style={{ '--group-color': activeData.color }}>
              <div className="featured-badge">🏆 EXERCÍCIO DESTAQUE</div>
              <div className="featured-video-wrapper">
                <img src={featuredExercise.gifUrl} alt={featuredExercise.name} className="featured-video" />
                <div className="featured-overlay"></div>
              </div>
              <div className="featured-content">
                <h2 className="featured-title">{featuredExercise.name}</h2>
                <div className="featured-meta">
                  <span className="featured-score">Nota: {featuredExercise.ratings.overall}</span>
                  <span className="featured-focus">{featuredExercise.focus}</span>
                </div>
                <div className="featured-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      const ex = exercises.find(e => e.name === featuredExercise.name);
                      if (ex) setPlayingExercise(ex);
                    }}
                  >
                    Assistir 🎬
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      const ex = exercises.find(e => e.name === featuredExercise.name);
                      if (ex) setPlayingExercise(ex); // We can just open the modal to let them add
                    }}
                  >
                    Detalhes / Adicionar ➕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="elite-filters">
            <span className="filter-label">Equipamento:</span>
            <div className="filter-chips">
              <button 
                className={`chip ${!equipmentFilter ? 'active' : ''}`}
                onClick={() => setEquipmentFilter('')}
              >
                Todos
              </button>
              {availableEquipments.map(eq => (
                <button 
                  key={eq}
                  className={`chip ${equipmentFilter === eq ? 'active' : ''}`}
                  onClick={() => setEquipmentFilter(eq)}
                >
                  {getEquipmentIcon(eq)} {getEquipmentLabel(eq)}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises Grid */}
          <div className="elite-grid">
            {filteredExercises?.map((exercise, idx) => (
              <div 
                key={`${exercise.originalVideoName}-${idx}`}
                className={`elite-premium-card ${idx === 0 && !equipmentFilter ? 'highlight' : ''}`}
                style={{ '--card-color': activeData.color }}
              >
                <div className="premium-card-thumb">
                  <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
                  <div className="thumb-overlay">
                    <button 
                      className="play-button"
                      onClick={() => {
                        const ex = exercises.find(e => e.name === exercise.name);
                        if (ex) setPlayingExercise(ex);
                      }}
                    >▶</button>
                  </div>
                  <div className="rank-badge">#{idx + 1}</div>
                </div>
                
                <div className="premium-card-body">
                  <div className="card-tags-row">
                    <span className="badge badge-advanced">⭐ Elite: {exercise.ratings.overall}</span>
                    <span className="eq-icon-small">{getEquipmentIcon(exercise.equipment)} {getEquipmentLabel(exercise.equipment)}</span>
                  </div>
                  
                  <h3 className="card-title">{exercise.name}</h3>
                  <span className="card-focus">{exercise.focus}</span>

                  <div className="card-ratings-mini">
                    <div className="mini-rating">
                      <span className="mr-label">Hipertrofia</span>
                      <div className="mr-bar"><div className="mr-fill" style={{width: `${exercise.ratings.hypertrophy*10}%`}}></div></div>
                    </div>
                    <div className="mini-rating">
                      <span className="mr-label">Estabilidade</span>
                      <div className="mr-bar"><div className="mr-fill" style={{width: `${exercise.ratings.stability*10}%`}}></div></div>
                    </div>
                  </div>

                  <div className="premium-card-actions">
                    <button 
                      className="btn-icon" 
                      title="Detalhes / Adicionar ao Treino"
                      onClick={() => {
                        const ex = exercises.find(e => e.name === exercise.name);
                        if (ex) setPlayingExercise(ex);
                      }}
                    >➕</button>
                    <button 
                      className="btn btn-secondary btn-full view-subs-btn"
                      onClick={() => setSelectedSubs(selectedSubs === exercise.name ? null : exercise.name)}
                    >
                      {selectedSubs === exercise.name ? '✕ Fechar Alternativas' : 'Alternativas 🔄'}
                    </button>
                  </div>
                </div>

                {selectedSubs === exercise.name && (
                  <div className="substitutions-panel animate-slide-up">
                    <h4>Substituições Inteligentes:</h4>
                    <div className="subs-list">
                      {exercise.substitutions.map(sub => (
                        <div key={sub.name} className="sub-item">
                          <span className="sub-check">✅</span>
                          <span className="sub-name">{sub.name}</span>
                          <span className="sub-match">{sub.equivalence}% match</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {filteredExercises?.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">⚠️</div>
                <div className="empty-state-title">Nenhum exercício real encontrado</div>
                <div className="empty-state-desc">Os vídeos mapeados para este grupamento não correspondem aos filtros atuais.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {playingExercise && (
        <ExerciseDetailModal 
          exercise={playingExercise} 
          onClose={() => setPlayingExercise(null)} 
        />
      )}
    </div>
  );
}
