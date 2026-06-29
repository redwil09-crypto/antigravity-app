'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './EliteBannerCarousel.module.css';

const banners = [
  {
    id: 1,
    title: 'Bíceps Gigantes',
    subtitle: '⭐ Exercícios Elite para Bíceps',
    image: '/images/elite-banners/banner_biceps_1782686595321.png',
    link: '/biblioteca-elite?group=biceps',
    color: '#8b5cf6'
  },
  {
    id: 2,
    title: 'Costas Mais Largas',
    subtitle: '⭐ Exercícios Selecionados',
    image: '/images/elite-banners/banner_costas_1782686606372.png',
    link: '/biblioteca-elite?group=costas',
    color: '#3b82f6'
  },
  {
    id: 3,
    title: 'Peitoral Completo',
    subtitle: '⭐ Exercícios de Alta Eficiência',
    image: '/images/elite-banners/banner_peitoral_1782686615589.png',
    link: '/biblioteca-elite?group=peito',
    color: '#f43f5e'
  },
  {
    id: 4,
    title: 'Pernas de Elite',
    subtitle: '⭐ Máquinas e Exercícios Mais Eficientes',
    image: '/images/elite-banners/banner_pernas_1782686623704.png',
    link: '/biblioteca-elite?group=quadriceps',
    color: '#22c55e'
  }
];

export default function EliteBannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack} style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map((banner) => (
          <Link href={banner.link} key={banner.id} className={styles.bannerSlide}>
            <div className={styles.imageWrapper}>
              <img src={banner.image} alt={banner.title} className={styles.bannerImage} />
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <span className={styles.subtitle} style={{ color: banner.color }}>{banner.subtitle}</span>
              <h3 className={styles.title}>{banner.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      <div className={styles.indicators}>
        {banners.map((_, index) => (
          <button 
            key={index} 
            className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
