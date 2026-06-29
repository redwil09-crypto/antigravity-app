import Link from 'next/link';
import styles from './EliteHomeCard.module.css';
import EliteBannerCarousel from './EliteBannerCarousel';

export default function EliteHomeCard() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleBadge}>
            <span>🏆</span> NOVO
          </div>
          <h2 className={styles.title}>
            Biblioteca <span>Elite</span>
          </h2>
          <p className={styles.subtitle}>
            A seleção definitiva dos exercícios mais eficientes para hipertrofia, baseada em biomecânica, estabilidade e curva de resistência.
          </p>
          <Link href="/biblioteca-elite" className="btn btn-primary">
            Explorar Biblioteca Elite ⚡
          </Link>
        </div>
        
        <div className={styles.carouselArea}>
          <EliteBannerCarousel />
        </div>
      </div>
    </section>
  );
}
