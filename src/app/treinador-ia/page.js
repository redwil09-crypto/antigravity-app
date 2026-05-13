import TreinadorClient from './TreinadorClient';
import './treinador.css';

export const metadata = {
  title: 'Treinando com Will - Treinador IA',
  description: 'Seu Personal Trainer guiado por Inteligência Artificial.',
};

export default function TreinadorPage() {
  return <TreinadorClient />;
}
