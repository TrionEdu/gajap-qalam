'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CalendarClock,
  ChevronRight,
  FileUp,
  GalleryHorizontalEnd,
  Megaphone,
  Newspaper,
  Palette,
  PenLine,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const tracks = [
  {
    title: 'Ғажап Әңгіме',
    type: 'story',
    tag: 'мини-проза / поэма',
    icon: PenLine,
    prize: 'e-reader + публикация',
  },
  {
    title: 'Ғажап Мұқаба',
    type: 'cover',
    tag: 'обложка / постер',
    icon: Palette,
    prize: 'планшет + выставка',
  },
  {
    title: 'Ғажап Комикс',
    type: 'comic',
    tag: '4-8 страниц',
    icon: BookOpen,
    prize: 'печать + ментор',
  },
];

const works = [
  ['Қала үстіндегі ай', 'Айша, 14 · комикс', 'cyan'],
  ['Дом у степного моря', 'Данияр, 12 · рассказ', 'yellow'],
  ['Жеті қабат аспан', 'Арман, 15 · постер', 'green'],
  ['The Last Baursak', 'Мира, 16 · обложка', 'red'],
  ['Космический ауыл', 'Санжар, 13 · комикс', 'violet'],
  ['Письмо из 2091', 'Лейла, 17 · проза', 'cyan'],
];

const news = [
  ['01.09', 'Открыт набор школьных амбассадоров'],
  ['15.10', 'Старт первого творческого челленджа'],
  ['20.11', 'Онлайн-встреча с иллюстратором комиксов'],
  ['25.01', 'Портфолио-разборы для финалистов'],
  ['15.02', 'Финальный день подачи работ'],
  ['28.03', 'Фестиваль и секретное объявление мест'],
];

const stats = [
  ['486', 'заявок в пилотной модели'],
  ['28', 'школ в первом сезоне'],
  ['3', 'турнирных направления'],
  ['50+', 'финалистов на фестивале'],
];

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[2]);

  const Icon = selectedTrack.icon;

  return (
    <main className="min-h-screen overflow-hidden bg-[#160f0b] text-[#f6e5c2]">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#f0c36a]/35 bg-[#120c09]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-7 lg:px-10">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-24 shrink-0 place-items-center rounded-full border border-[#f0c36a]/55 bg-[#f6e5c2] px-3 shadow-[0_0_28px_rgb(240_195_106/16%)] sm:w-36">
              <Image
                src="/images/gq-logo.png"
                alt="Gajap Qalam"
                width={173}
                height={91}
                className="h-auto w-full mix-blend-multiply"
                priority
              />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-[11px] font-black uppercase tracking-wide text-[#f0c36a]/75">
                noir creative league
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-[#f0c36a]/45 bg-[#251711] p-1 text-xs font-black uppercase shadow-[0_0_32px_rgb(0_0_0/32%)] lg:flex">
            {['Дело', 'Архив', 'Хроника', 'Подать'].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 text-[#f6e5c2] hover:bg-[#f0c36a] hover:text-[#160f0b]">
                {item}
              </a>
            ))}
          </div>

          <a href="#Подать" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-[#f0c36a]/65 bg-[#7b2d20] px-4 text-sm font-black uppercase text-[#ffe6b0] shadow-[0_0_28px_rgb(123_45_32/45%)] transition hover:bg-[#a7412c]">
            <FileUp size={18} />
            Досье
          </a>
        </div>
      </nav>

      <section id="top" className="relative min-h-screen bg-[#160f0b] pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(240,195,106,.20),transparent_30%),radial-gradient(circle_at_82%_40%,rgba(123,45,32,.28),transparent_28%),linear-gradient(180deg,#21130d,#120c09_78%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(246,229,194,.18)_1px,transparent_1px),linear-gradient(rgba(246,229,194,.16)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="absolute inset-0 noir-grain" />
        <div className="absolute right-8 top-20 hidden rotate-6 rounded-sm border border-[#f0c36a]/65 bg-[#2a1710] px-5 py-3 text-2xl font-black text-[#f0c36a] shadow-[0_0_32px_rgb(240_195_106/18%)] lg:block">
          2026-2027
        </div>

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-14">
          <div className="z-10 flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f0c36a]/55 bg-[#f6e5c2] px-4 py-2 text-xs font-black uppercase text-[#160f0b] shadow-[0_0_26px_rgb(240_195_106/18%)]">
                <Sparkles size={15} />
                құпия шығармашылық маусым
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f0c36a]/55 bg-[#7b2d20] px-4 py-2 text-xs font-black uppercase text-[#ffe6b0] shadow-[0_0_26px_rgb(123_45_32/35%)]">
                <Trophy size={15} />
                дело открыто
              </span>
            </div>

            <p className="mb-3 text-lg font-black uppercase tracking-wide text-[#f0c36a]">
              Тёплый нуарный сезон для тех, кто пишет, рисует и расследует свои идеи
            </p>
            <div className="mb-4 w-[min(520px,78vw)] rotate-[-1deg] border border-[#f0c36a]/45 bg-[#f6e5c2] px-5 py-4 shadow-[0_18px_70px_rgb(0_0_0/45%)]">
              <Image
                src="/images/gq-logo.png"
                alt="Gajap Qalam logo"
                width={1731}
                height={909}
                className="h-auto w-full mix-blend-multiply"
                priority
              />
            </div>
            <h1 className="noir-title max-w-4xl text-[clamp(3.35rem,10vw,8.6rem)] font-black uppercase leading-[0.82] tracking-normal">
              Дело юных авторов
            </h1>

            <div className="mt-7 max-w-2xl rotate-[-1deg] border border-[#f0c36a]/45 bg-[#2a1710]/92 p-5 shadow-[0_24px_80px_rgb(0_0_0/48%)] sm:p-6">
              <p className="text-xl font-black leading-7 text-[#f6e5c2] sm:text-2xl">
                Республиканский турнир, где каждая работа становится уликой:
                рассказ, обложка или комикс проходит путь от черновика до
                архивной галереи и финальной сцены.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#Подать" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#f0c36a] px-6 text-sm font-black uppercase text-[#160f0b]">
                  Открыть досье
                  <ArrowRight size={18} />
                </a>
                <a href="#Архив" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-[#f0c36a]/55 bg-[#160f0b] px-6 text-sm font-black uppercase text-[#f6e5c2]">
                  Архив работ
                  <GalleryHorizontalEnd size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[660px]">
            <div className="absolute left-0 top-10 h-[72%] w-[95%] rotate-2 overflow-hidden rounded-sm border border-[#f0c36a]/55 bg-black shadow-[0_34px_90px_rgb(0_0_0/62%)]">
              <Image
                src="/images/gajap-qalam-noir.png"
                alt="Нуарный стол с рукописями, комиксами и лампой"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-7 left-3 right-2 grid gap-3 sm:grid-cols-3">
              {tracks.map((track, index) => {
                const TrackIcon = track.icon;
                return (
                  <button
                    key={track.title}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    className={`min-h-36 border border-[#f0c36a]/45 p-4 text-left shadow-[0_18px_44px_rgb(0_0_0/36%)] transition hover:-translate-y-1 ${
                      selectedTrack.title === track.title
                        ? 'bg-[#f0c36a] text-[#160f0b]'
                        : index === 0
                          ? 'bg-[#3a2418] text-[#f6e5c2]'
                          : 'bg-[#251711] text-[#f6e5c2]'
                    }`}
                    style={{ transform: `rotate(${index - 1}deg)` }}
                  >
                    <TrackIcon size={26} />
                    <span className="mt-4 block text-xl font-black leading-5">{track.title}</span>
                    <span className="mt-2 block text-xs font-black uppercase">{track.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-y border-[#f0c36a]/35 bg-[#0e0907] py-3">
          <div className="marquee-track text-xl font-black uppercase text-[#f0c36a]">
            <span>Ғажап Әңгіме</span>
            <span>Ғажап Мұқаба</span>
            <span>Ғажап Комикс</span>
            <span>Архив дел открыт до 15 февраля</span>
            <span>Жюри · хроника · фестиваль · антология</span>
            <span>Ғажап Әңгіме</span>
            <span>Ғажап Мұқаба</span>
            <span>Ғажап Комикс</span>
          </div>
        </div>
      </section>

      <section id="Архив" className="bg-[#1c120d] py-14 sm:py-18">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="inline-flex rounded-full border border-[#f0c36a]/55 bg-[#2a1710] px-4 py-2 text-xs font-black uppercase text-[#f0c36a] shadow-[0_0_26px_rgb(240_195_106/14%)]">
                архив дел
              </p>
              <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-[#f6e5c2] sm:text-7xl">
                Работы детей в тёплой ленте
              </h2>
              <p className="mt-5 text-xl font-bold leading-8 text-[#d8b985]">
                Каждая работа выглядит как найденная страница из большого
                творческого расследования: рассказ, обложка, комикс, город,
                возраст и след автора.
              </p>
            </div>

            <div className="overflow-hidden border border-[#f0c36a]/45 bg-[#120c09] p-3 shadow-[0_28px_80px_rgb(0_0_0/42%)]">
              <div className="work-strip">
                {[...works, ...works].map(([title, author, color], index) => (
                  <article key={`${title}-${index}`} className={`work-card tone-${color}`}>
                    <div className="comic-page">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <h3>{title}</h3>
                    <p>{author}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Хроника" className="relative border-y border-[#f0c36a]/35 bg-[#0e0907] py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <p className="inline-flex rounded-full border border-[#f0c36a]/55 bg-[#7b2d20] px-4 py-2 text-xs font-black uppercase text-[#ffe6b0] shadow-[0_0_26px_rgb(123_45_32/35%)]">
              хроника турнира
            </p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-[#f6e5c2] sm:text-7xl">
              Даты, следы, повороты
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="border border-[#f0c36a]/45 bg-[#2a1710] p-4 text-[#f6e5c2] shadow-[0_16px_44px_rgb(0_0_0/35%)]">
                  <strong className="block text-4xl font-black">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase leading-4">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="news-rotator min-h-[490px] overflow-hidden border border-[#f0c36a]/45 bg-[#1c120d] p-4 text-[#f6e5c2] shadow-[0_28px_80px_rgb(0_0_0/42%)]">
            <div className="news-stack">
              {[...news, ...news].map(([date, title], index) => (
                <article key={`${date}-${index}`} className="news-card">
                  <span>{date}</span>
                  <h3>{title}</h3>
                  <ChevronRight size={28} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="Дело" className="bg-[#24160f] py-14 sm:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="border border-[#f0c36a]/45 bg-[#f6e5c2] p-5 text-[#160f0b] shadow-[0_28px_80px_rgb(0_0_0/44%)] sm:p-7">
            <Icon size={44} />
            <p className="mt-5 text-xs font-black uppercase text-black/60">выбранное направление</p>
            <h2 className="mt-2 text-5xl font-black uppercase leading-none tracking-normal">{selectedTrack.title}</h2>
            <p className="mt-5 text-2xl font-black leading-8">{selectedTrack.tag}</p>
            <div className="mt-6 rounded-3xl border-2 border-black bg-[#fff6dd] p-5">
              <p className="text-sm font-black uppercase text-black/60">главная находка</p>
              <p className="mt-2 text-xl font-black">{selectedTrack.prize}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [CalendarClock, 'Сезон', 'октябрь - март: задания, встречи, дедлайны и отбор'],
              [Users, 'Елшілер', 'учителя и активные школьники запускают творческие клубы'],
              [ShieldCheck, 'Правила', 'родительское согласие, авторство и безопасная публикация'],
              [Ticket, 'Финал', 'выставка, чтения, сцена, призы и секретные места'],
            ].map(([ItemIcon, title, text], index) => (
              <article key={title as string} className={`feature-card ${index % 2 ? 'feature-card-alt' : ''}`}>
                <ItemIcon size={30} />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="Подать" className="bg-[#160f0b] py-14 pb-32 sm:py-18 sm:pb-36">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <p className="inline-flex rounded-full border border-[#f0c36a]/55 bg-[#7b2d20] px-4 py-2 text-xs font-black uppercase text-[#ffe6b0] shadow-[0_0_26px_rgb(123_45_32/35%)]">
              досье участника
            </p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal text-[#f6e5c2] sm:text-7xl">
              Передай работу в архив
            </h2>
            <p className="mt-5 text-xl font-bold leading-8 text-[#d8b985]">
              Форма выглядит как карточка дела: направление, автор, школа, язык
              и файл. Следующим шагом сюда можно подключить настоящую базу заявок.
            </p>
          </div>

          <div className="border border-[#f0c36a]/45 bg-[#2a1710] p-5 shadow-[0_28px_80px_rgb(0_0_0/48%)] sm:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {tracks.map((track) => {
                const TrackIcon = track.icon;
                return (
                  <button
                    key={track.title}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    className={`min-h-32 border border-[#f0c36a]/45 p-4 text-left font-black shadow-[0_14px_34px_rgb(0_0_0/34%)] ${
                      selectedTrack.title === track.title ? 'bg-[#f0c36a] text-[#160f0b]' : 'bg-[#160f0b] text-[#f6e5c2]'
                    }`}
                  >
                    <TrackIcon size={24} />
                    <span className="mt-4 block text-lg leading-5">{track.title}</span>
                  </button>
                );
              })}
            </div>

            <form className="mt-5 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="form-label">
                  Имя участника
                  <input placeholder="Аружан Н." />
                </label>
                <label className="form-label">
                  Возраст
                  <input placeholder="14" />
                </label>
              </div>
              <label className="form-label">
                Город и школа
                <input placeholder="Алматы, школа / лицей" />
              </label>
              <label className="form-label">
                Язык работы
                <select>
                  <option>Қазақша</option>
                  <option>Русский</option>
                  <option>Два языка</option>
                </select>
              </label>
              <button type="button" className="flex min-h-36 items-center justify-center gap-3 border border-dashed border-[#f0c36a]/70 bg-[#160f0b] px-4 text-sm font-black uppercase text-[#f0c36a]">
                <UploadCloud size={24} />
                загрузить PDF, DOCX, PNG или JPG
              </button>
              <button type="button" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#f0c36a] px-6 text-sm font-black uppercase text-[#160f0b]">
                Передать досье
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#f0c36a]/35 bg-[#120c09]/94 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f0c36a] text-[#160f0b]">
              <Newspaper size={22} />
            </span>
            <p className="text-sm font-black uppercase leading-5 text-[#f6e5c2]">
              Дело открыто · дедлайн 15 февраля · финал в марте
            </p>
          </div>
          <a href="#Подать" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#f0c36a]/65 bg-[#7b2d20] px-5 text-sm font-black uppercase text-[#ffe6b0] shadow-[0_0_28px_rgb(123_45_32/45%)]">
            Открыть досье
            <BadgeCheck size={18} />
          </a>
        </div>
      </div>
    </main>
  );
}
