'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import { exercises, categories } from '@/data/exercises';
import './minha-academia.css';

const CATEGORY_ICONS = {
  'Máquina': '⚙️',
  'Cabo': '🔄',
  'Peso Livre': '🏋️',
  'Banco': '🪑',
  'Cardio': '🏃',
  'Acessório': '📦'
};

export default function MinhaAcademia() {
  const router = useRouter();
  const { gyms, currentGymId, selectGym, saveGymProfile, deleteGymProfile } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGymName, setNewGymName] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [selectedMuscle, setSelectedMuscle] = useState('');

  const currentGym = gyms.find(g => g.id === currentGymId);

  const handleCreateGym = (e) => {
    e.preventDefault();
    if (!newGymName.trim()) return;
    const newGym = {
      id: Date.now().toString(),
      name: newGymName,
      inventory: [],
      createdAt: new Date().toISOString()
    };
    saveGymProfile(newGym);
    setIsModalOpen(false);
    setNewGymName('');
  };

  // Calcula o Elite Score e estatísticas
  const stats = useMemo(() => {
    if (!currentGym || !currentGym.inventory) return { score: 0, machines: 0, freeWeights: 0, cables: 0 };
    
    let machines = 0;
    let freeWeights = 0;
    let cables = 0;

    currentGym.inventory.forEach(item => {
      if (item.category === 'Máquina') machines++;
      if (item.category === 'Peso Livre') freeWeights++;
      if (item.category === 'Cabo') cables++;
    });

    // Score simples para MVP
    const totalItems = currentGym.inventory.length;
    let score = Math.min(100, Math.round((totalItems / 50) * 100)); // Supondo 50 como uma academia super completa
    
    // Bônus se tiver variedade
    if (machines > 0 && freeWeights > 0 && cables > 0) score = Math.min(100, score + 10);

    return { score, machines, freeWeights, cables };
  }, [currentGym]);

  const filteredInventory = useMemo(() => {
    if (!currentGym || !currentGym.inventory) return [];
    if (filter === 'Todos') return currentGym.inventory;
    return currentGym.inventory.filter(item => item.category === filter);
  }, [currentGym, filter]);

  const bestExercise = useMemo(() => {
    if (!selectedMuscle || !currentGym || !currentGym.inventory) return null;
    
    // Filtra exercícios da categoria selecionada
    const muscleExercises = exercises.filter(ex => ex.category === selectedMuscle);
    if (muscleExercises.length === 0) return null;

    // Tenta encontrar o "Melhor" baseado nos equipamentos que o usuário tem
    // Prioridade: Máquinas/Cabos específicos -> Barras/Halteres -> Peso Corporal
    const inventoryNames = currentGym.inventory.map(i => i.name.toLowerCase());
    
    // Busca exercício onde o nome do equipamento está no nome do exercício (ex: Leg Press)
    let best = muscleExercises.find(ex => inventoryNames.some(name => ex.name.toLowerCase().includes(name)));
    
    if (!best) {
      // Fallback para equipamentos genéricos
      const hasCables = currentGym.inventory.some(i => i.category === 'Cabo');
      const hasMachines = currentGym.inventory.some(i => i.category === 'Máquina');
      const hasFreeWeights = currentGym.inventory.some(i => i.category === 'Peso Livre');

      if (hasMachines) best = muscleExercises.find(ex => ex.equipment === 'maquina');
      if (!best && hasCables) best = muscleExercises.find(ex => ex.equipment === 'cross-cabo');
      if (!best && hasFreeWeights) best = muscleExercises.find(ex => ex.equipment === 'halteres' || ex.equipment === 'barra');
      if (!best) best = muscleExercises.find(ex => ex.equipment === 'peso-corporal');
    }

    return best || muscleExercises[0]; // Retorna algum se não achar perfeito
  }, [selectedMuscle, currentGym]);

  return (
    <>
      <Navigation />
      <div className="academia-container fade-in">
        <div className="academia-header">
          <h1>Minha Academia</h1>
          <div className="gym-selector-wrapper">
            {gyms.length > 0 && (
              <select 
                className="gym-select" 
                value={currentGymId || ''} 
                onChange={(e) => selectGym(e.target.value)}
              >
                {gyms.map(gym => (
                  <option key={gym.id} value={gym.id}>{gym.name}</option>
                ))}
              </select>
            )}
            <button className="btn-new-gym" onClick={() => setIsModalOpen(true)}>
              + Nova Academia
            </button>
          </div>
        </div>

        {currentGym ? (
          <>
            <div className="dashboard-grid">
            {/* Esquerda: Perfil e Score */}
            <div className="profile-column">
              <div className="profile-card">
                <h2 className="gym-name">{currentGym.name}</h2>
                <div className={`gym-level ${stats.score > 70 ? 'premium' : ''}`}>
                  {stats.score > 85 ? 'Premium' : stats.score > 50 ? 'Completa' : 'Básica'}
                </div>

                <div className="elite-score-container">
                  <span className="score-value">{stats.score}</span>
                  <span className="score-label">Elite Score</span>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{stats.machines}</div>
                    <div className="stat-label">Máquinas</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{stats.cables}</div>
                    <div className="stat-label">Cabos & Polias</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{stats.freeWeights}</div>
                    <div className="stat-label">Pesos Livres</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{currentGym.inventory?.length || 0}</div>
                    <div className="stat-label">Total Itens</div>
                  </div>
                </div>

                <div className="scan-cta-card" onClick={() => router.push('/minha-academia/scaner')}>
                  <div className="scan-cta-icon">📸</div>
                  <div className="scan-cta-content">
                    <div className="scan-cta-title">Escanear Equipamentos</div>
                    <div className="scan-cta-desc">Fotografe sua academia e deixe a IA identificar tudo</div>
                  </div>
                  <div className="scan-cta-arrow">→</div>
                </div>
                <div className="profile-actions-divider" />
                <div className="profile-actions">
                  <button className="btn btn-secondary" onClick={() => deleteGymProfile(currentGym.id)}>
                    Remover Academia
                  </button>
                </div>
              </div>
            </div>

            {/* Direita: Inventário */}
            <div className="inventory-column">
              <div className="inventory-section">
                <div className="inventory-header">
                  <h2>Inventário Identificado</h2>
                  <div className="inventory-filters">
                    {['Todos', 'Máquina', 'Cabo', 'Peso Livre'].map(f => (
                      <button 
                        key={f} 
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredInventory.length > 0 ? (
                  <div className="inventory-list">
                    {filteredInventory.map((item, index) => (
                      <div key={index} className="inventory-item">
                        <div className="item-info">
                          <span className="item-icon">{CATEGORY_ICONS[item.category] || '📦'}</span>
                          <div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-category">{item.category}</div>
                          </div>
                        </div>
                        <div className="item-confidence" title={`Confiança da IA: ${item.confidence}%`}>
                          <span className={`confidence-indicator ${
                            item.confidence > 85 ? 'confidence-high' : 
                            item.confidence > 60 ? 'confidence-med' : 'confidence-low'
                          }`}></span>
                          {item.confidence}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="icon">📸</div>
                    <h3>Inventário Vazio</h3>
                    <p>Faça o escaneamento da sua academia para que o Treinador Elite crie treinos usando apenas o que você tem disponível.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="consultant-section fade-in" style={{marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(220,38,38,0.2)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
              <span style={{fontSize: '2rem'}}>🎯</span>
              <div>
                <h2 style={{margin: 0, color: 'var(--primary-red)'}}>Melhor Exercício Disponível</h2>
                <p style={{margin: 0, color: '#a1a1aa', fontSize: '0.9rem'}}>O consultor escolhe o exercício mais eficiente com base no que a {currentGym.name} oferece hoje.</p>
              </div>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`btn ${selectedMuscle === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedMuscle(cat.id)}
                  style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {selectedMuscle && bestExercise && (
              <div style={{background: '#121214', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #10b981', display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                <div style={{width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', flexShrink: 0}}>
                  {/* Fallback caso não tenha GIF */}
                  {bestExercise.gif ? <img src={bestExercise.gif} alt={bestExercise.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <div style={{width: '100%', height: '100%', display: 'flex', alignItems:'center', justifyContent: 'center', fontSize: '2rem'}}>🔥</div>}
                </div>
                <div>
                  <div style={{color: '#10b981', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem'}}>Opção Ideal Encontrada</div>
                  <h3 style={{margin: '0 0 0.5rem 0', fontSize: '1.5rem'}}>{bestExercise.name}</h3>
                  <p style={{margin: 0, color: '#a1a1aa', fontSize: '0.9rem'}}>{bestExercise.description || bestExercise.tips}</p>
                  <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                    <span style={{fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px'}}>{bestExercise.level}</span>
                    <span style={{fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px'}}>{bestExercise.equipment}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          </>

        ) : (
          <div className="empty-state">
            <div className="icon">🏢</div>
            <h3>Nenhuma academia selecionada</h3>
            <p>Crie um perfil de academia para começar a escanear equipamentos.</p>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{marginTop: '1rem'}}>
              Criar Perfil
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nova Academia</h3>
            <form onSubmit={handleCreateGym}>
              <input 
                type="text" 
                placeholder="Ex: Smart Fit, Academia do Prédio" 
                value={newGymName}
                onChange={(e) => setNewGymName(e.target.value)}
                autoFocus
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
