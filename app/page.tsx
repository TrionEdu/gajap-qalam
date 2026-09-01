'use client';

import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileUp,
  GalleryHorizontalEnd,
  Newspaper,
  Palette,
  PenLine,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const heroSlides = [
  {
    kicker: 'главный баннер сезона',
    title: 'Дело юных авторов',
    text: 'Республиканский турнир рассказов, обложек и комиксов. Работы проходят отбор, попадают в архив и выходят на фестивальную сцену.',
    badge: 'сезон 2026-2027',
  },
  {
    kicker: 'новая волна',
    title: 'Комиксы из школ Казахстана',
    text: 'Платформа собирает детей, которым мало обычных олимпиад: они строят миры, рисуют персонажей и пишут свои первые истории.',
    badge: 'приём открыт',
  },
  {
    kicker: 'финал в марте',
    title: 'Галерея, жюри, фестиваль',
    text: 'Финалисты узнают свои места на сцене, а лучшие работы становятся частью электронной и печатной антологии.',
    badge: '15 февраля дедлайн',
  },
];

const products = [
  ['NEW', 'Ғажап Комикс', 'Қала үстіндегі ай', 'Айша, 14', 'comic', 'қазақша'],
  ['ХИТ', 'Ғажап Мұқаба', 'The Last Baursak', 'Мира, 16', 'cover', 'poster'],
  ['NEW', 'Ғажап Әңгіме', 'Дом у степного моря', 'Данияр, 12', 'story', 'русский'],
  ['+1', 'Ғажап Комикс', 'Космический ауыл', 'Санжар, 13', 'comic', 'қазақша'],
  ['ХИТ', 'Ғажап Мұқаба', 'Жеті қабат аспан', 'Арман, 15', 'cover', 'poster'],
  ['NEW', 'Ғажап Әңгіме', 'Письмо из 2091', 'Лейла, 17', 'story', 'русский'],
];

const releases = [
  ['Финалисты', '50 работ', 'объявление в марте'],
  ['Амбассадоры', '28 школ', 'идёт набор'],
  ['Мастер-класс', 'онлайн', '20 ноября'],
  ['Антология', 'печатная', 'апрель-май'],
];

const news = [
  ['01 сентября', 'Открыт набор школьных амбассадоров'],
  ['15 октября', 'Первый челлендж сезона: придумать героя'],
  ['20 ноября', 'Онлайн-встреча с автором комиксов'],
  ['25 января', 'Портфолио-разборы перед дедлайном'],
];

const categories = [
  ['Печатная антология', BookOpen],
  ['Электронный архив', GalleryHorizontalEnd],
  ['Мерч финалистов', ShoppingBag],
  ['Фестиваль', Trophy],
  ['Новости', Newspaper],
  ['О проекте', Users],
];

function CoverCard({
  item,
  index,
}: {
  item: string[];
  index: number;
}) {
  const [badge, type, title, author, tone, meta] = item;

  return (
    <article className="product-card">
      <div className="product-badges">
        <span>{badge}</span>
        <span>{meta}</span>
      </div>
      <div className={`cover-art cover-${tone}`}>
        <span className="cover-number">{String(index + 1).padStart(2, '0')}</span>
        <div className="cover-panels">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <p className="product-type">{type}</p>
      <h3>{title}</h3>
      <p className="product-author">{author}</p>
    </article>
  );
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#151515]">
      <header className="sticky top-0 z-50 bg-[#171717] text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          <button aria-label="Поиск" className="justify-self-start p-5">
            <Search size={28} />
          </button>
          <a href="#top" className="grid h-[70px] w-[170px] place-items-center bg-[#f5f1e8] px-5">
            <Image
              src="/images/gq-logo.png"
              alt="Gajap Qalam"
              width={173}
              height={91}
              className="h-auto w-full mix-blend-multiply"
              priority
            />
          </a>
          <div className="flex items-center justify-end gap-4">
            <button aria-label="Заявки" className="relative p-4">
              <FileUp size={25} />
              <span className="absolute right-2 top-3 grid h-4 w-4 place-items-center rounded-full bg-[#3d63ff] text-[10px] font-black">
                0
              </span>
            </button>
            <button aria-label="Кабинет" className="p-4">
              <User size={25} />
            </button>
            <a href="#submit" className="hidden text-sm font-black uppercase sm:block">
              Войти
            </a>
          </div>
        </div>

        <nav className="border-t border-white/15 bg-[#171717]">
          <div className="mx-auto flex max-w-[1440px] snap-x gap-1 overflow-x-auto px-4 text-sm font-black uppercase sm:justify-center sm:px-8">
            {categories.map(([name, Icon]) => (
              <a key={name as string} href="#catalog" className="flex snap-start items-center gap-2 px-5 py-4 whitespace-nowrap hover:bg-white hover:text-[#171717]">
                <Icon size={17} />
                {name as string}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section id="top" className="relative bg-white pt-7">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="relative min-h-[560px] overflow-hidden bg-[#120c09] shadow-[0_18px_42px_rgb(0_0_0/18%)]">
            <Image
              src="/images/gajap-qalam-noir.png"
              alt="Нуарный баннер Ғажап Қалам"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.48)_48%,rgba(0,0,0,.12))]" />

            <button
              aria-label="Предыдущий баннер"
              onClick={() => setActiveSlide((activeSlide + heroSlides.length - 1) % heroSlides.length)}
              className="absolute left-0 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center border-2 border-black bg-white text-black shadow-[5px_5px_0_rgb(0_0_0/65%)]"
            >
              <ChevronLeft size={34} />
            </button>
            <button
              aria-label="Следующий баннер"
              onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)}
              className="absolute right-0 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center border-2 border-black bg-white text-black shadow-[-5px_5px_0_rgb(0_0_0/65%)]"
            >
              <ChevronRight size={34} />
            </button>

            <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-center px-8 py-16 text-white sm:px-16">
              <p className="mb-4 text-sm font-black uppercase tracking-wide text-[#f2c56f]">
                {slide.kicker}
              </p>
              <h1 className="bubble-title text-[clamp(3.2rem,8vw,7.6rem)] font-black uppercase leading-[0.88] tracking-normal">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-white/82">
                {slide.text}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#submit" className="inline-flex h-13 items-center justify-center gap-2 bg-white px-6 text-sm font-black uppercase text-black">
                  Подать работу
                  <ArrowRight size={18} />
                </a>
                <a href="#catalog" className="inline-flex h-13 items-center justify-center gap-2 border-2 border-white px-6 text-sm font-black uppercase text-white">
                  Смотреть архив
                  <BookOpen size={18} />
                </a>
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  aria-label={`Баннер ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 w-28 ${activeSlide === index ? 'bg-[#3d63ff]' : 'bg-white/50'}`}
                />
              ))}
            </div>

            <div className="floating-news">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p>Всплывающие новости</p>
                  <h2>Хроника турнира</h2>
                </div>
                <Newspaper size={32} />
              </div>
              <div className="floating-news-window">
                <div className="floating-news-stack">
                  {[...news, ...news].map(([date, title], index) => (
                    <article key={`${date}-${index}`}>
                      <span>{date}</span>
                      <strong>{title}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="section-heading">
            <div>
              <h2>Хиты сезона</h2>
              <p>Работы, которые уже выглядят как обложки будущей антологии.</p>
            </div>
            <a href="#submit">
              Смотреть все
              <ChevronRight size={19} />
            </a>
          </div>
          <div className="product-grid">
            {products.map((item, index) => (
              <CoverCard key={item[2]} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e8] py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="section-heading">
            <div>
              <h2>Новинки архива</h2>
              <p>Формат Bubble-витрины, но вместо покупок — детские работы, направления и статусы.</p>
            </div>
            <a href="#submit">
              Подать свою
              <ChevronRight size={19} />
            </a>
          </div>

          <div className="release-grid">
            {releases.map(([title, value, note], index) => (
              <article key={title} className="release-card">
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <strong>{value}</strong>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
          <div className="section-heading">
            <div>
              <h2>Герои направлений</h2>
              <p>Три входа в сезон для разных типов творческих детей.</p>
            </div>
          </div>

          <div className="heroes-grid">
            {[
              ['Ғажап Әңгіме', 'мини-проза, поэма, рассказ', PenLine],
              ['Ғажап Мұқаба', 'обложка книги, фильма, игры или комикса', Palette],
              ['Ғажап Комикс', 'короткий комикс на 4-8 страниц', BookOpen],
            ].map(([title, text, Icon], index) => (
              <article key={title as string} className="hero-card">
                <Icon size={34} />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
                <span>{index === 0 ? 'Автор' : index === 1 ? 'Иллюстратор' : 'Комиксист'}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="submit" className="bg-[#171717] py-14 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#f2c56f]">кабинет участника</p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-none sm:text-7xl">
              Подать работу
            </h2>
            <p className="mt-5 text-xl font-bold leading-8 text-white/72">
              Сейчас это визуальный прототип формы. Следующим этапом можно подключить реальные заявки, файлы, статусы и кабинеты родителей.
            </p>
          </div>

          <form className="submission-panel">
            <label>
              Имя участника
              <input placeholder="Аружан Н." />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                Возраст
                <input placeholder="14" />
              </label>
              <label>
                Направление
                <select>
                  <option>Ғажап Комикс</option>
                  <option>Ғажап Мұқаба</option>
                  <option>Ғажап Әңгіме</option>
                </select>
              </label>
            </div>
            <label>
              Город и школа
              <input placeholder="Алматы, школа / лицей" />
            </label>
            <button type="button" className="upload-box">
              <FileUp size={24} />
              Загрузить работу
            </button>
            <button type="button" className="submit-button">
              Отправить заявку
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
