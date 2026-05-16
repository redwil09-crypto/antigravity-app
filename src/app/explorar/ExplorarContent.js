'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { treinosBase } from '@/data/treinos_base';
import { exercises as allExercises } from '@/data/exercises';
import './explorar.css';

// Mapeia a categoria do treino_base para a(s) categoria(s) de exercícios GIF
const CATEGORY_MAP = {
  'Peito': ['peito'],
  'Costas': ['costas'],
  'Ombros': ['ombro'],
  'Bíceps': ['biceps'],
  'Tríceps': ['triceps'],
  'Pernas': ['membros-inferiores'],
  'Glúteos': ['membros-inferiores'],
  'Abdômen': ['abdominal'],
  'Abdomen': ['abdominal'],
  'Trapézio': ['trapezio'],
  'Antebraço': ['antebraco'],
  // Divisões e especiais podem usar qualquer categoria
  'Divisão ABC': null,
  'Divisão ABCD': null,
  'Mensal': null,
  'Especial': null,
};

export default function ExplorarContent() {
  const router = useRouter();
  const { createWorkout, showToast, user } = useApp();
  const [activeTab, setActiveTab] = useState('muscle');

  const filteredTreinos = useMemo(() => {
    return treinosBase.filter(t => t.type === activeTab);
  }, [activeTab]);

  const handleImport = async (treino) => {
    if (!user || !user.isLoggedIn) {
      showToast('Faça login para salvar treinos.', 'error');
      return;
    }

    try {
      const normalize = (s) => s ? s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";

      // Determina as categorias de GIF válidas para este treino
      const allowedCategories = CATEGORY_MAP[treino.category] || null;

      const mappedExercises = treino.exercises.map(ex => {
        const pdfName = normalize(ex.name);

        // Filtra exercícios pela categoria correta, se aplicável
        const searchPool = allowedCategories
          ? allExercises.filter(dbEx => allowedCategories.includes(dbEx.category))
          : allExercises;

        // Busca match exato primeiro, depois parcial
        let match = searchPool.find(dbEx => {
          const dbName = normalize(dbEx.name);
          return dbName === pdfName;
        });

        if (!match) {
          match = searchPool.find(dbEx => {
            const dbName = normalize(dbEx.name);
            return dbName.includes(pdfName) || pdfName.includes(dbName);
          });
        }

        // Se não encontrou na categoria correta, busca em todas como fallback
        if (!match && allowedCategories) {
          match = allExercises.find(dbEx => {
            const dbName = normalize(dbEx.name);
            return dbName.includes(pdfName) || pdfName.includes(dbName);
          });
        }

        if (match) {
          return {
            exerciseId: match.id,
            restSeconds: parseInt(ex.rest) || 60,
            series: ex.series || "3",
            reps: ex.reps || "12",
            name: match.name
          };
        }
        return null;
      }).filter(Boolean);

      if (mappedExercises.length === 0) {
        showToast('Nenhum exercício compatível encontrado.', 'error');
        return;
      }

      await createWorkout({
        name: treino.name,
        category: treino.category,
        difficulty: 'Intermediário',
        exercises: mappedExercises,
        description: treino.description || ''
      });

      showToast('Treino adicionado aos seus planos!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Erro ao importar treino.', 'error');
    }
  };

  const handleStart = async (treino) => {
    await handleImport(treino);
    router.push('/treinos');
  };

  return (
    <div className="explorar-container">
      <div className="explorar-header">
        <h1>Treinos <span>Elite</span></h1>
        <p>Planos profissionais extraídos das fichas de treinamento.</p>
      </div>

      <div className="filter-tabs">
        <button 
          className={`tab-btn ${activeTab === 'muscle' ? 'active' : ''}`}
          onClick={() => setActiveTab('muscle')}
        >
          💪 Por Músculo
        </button>
        <button 
          className={`tab-btn ${activeTab === 'division' ? 'active' : ''}`}
          onClick={() => setActiveTab('division')}
        >
          📊 Divisões (ABC/D)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          📅 Por Mês
        </button>
        <button 
          className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          ⭐ Especiais
        </button>
      </div>

      <div className="explorar-grid">
        {filteredTreinos.length > 0 ? (
          filteredTreinos.map(treino => (
            <div key={treino.id} className="plano-card">
              <span className="plano-tag">{treino.category}</span>
              <h3 className="plano-name">{treino.name}</h3>
              <p className="plano-desc">{treino.description || 'Treino completo com foco em resultados máximos.'}</p>
              
              <div className="plano-meta">
                <span>📋 {treino.exercises.length} Exercícios</span>
                <span>⏱️ ~45-60 min</span>
              </div>

              <div className="plano-actions">
                <button className="btn-start" onClick={() => handleStart(treino)}>
                  ▶️ Iniciar
                </button>
                <button className="btn-import" onClick={() => handleImport(treino)} title="Salvar em Meus Planos">
                  📥 Salvar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Em breve mais treinos nesta categoria!</p>
          </div>
        )}
      </div>
    </div>
  );
}
