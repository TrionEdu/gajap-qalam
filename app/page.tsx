'use client';

import Image from 'next/image';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ImageIcon,
  Mail,
  Menu,
  Moon,
  PanelsTopLeft,
  PenLine,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const tracks = [
  {
    id: 'comic',
    number: '01',
    eyebrow: 'Визуальная история',
    title: 'Комиксы и манга',
    description: 'Рисованные истории любого жанра: от короткого школьного стрипа до законченной графической новеллы.',
    formats: ['Веб-стрип: 1–4 кадра', 'Вебтун для экрана смартфона', 'One-shot: 4–10 страниц'],
    icon: PanelsTopLeft,
    color: 'cyan',
  },
  {
    id: 'story',
    number: '02',
    eyebrow: 'Текст и драматургия',
    title: 'Сценарий и сторителлинг',
    description: 'Для тех, кто придумывает диалоги, сюжетные повороты, характеры и новые вселенные.',
    formats: ['Сценарий графической новеллы', 'Совместный проект «Тандем года»', 'Питч-библия мира и героев'],
    icon: PenLine,
    color: 'yellow',
  },
  {
    id: 'art',
    number: '03',
    eyebrow: 'Образ и дизайн',
    title: 'Концепт-арт и мерч',
    description: 'Визуальный образ героя, постер, обложка или авторский стикерпак, готовый к реальной печати.',
    formats: ['Character sheet персонажа', 'Постер или обложка', 'Авторский стикерпак: 6+ стикеров'],
    icon: ImageIcon,
    color: 'coral',
  },
];

const season = [
  ['01', 'Регистрация', 'Сентябрь', 'Открытая регистрация и запись через школьных амбассадоров.'],
  ['02', 'Мастер-классы', 'Сентябрь — январь', 'Онлайн-встречи с авторами и разборы черновиков.'],
  ['03', 'Приём работ', 'До конца февраля', 'Финальная версия работы по выбранному направлению.'],
  ['04', 'Жюри', 'Март', 'Отбор финалистов и портфолио-разборы перед фестивалем.'],
  ['05', 'Фестиваль', 'Апрель', 'Выставка работ, авторская сцена и награждение.'],
];

const showcase = [
  {
    eyebrow: 'Новый сезон',
    title: 'Три направления. Одна большая сцена.',
    text: 'Комикс, сценарий и концепт-арт встречаются на одном фестивале.',
    image: '/images/gajap-qalam-hero.png',
    position: 'center',
  },
  {
    eyebrow: 'Специальная номинация',
    title: 'Легенды Великой Степи: Нео-Номады',
    text: 'Казахский фольклор в современном сеттинге: городское фэнтези, киберпанк или стимпанк.',
    image: '/images/gajap-qalam-noir.png',
    position: 'left',
  },
  {
    eyebrow: 'Архив сезона',
    title: 'Работы финалистов появятся после жюри',
    text: 'Публикация работ несовершеннолетних — только с письменного согласия родителя.',
    image: '/images/gajap-qalam-hero.png',
    position: 'left',
  },
];

const ambassadorBenefits = [
  'Методические материалы по трём направлениям',
  'Онлайн-встречи с командой турнира и куратором',
  'Сертификат и упоминание школы на фестивале',
];

const partnerBenefits = [
  'Именная номинация в одном из направлений',
  'Место на фестивальной сцене в апреле',
  'Поддержка печатной антологии и мерча финалистов',
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup${footer ? ' brand-lockup-footer' : ''}`}>
      <Image
        className="brand-logo"
        src="/images/gajap-qalam-logo-black.png"
        width={72}
        height={72}
        alt=""
        aria-hidden="true"
      />
      <span className="brand-wordmark">
        <strong>Gajap Qalam</strong>
        <span>Creative writing &amp; storytelling</span>
      </span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('gajap-theme');
    if (savedTheme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
      const frame = window.requestAnimationFrame(() => setDarkMode(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setShowcaseIndex((current) => (current + 1) % showcase.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    window.localStorage.setItem('gajap-theme', next ? 'dark' : 'light');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = 'Ғажап Қалам — заявка на сезон';
    const body = [
      `Имя и фамилия: ${data.get('name')}`,
      `Возраст / класс: ${data.get('age')}`,
      `Город: ${data.get('city')}`,
      `Школа: ${data.get('school')}`,
      `Роль: ${data.get('role')}`,
      `Направление: ${data.get('direction')}`,
      `Портфолио: ${data.get('portfolio') || 'не указано'}`,
      `Учитель-наставник: ${data.get('mentor') || 'не указан'}`,
      `Контакт родителя: ${data.get('contact')}`,
      '',
      'Согласие родителя или законного представителя подтверждено в форме.',
    ].join('\n');
    window.location.href = `mailto:ibeimish@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const selectedTrack = tracks[activeTrack];
  const SelectedIcon = selectedTrack.icon;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Gajap Qalam — на главную">
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#about">О турнире</a>
          <a href="#directions">Направления</a>
          <a href="#showcase">Витрина</a>
          <a href="#season">Сезон</a>
          <a href="#register">Регистрация</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <a className="button button-primary header-cta" href="#register">Подать заявку</a>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Мобильная навигация">
            {[
              ['#about', 'О турнире'],
              ['#directions', 'Направления'],
              ['#showcase', 'Витрина'],
              ['#season', 'Сезон'],
              ['#register', 'Подать заявку'],
            ].map(([href, label]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="hero">
        <div className="hero-media">
          <Image
            className="hero-image"
            src="/images/gajap-qalam-banner-v2.png"
            alt="Школьники с планшетами и альбомами бегут навстречу новому сезону Gajap Qalam"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Республиканский творческий турнир · сезон 1</p>
            <h1>
              Своя история.
              <span>Больше, чем оценки.</span>
            </h1>
            <p className="hero-lead">
              Открытая сцена для школьников Казахстана 10–17 лет, которые создают
              комиксы, пишут сценарии и придумывают визуальные миры.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#register">
                Участвовать <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-glass" href="#directions">
                Посмотреть направления
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="news-rail" aria-label="Ключевые новости сезона">
        <div className="news-track">
          {[0, 1].map((copy) => (
            <div className="news-copy" aria-hidden={copy === 1} key={copy}>
              <span><Sparkles /> Новый сезон</span><i />
              <span>Регистрация в сентябре</span><i />
              <span>Мастер-классы до января</span><i />
              <span>Приём работ до конца февраля</span><i />
              <span>Фестиваль в апреле</span><i />
            </div>
          ))}
        </div>
      </div>

      <section className="stats" aria-label="Результаты архивного сезона">
        <div><strong>164</strong><span>заявки</span></div>
        <div><strong>11</strong><span>лицеев-участников</span></div>
        <div><strong>3</strong><span>творческих направления</span></div>
        <div><strong>10–17</strong><span>лет участникам</span></div>
      </section>

      <section id="about" className="about-section section-band">
        <div className="narrow-copy">
          <p className="eyebrow">Зачем этот турнир</p>
          <h2>У ребёнка с воображением впервые появляется настоящая сцена.</h2>
          <p>Ғажап Қалам — не олимпиада по программе и не конкурс на скорость. Здесь важны история, характер, визуальный язык и смелость довести собственную идею до финала.</p>
        </div>
      </section>

      <section id="directions" className="section directions-section">
        <div className="section-heading">
          <p className="eyebrow">Номинации и форматы</p>
          <h2>Три направления для каждого творца</h2>
          <p>Выберите карточку, чтобы посмотреть форматы работ. Можно участвовать в одном направлении или собрать тандем.</p>
        </div>

        <div className="track-tabs" role="tablist" aria-label="Направления турнира">
          {tracks.map(({ icon: Icon, ...track }, index) => (
            <button
              className={`track-tab ${track.color}${activeTrack === index ? ' active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeTrack === index}
              aria-controls="track-panel"
              onClick={() => setActiveTrack(index)}
              key={track.id}
            >
              <span className="track-tab-top"><Icon aria-hidden="true" /><b>{track.number}</b></span>
              <span className="track-tab-eyebrow">{track.eyebrow}</span>
              <strong>{track.title}</strong>
            </button>
          ))}
        </div>

        <div id="track-panel" className={`track-panel ${selectedTrack.color}`} role="tabpanel">
          <div className="track-panel-intro">
            <span className="track-panel-icon"><SelectedIcon aria-hidden="true" /></span>
            <div>
              <p>{selectedTrack.eyebrow}</p>
              <h3>{selectedTrack.title}</h3>
              <span>{selectedTrack.description}</span>
            </div>
          </div>
          <ul>{selectedTrack.formats.map((format) => <li key={format}><Check aria-hidden="true" />{format}</li>)}</ul>
        </div>

        <aside className="special-nomination">
          <div>
            <p className="eyebrow">Специальная номинация</p>
            <h3>Легенды Великой Степи: Нео-Номады</h3>
            <p>Переосмыслите казахский фольклор, степные легенды, батыров и мифических существ в современном сеттинге.</p>
          </div>
          <div className="special-tags"><span>Фольклор</span><span>Городское фэнтези</span><span>Степной киберпанк</span><span>Спецкубок</span></div>
        </aside>
      </section>

      <section id="showcase" className="showcase-section" aria-roledescription="carousel" aria-label="Новости и витрина сезона">
        {showcase.map((slide, index) => (
          <article className={`showcase-slide ${index === showcaseIndex ? 'active' : ''}`} aria-hidden={index !== showcaseIndex} key={slide.title}>
            <Image src={slide.image} alt="" fill sizes="100vw" className={`showcase-image position-${slide.position}`} />
            <div className="showcase-shade" />
            <div className="showcase-content">
              <p>{slide.eyebrow}</p>
              <h2>{slide.title}</h2>
              <span>{slide.text}</span>
            </div>
          </article>
        ))}
        <div className="showcase-controls" role="group" aria-label="Выбрать слайд">
          {showcase.map((slide, index) => (
            <button type="button" className={index === showcaseIndex ? 'active' : ''} onClick={() => setShowcaseIndex(index)} aria-label={`Слайд ${index + 1}: ${slide.title}`} key={slide.title} />
          ))}
        </div>
      </section>

      <section id="season" className="season-section section-band">
        <div className="section season-inner">
          <div className="section-heading">
            <p className="eyebrow">Календарь сезона</p>
            <h2>Пять этапов до фестиваля</h2>
            <p>Финал проходит в апреле, до экзаменов и завершения учебного года.</p>
          </div>
          <div className="season-grid">
            {season.map(([number, title, date, text]) => (
              <article className="season-card" key={number}>
                <span className="stage-number">{number}</span>
                <h3>{title}</h3>
                <strong>{date}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="section community-section">
        <div className="community-heading">
          <p className="eyebrow">Творческая среда</p>
          <h2>Не обязательно делать всё в одиночку</h2>
          <p>Можно найти соавтора, прийти с классом или провести сезон вместе с учителем-амбассадором.</p>
        </div>
        <div className="community-actions">
          <article className="community-action">
            <Users aria-hidden="true" />
            <p>Тандемы</p>
            <h3>Автор ищет художника. Художник ищет историю.</h3>
            <a className="text-link" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — ищу соавтора&body=Имя:%0AГород:%0AМоя роль:%0AКого ищу:%0AКоротко о задумке:%0A">Оставить анкету <ArrowRight /></a>
          </article>
          <article className="community-action">
            <CalendarDays aria-hidden="true" />
            <p>Школьная команда</p>
            <h3>Учитель помогает пройти путь от идеи до фестиваля.</h3>
            <a className="text-link" href="#ambassadors">Стать амбассадором <ArrowRight /></a>
          </article>
          <article className="community-action">
            <Mail aria-hidden="true" />
            <p>Новости сезона</p>
            <h3>Мастер-классы, дедлайны и открытие архива.</h3>
            <a className="text-link" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — хочу получать новости&body=Имя:%0AГород:%0AКонтакт:%0A">Подписаться по почте <ArrowRight /></a>
          </article>
        </div>
      </section>

      <section id="ambassadors" className="people-section section-band">
        <div className="section people-inner">
          <div className="section-heading">
            <p className="eyebrow">Школам и партнёрам</p>
            <h2>Турнир растёт вместе с теми, кто поддерживает юных авторов</h2>
          </div>
          <div className="people-grid">
            <article className="people-card">
              <p className="card-eyebrow">Амбассадорам</p>
              <h3>Станьте амбассадором в своей школе</h3>
              <p>Амбассадор ведёт учеников через сезон: от регистрации и мастер-классов до финального фестиваля.</p>
              <ul>{ambassadorBenefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
              <a className="button button-outline" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — амбассадор школы&body=Школа:%0AГород:%0AИмя учителя:%0AКонтакт:%0A">Стать амбассадором</a>
            </article>
            <article className="people-card">
              <p className="card-eyebrow">Партнёрам и издателям</p>
              <h3>Поддержите направление или сезон</h3>
              <p>Партнёр может поддержать одну номинацию, фестивальную сцену, печать антологии или мерч финалистов.</p>
              <ul>{partnerBenefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
              <a className="button button-outline" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — партнёрство&body=Организация:%0AФормат поддержки:%0AКонтакт:%0A">Обсудить партнёрство</a>
            </article>
          </div>
        </div>
      </section>

      <section id="register" className="section register-section">
        <div className="register-copy section-heading">
          <p className="eyebrow">Анкета участника</p>
          <h2>Подать заявку на сезон</h2>
          <p>Участие бесплатное. Форма соберёт данные и откроет готовое письмо в вашей почтовой программе. На сайте ничего не сохраняется.</p>
        </div>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Имя и фамилия<input name="name" autoComplete="name" required /></label>
            <label>Возраст / класс<input name="age" inputMode="numeric" required /></label>
          </div>
          <div className="form-row">
            <label>Город<input name="city" required /></label>
            <label>Школа / лицей / колледж<input name="school" required /></label>
          </div>
          <div className="form-row">
            <label>Ваша роль<select name="role" required defaultValue=""><option value="" disabled>Выберите роль</option><option>Художник / иллюстратор</option><option>Сценарист / автор</option><option>Тандем</option><option>Концепт-художник</option></select></label>
            <label>Направление<select name="direction" required defaultValue=""><option value="" disabled>Выберите направление</option>{tracks.map((track) => <option key={track.id}>{track.title}</option>)}<option>Легенды Великой Степи: Нео-Номады</option></select></label>
          </div>
          <label>Ссылка на портфолио <span>необязательно</span><input name="portfolio" type="url" placeholder="https://" /></label>
          <label>Учитель-наставник <span>необязательно</span><input name="mentor" /></label>
          <label>Контакт родителя: телефон или Telegram<input name="contact" required /></label>
          <label className="consent-row"><input type="checkbox" required /><span>Я — родитель или законный представитель участника и согласен(на) на обработку указанных данных для организации турнира.</span></label>
          <button className="button button-primary submit-button" type="submit">Открыть готовую заявку <ArrowRight /></button>
          <p className="form-note">Кнопка откроет письмо на адрес команды. Автоматическая отправка, аккаунты и загрузка файлов пока не подключены.</p>
        </form>
      </section>

      <footer className="site-footer">
        <a href="#top" aria-label="Gajap Qalam — наверх"><Brand footer /></a>
        <p>Республиканский творческий турнир для школьников Казахстана 10–17 лет.</p>
        <div className="footer-links"><a href="#directions">Направления</a><a href="#season">Календарь</a><a href="#register">Регистрация</a><a href="mailto:ibeimish@gmail.com">Написать команде</a></div>
      </footer>
    </main>
  );
}
