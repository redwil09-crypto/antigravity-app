'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { categories, exercises } from '@/data/exercises';
import AuthModal from '@/components/AuthModal';
import styles from './page.module.css';

export default function Home() {
  const { user, workouts, history } = useApp();
  const [showAuth, setShowAuth] = useState(false);

  const featuredExercises = exercises.slice(0, 6);
  const stats = {
    exercises: exercises.length,
    categories: categories.length,
    workouts: workouts.length,
    plans: 24, // Número aproximado de planos nos PDFs
    completed: history.length,
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Seu treino.<br />
            <span className={styles.heroGradient}>Sua evolução.</span>
          </h1>
          <p className={styles.heroDesc}>
            Explore {stats.exercises} exercícios com demonstrações em GIF, monte treinos personalizados e acompanhe seu progresso.
          </p>
          <div className={styles.heroCta}>
            {user.isLoggedIn ? (
              <Link href="/treinos" className="btn btn-primary btn-large">
                Começar Treino ⚡
              </Link>
            ) : (
              <button onClick={() => setShowAuth(true)} className="btn btn-primary btn-large">
                Começar Agora ⚡
              </button>
            )}
            <Link href="/explorar" className="btn btn-secondary btn-large">
              Explorar Treinos 🔥
            </Link>
          </div>
        </div>
        {/* Hero Preview */}
        <div className={styles.heroPreview}>
          <div className={styles.previewCard}>
            <img src="/hero-fitness.png" alt="Motivação" className={styles.previewGif} />
            <div className={styles.previewOverlay}>
              <span className="badge badge-advanced">Elite</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${styles.stats} animate-fade-in-up`}>

        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.exercises}</span>
          <span className={styles.statLabel}>Exercícios</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.categories}</span>
          <span className={styles.statLabel}>Categorias</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.workouts}</span>
          <span className={styles.statLabel}>Seus Treinos</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.completed}</span>
          <span className={styles.statLabel}>Concluídos</span>
        </div>
      </section>

      {/* AI Personal Trainer Featured (Cinematographic) */}
      <section className={styles.trainerSection}>
        <div className={styles.trainerBanner}>
          <div className={styles.trainerGlow} />
          
          <div className={styles.trainerContent}>
            <span className={styles.trainerLabel}>Seu Personal Trainer AI</span>
            <h2 className={styles.trainerTitle}>
              Treine com o <span>Will</span>
            </h2>
            <p className={styles.trainerDescription}>
              Não sabe o que treinar hoje? Converse com o Will! Ele utiliza sua base de conhecimento completa para montar o treino perfeito para o seu objetivo e nível.
            </p>
            <Link href="/treinador-ia" className="btn btn-primary btn-large" style={{ width: 'fit-content' }}>
              Falar com Will ⚡
            </Link>
          </div>

          <div className={styles.trainerImageArea}>
            <img 
              src="/images/personal-trainer.png" 
              alt="Personal Trainer Will" 
              className={styles.trainerImage}
            />
          </div>
        </div>
      </section>


      {/* Categories */}
      <section className={`${styles.section} animate-fade-in-up`}>

        <h2 className="section-title">Categorias <span>Musculares</span></h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => {
            const count = exercises.filter(e => e.category === cat.id).length;
            return (
              <Link href={`/biblioteca?category=${cat.id}`} key={cat.id} className={styles.categoryCard}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>{count} exercícios</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Exercises */}
      <section className={`${styles.section} animate-fade-in-up`}>

        <div className={styles.sectionHeader}>
          <h2 className="section-title">Exercícios em <span>Destaque</span></h2>
          <Link href="/biblioteca" className="btn btn-ghost">Ver todos →</Link>
        </div>
        <div className={styles.exerciseGrid}>
          {featuredExercises.map(ex => (
            <Link href={`/biblioteca?exercise=${ex.id}`} key={ex.id} className={styles.exerciseCard}>
              <div className={styles.exerciseGifWrap}>
                <img src={ex.gif} alt={ex.name} className={styles.exerciseGif} loading="lazy" />
              </div>
              <div className={styles.exerciseInfo}>
                <h3 className={styles.exerciseName}>{ex.name}</h3>
                <div className={styles.exerciseMeta}>
                  <span className={`badge badge-${ex.level === 'Iniciante' ? 'beginner' : ex.level === 'Intermediário' ? 'intermediate' : 'advanced'}`}>
                    {ex.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      {user.isLoggedIn && (
        <section className={`${styles.section} animate-fade-in-up`}>

          <h2 className="section-title">Ações <span>Rápidas</span></h2>
          <div className={styles.quickActions}>
            <Link href="/treinos?new=true" className={styles.actionCard}>
              <span className={styles.actionIcon}>➕</span>
              <span className={styles.actionTitle}>Criar Treino</span>
              <span className={styles.actionDesc}>Monte um novo treino personalizado</span>
            </Link>
            <Link href="/explorar" className={styles.actionCard}>
              <span className={styles.actionIcon}>🔥</span>
              <span className={styles.actionTitle}>Explorar Treinos</span>
              <span className={styles.actionDesc}>Planos Elite extraídos das fichas</span>
            </Link>
            <Link href="/treinos" className={styles.actionCard}>
              <span className={styles.actionIcon}>🏋️</span>
              <span className={styles.actionTitle}>Meus Planos</span>
              <span className={styles.actionDesc}>Acesse seus treinos salvos</span>
            </Link>
            <Link href="/historico" className={styles.actionCard}>
              <span className={styles.actionIcon}>📊</span>
              <span className={styles.actionTitle}>Histórico</span>
              <span className={styles.actionDesc}>Veja seus treinos realizados</span>
            </Link>
          </div>
        </section>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
