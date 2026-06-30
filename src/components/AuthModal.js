'use client';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import './AuthModal.css';

export default function AuthModal({ onClose }) {
  const { login, guestLogin } = useApp();
  const [mode, setMode] = useState('login');
  const [guestName, setGuestName] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register' && !form.name) return;
    if (!form.email || !form.password) return;

    const isRegister = mode === 'register';
    const finalName = form.name || form.email.split('@')[0];
    login(finalName, form.email, form.password, isRegister);
    onClose();
  };

  const handleGuest = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    guestLogin(guestName.trim());
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        {!mode ? (
          <>
            <div className="auth-header">
              <span className="auth-logo">⚡</span>
              <h2>Bem-vindo ao Treinando com Will</h2>
              <p className="auth-subtitle">Como deseja continuar?</p>
            </div>
            <div className="auth-guest-form">
              <form onSubmit={handleGuest}>
                <div className="form-group">
                  <label>Seu nome</label>
                  <input
                    type="text" placeholder="Digite seu nome"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full btn-large">
                  Entrar como Convidado 🚀
                </button>
              </form>
              <div className="auth-divider"><span>ou</span></div>
              <button className="btn btn-secondary btn-full" onClick={() => setMode('login')}>
                Fazer login / Criar conta
              </button>
            </div>
            <button className="auth-close" onClick={onClose}>✕</button>
          </>
        ) : (
          <>
            <div className="auth-header">
              <span className="auth-logo">⚡</span>
              <h2>{mode === 'login' ? 'Entrar' : 'Criar Conta'}</h2>
              <p className="auth-subtitle">
                {mode === 'login' ? 'Acesse sua conta na nuvem' : 'Seus treinos salvos na nuvem'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text" placeholder="Seu nome"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
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
              <div style={{ marginTop: '12px' }}>
                <button className="auth-switch-btn" onClick={() => setMode('')}>
                  ← Voltar
                </button>
              </div>
            </div>

            <button className="auth-close" onClick={onClose}>✕</button>
          </>
        )}
      </div>
    </div>
  );
}
