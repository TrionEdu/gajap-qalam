'use client';

import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RectangleHorizontal,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ReaderProps = {
  src: string;
  initialPage?: number;
  progressSlug?: string;
  accessLabel?: string;
};

type RenderTaskLike = { promise: Promise<unknown>; cancel: () => void };
type PdfPageLike = {
  getViewport: (input: { scale: number }) => { width: number; height: number };
  render: (input: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => RenderTaskLike;
};
type PdfDocumentLike = { numPages: number; getPage: (page: number) => Promise<PdfPageLike> };

export function PdfReader({ src, initialPage = 1, progressSlug, accessLabel }: ReaderProps) {
  const shellRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const primaryCanvasRef = useRef<HTMLCanvasElement>(null);
  const secondaryCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderTasksRef = useRef<RenderTaskLike[]>([]);
  const pointerStartRef = useRef<number | null>(null);
  const [pdf, setPdf] = useState<PdfDocumentLike | null>(null);
  const [page, setPage] = useState(Math.max(1, initialPage));
  const [pages, setPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState<'single' | 'spread'>('single');
  const [canSpread, setCanSpread] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState('');

  const spread = mode === 'spread' && canSpread;
  const step = spread ? 2 : 1;
  const shownPages = useMemo(
    () => spread && page < pages ? [page, page + 1] : [page],
    [page, pages, spread],
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)');
    const update = () => setCanSpread(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);

  useEffect(() => {
    let disposed = false;
    (async () => {
      await Promise.resolve();
      if (disposed) return;
      setPdf(null);
      setError('');
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const document = await pdfjs.getDocument({ url: src, disableAutoFetch: false }).promise as unknown as PdfDocumentLike;
        if (!disposed) {
          setPdf(document);
          setPages(document.numPages);
          setPage(Math.min(Math.max(1, initialPage), document.numPages));
          const firstPage = await document.getPage(1);
          if (disposed) return;
          const baseViewport = firstPage.getViewport({ scale: 1 });
          const horizontalPadding = window.innerWidth <= 620 ? 32 : 56;
          const availableWidth = Math.max(280, (stageRef.current?.clientWidth ?? Math.min(1050, window.innerWidth)) - horizontalPadding);
          setScale(Math.min(1, availableWidth / baseViewport.width));
        }
      } catch (reason) {
        console.error('PDF reader failed to initialize', reason);
        if (!disposed) setError('Не удалось открыть выпуск. Попробуйте обновить страницу.');
      }
    })();
    return () => {
      disposed = true;
      renderTasksRef.current.forEach((task) => task.cancel());
    };
  }, [initialPage, src]);

  useEffect(() => {
    if (!pdf) return;
    let active = true;
    renderTasksRef.current.forEach((task) => task.cancel());
    renderTasksRef.current = [];
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const canvases = [primaryCanvasRef.current, secondaryCanvasRef.current];
    (async () => {
      for (let index = 0; index < shownPages.length; index += 1) {
        const canvas = canvases[index];
        if (!canvas || !active) continue;
        const current = await pdf.getPage(shownPages[index]);
        if (!active) return;
        const viewport = current.getViewport({ scale: ratio * scale });
        const context = canvas.getContext('2d');
        if (!context) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / ratio}px`;
        canvas.style.height = 'auto';
        const task = current.render({ canvasContext: context, viewport });
        renderTasksRef.current.push(task);
        try { await task.promise; } catch { /* cancelled while changing page or mode */ }
      }
    })();
    return () => { active = false; renderTasksRef.current.forEach((task) => task.cancel()); };
  }, [pdf, scale, shownPages]);

  useEffect(() => {
    if (!progressSlug || !pdf) return;
    const timer = window.setTimeout(() => {
      fetch('/api/shelf', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: progressSlug, page }),
      }).catch(() => undefined);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [page, pdf, progressSlug]);

  const previous = useCallback(() => setPage((value) => Math.max(1, value - step)), [step]);
  const next = useCallback(() => setPage((value) => Math.min(pages, value + step)), [pages, step]);

  async function toggleFullscreen() {
    if (!shellRef.current) return;
    if (document.fullscreenElement === shellRef.current) await document.exitFullscreen();
    else await shellRef.current.requestFullscreen();
  }

  if (error) return <div className="reader-error">{error}</div>;
  if (!pdf) return <div className="reader-loading"><LoaderCircle /> Открываем выпуск…</div>;

  return (
    <section
      className={`reader-shell${fullscreen ? ' is-fullscreen' : ''}`}
      ref={shellRef}
      tabIndex={0}
      aria-label="Читалка комиксов"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
        if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
      }}
      onPointerDown={(event) => { pointerStartRef.current = event.clientX; }}
      onPointerUp={(event) => {
        if (pointerStartRef.current === null) return;
        const distance = event.clientX - pointerStartRef.current;
        pointerStartRef.current = null;
        if (Math.abs(distance) < 48) return;
        if (distance > 0) previous(); else next();
      }}
    >
      <div className="reader-toolbar">
        <div className="reader-page-controls">
          <button type="button" onClick={previous} disabled={page === 1} aria-label="Предыдущая страница" title="Предыдущая страница"><ChevronLeft /></button>
          <span aria-live="polite">{shownPages.join('–')} <i>/</i> {pages}</span>
          <button type="button" onClick={next} disabled={page >= pages} aria-label="Следующая страница" title="Следующая страница"><ChevronRight /></button>
        </div>
        <div className="reader-status">{accessLabel || 'Онлайн-версия'}</div>
        <div className="reader-view-controls">
          <button type="button" onClick={() => setScale((value) => Math.max(.7, value - .15))} aria-label="Уменьшить" title="Уменьшить"><Minus /></button>
          <button type="button" onClick={() => setScale((value) => Math.min(1.8, value + .15))} aria-label="Увеличить" title="Увеличить"><Plus /></button>
          <button type="button" className={mode === 'single' ? 'active' : ''} onClick={() => setMode('single')} aria-label="Одна страница" title="Одна страница"><RectangleHorizontal /></button>
          <button type="button" className={spread ? 'active' : ''} onClick={() => setMode('spread')} disabled={!canSpread} aria-label="Разворот" title="Разворот"><Columns2 /></button>
          <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'} title={fullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</button>
        </div>
      </div>
      <div className={`reader-stage${spread ? ' reader-spread' : ''}`} ref={stageRef}>
        <div className="reader-page"><canvas ref={primaryCanvasRef} /></div>
        {spread && page < pages && <div className="reader-page"><canvas ref={secondaryCanvasRef} /></div>}
        <div className="reader-watermark">gajapqalam.kz · online reader</div>
      </div>
      <div className="reader-progress">
        <input
          type="range"
          min="1"
          max={pages}
          step={step}
          value={page}
          onChange={(event) => setPage(Number(event.target.value))}
          aria-label="Перейти к странице"
        />
        <span>{Math.round((page / pages) * 100)}%</span>
      </div>
    </section>
  );
}
