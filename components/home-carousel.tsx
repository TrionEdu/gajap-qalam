'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type CSSProperties, useEffect, useState } from 'react';

const slides = [
  {
    kind: 'catalog',
    eyebrow: 'Серия «100 исторических личностей Казахстана»',
    title: 'Пять историй уже на витрине',
    copy: 'Жошы хан, Бату хан, Берке хан, Ноғай хан и Тұрандот — знакомьтесь с выпусками и открывайте бесплатные страницы.',
    href: '/magazines?section=history',
    action: 'Смотреть комиксы',
  },
  {
    kind: 'contest',
    eyebrow: 'Республиканский творческий турнир · сезон 1',
    title: 'Своя история. Больше, чем оценки.',
    copy: 'Конкурс, мастер-классы и фестиваль для школьников Казахстана 10–17 лет.',
    href: '/contest',
    action: 'Открыть конкурс',
  },
  {
    kind: 'community',
    eyebrow: 'События и сообщество',
    title: 'Встречи авторов, художников и читателей',
    copy: 'Здесь будут появляться анонсы сходок, разговоров об индустрии и новых выпусков. Следите за обновлениями.',
    href: '#news-title',
    action: 'Смотреть новости',
  },
];

const covers = ['zhoshy', 'batu', 'berke', 'nogai', 'turandot'];

export function HomeCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <section className="home-carousel" aria-roledescription="carousel" aria-label="Главные объявления">
      {slides.map((slide, slideIndex) => (
        <article className={`home-slide home-slide-${slide.kind}${slideIndex === index ? ' active' : ''}`} aria-hidden={slideIndex !== index} key={slide.title}>
          {slide.kind === 'catalog' && (
            <div className="carousel-cover-stack" aria-hidden="true">
              {covers.map((cover, coverIndex) => {
                const offset = coverIndex - 2

                return (
                  <Image
                    src={`/images/comics/${cover}.webp`}
                    alt=""
                    width={900}
                    height={1280}
                    key={cover}
                    style={{
                      '--cover-left': `${offset * 16}%`,
                      '--cover-left-mobile': `${offset * 14}%`,
                      '--cover-rotation': `${offset * 4}deg`,
                    } as CSSProperties}
                  />
                )
              })}
            </div>
          )}
          {slide.kind === 'contest' && <Image className="home-slide-background" src="/images/gajap-qalam-banner-v2.png" alt="" fill priority={slideIndex === 1} sizes="100vw" />}
          {slide.kind === 'community' && <Image className="home-slide-background community-image" src="/images/gajap-qalam-hero.png" alt="" fill sizes="100vw" />}
          <div className="home-slide-overlay" />
          <div className="home-slide-content">
            <p>{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <span>{slide.copy}</span>
            <Link className="button home-slide-button" href={slide.href} tabIndex={slideIndex === index ? undefined : -1}>{slide.action} <ArrowRight /></Link>
          </div>
        </article>
      ))}
      <button className="carousel-arrow previous" type="button" onClick={() => go(index - 1)} aria-label="Предыдущий баннер"><ArrowLeft /></button>
      <button className="carousel-arrow next" type="button" onClick={() => go(index + 1)} aria-label="Следующий баннер"><ArrowRight /></button>
      <div className="carousel-dots" role="group" aria-label="Выбрать баннер">
        {slides.map((slide, slideIndex) => <button className={slideIndex === index ? 'active' : ''} type="button" onClick={() => go(slideIndex)} aria-label={`Баннер ${slideIndex + 1}: ${slide.title}`} key={slide.title} />)}
      </div>
    </section>
  );
}
