'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup${footer ? ' brand-lockup-footer' : ''}`}>
      <Image
        className="brand-logo"
        src="/images/gajap-qalam-logo-horizontal.png"
        width={3149}
        height={1342}
        alt="Gajap Qalam — Creative Writing & Storytelling"
        priority={!footer}
      />
    </span>
  );
}

const links = [
  ['/magazines', 'Журналы'],
  ['/#events', 'Афиша'],
  ['/shelf', 'Моя полка'],
  ['/#season', 'Конкурс'],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('gajap-theme');
    if (savedTheme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
      const frame = window.requestAnimationFrame(() => setDarkMode(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    window.localStorage.setItem('gajap-theme', next ? 'dark' : 'light');
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Gajap Qalam, на главную"><Brand /></Link>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={toggleTheme} aria-label={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}>{darkMode ? <Sun /> : <Moon />}</button>
        <Link className="button button-primary header-cta" href="/submit">Подать работу</Link>
        <button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Мобильная навигация">
          {links.map(([href, label]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" aria-label="Gajap Qalam, на главную"><Brand footer /></Link>
      <p>Цифровая сцена для юных авторов Казахстана 10–17 лет.</p>
      <div className="footer-links">
        <Link href="/magazines">Журналы</Link><Link href="/shelf">Моя полка</Link><Link href="/library">Работы участников</Link><Link href="/submit">Подать работу</Link><Link href="/status">Статус заявки</Link><Link href="/privacy">Конфиденциальность</Link><a href="mailto:ibeimish@gmail.com">Написать команде</a>
      </div>
    </footer>
  );
}
