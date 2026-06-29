import { Suspense } from 'react';
import BibliotecaEliteContent from './BibliotecaEliteContent';

export const metadata = {
  title: 'Biblioteca Elite | Treinando com Will',
  description: 'A seleção definitiva dos exercícios mais eficientes para hipertrofia, curadoria de Laércio Refundini.',
};

export default function BibliotecaElitePage() {
  return (
    <Suspense fallback={<div className="container" style={{paddingTop: '100px'}}>Carregando Biblioteca Elite...</div>}>
      <BibliotecaEliteContent />
    </Suspense>
  );
}
