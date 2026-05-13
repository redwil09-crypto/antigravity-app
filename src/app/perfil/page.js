'use client';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import AuthModal from '@/components/AuthModal';
import './perfil.css';

export default function PerfilPage() {
  const { user, updateProfile, logout, workouts, history, weightHistory, logWeight, isLoaded } = useApp();
  const [showAuth, setShowAuth] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, level: user.level, weight: user.weight, height: user.height });
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, level: user.level, weight: user.weight, height: user.height });
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="perfil-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>Carregando perfil...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <div className="perfil-page">
        <div className="container">
          <div className="perfil-login">
            <span className="perfil-login-icon">👤</span>
            <h2>Acesse sua conta</h2>
            <p>Faça login para salvar treinos e acompanhar seu progresso.</p>
            <button className="btn btn-primary btn-large" onClick={() => setShowAuth(true)}>
              Entrar / Criar Conta
            </button>
          </div>
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleLogWeight = () => {
    if (!newWeight) return;
    logWeight(newWeight);
    setNewWeight('');
  };

  const favCount = workouts.filter(w => w.favorite).length;

  return (
    <div className="perfil-page">
      <div className="container">
        <h1 className="section-title">Meu <span>Perfil</span></h1>

        {/* Profile Card */}
        <div className="card perfil-card">
          <div className="perfil-avatar">
            <span>{(user.name || 'A').charAt(0).toUpperCase()}</span>
          </div>

          {editing ? (
            <div className="perfil-edit">
              <div className="form-group">
                <label>Nome</label>
                <input type="text" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Peso (kg)</label>
                  <input type="number" step="0.1" value={form.weight || ''} onChange={e => setForm({ ...form, weight: parseFloat(e.target.value) || null })} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Altura (cm)</label>
                  <input type="number" value={form.height || ''} onChange={e => setForm({ ...form, height: parseFloat(e.target.value) || null })} />
                </div>
              </div>
              <div className="form-group">
                <label>Nível</label>
                <div className="level-selector">
                  {['Iniciante', 'Intermediário', 'Avançado'].map(level => (
                    <button key={level} type="button" className={`level-btn ${form.level === level ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, level })}>
                      {level === 'Iniciante' ? '🌱' : level === 'Intermediário' ? '🔥' : '⚡'} {level}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="perfil-info">
              <h2 className="perfil-name">{user.name || 'Aluno'}</h2>
              <span className="perfil-email">{user.email}</span>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {user.weight && <span>⚖️ {user.weight} kg</span>}
                {user.height && <span>📏 {user.height} cm</span>}
              </div>
              <span className={`badge badge-${user.level === 'Iniciante' ? 'beginner' : user.level === 'Intermediário' ? 'intermediate' : 'advanced'}`} style={{ marginTop: '12px' }}>
                {user.level}
              </span>
              <button className="btn btn-secondary" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>
                ✏️ Editar Perfil
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="perfil-stats">
          <div className="card perfil-stat-card">
            <span className="perfil-stat-icon">🏋️</span>
            <span className="perfil-stat-value">{workouts.length}</span>
            <span className="perfil-stat-label">Treinos Salvos</span>
          </div>
          <div className="card perfil-stat-card">
            <span className="perfil-stat-icon">⭐</span>
            <span className="perfil-stat-value">{favCount}</span>
            <span className="perfil-stat-label">Favoritos</span>
          </div>
          <div className="card perfil-stat-card">
            <span className="perfil-stat-icon">✅</span>
            <span className="perfil-stat-value">{history.length}</span>
            <span className="perfil-stat-label">Concluídos</span>
          </div>
        </div>

        {/* Weight History */}
        <div className="card" style={{ marginTop: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📈</span> Evolução do Peso
          </h2>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <input 
              type="number" step="0.1" placeholder="Peso de hoje (kg)" 
              value={newWeight} onChange={e => setNewWeight(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={handleLogWeight}>
              Registrar
            </button>
          </div>

          {weightHistory && weightHistory.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {weightHistory.map((entry, index) => {
                const date = new Date(entry.created_at).toLocaleDateString('pt-BR');
                // Calculate difference from previous entry
                let diffStr = '';
                let diffColor = 'var(--text-muted)';
                if (index < weightHistory.length - 1) {
                  const diff = entry.weight - weightHistory[index + 1].weight;
                  if (diff > 0) { diffStr = `+${diff.toFixed(1)}kg`; diffColor = 'var(--coral-400)'; }
                  else if (diff < 0) { diffStr = `${diff.toFixed(1)}kg`; diffColor = 'var(--green-400)'; }
                  else { diffStr = '='; }
                }

                return (
                  <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{entry.weight} kg</span>
                      {diffStr && <span style={{ marginLeft: '8px', fontSize: '0.85rem', color: diffColor }}>{diffStr}</span>}
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{date}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '24px 0' }}>
              <span className="empty-state-title">Nenhum registro ainda</span>
              <p className="empty-state-desc" style={{ marginBottom: 0 }}>Comece a registrar seu peso para acompanhar a evolução.</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button className="btn btn-danger btn-full" onClick={logout} style={{ marginTop: '24px' }}>
          🚪 Sair da Conta
        </button>
      </div>
    </div>
  );
}
