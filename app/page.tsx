'use client';

import {
  ArrowRight,
  Check,
  Grid2X2,
  ImageIcon,
  Menu,
  PenLine,
  X,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

const directions = [
  {
    id: 'story',
    eyebrow: 'Ғажап Әңгіме',
    title: 'Рассказ и поэма',
    short: '800–2500 слов, свободная тема',
    description: 'Проза или стихотворение на свободную тему — своя, не пересказанная история.',
    metaLabel: 'Объём',
    meta: '800–2500 слов',
    icon: PenLine,
  },
  {
    id: 'cover',
    eyebrow: 'Ғажап Мұқаба',
    title: 'Обложка',
    short: 'Одна иллюстрация — книга, игра, комикс',
    description: 'Обложка книги, фильма, игры или комикса — своего или придуманного для конкурса.',
    metaLabel: 'Формат',
    meta: '1 иллюстрация',
    icon: ImageIcon,
  },
  {
    id: 'comic',
    eyebrow: 'Ғажап Комикс',
    title: 'Комикс',
    short: '4–8 полос, своя вселенная',
    description: 'Короткая история в панелях — своя вселенная, герой или пересказ реального случая.',
    metaLabel: 'Объём',
    meta: '4–8 полос',
    icon: Grid2X2,
  },
];

const season = [
  ['01', 'Регистрация', 'Сентябрь', 'Открытая онлайн-регистрация и запись через школьных амбассадоров.'],
  ['02', 'Мастер-классы', 'Сентябрь — январь', 'Онлайн-встречи с автором комиксов и разборы черновиков.'],
  ['03', 'Приём работ', 'До конца февраля', 'Загрузка финальной версии работы по своему направлению.'],
  ['04', 'Жюри', 'Март', 'Отбор финалистов и портфолио-разборы перед фестивалем.'],
  ['05', 'Фестиваль', 'Апрель', 'Выставка работ финалистов и награждение.'],
];

const ambassadorBenefits = [
  'Методические материалы под три направления',
  'Онлайн-встречи с командой турнира и куратором',
  'Сертификат и упоминание школы на фестивале',
];

const partnerBenefits = [
  'Именная номинация в направлении',
  'Место на фестивальной сцене весной',
  'Печатная антология и мерч финалистов',
];

function Brand() {
  return (
    <span className="brand-lockup">
      <span className="brand-mark" aria-hidden="true">ҒҚ</span>
      <span className="brand-name">Ғажап Қалам</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = 'Ғажап Қалам — заявка на участие';
    const body = [
      `Имя участника: ${data.get('name')}`,
      `Возраст: ${data.get('age')}`,
      `Направление: ${data.get('direction')}`,
      `Город и школа: ${data.get('school')}`,
      `Контакт родителя: ${data.get('contact')}`,
      '',
      'Согласие родителя или законного представителя подтверждено в форме.',
    ].join('\n');

    window.location.href = `mailto:ibeimish@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ғажап Қалам — на главную"><Brand /></a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#about">О турнире</a>
          <a href="#directions">Направления</a>
          <a href="#season">Сезон</a>
          <a href="#ambassadors">Школам</a>
          <a href="#register">Регистрация</a>
        </nav>

        <a className="button button-primary header-cta" href="#register">Подать заявку</a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Мобильная навигация">
            <a href="#about" onClick={() => setMenuOpen(false)}>О турнире</a>
            <a href="#directions" onClick={() => setMenuOpen(false)}>Направления</a>
            <a href="#season" onClick={() => setMenuOpen(false)}>Сезон</a>
            <a href="#ambassadors" onClick={() => setMenuOpen(false)}>Школам</a>
            <a href="#register" onClick={() => setMenuOpen(false)}>Подать заявку</a>
          </nav>
        )}
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Республиканский творческий турнир · сезон 1</p>
          <h1>Своя история.<span>Не только оценки в дневнике.</span></h1>
          <p className="hero-lead">
            Ғажап Қалам — турнир для подростков 10–17 лет,<br className="desktop-break" /> которые пишут, рисуют обложки и делают комиксы.<br className="desktop-break" /> Три направления, один сезон: от регистрации осенью<br className="desktop-break" /> до фестиваля весной.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#register">Подать заявку</a>
            <a className="text-link" href="#directions">Три направления <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="hero-directions" aria-label="Направления турнира">
          {directions.map(({ icon: Icon, ...direction }) => (
            <a className={`hero-direction ${direction.id}`} href={`#${direction.id}`} key={direction.id}>
              <Icon aria-hidden="true" />
              <p>{direction.eyebrow}</p>
              <h2>{direction.title}</h2>
              <span>{direction.short}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="stats" aria-label="Результаты прошлого сезона">
        <div><strong>164</strong><span>заявки в архивном сезоне</span></div>
        <div><strong>11</strong><span>лицеев-участников</span></div>
        <div><strong>3</strong><span>направления</span></div>
      </section>

      <section id="about" className="about-section section-band">
        <div className="narrow-copy">
          <p className="about-statement">Ценность турнира не в призах. В том, что у ребёнка с воображением и собственными историями впервые появляется сцена.</p>
          <div className="about-copy">
            <p>Ғажап Қалам — не олимпиада по программе и не конкурс на скорость. Жюри смотрит на историю, характер иллюстрации и то, насколько комикс держит внимание от первой до последней панели.</p>
            <p>Участвовать может любой школьник 10–17 лет — самостоятельно или вместе с классом, если в школе есть учитель-амбассадор турнира.</p>
          </div>
        </div>
      </section>

      <section id="directions" className="section directions-section">
        <div className="section-heading">
          <p className="eyebrow">Три направления</p>
          <h2>Один сезон — три входа<br />для разных авторов</h2>
          <p>Можно подать работу в одном направлении или во всех трёх.</p>
        </div>

        <div className="direction-grid">
          {directions.map(({ icon: Icon, ...direction }) => (
            <article id={direction.id} className="direction-card" key={direction.id}>
              <span className="direction-icon"><Icon aria-hidden="true" /></span>
              <p className="card-eyebrow">{direction.eyebrow}</p>
              <h3>{direction.title}</h3>
              <p>{direction.description}</p>
              <div className="direction-meta"><span>{direction.metaLabel}</span><strong>{direction.meta}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section id="season" className="season-section section-band">
        <div className="section season-inner">
          <div className="section-heading">
            <p className="eyebrow">Календарь сезона</p>
            <h2>Пять этапов до фестиваля</h2>
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

      <section id="ambassadors" className="section people-section">
        <div className="section-heading">
          <p className="eyebrow">Школам и учителям</p>
          <h2>Учителя-энтузиасты —<br />главная опора турнира</h2>
        </div>

        <div className="people-grid">
          <article className="people-card">
            <p className="card-eyebrow">Амбассадорам</p>
            <h3>Станьте амбассадором<br />в своей школе</h3>
            <p>Амбассадор — это учитель, который лично ведёт учеников через весь сезон: от регистрации до финального фестиваля. Именно благодаря таким учителям турнир доехал до 11 лицеев в прошлый раз.</p>
            <ul>{ambassadorBenefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
            <a className="button button-outline" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — амбассадор школы&body=Школа:%0AГород:%0AИмя учителя:%0AКонтакт:%0A">Стать амбассадором</a>
          </article>

          <article className="people-card">
            <p className="card-eyebrow">Партнёрам и издателям</p>
            <h3>Поддержите направление или сезон</h3>
            <p>Партнёр может закрепить своё имя за одним из трёх направлений, поддержать печать итоговой антологии или мерч финалистов.</p>
            <ul>{partnerBenefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
            <a className="button button-outline" href="mailto:ibeimish@gmail.com?subject=Ғажап Қалам — партнёрство&body=Организация:%0AФормат поддержки:%0AКонтакт:%0A">Обсудить партнёрство</a>
          </article>
        </div>
      </section>

      <section id="archive" className="archive-section section-band">
        <div className="section archive-inner">
          <div className="section-heading">
            <p className="eyebrow">Архив</p>
            <h2>Работы этого сезона<br />появятся здесь после жюри</h2>
            <p>Архив открывается в марте, когда жюри отберёт финалистов по всем трём направлениям.</p>
          </div>
          <div className="archive-preview" aria-hidden="true">
            {['01', '02', '03', '04', '05', '06'].map((number) => <span key={number}>{number}</span>)}
          </div>
          <p className="archive-note">Публикация работ несовершеннолетних участников — только с письменного согласия родителя или законного представителя.</p>
        </div>
      </section>

      <section id="register" className="section register-section">
        <div className="register-copy section-heading">
          <p className="eyebrow">Регистрация</p>
          <h2>Подать заявку на участие</h2>
          <p>На старте сезона заявки принимаются напрямую на почту команды<br className="desktop-break" /> турнира — форма ниже соберёт данные и откроет письмо с заполненной заявкой.</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Имя участника<input name="name" type="text" autoComplete="name" required /></label>
            <label>Возраст<input name="age" type="number" min="10" max="17" required /></label>
          </div>
          <label>Направление<select name="direction" defaultValue="" required><option value="" disabled>Выберите направление</option><option>Ғажап Әңгіме — рассказ / поэма</option><option>Ғажап Мұқаба — обложка</option><option>Ғажап Комикс — комикс</option></select></label>
          <label>Город и школа<input name="school" type="text" required /></label>
          <label>Контакт родителя (телефон или Telegram)<input name="contact" type="text" required /></label>
          <label className="consent-row"><input name="consent" type="checkbox" required /><span>Я — родитель или законный представитель участника, согласен(на) на обработку данных и участие ребёнка в турнире.</span></label>
          <button className="button button-primary submit-button" type="submit">Отправить заявку</button>
          <p className="form-note">Кнопка откроет ваш почтовый клиент с готовым письмом на адрес команды турнира — ничего не отправляется автоматически.</p>
        </form>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Ғажап Қалам — на главную"><Brand /></a>
        <p>Республиканский творческий турнир для подростков 10–17 лет.</p>
        <div className="footer-links"><a href="mailto:ibeimish@gmail.com">Написать команде</a><a href="#register">Регистрация</a><a href="#ambassadors">Школам</a></div>
      </footer>
    </main>
  );
}
