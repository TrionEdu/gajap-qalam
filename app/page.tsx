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
    <main className="min-h-screen overflow-hidden bg-[#fff6dd] text-[#111111]">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b-2 border-black bg-[#fff6dd]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-7 lg:px-10">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-black bg-white text-sm font-black shadow-[3px_3px_0_#111]">
              ҒҚ
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black uppercase leading-none">
                Ғажап Қалам
              </span>
              <span className="block truncate text-[11px] font-black uppercase tracking-wide text-black/60">
                tournament platform
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border-2 border-black bg-white p-1 text-xs font-black uppercase shadow-[3px_3px_0_#111] lg:flex">
            {['Турнир', 'Работы', 'Новости', 'Подать'].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 hover:bg-black hover:text-white">
                {item}
              </a>
            ))}
          </div>

          <a href="#Подать" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border-2 border-black bg-[#f24d2e] px-4 text-sm font-black uppercase text-white shadow-[4px_4px_0_#111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#111]">
            <FileUp size={18} />
            Регистрация
          </a>
        </div>
      </nav>

      <section id="top" className="relative min-h-screen bg-[#f49a25] pt-20">
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18px_18px,rgba(255,255,255,.22)_2px,transparent_2px)] [background-size:34px_34px]" />
        <div className="absolute -left-16 top-28 h-28 w-56 rotate-[-14deg] rounded-[50%] border-[18px] border-white/60" />
        <div className="absolute right-8 top-20 hidden rotate-12 rounded-full border-2 border-black bg-[#f6ee4a] px-5 py-3 text-2xl font-black shadow-[5px_5px_0_#111] lg:block">
          2026-2027
        </div>

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-14">
          <div className="z-10 flex flex-col justify-center">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#111]">
                <Sparkles size={15} />
                Қазақстандағы балалар шығармашылығы
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#30c4d8] px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#111]">
                <Trophy size={15} />
                турнир открыт
              </span>
            </div>

            <p className="mb-3 text-lg font-black uppercase tracking-wide text-white drop-shadow-[2px_2px_0_#111]">
              Лучший сезон, чтобы показать своё воображение
            </p>
            <h1 className="promo-title max-w-4xl text-[clamp(4rem,13vw,11rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
              Ғажап Қалам
            </h1>

            <div className="mt-7 max-w-2xl rotate-[-1deg] border-2 border-black bg-[#fff6dd] p-5 shadow-[8px_8px_0_#111] sm:p-6">
              <p className="text-xl font-black leading-7 sm:text-2xl">
                Республиканский турнир юных авторов, иллюстраторов и
                комиксистов. Подавай работу, проходи сезон, попадай в
                галерею и выходи на фестивальную сцену.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#Подать" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-black uppercase text-white">
                  Подать работу
                  <ArrowRight size={18} />
                </a>
                <a href="#Работы" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-black bg-white px-6 text-sm font-black uppercase">
                  Работы детей
                  <GalleryHorizontalEnd size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[660px]">
            <div className="absolute left-0 top-10 h-[70%] w-[95%] rotate-3 overflow-hidden rounded-[34px] border-[10px] border-white bg-black shadow-[14px_16px_0_rgba(0,0,0,.85)]">
              <Image
                src="/images/gajap-qalam-hero.png"
                alt="Рабочий стол с детскими историями, комиксами и обложками"
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
                  className={`min-h-36 border-2 border-black p-4 text-left shadow-[6px_6px_0_#111] transition hover:-translate-y-1 ${
                      selectedTrack.title === track.title
                        ? 'bg-[#f6ee4a]'
                        : index === 0
                          ? 'bg-[#30c4d8]'
                          : 'bg-white'
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

        <div className="absolute bottom-0 left-0 right-0 border-y-2 border-black bg-white py-3">
          <div className="marquee-track text-xl font-black uppercase">
            <span>Ғажап Әңгіме</span>
            <span>Ғажап Мұқаба</span>
            <span>Ғажап Комикс</span>
            <span>Финалисты узнают места на сцене</span>
            <span>Жюри · галерея · фестиваль · антология</span>
            <span>Ғажап Әңгіме</span>
            <span>Ғажап Мұқаба</span>
            <span>Ғажап Комикс</span>
          </div>
        </div>
      </section>

      <section id="Работы" className="bg-[#fff6dd] py-14 sm:py-18">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="inline-flex rounded-full border-2 border-black bg-[#30c4d8] px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#111]">
                крутящийся баннер
              </p>
              <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl">
                Работы детей в движении
              </h2>
              <p className="mt-5 text-xl font-bold leading-8 text-black/70">
                На главной странице платформа постоянно показывает новые
                рассказы, обложки, постеры и комиксы. Это превращает конкурс в
                живую ленту, а не в сухую форму заявки.
              </p>
            </div>

            <div className="overflow-hidden border-2 border-black bg-white p-3 shadow-[10px_10px_0_#111]">
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

      <section id="Новости" className="relative border-y-2 border-black bg-[#111111] py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div>
            <p className="inline-flex rounded-full border-2 border-white bg-[#f24d2e] px-4 py-2 text-xs font-black uppercase shadow-[4px_4px_0_#fff]">
              новости турнира
            </p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl">
              Всё, что двигает сезон
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="border-2 border-white bg-white p-4 text-black shadow-[5px_5px_0_#30c4d8]">
                  <strong className="block text-4xl font-black">{value}</strong>
                  <span className="mt-2 block text-xs font-black uppercase leading-4">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="news-rotator min-h-[490px] overflow-hidden border-2 border-white bg-[#fff6dd] p-4 text-black shadow-[10px_10px_0_#f24d2e]">
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

      <section id="Турнир" className="bg-[#f6ee4a] py-14 sm:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="border-2 border-black bg-white p-5 shadow-[10px_10px_0_#111] sm:p-7">
            <Icon size={44} />
            <p className="mt-5 text-xs font-black uppercase text-black/60">выбранное направление</p>
            <h2 className="mt-2 text-5xl font-black uppercase leading-none tracking-normal">{selectedTrack.title}</h2>
            <p className="mt-5 text-2xl font-black leading-8">{selectedTrack.tag}</p>
            <div className="mt-6 rounded-3xl border-2 border-black bg-[#fff6dd] p-5">
              <p className="text-sm font-black uppercase text-black/60">главный результат</p>
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

      <section id="Подать" className="bg-[#fff6dd] py-14 pb-32 sm:py-18 sm:pb-36">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-7 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div>
            <p className="inline-flex rounded-full border-2 border-black bg-[#f24d2e] px-4 py-2 text-xs font-black uppercase text-white shadow-[4px_4px_0_#111]">
              кабинет участника
            </p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl">
              Подай работу на турнир
            </h2>
            <p className="mt-5 text-xl font-bold leading-8 text-black/70">
              Форма сейчас работает как визуальный прототип будущей платформы:
              дальше сюда можно подключить базу заявок, загрузку файлов и
              кабинеты родителей.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-5 shadow-[10px_10px_0_#111] sm:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {tracks.map((track) => {
                const TrackIcon = track.icon;
                return (
                  <button
                    key={track.title}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    className={`min-h-32 border-2 border-black p-4 text-left font-black shadow-[4px_4px_0_#111] ${
                      selectedTrack.title === track.title ? 'bg-[#30c4d8]' : 'bg-[#fff6dd]'
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
              <button type="button" className="flex min-h-36 items-center justify-center gap-3 border-2 border-dashed border-black bg-[#30c4d8]/20 px-4 text-sm font-black uppercase">
                <UploadCloud size={24} />
                загрузить PDF, DOCX, PNG или JPG
              </button>
              <button type="button" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-black uppercase text-white">
                Отправить заявку
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-black bg-white/94 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f6ee4a] text-black">
              <Newspaper size={22} />
            </span>
            <p className="text-sm font-black uppercase leading-5">
              Приём работ открыт · дедлайн 15 февраля · финал в марте
            </p>
          </div>
          <a href="#Подать" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-black bg-[#f24d2e] px-5 text-sm font-black uppercase text-white shadow-[4px_4px_0_#111]">
            Участвовать
            <BadgeCheck size={18} />
          </a>
        </div>
      </div>
    </main>
  );
}
