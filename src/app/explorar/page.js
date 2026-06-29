'use client';
import { Suspense } from 'react';
import ExplorarContent from './ExplorarContent';

export default function ExplorarPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando Treinos...</div>}>
      <ExplorarContent />
    </Suspense>
  );
}
