'use client';
import { Suspense } from 'react';
import TreinosContent from './TreinosContent';

export default function TreinosPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando...</div>}>
      <TreinosContent />
    </Suspense>
  );
}
