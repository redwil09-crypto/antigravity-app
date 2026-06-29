'use client';
import { useState } from 'react';
import styles from './RefundiniShowcase.module.css';
import { refundiniData } from '@/data/refundini';

export default function RefundiniShowcase() {
  const [activeGroup, setActiveGroup] = useState(refundiniData.muscleGroups[0].id);
  const activeData = refundiniData.muscleGroups.find(g => g.id === activeGroup);

  return (
    <section className={styles.showcase}>
      <div className={styles.showcaseGlow} />
      <div className={styles.showcaseGlow2} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.labelRow}>
          <span className={styles.labelBadge}>
            <span className={styles.labelDot} />
            NOVO
          </span>
          <span className={styles.labelSource}>Baseado no canal de Laércio Refundini</span>
        </div>
        <h2 className={styles.title}>
          Top Exercícios por <span>Grupo Muscular</span>
        </h2>
        <p className={styles.subtitle}>
          Seleção dos melhores exercícios segundo a ciência: máquinas estáveis, boa curva de resistência, alto estímulo muscular e menor risco articular.
        </p>
      </div>

      {/* Muscle Group Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {refundiniData.muscleGroups.map(group => (
            <button
              key={group.id}
              className={`${styles.tab} ${activeGroup === group.id ? styles.tabActive : ''}`}
              onClick={() => setActiveGroup(group.id)}
              style={{
                '--tab-color': group.color,
              }}
            >
              <span className={styles.tabIcon}>{group.icon}</span>
              <span className={styles.tabName}>{group.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Cards */}
      {activeData && (
        <div className={styles.content} key={activeData.id}>
          <div className={styles.groupHeader}>
            <span className={styles.groupIcon} style={{ '--group-color': activeData.color }}>
              {activeData.icon}
            </span>
            <div>
              <h3 className={styles.groupName}>{activeData.name}</h3>
              <span className={styles.groupCount}>{activeData.exercises.length} exercícios recomendados</span>
            </div>
          </div>

          <div className={styles.exerciseList}>
            {activeData.exercises.map((exercise, index) => (
              <div
                key={exercise.name}
                className={`${styles.exerciseItem} ${exercise.highlight ? styles.exerciseHighlight : ''}`}
                style={{
                  '--item-color': activeData.color,
                  '--item-delay': `${index * 0.08}s`,
                }}
              >
                <div className={styles.exerciseRank}>
                  <span className={styles.rankNumber}>{index + 1}</span>
                </div>
                <div className={styles.exerciseDetails}>
                  <h4 className={styles.exerciseTitle}>{exercise.name}</h4>
                  <span className={styles.exerciseFocus}>{exercise.focus}</span>
                </div>
                {exercise.highlight && (
                  <span className={styles.starBadge}>⭐ TOP 1</span>
                )}
              </div>
            ))}
          </div>

          {/* Philosophy Card */}
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyIcon}>🧠</div>
            <div className={styles.philosophyContent}>
              <h4>Filosofia Refundini</h4>
              <p>{refundiniData.source.philosophy}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
