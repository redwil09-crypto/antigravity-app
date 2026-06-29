'use client';
import { Suspense } from 'react';
import BibliotecaContent from './BibliotecaContent';

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando...</div>}>
      <BibliotecaContent />
    </Suspense>
  );
}
