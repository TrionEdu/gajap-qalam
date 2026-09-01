'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  FileUp,
  GalleryHorizontalEnd,
  GraduationCap,
  Handshake,
  MapPin,
  Megaphone,
  Palette,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const tracks = [
  {
    title: 'Ғажап Әңгіме',
    label: 'мини-проза, поэма, рассказ',
    accent: 'cyan',
    icon: PenLine,
    stats: 'до 8 страниц',
  },
  {
    title: 'Ғажап Мұқаба',
    label: 'обложка книги, фильма, игры или комикса',
    accent: 'yellow',
    icon: Palette,
    stats: '1 постер',
  },
  {
    title: 'Ғажап Комикс',
    label: 'законченная история в последовательных кадрах',
    accent: 'coral',
    icon: BookOpen,
    stats: '4-8 страниц',
  },
];

const timeline = [
  ['Сентябрь', 'запуск сайта, амбассадоры, партнёры'],
  ['Октябрь', 'открытие сезона и первые мастер-классы'],
  ['Январь', 'портфолио-разборы и черновики работ'],
  ['15 февраля', 'последний день подачи работ'],
  ['Март', 'жюри, финалисты и фестиваль'],
  ['Апрель', 'онлайн-галерея и антология'],
];

const gallery = [
  {
    title: 'Қала үстіндегі ай',
    author: 'Айша, 14',
    type: 'комикс',
    color: 'bg-[#20b7c9]',
  },
  {
    title: 'Дом у степного моря',
    author: 'Данияр, 12',
    type: 'рассказ',
    color: 'bg-[#f5c84c]',
  },
  {
    title: 'The Last Baursak',
    author: 'Мира, 16',
    type: 'обложка',
    color: 'bg-[#f16543]',
  },
  {
    title: 'Жеті қабат аспан',
    author: 'Арман, 15',
    type: 'постер',
    color: 'bg-[#69b56b]',
  },
];

const dashboardItems = [
  ['Заявки', '486', '+72 за неделю'],
  ['Школы', '28', '7 городов'],
  ['Работы', '214', 'идёт приём'],
  ['Финал', 'март', 'Алматы / Астана'],
];

const roles = [
  ['Участник', 'Подать рассказ, обложку или комикс и пройти сезон с наставниками.'],
  ['Родитель', 'Одобрить публикацию, отслеживать статус и получить приглашение на финал.'],
  ['Амбассадор', 'Открыть школьный клуб и вести группу участников до дедлайна.'],
  ['Партнёр', 'Поддержать призы, мастер-классы, печатную антологию и финал.'],
];

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0].title);

  const activeTrack = useMemo(
    () => tracks.find((track) => track.title === selectedTrack) ?? tracks[0],
    [selectedTrack],
  );

  const ActiveIcon = activeTrack.icon;

  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#171413]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#fffaf1]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#171413] text-sm font-black text-white">
              ҒҚ
            </span>
            <span className="min-w-0">
              <span className="block text-base font-black leading-tight">
                Ғажап Қалам
              </span>
              <span className="block truncate text-xs font-semibold uppercase text-[#6b6157]">
                Creative League Kazakhstan
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-sm font-semibold lg:flex">
            {['Сезон', 'Жұмыстар', 'Фестиваль', 'Елшілер'].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 hover:bg-[#171413] hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <a href="#submit" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-[#171413] px-4 text-sm font-bold text-white shadow-[0_10px_24px_rgb(23_20_19/18%)]">
            <FileUp size={18} />
            Подать
          </a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden border-b border-black/10 bg-[#fffaf1]">
        <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(90deg,rgba(23,20,19,.08)_1px,transparent_1px),linear-gradient(rgba(23,20,19,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#20b7c9] px-3 py-1 text-xs font-black uppercase text-[#071b20]">
                <Sparkles size={14} />
                сезон 2026-2027
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5c84c] px-3 py-1 text-xs font-black uppercase text-[#2c2102]">
                <MapPin size={14} />
                Қазақстан
              </span>
            </div>

            <h1 className="max-w-3xl text-[clamp(3rem,9vw,7.6rem)] font-black leading-[0.86] tracking-normal">
              Ғажап Қалам
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#3d3732] sm:text-2xl">
              Платформа для юных авторов, иллюстраторов и комиксистов:
              сезон, подача работ, жюри, галерея финалистов и живой фестиваль.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f16543] px-5 text-sm font-black text-white shadow-[0_16px_30px_rgb(241_101_67/28%)]">
                <UploadCloud size={19} />
                Подать работу
              </a>
              <a href="#Жұмыстар" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-[#171413] bg-white px-5 text-sm font-black">
                <GalleryHorizontalEnd size={19} />
                Смотреть галерею
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-black/12 py-4">
              <div>
                <strong className="block text-3xl font-black">3</strong>
                <span className="text-xs font-bold uppercase text-[#6b6157]">бағыт</span>
              </div>
              <div>
                <strong className="block text-3xl font-black">10-17</strong>
                <span className="text-xs font-bold uppercase text-[#6b6157]">жас</span>
              </div>
              <div>
                <strong className="block text-3xl font-black">50+</strong>
                <span className="text-xs font-bold uppercase text-[#6b6157]">финалист</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-lg border-2 border-[#171413] bg-[#171413] shadow-[10px_10px_0_#20b7c9] sm:min-h-[520px]">
            <Image
              src="/images/gajap-qalam-hero.png"
              alt="Ғажап Қалам creative table with comics, stories and illustration tools"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-lg border border-white/25 bg-[#171413]/82 p-4 text-white backdrop-blur-md sm:grid-cols-3">
              {tracks.map((track) => (
                <button
                  key={track.title}
                  type="button"
                  onClick={() => setSelectedTrack(track.title)}
                  className={`text-left ${selectedTrack === track.title ? 'text-[#f5c84c]' : 'text-white/78'}`}
                >
                  <span className="block text-xs font-black uppercase">{track.stats}</span>
                  <span className="mt-1 block text-sm font-black">{track.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="Сезон" className="border-b border-black/10 bg-[#171413] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-[#f5c84c]">лига, не разовый конкурс</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">
              Творческий сезон, который ждут весь год
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {timeline.map(([month, text]) => (
              <div key={month} className="rounded-lg border border-white/14 bg-white/[0.06] p-4">
                <span className="flex items-center gap-2 text-sm font-black text-[#20b7c9]">
                  <CalendarDays size={17} />
                  {month}
                </span>
                <p className="mt-3 text-lg font-semibold leading-7 text-white/88">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="submit" className="border-b border-black/10 bg-[#f8f4ed]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-[#f16543]">кабинет участника</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">Подать работу</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-[#514940]">
              Прототип формы уже показывает будущую логику платформы: направление,
              возраст, язык, наставник, согласие родителей и файл работы.
            </p>

            <div className="mt-6 grid gap-3">
              {roles.map(([role, text]) => (
                <div key={role} className="flex gap-3 rounded-lg bg-white p-4 shadow-[0_1px_0_rgb(23_20_19/10%)]">
                  <Check className="mt-1 shrink-0 text-[#69b56b]" size={18} />
                  <p className="font-semibold leading-6">
                    <strong>{role}:</strong> {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border-2 border-[#171413] bg-white p-4 shadow-[10px_10px_0_#f5c84c] sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <button
                    key={track.title}
                    type="button"
                    onClick={() => setSelectedTrack(track.title)}
                    className={`min-h-32 rounded-lg border-2 p-4 text-left transition ${selectedTrack === track.title ? 'border-[#171413] bg-[#fff2c0]' : 'border-black/10 bg-[#f8f4ed] hover:border-[#171413]'}`}
                  >
                    <Icon size={24} />
                    <span className="mt-4 block text-base font-black">{track.title}</span>
                    <span className="mt-1 block text-xs font-bold uppercase text-[#6b6157]">{track.stats}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg bg-[#171413] p-5 text-white">
                <ActiveIcon size={36} className="text-[#f5c84c]" />
                <h3 className="mt-4 text-2xl font-black">{activeTrack.title}</h3>
                <p className="mt-2 font-semibold leading-7 text-white/80">{activeTrack.label}</p>
                <div className="mt-6 rounded-lg bg-white/10 p-4">
                  <span className="text-xs font-black uppercase text-[#20b7c9]">критерии</span>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    Оригинальность, цельность идеи, техника исполнения и личный голос автора.
                  </p>
                </div>
              </div>

              <form className="grid gap-3">
                <label className="grid gap-2 text-sm font-black">
                  Имя участника
                  <input className="h-11 rounded-lg border border-black/15 bg-[#fffaf1] px-3 font-semibold outline-none focus:border-[#20b7c9]" placeholder="Аружан Н." />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black">
                    Возраст
                    <input className="h-11 rounded-lg border border-black/15 bg-[#fffaf1] px-3 font-semibold outline-none focus:border-[#20b7c9]" placeholder="14" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Язык
                    <select className="h-11 rounded-lg border border-black/15 bg-[#fffaf1] px-3 font-semibold outline-none focus:border-[#20b7c9]">
                      <option>Қазақша</option>
                      <option>Русский</option>
                      <option>Два языка</option>
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 text-sm font-black">
                  Школа или город
                  <input className="h-11 rounded-lg border border-black/15 bg-[#fffaf1] px-3 font-semibold outline-none focus:border-[#20b7c9]" placeholder="Алматы, БИЛ / школа" />
                </label>
                <button type="button" className="mt-2 flex min-h-32 items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#20b7c9] bg-[#e8fbfd] px-4 text-sm font-black text-[#07515b]">
                  <UploadCloud size={22} />
                  Загрузить PDF, DOCX, PNG или JPG
                </button>
                <button type="button" className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#171413] px-5 text-sm font-black text-white">
                  Отправить заявку
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="Жұмыстар" className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase text-[#20b7c9]">галерея финалистов</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">Работы становятся видимыми</h2>
            </div>
            <div className="flex h-11 items-center gap-2 rounded-lg border border-black/15 bg-[#f8f4ed] px-3">
              <Search size={18} />
              <span className="text-sm font-bold text-[#6b6157]">жанр, город, автор</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border border-black/10 bg-[#fffaf1]">
                <div className={`h-48 ${item.color} p-4`}>
                  <div className="grid h-full place-items-center rounded-md border-2 border-black/20 bg-white/22">
                    <span className="max-w-36 text-center text-3xl font-black leading-8">{item.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-1 text-sm font-bold text-[#6b6157]">{item.author}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="Фестиваль" className="bg-[#f8f4ed]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="rounded-lg border-2 border-[#171413] bg-[#fffaf1] p-5 shadow-[10px_10px_0_#69b56b] sm:p-6">
            <p className="text-sm font-black uppercase text-[#f16543]">операционный центр</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">Панель сезона</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {dashboardItems.map(([name, value, note]) => (
                <div key={name} className="rounded-lg bg-white p-5 shadow-[0_1px_0_rgb(23_20_19/10%)]">
                  <span className="text-xs font-black uppercase text-[#6b6157]">{name}</span>
                  <strong className="mt-2 block text-4xl font-black">{value}</strong>
                  <span className="mt-2 block text-sm font-bold text-[#20b7c9]">{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-4">
            {[
              [Ticket, 'Фестиваль', 'сцена финалистов, выставка, живая церемония и секретные места до объявления'],
              [Users, 'Клубы', 'школьные команды с амбассадорами вместо зависимости от директоров'],
              [ShieldCheck, 'Безопасность', 'родительское согласие, правила публикации и честное жюри'],
              [Handshake, 'Партнёры', 'издательства, книжные сети, IT, банки, планшеты и образовательные платформы'],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="flex gap-4 rounded-lg bg-white p-5 shadow-[0_1px_0_rgb(23_20_19/10%)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#171413] text-white">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-black">{title as string}</h3>
                  <p className="mt-1 font-semibold leading-7 text-[#514940]">{text as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Елшілер" className="bg-[#171413] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-[#f5c84c]">Ғажап Қалам елшісі</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">
              Учитель, библиотекарь или активный старшеклассник
            </h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/78">
              Амбассадор получает готовый набор: афишу, правила, шаблон урока,
              чек-лист дедлайнов и страницу школьного клуба на платформе.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [GraduationCap, 'Наставники', 'сертификаты и признание для учителей'],
              [Megaphone, 'Запуск', 'готовые объявления для школы и родителей'],
              [Award, 'Рейтинг', 'активные школы видны в национальной таблице'],
              [ChevronRight, 'Финал', 'лучшие клубы приезжают на фестиваль'],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-lg border border-white/14 bg-white/[0.06] p-5">
                <Icon className="text-[#20b7c9]" size={25} />
                <h3 className="mt-4 text-xl font-black">{title as string}</h3>
                <p className="mt-2 font-semibold leading-7 text-white/72">{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#fffaf1]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <strong className="text-2xl font-black">Ғажап Қалам</strong>
            <p className="mt-1 text-sm font-bold text-[#6b6157]">gajapqalam.kz · info@gajapqalam.kz</p>
          </div>
          <a href="#submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#20b7c9] px-4 text-sm font-black text-[#071b20]">
            Начать сезон
            <ArrowRight size={18} />
          </a>
        </div>
      </footer>
    </main>
  );
}
