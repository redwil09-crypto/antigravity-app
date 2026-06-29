'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { login } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', level: 'Iniciante', weight: '', height: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register' && !form.name) return;
    if (!form.email || !form.password) return;
    
    const isRegister = mode === 'register';
    const finalName = form.name || form.email.split('@')[0];
    
    login(finalName, form.email, form.password, isRegister, form.level, form.weight, form.height);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <div className="auth-header">
          <span className="auth-logo">⚡</span>
          <h2>{mode === 'login' ? 'Entrar' : 'Criar Conta'}</h2>
          <p className="auth-subtitle">
            {mode === 'login' ? 'Acesse sua conta de treinos' : 'Comece sua jornada fitness'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text" placeholder="Seu nome"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Peso (kg)</label>
                <input
                  type="number" step="0.1" placeholder="Ex: 75.5"
                  value={form.weight}
                  onChange={e => setForm({ ...form, weight: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Altura (cm)</label>
                <input
                  type="number" placeholder="Ex: 175"
                  value={form.height}
                  onChange={e => setForm({ ...form, height: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email" placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password" placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required minLength={6}
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label>Seu nível</label>
              <div className="level-selector">
                {['Iniciante', 'Intermediário', 'Avançado'].map(level => (
                  <button
                    key={level} type="button"
                    className={`level-btn ${form.level === level ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, level })}
                  >
                    {level === 'Iniciante' ? '🌱' : level === 'Intermediário' ? '🔥' : '⚡'} {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full btn-large">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <div className="auth-footer">
          <span className="auth-switch">
            {mode === 'login' ? 'Não tem conta? ' : 'Já tem conta? '}
            <button className="auth-switch-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Criar conta' : 'Entrar'}
            </button>
          </span>
        </div>

        <button className="auth-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
