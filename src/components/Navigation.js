'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

const navItems = [
  { href: '/', label: 'Início', icon: '🏠' },
  { href: '/biblioteca', label: 'Biblioteca', icon: '📚' },
  { href: '/explorar', label: 'Treinos', icon: '🔥' },
  { href: '/treinos', label: 'Meus Planos', icon: '🏋️' },
  { href: '/historico', label: 'Histórico', icon: '📊' },
  { href: '/treinador-ia', label: 'Treinador IA', icon: '🤖' },
  { href: '/perfil', label: 'Perfil', icon: '👤' },
];

export default function Navigation() {
  const pathname = usePathname();

  // Hide nav during workout execution
  if (pathname.startsWith('/executar')) return null;

  return (
    <>
      {/* Desktop Top Bar */}
      <header className="top-nav glass">
        <div className="top-nav-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Treinando com Will</span>
          </Link>
          <nav className="desktop-nav">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`desktop-nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="bottom-nav glass">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
            {pathname === item.href && <span className="bottom-nav-indicator" />}
          </Link>
        ))}
      </nav>
    </>
  );
}
