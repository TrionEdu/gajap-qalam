'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookHeart,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  ImageIcon,
  Mail,
  PanelsTopLeft,
  PenLine,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { LibraryClient } from '@/components/library-client';
import { MagazineCatalog } from '@/components/magazine-catalog';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

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

export default function ContestExperience() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setShowcaseIndex((current) => (current + 1) % showcase.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const selectedTrack = tracks[activeTrack];
  const SelectedIcon = selectedTrack.icon;

  return (
    <main>
      <SiteHeader />

      <section id="top" className="hero">
        <div className="hero-media">
          <Image
            className="hero-image"
            src="/images/gajap-qalam-banner-v2.png"
            alt="Школьники с планшетами и альбомами бегут навстречу новому сезону Gajap Qalam"
            fill
            priority
            sizes="100vw"
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
              <Link className="button button-primary" href="/submit">
                Участвовать <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="button button-glass" href="/library">
                Читать работы
              </Link>
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

      <section className="platform-entry section" aria-label="Основные возможности платформы">
        <div className="section-heading platform-heading"><p className="eyebrow">Три пространства</p><h2>Узнавать. Читать. Возвращаться.</h2><p>Ғажап Қалам объединяет события, цифровые журналы и личную читательскую полку.</p></div>
        <div className="platform-actions">
          <Link href="#events"><CalendarDays /><span>События</span><h3>Афиша и объявления</h3><p>Конкурсы, фестивали, встречи авторов и важные даты сезона.</p><b>Что впереди <ArrowRight /></b></Link>
          <Link href="/magazines"><BookOpen /><span>Магазин</span><h3>Цифровые журналы</h3><p>Бесплатное превью, онлайн-читалка и полные выпуски без физического склада.</p><b>Выбрать выпуск <ArrowRight /></b></Link>
          <Link href="/shelf"><BookHeart /><span>Личное пространство</span><h3>Моя полка</h3><p>Купленные выпуски, закладки и продолжение с последней страницы.</p><b>Открыть полку <ArrowRight /></b></Link>
        </div>
      </section>

      <section className="section home-magazines">
        <div className="section-heading"><p className="eyebrow">Цифровое издательство</p><h2>Журналы, которые всегда с вами</h2><p>Откройте несколько страниц бесплатно. Полные выпуски читаются в браузере на телефоне, планшете и компьютере.</p></div>
        <MagazineCatalog preview />
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

      <section id="events" className="showcase-section" aria-roledescription="carousel" aria-label="Афиша и новости сезона">
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

      <section id="library" className="section home-library">
        <div className="section-heading"><p className="eyebrow">Работы участников</p><h2>Лучшие истории получают свою сцену</h2><p>Эта бесплатная библиотека отделена от магазина и пополняется только после отбора редакции и отдельного согласия на публикацию.</p></div>
        <LibraryClient preview />
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

      <section className="submission-cta section-band"><div><ClipboardCheck /><p className="eyebrow">Готовы отправить работу?</p><h2>Система сразу проверит размер файла и выдаст личный номер заявки.</h2><div><Link className="button button-primary" href="/submit">Подать работу <ArrowRight /></Link><Link className="button button-outline" href="/status">Проверить статус</Link></div></div></section>

      <SiteFooter />
    </main>
  );
}
