'use client';

import { ChevronLeft, ChevronRight, LoaderCircle, Maximize2, Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

export function PdfReader({ src }: { src: string }) {
  type RenderTaskLike = { promise: Promise<unknown>; cancel: () => void };
  type PdfPageLike = { getViewport: (input: { scale: number }) => { width: number; height: number }; render: (input: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => RenderTaskLike };
  type PdfDocumentLike = { numPages: number; getPage: (page: number) => Promise<PdfPageLike> };
  const canvasRef = useRef<HTMLCanvasElement>(null); const renderRef = useRef<{ cancel: () => void } | null>(null);
  const [pdf, setPdf] = useState<PdfDocumentLike | null>(null); const [page, setPage] = useState(1); const [pages, setPages] = useState(0); const [scale, setScale] = useState(1); const [error, setError] = useState('');
  useEffect(() => { let disposed = false; (async () => { try { const pdfjs = await import('pdfjs-dist'); pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl; const document = await pdfjs.getDocument({ url: src, disableAutoFetch: false }).promise as unknown as PdfDocumentLike; if (!disposed) { setPdf(document); setPages(document.numPages); } } catch { if (!disposed) setError('Не удалось открыть работу.'); } })(); return () => { disposed = true; }; }, [src]);
  useEffect(() => { if (!pdf || !canvasRef.current) return; let active = true; (async () => { const current = await pdf.getPage(page); const viewport = current.getViewport({ scale: Math.min(window.devicePixelRatio || 1, 2) * scale }); const canvas = canvasRef.current!; const context = canvas.getContext('2d')!; canvas.width = viewport.width; canvas.height = viewport.height; canvas.style.width = `${viewport.width / Math.min(window.devicePixelRatio || 1, 2)}px`; canvas.style.height = 'auto'; renderRef.current?.cancel(); const task = current.render({ canvasContext: context, viewport }); renderRef.current = task; try { await task.promise; } catch { /* cancelled render */ } if (!active) task.cancel(); })(); return () => { active = false; renderRef.current?.cancel(); }; }, [pdf, page, scale]);
  if (error) return <div className="reader-error">{error}</div>;
  if (!pdf) return <div className="reader-loading"><LoaderCircle /> Открываем работу…</div>;
  return <section className="reader-shell"><div className="reader-toolbar"><div><button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} aria-label="Предыдущая страница"><ChevronLeft /></button><span>{page} / {pages}</span><button onClick={() => setPage((value) => Math.min(pages, value + 1))} disabled={page === pages} aria-label="Следующая страница"><ChevronRight /></button></div><div><button onClick={() => setScale((value) => Math.max(.7, value - .15))} aria-label="Уменьшить"><Minus /></button><button onClick={() => setScale(1)} aria-label="Сбросить масштаб"><Maximize2 /></button><button onClick={() => setScale((value) => Math.min(1.8, value + .15))} aria-label="Увеличить"><Plus /></button></div></div><div className="reader-stage"><canvas ref={canvasRef} /><div className="reader-watermark">gajapqalam.kz · online reader</div></div></section>;
}
