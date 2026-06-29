'use client';
import { useState, useMemo } from 'react';
import eliteMapping from '@/data/eliteMapping.json';
import './admin.css';

export default function AdminDashboard() {
  const [filter, setFilter] = useState('all'); // all, elite, unclassified
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const total = eliteMapping.length;
    const elite = eliteMapping.filter(m => m.isElite).length;
    const unclassified = eliteMapping.filter(m => m.confidenceLevel < 50).length;
    const reclassified = total - unclassified;
    const avgConfidence = eliteMapping.reduce((acc, m) => acc + m.confidenceLevel, 0) / total;

    return { total, elite, unclassified, reclassified, avgConfidence: avgConfidence.toFixed(1) };
  }, []);

  const filteredData = useMemo(() => {
    return eliteMapping.filter(m => {
      if (filter === 'elite' && !m.isElite) return false;
      if (filter === 'unclassified' && m.confidenceLevel >= 50) return false;
      if (search && !m.originalName.toLowerCase().includes(search.toLowerCase()) && 
          !m.detectedName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <h1>⚙️ Dashboard <span>Administrativo</span></h1>
        <p>Relatório do Motor de Reclassificação da Biblioteca Elite</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Vídeos Analisados</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-value">{stats.reclassified}</div>
          <div className="stat-label">Reclassificados</div>
        </div>
        <div className="stat-card elite-stat">
          <div className="stat-value">{stats.elite}</div>
          <div className="stat-label">Exercícios Elite</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{stats.unclassified}</div>
          <div className="stat-label">Sem Classificação Forte</div>
        </div>
        <div className="stat-card info">
          <div className="stat-value">{stats.avgConfidence}%</div>
          <div className="stat-label">Confiança Média</div>
        </div>
      </div>

      <div className="admin-controls">
        <div className="search-box">
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome original ou detectado..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>Todos</button>
          <button className={`btn ${filter === 'elite' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('elite')}>Apenas Elite</button>
          <button className={`btn ${filter === 'unclassified' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('unclassified')}>Sem Classificação</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Original (Arquivo)</th>
              <th>Nome Detectado (IA)</th>
              <th>Equipamento</th>
              <th>Grupo</th>
              <th>Confiança</th>
              <th>Elite?</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(row => (
              <tr key={row.id} className={row.isElite ? 'row-elite' : row.confidenceLevel < 50 ? 'row-warning' : ''}>
                <td>#{row.id}</td>
                <td className="col-original">{row.originalName}</td>
                <td className="col-detected"><strong>{row.detectedName}</strong></td>
                <td><span className="badge badge-category">{row.equipment}</span></td>
                <td><span className="badge">{row.muscleGroup}</span></td>
                <td>
                  <div className="confidence-cell">
                    <div className="confidence-bar-bg">
                      <div className="confidence-bar-fill" style={{width: `${row.confidenceLevel}%`, background: row.confidenceLevel >= 75 ? 'var(--green-500)' : row.confidenceLevel >= 50 ? 'var(--yellow-500)' : 'var(--red-500)'}}></div>
                    </div>
                    <span>{row.confidenceLevel}%</span>
                  </div>
                </td>
                <td>
                  {row.isElite ? <span className="badge-elite-small">⭐ SIM ({row.eliteScore})</span> : <span className="badge-no">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="empty-state">Nenhum resultado encontrado.</div>
        )}
      </div>
    </div>
  );
}
