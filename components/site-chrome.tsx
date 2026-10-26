'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, LibraryBig, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react';
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
  ['/', 'Главная'],
  ['/magazines', 'Комиксы'],
  ['/contest', 'Конкурс'],
  ['/about', 'О нас'],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Gajap Qalam, на главную"><Brand /></Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button header-search-button" type="button" onClick={() => setSearchOpen((value) => !value)} aria-label="Поиск" aria-expanded={searchOpen}><Search /></button>
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}>{darkMode ? <Sun /> : <Moon />}</button>
          <button className="icon-button desktop-account-action" type="button" onClick={() => setCartOpen(true)} aria-label="Корзина"><ShoppingBag /></button>
          <Link className="icon-button desktop-account-action" href="/shelf" aria-label="Моя полка" title="Моя полка"><LibraryBig /></Link>
          <a className="signin-link desktop-account-action" href="/signin-with-chatgpt?return_to=%2Fshelf" target="_top"><UserRound /> Войти</a>
          <button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {searchOpen && (
          <form className="header-search" action="/magazines" role="search">
            <Search aria-hidden="true" />
            <input name="q" autoFocus placeholder="Название, герой, автор или серия" aria-label="Поиск по комиксам" />
            <button type="submit">Найти</button>
          </form>
        )}
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Мобильная навигация">
            {links.map(([href, label]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <div className="mobile-account-actions">
              <button type="button" onClick={() => { setCartOpen(true); setMenuOpen(false); }}><ShoppingBag /> Корзина</button>
              <Link href="/shelf" onClick={() => setMenuOpen(false)}><LibraryBig /> Моя полка</Link>
              <a href="/signin-with-chatgpt?return_to=%2Fshelf" target="_top"><UserRound /> Войти</a>
            </div>
          </nav>
        )}
      </header>

      {cartOpen && (
        <div className="cart-backdrop" role="presentation" onClick={() => setCartOpen(false)}>
          <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" onClick={() => setCartOpen(false)} aria-label="Закрыть"><X /></button>
            <ShoppingBag aria-hidden="true" />
            <p className="eyebrow">Корзина</p>
            <h2 id="cart-title">Пока здесь пусто</h2>
            <p>Покупка появится после подключения платёжного провайдера. Сейчас можно бесплатно открыть превью выпусков и сохранить страницу в своей полке после входа.</p>
            <Link className="button button-primary" href="/magazines" onClick={() => setCartOpen(false)}>Выбрать комикс</Link>
          </section>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Gajap Qalam, на главную"><Brand footer /></Link>
          <p>Казахстанская платформа комиксов, творческих историй и молодых авторов.</p>
          <a href="mailto:ibeimish@gmail.com">ibeimish@gmail.com</a>
        </div>
        <div className="footer-column"><h2>Платформа</h2><Link href="/">Главная</Link><Link href="/magazines">Комиксы</Link><Link href="/about">О нас</Link><Link href="/contest">Конкурс</Link></div>
        <div className="footer-column"><h2>Читателям</h2><Link href="/shelf">Моя полка</Link><Link href="/library">Работы участников</Link><Link href="/magazines?section=new">Новинки</Link><Link href="/magazines?section=history">Историческая серия</Link></div>
        <div className="footer-column"><h2>Авторам</h2><Link href="/submit">Подать работу</Link><Link href="/status">Проверить статус</Link><Link href="/admin">Редакционная панель</Link><Link href="/privacy">Конфиденциальность</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Gajap Qalam</span><span><BookOpen /> Комиксы читаются онлайн; полные файлы не публикуются без редакционного решения.</span></div>
    </footer>
  );
}
