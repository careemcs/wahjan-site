import React, { useRef, useEffect, useState, useMemo } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useInView, 
  useScroll, 
  animate, 
  AnimatePresence 
} from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  UserPlus, 
  Zap, 
  Handshake, 
  MessageCircle, 
  MonitorPlay, 
  ShieldCheck, 
  PieChart, 
  Lightbulb, 
  X, 
  Megaphone, 
  Users, 
  Clapperboard, 
  CalendarDays, 
  BarChart3, 
  Target, 
  Crown, 
  Rocket, 
  Camera, 
  Star,
  CheckCircle2,
  ChevronDown,
  Repeat
} from 'lucide-react';

// --- Injecting Premium Apple-like Fonts & Catchers/Wahjan CSS ---
const injectStyles = () => {
  if (typeof document !== 'undefined') {
    const existing = document.getElementById('wahjan-custom-styles');
    if (existing) return;
    const style = document.createElement('style');
    style.id = 'wahjan-custom-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800;900&display=swap');
      
      :root {
        --bg-cream: #F5EFEB;
        --text-dark: #1A1818;
        --accent-red: #811A1A;
        --accent-wine: #4A0B0B;
        --accent-sand: #D8B6A4;
      }

      body {
        background-color: var(--bg-cream);
        color: var(--text-dark);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        overflow-x: hidden;
      }

      /* Language specific typographies */
      .lang-en {
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
      }
      .lang-ar {
        font-family: 'Cairo', sans-serif;
      }
      .font-serif-en {
        font-family: 'Playfair Display', serif;
      }
      .font-serif-ar {
        font-family: 'Amiri', serif;
      }

      /* Light Glass */
      .apple-glass-light {
        background: rgba(245, 239, 235, 0.45);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7);
      }

      /* Dark Glass */
      .apple-glass-dark {
        background: rgba(26, 24, 24, 0.55);
        backdrop-filter: blur(20px) saturate(150%);
        -webkit-backdrop-filter: blur(20px) saturate(150%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      /* Luxury Center Glass for Hero */
      .hero-center-glass {
        background: radial-gradient(circle at center, rgba(245, 239, 235, 0.94) 0%, rgba(245, 239, 235, 0.82) 65%, rgba(245, 239, 235, 0.35) 100%);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }

      .text-outline-glass {
        color: transparent;
        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .group:hover .text-outline-glass {
        color: rgba(255, 255, 255, 0.95);
        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.95);
        text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
      }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: var(--bg-cream); }
      ::-webkit-scrollbar-thumb { background: rgba(129, 26, 26, 0.3); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(129, 26, 26, 0.6); }

      /* ================= WAHJAN BRAND SYSTEM ================= */
      .wj-cream { background: #F5EFEB; }
      .wj-band { background: #FBF7F4; border-top: 1px solid rgba(129,26,26,0.08); border-bottom: 1px solid rgba(129,26,26,0.08); }
      .wj-dark { background: #1A0505; color: #F5EFEB; }
      .wj-ink { color: #1A1818; }
      .wj-ink-soft { color: rgba(26,24,24,0.78); }
      .wj-red { color: #811A1A; }
      .wj-sand { color: #D8B6A4; }
      .wj-on-dark-soft { color: rgba(245,239,235,0.65); }
      .wj-eyebrow, .wj-eyebrow-dark { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; }
      .wj-eyebrow { color: #811A1A; }
      .wj-eyebrow-dark { color: #D8B6A4; }

      /* scroll progress bar */
      .wj-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; transform-origin: 0 50%; background: linear-gradient(90deg, #811A1A, #D8B6A4); z-index: 70; }

      /* logo animation */
      @keyframes wj-spin-slow { to { transform: rotate(360deg); } }
      .wj-spin-slow { animation: wj-spin-slow 48s linear infinite; transform-origin: 50% 50%; }
      .wj-watermark { position: absolute; width: 560px; height: 560px; top: -140px; inset-inline-end: -170px; opacity: 0.07; pointer-events: none; }
      .wj-watermark-light { opacity: 0.06; }

      /* marquee track */
      @keyframes wj-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .wj-marquee { position: relative; overflow: hidden; }
      .wj-marquee-track { display: flex; width: max-content; align-items: center; animation: wj-marquee 46s linear infinite; }
      .wj-marquee-track.wj-reverse { animation-direction: reverse; animation-duration: 58s; }
      .wj-marquee:hover .wj-marquee-track { animation-play-state: paused; }
      .wj-marquee-fade-l, .wj-marquee-fade-r { position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none; }
      .wj-marquee-fade-l { left: 0; background: linear-gradient(90deg, #FBF7F4, rgba(251,247,244,0)); }
      .wj-marquee-fade-r { right: 0; background: linear-gradient(270deg, #FBF7F4, rgba(251,247,244,0)); }
      .wj-brand { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: rgba(26,24,24,0.45); padding: 6px 42px; white-space: nowrap; transition: color 0.4s, transform 0.4s; }
      .wj-brand:hover { color: #811A1A; transform: scale(1.06); }
      .wj-brand-dot { width: 6px; height: 6px; border-radius: 50%; background: #D8B6A4; flex: none; }

      /* services */
      .wj-service { position: relative; overflow: hidden; padding: 38px 34px 40px; border-radius: 2rem; background: rgba(255,255,255,0.65); -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.85); box-shadow: 0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9); transition: background 0.5s, border-color 0.5s, box-shadow 0.5s; }
      .wj-service:hover { background: rgba(255,255,255,0.92); border-color: rgba(129,26,26,0.25); box-shadow: 0 24px 60px rgba(129,26,26,0.14), inset 0 1px 0 rgba(255,255,255,0.95); }
      .wj-service-num { position: absolute; top: 24px; inset-inline-end: 30px; font-family: 'Playfair Display', serif; font-size: 46px; line-height: 1; color: rgba(129,26,26,0.12); transition: color 0.5s; }
      .wj-service:hover .wj-service-num { color: rgba(129,26,26,0.3); }
      .wj-service-icon { width: 64px; height: 64px; border-radius: 20px; display: grid; place-items: center; margin-bottom: 28px; color: #F5EFEB; background: linear-gradient(135deg, #811A1A, #4A0B0B); box-shadow: 0 12px 28px rgba(129,26,26,0.35); transition: transform 0.5s; }
      .wj-service:hover .wj-service-icon { transform: rotate(-8deg) scale(1.1); }
      .wj-service-title { font-size: 22px; font-weight: 800; color: #1A1818; margin-bottom: 10px; }
      .wj-service-desc { color: rgba(26,24,24,0.72); font-weight: 600; line-height: 1.75; font-size: 15px; }
      .wj-service-line { position: absolute; bottom: 0; inset-inline-start: 0; height: 3px; width: 0; background: linear-gradient(90deg, #811A1A, #D8B6A4); transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
      .wj-service:hover .wj-service-line { width: 100%; }

      /* talent tracks */
      .wj-track { position: relative; overflow: hidden; height: 100%; padding: 44px 40px; border-radius: 2.2rem; }
      .wj-track-dark { color: #F5EFEB; background: linear-gradient(145deg, #4A0B0B, #811A1A 70%, #630000); box-shadow: 0 30px 70px rgba(74,11,11,0.35), inset 0 1px 0 rgba(255,255,255,0.15); }
      .wj-track-light { color: #1A1818; background: rgba(255,255,255,0.65); -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.85); box-shadow: 0 10px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9); }
      .wj-track-icon { width: 58px; height: 58px; border-radius: 18px; display: grid; place-items: center; margin-bottom: 26px; }
      .wj-track-dark .wj-track-icon { background: rgba(245,239,235,0.14); color: #F5EFEB; border: 1px solid rgba(245,239,235,0.25); }
      .wj-track-light .wj-track-icon { background: linear-gradient(135deg, #811A1A, #4A0B0B); color: #F5EFEB; }
      .wj-track h3 { font-size: 30px; font-weight: 800; margin-bottom: 12px; }
      .wj-track p { font-weight: 600; line-height: 1.75; opacity: 0.8; margin-bottom: 24px; }
      .wj-track li { display: flex; gap: 12px; align-items: flex-start; font-weight: 700; margin-bottom: 12px; font-size: 15px; }
      .wj-track li::before { content: ""; flex: none; width: 8px; height: 8px; margin-top: 8px; border-radius: 50%; background: #D8B6A4; }
      .wj-track-light li::before { background: #811A1A; }

      /* campaigns */
      .wj-campaign { position: relative; overflow: hidden; height: 100%; min-height: 380px; padding: 32px; border-radius: 2rem; display: flex; flex-direction: column; justify-content: space-between; text-align: start; color: #F5EFEB; cursor: pointer; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(26,5,5,0.25); }
      .wj-campaign-0 { background: linear-gradient(150deg, #4A0B0B, #811A1A); }
      .wj-campaign-1 { background: linear-gradient(150deg, #1A1818, #4A0B0B); }
      .wj-campaign-2 { background: linear-gradient(150deg, #630000, #A52222); }
      .wj-campaign-3 { background: linear-gradient(150deg, #2A0000, #1A1818 60%, #811A1A); }
      .wj-campaign-mark { position: absolute; width: 300px; height: 300px; inset-inline-end: -90px; bottom: -90px; opacity: 0.12; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s; }
      .wj-campaign:hover .wj-campaign-mark { transform: rotate(45deg) scale(1.15); opacity: 0.22; }
      .wj-campaign-big { font-family: 'Playfair Display', serif; font-size: 64px; line-height: 1; font-style: italic; color: #D8B6A4; }
      .wj-campaign-cta { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #F5EFEB; }

      .wj-modal-backdrop { position: fixed; inset: 0; z-index: 90; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(26,5,5,0.7); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
      .wj-modal { position: relative; width: 100%; max-width: 860px; max-height: 90vh; overflow-y: auto; padding: 48px; border-radius: 2.2rem; color: #F5EFEB; background: linear-gradient(150deg, rgba(74,11,11,0.96), rgba(26,24,24,0.96)); border: 1px solid rgba(216,182,164,0.25); box-shadow: 0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12); }
      .wj-modal-close { position: absolute; top: 20px; inset-inline-end: 20px; width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; color: #F5EFEB; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); cursor: pointer; transition: transform 0.3s, background 0.3s; }
      .wj-modal-close:hover { transform: rotate(90deg); background: rgba(255,255,255,0.2); }
      .wj-modal h4 { color: #D8B6A4; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 800; margin-bottom: 10px; }
      .wj-stat { padding: 22px 18px; border-radius: 1.4rem; text-align: center; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
      .wj-stat strong { display: block; font-family: 'Playfair Display', serif; font-size: 36px; color: #D8B6A4; line-height: 1.1; }
      .wj-stat span { font-size: 12px; font-weight: 700; opacity: 0.7; }

      /* events */
      @keyframes wj-glow { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.15); } }
      .wj-glow { position: absolute; border-radius: 50%; filter: blur(130px); pointer-events: none; animation: wj-glow 14s ease-in-out infinite; }
      .wj-outline-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(52px, 9vw, 130px); line-height: 1.1; color: transparent; -webkit-text-stroke: 1px rgba(216,182,164,0.35); padding: 0 35px; white-space: nowrap; }
      .wj-outline-text b { color: #811A1A; -webkit-text-stroke: 0; font-style: normal; }
      .wj-ticket { position: relative; height: 100%; padding: 34px 30px 36px; border-radius: 1.8rem; background: rgba(255,255,255,0.04); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); border: 1px dashed rgba(216,182,164,0.35); transition: border-color 0.5s, background 0.5s, box-shadow 0.5s; }
      .wj-ticket::before, .wj-ticket::after { content: ""; position: absolute; top: 96px; width: 22px; height: 22px; border-radius: 50%; background: #1A0505; border: 1px dashed rgba(216,182,164,0.35); }
      .wj-ticket::before { left: -12px; }
      .wj-ticket::after { right: -12px; }
      .wj-ticket:hover { border-style: solid; border-color: rgba(216,182,164,0.7); background: rgba(255,255,255,0.08); box-shadow: 0 24px 60px rgba(129,26,26,0.35); }
      .wj-ticket-icon { position: relative; width: 60px; height: 60px; border-radius: 50%; display: grid; place-items: center; margin-bottom: 30px; color: #F5EFEB; background: linear-gradient(135deg, #811A1A, #A52222); }
      @keyframes wj-pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }
      .wj-ticket-icon::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 2px solid #A52222; animation: wj-pulse 2.4s ease-out infinite; }
      .wj-ticket-no { position: absolute; top: 30px; inset-inline-end: 30px; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; color: #D8B6A4; }
      .wj-ticket h3 { font-size: 22px; font-weight: 800; margin-bottom: 10px; color: #F5EFEB; }
      .wj-ticket p { font-weight: 600; line-height: 1.75; font-size: 15px; color: rgba(245,239,235,0.65); }
      .wj-btn-ghost { display: inline-flex; align-items: center; gap: 12px; padding: 16px 34px; border-radius: 999px; font-weight: 800; color: #F5EFEB; border: 1px solid rgba(216,182,164,0.5); background: rgba(255,255,255,0.05); cursor: pointer; transition: background 0.4s, transform 0.4s; }
      .wj-btn-ghost:hover { background: #811A1A; transform: translateY(-3px); }

      /* process */
      .wj-step-circle { position: relative; width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 26px; font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #F5EFEB; background: linear-gradient(135deg, #811A1A, #4A0B0B); box-shadow: 0 14px 34px rgba(129,26,26,0.35), 0 0 0 8px #F5EFEB, 0 0 0 9px rgba(129,26,26,0.25); }
      .wj-step-line { position: absolute; top: 38px; left: 12.5%; right: 12.5%; height: 2px; background: linear-gradient(90deg, #811A1A, #D8B6A4); transform-origin: 0 50%; }
      .wj-step-line-rtl { transform-origin: 100% 50%; }
      .wj-step h3 { font-size: 21px; font-weight: 800; color: #1A1818; margin-bottom: 8px; }
      .wj-step p { color: rgba(26,24,24,0.7); font-weight: 600; line-height: 1.7; font-size: 15px; }

      /* ================= CATCHERS-INSPIRED PHOTOREEL & OVERVIEW TILES ================= */
      .ca-hero-bg {
        position: absolute;
        inset: -20% -10% -20% -10%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ca-photoreel-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140%;
        height: 150%;
        transform: rotate(-9deg);
        transform-origin: 50% 50%;
      }
      .ca-photoreel-col {
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 0 1rem;
        flex-shrink: 0;
        will-change: transform;
      }
      .ca-photoreel-card {
        position: relative;
        width: 240px;
        height: 330px;
        border-radius: 1.8rem;
        overflow: hidden;
        box-shadow: 0 20px 45px rgba(26,5,5,0.18);
        border: 1px solid rgba(255,255,255,0.35);
        background: #1A1818;
        transform: translateZ(0);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
      }
      .ca-photoreel-card:hover {
        transform: scale(1.04) translateZ(0);
        box-shadow: 0 30px 60px rgba(129,26,26,0.35);
        border-color: rgba(216,182,164,0.7);
      }
      .ca-photoreel-card img, .ca-photoreel-card video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (min-width: 768px) {
        .ca-photoreel-card {
          width: 290px;
          height: 390px;
        }
        .ca-photoreel-col {
          gap: 2.5rem;
          padding: 0 1.3rem;
        }
      }
      @media (min-width: 1280px) {
        .ca-photoreel-card {
          width: 320px;
          height: 440px;
        }
        .ca-photoreel-col {
          gap: 3rem;
          padding: 0 1.5rem;
        }
      }

      /* Hero radial gradient vignette */
      .ca-hero-vignette {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: radial-gradient(circle at 50% 50%, rgba(245,239,235,0.82) 0%, rgba(245,239,235,0.65) 45%, rgba(129,26,26,0.25) 80%, rgba(26,24,24,0.7) 100%);
      }

      /* Blinking cursor */
      @keyframes ca-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      .ca-blink { animation: ca-blink 0.9s infinite; }

      /* Overview tiles grid */
      .ca-overview-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
      }
      @media (min-width: 768px) {
        .ca-overview-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
      }
      @media (min-width: 1024px) {
        .ca-overview-grid {
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }
        .ca-tile-span-4 { grid-column: span 4; }
        .ca-tile-span-5 { grid-column: span 5; }
        .ca-tile-span-7 { grid-column: span 7; }
        .ca-tile-span-8 { grid-column: span 8; }
        .ca-tile-span-12 { grid-column: span 12; }
      }

      /* Overview tile card */
      .ca-overview-card {
        position: relative;
        border-radius: 2.2rem;
        overflow: hidden;
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(255,255,255,0.85);
        box-shadow: 0 12px 35px rgba(26,5,5,0.06);
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s;
      }
      .ca-overview-card:hover {
        box-shadow: 0 25px 60px rgba(129,26,26,0.16);
      }

      @media (max-width: 767px) {
        .wj-modal { padding: 32px 22px; }
        .wj-step-line { display: none; }
        .wj-brand { font-size: 24px; padding: 6px 30px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .wj-marquee-track, .wj-spin-slow, .wj-glow, .wj-ticket-icon::after { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }
};

// --- Custom Social SVGs ---
const IconX = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.827H5.078z"/>
  </svg>
);

const IconTikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.26-1.17 4.48-2.91 5.92-1.8 1.48-4.23 2.1-6.49 1.7-2.33-.4-4.32-2.06-5.26-4.26-.88-2.07-.63-4.52.65-6.38 1.25-1.83 3.42-2.93 5.62-3.11V14.7c-1.19.12-2.35.63-3.18 1.55-.86.95-1.23 2.3-1.03 3.56.2 1.28.98 2.45 2.07 3.09 1.15.68 2.59.82 3.84.34 1.25-.47 2.21-1.52 2.62-2.8.18-.55.24-1.14.24-1.72V.02z"/>
  </svg>
);

const IconSnapchat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.127 0c-1.353 0-2.651.155-3.528.875-.86.7-1.332 1.7-1.445 2.871-.035.347-.07.74-.105 1.16-.046.56-.104 1.12-.175 1.63-.08.56-.185 1.21-.346 1.78-.186.67-.456 1.33-.933 1.8-.29.29-.646.47-1.03.55-.15.03-.303.04-.455.04C1.725 10.706.832 10.4 0 9.87c-.166-.14-.305-.32-.412-.52-.044-.08-.094-.24-.065-.43.016-.1.053-.2.11-.3.104-.18.26-.31.44-.39.294-.13.61-.16 1.01-.13.195.03.393.08.578.18.058.03.125.03.185.002.06-.03.1-.08.113-.15.013-.07-.01-.14-.063-.18-.456-.39-1.053-.61-1.68-.61C.132 8.342 0 8.622 0 8.902c0 .48.4.1.15 1.56.556.4 1.2.71 1.884.9.15.04.305.07.46.08.288.02.568-.04.825-.17.262-.13.488-.33.654-.56.188-.27.316-.58.384-.9.08-.39.127-.8.168-1.25.035-.4.067-.76.098-1.07.11-1.1.53-2 1.306-2.64.935-.78 2.3-1.08 3.8-1.08 1.5 0 2.86.3 3.692.84.774.63 1.194 1.54 1.305 2.63.03.31.063.67.098 1.07.042.45.088.86.17 1.25.07.32.196.63.385.9.16.23.388.42.646.55.253.13.53.19.81.17.158-.01.314-.04.464-.08.683-.19 1.33-.5 1.886-.9.746-.54 1.146-1.08 1.146-1.56 0-.28-.132-.56-.347-.79-.456-.4-.14-.61-1.68-.61-.053.05-.076.12-.062.19.012.07.054.12.112.15.06.03.127.03.186.002.05-.025.108-.026.16-.002.05-.025.086-.07.097-.126.012-.06-.008-.12-.054-.16z"/>
  </svg>
);

// --- Dual Language Data ---
const REAL_INFLUENCERS = [
  {
    id: "real_1",
    name: { en: "Sarah Al-Wadaani", ar: "سارة الودعاني" },
    category: { en: "Beauty & Lifestyle", ar: "جمال ولايف ستايل" },
    followers: "7.5M",
    localImage: "/images/sarah-alwadaani.jpg",
    image: "/images/sarah-alwadaani.jpg",
    links: {
      instagram: "https://www.instagram.com/sarah_wad3ani",
      tiktok: "https://www.tiktok.com/@sarah_wad3ani",
      snapchat: "https://www.snapchat.com/@sarah_wad3ani"
    }
  },
  {
    id: "real_2",
    name: { en: "Yara Alnamlah", ar: "يارا النملة" },
    category: { en: "Fashion & Beauty", ar: "أزياء وجمال" },
    followers: "1.4M",
    localImage: "/images/yara-alnamlah.jpg",
    image: "/images/yara-alnamlah.jpg",
    links: {
      instagram: "https://www.instagram.com/yaralnamlah",
      tiktok: "https://www.tiktok.com/@yaralnamlah_",
      snapchat: "https://www.snapchat.com/@yaralnamlah"
    }
  },
  {
    id: "real_3",
    name: { en: "Rima Alosta", ar: "ريما الأسطى" },
    category: { en: "Fashion & Lifestyle", ar: "أزياء ولايف ستايل" },
    followers: "2.1M",
    localImage: "/images/rima-alosta.jpg",
    image: "/images/rima-alosta.jpg",
    links: {
      instagram: "https://www.instagram.com/rima_alosta",
      tiktok: "https://www.tiktok.com/@rima.al.osta",
      snapchat: "https://www.snapchat.com/@rima_ostaa"
    }
  },
  {
    id: "real_4",
    name: { en: "Waad Al-Turki", ar: "وعد التركي" },
    category: { en: "Beauty & Makeup", ar: "جمال ومكياج" },
    followers: "3.2M",
    localImage: "/images/waad-alturki.jpg",
    image: "/images/waad-alturki.jpg",
    links: {
      instagram: "https://www.instagram.com/waadmakeupartist",
      tiktok: "https://www.tiktok.com/@waadmakeupartist11"
    }
  },
  {
    id: "real_5",
    name: { en: "Mona Sheikh", ar: "منى الشيخ" },
    category: { en: "Fashion & Lifestyle", ar: "أزياء ولايف ستايل" },
    followers: "1.8M",
    localImage: "/images/mona-sheikh.jpg",
    image: "/images/mona-sheikh.jpg",
    links: {
      instagram: "https://www.instagram.com/monashe22",
      tiktok: "https://www.tiktok.com/@monasheikh_",
      snapchat: "https://www.snapchat.com/@monashe22"
    }
  },
  {
    id: "real_6",
    name: { en: "Khaled Zaher", ar: "خالد زاهر" },
    category: { en: "Entertainment", ar: "ترفيه" },
    followers: "4.1M",
    localImage: "/images/khaled-zaher.jpg",
    image: "/images/khaled-zaher.jpg",
    links: {
      instagram: "https://www.instagram.com/khaledzaher1",
      tiktok: "https://www.tiktok.com/@khaledzaher6",
      snapchat: "https://www.snapchat.com/@khaledzaher1"
    }
  },
  {
    id: "real_7",
    name: { en: "Adwa Al Dakheel", ar: "أضوى الدخيل" },
    category: { en: "Business & Finance", ar: "أعمال ومال" },
    followers: "2.5M",
    localImage: "/images/adwa-aldakheel.jpg",
    image: "/images/adwa-aldakheel.jpg",
    links: {
      instagram: "https://www.instagram.com/the.adwa",
      tiktok: "https://www.tiktok.com/@the.adwa"
    }
  },
  {
    id: "real_8",
    name: { en: "Awjan", ar: "أوجان" },
    category: { en: "Lifestyle", ar: "لايف ستايل" },
    followers: "900K",
    localImage: "/images/awjan.jpg",
    image: "/images/awjan.jpg",
    links: {
      instagram: "https://www.instagram.com/itsawjan",
      tiktok: "https://www.tiktok.com/@itsawjan",
      snapchat: "https://www.snapchat.com/@iiitsawjan"
    }
  },
  // Additional top Middle East creators from curated reel collection
  {
    id: "real_9",
    name: { en: "Nasser Al Dossary", ar: "ناصر الدوسري" },
    category: { en: "Entertainment & Gaming", ar: "ترفيه وألعاب" },
    followers: "3.8M",
    localImage: "/images/creators/13.jpg.webp",
    image: "/images/creators/13.jpg.webp",
    links: { instagram: "#", tiktok: "#", snapchat: "#" }
  },
  {
    id: "real_10",
    name: { en: "Layan Al-Ghamdi", ar: "ليان الغامدي" },
    category: { en: "Fashion & Luxury", ar: "أزياء وفخامة" },
    followers: "1.9M",
    localImage: "/images/creators/5-2x-1.jpg.webp",
    image: "/images/creators/5-2x-1.jpg.webp",
    links: { instagram: "#", tiktok: "#" }
  },
  {
    id: "real_11",
    name: { en: "Faisal Al-Saud", ar: "فيصل آل سعود" },
    category: { en: "Tech & Lifestyle", ar: "تقنية ولايف ستايل" },
    followers: "2.7M",
    localImage: "/images/creators/7-2x-1.jpg.webp",
    image: "/images/creators/7-2x-1.jpg.webp",
    links: { instagram: "#", snapchat: "#" }
  },
  {
    id: "real_12",
    name: { en: "Rawan Abdullah", ar: "روان العبدالله" },
    category: { en: "Beauty & Wellness", ar: "جمال وصحة" },
    followers: "4.5M",
    localImage: "/images/creators/9-2x-1.jpg.webp",
    image: "/images/creators/9-2x-1.jpg.webp",
    links: { instagram: "#", tiktok: "#", snapchat: "#" }
  },
  {
    id: "real_13",
    name: { en: "Sultan Al-Harbi", ar: "سلطان الحربي" },
    category: { en: "Sports & Fitness", ar: "رياضة ولياقة" },
    followers: "1.6M",
    localImage: "/images/creators/10-2x-1.jpg.webp",
    image: "/images/creators/10-2x-1.jpg.webp",
    links: { instagram: "#", tiktok: "#" }
  },
  {
    id: "real_14",
    name: { en: "Hala Al-Otaibi", ar: "حلا العتيبي" },
    category: { en: "Fashion & Lifestyle", ar: "أزياء ولايف ستايل" },
    followers: "2.3M",
    localImage: "/images/creators/8-1.jpg.webp",
    image: "/images/creators/8-1.jpg.webp",
    links: { instagram: "#", snapchat: "#" }
  },
  {
    id: "real_15",
    name: { en: "Bader Al-Shammari", ar: "بدر الشمري" },
    category: { en: "Travel & Adventure", ar: "سياحة ومغامرات" },
    followers: "3.1M",
    localImage: "/images/creators/6-2x.jpg.webp",
    image: "/images/creators/6-2x.jpg.webp",
    links: { instagram: "#", tiktok: "#" }
  },
  {
    id: "real_16",
    name: { en: "Reem Al-Katheeri", ar: "ريم الكثيري" },
    category: { en: "Luxury Lifestyle", ar: "لايف ستايل فاخر" },
    followers: "1.7M",
    localImage: "/images/creators/1-2x-1.jpg.webp",
    image: "/images/creators/1-2x-1.jpg.webp",
    links: { instagram: "#", snapchat: "#" }
  }
];

// Curated Photoreel Columns for Hero (Catchers Agency Style)
const PHOTOREEL_COLUMNS = [
  // Column 1
  [
    { src: "/images/sarah-alwadaani.jpg", name: "Sarah Al-Wadaani", followers: "7.5M", type: "img" },
    { src: "/images/creators/542x650xcrop_1-2x-1.jpg.webp", name: "Layan", followers: "2.4M", type: "img" },
    { src: "/images/rima-alosta.jpg", name: "Rima Alosta", followers: "2.1M", type: "img" },
    { src: "/images/creators/542x650xcrop_6-2x.jpg.webp", name: "Yara", followers: "1.9M", type: "img" },
  ],
  // Column 2
  [
    { src: "/images/creators/13.jpg.webp", name: "Nasser", followers: "3.8M", type: "img" },
    { src: "/images/creators/5-2x-1.jpg.webp", name: "Reem", followers: "1.7M", type: "img" },
    { src: "/images/yara-alnamlah.jpg", name: "Yara Alnamlah", followers: "1.4M", type: "img" },
    { src: "/images/creators/542x650xcrop_2-2x-1.jpg.webp", name: "Noura", followers: "2.8M", type: "img" },
  ],
  // Column 3 (Center with Video Clip)
  [
    { src: "/images/creators/7-2x-1.jpg.webp", name: "Faisal", followers: "2.7M", type: "img" },
    { src: "/images/creators/clip-website-hero.mp4", name: "Wahjan Exclusive", followers: "Top Campaign", type: "video" },
    { src: "/images/waad-alturki.jpg", name: "Waad Al-Turki", followers: "3.2M", type: "img" },
    { src: "/images/creators/9-2x-1.jpg.webp", name: "Rawan", followers: "4.5M", type: "img" },
  ],
  // Column 4
  [
    { src: "/images/creators/10-2x-1.jpg.webp", name: "Sultan", followers: "1.6M", type: "img" },
    { src: "/images/khaled-zaher.jpg", name: "Khaled Zaher", followers: "4.1M", type: "img" },
    { src: "/images/creators/1-2x-1.jpg.webp", name: "Maha", followers: "2.2M", type: "img" },
    { src: "/images/mona-sheikh.jpg", name: "Mona Sheikh", followers: "1.8M", type: "img" },
  ],
  // Column 5
  [
    { src: "/images/creators/8-1.jpg.webp", name: "Hala", followers: "2.3M", type: "img" },
    { src: "/images/adwa-aldakheel.jpg", name: "Adwa Al Dakheel", followers: "2.5M", type: "img" },
    { src: "/images/creators/542x650xcrop_3-2x.jpg.webp", name: "Zainab", followers: "1.5M", type: "img" },
    { src: "/images/awjan.jpg", name: "Awjan", followers: "900K", type: "img" },
  ],
  // Column 6
  [
    { src: "/images/creators/542x650xcrop_4-2x-1.jpg.webp", name: "Fatima", followers: "3.1M", type: "img" },
    { src: "/images/creators/6-2x.jpg.webp", name: "Bader", followers: "3.1M", type: "img" },
    { src: "/images/creators/542x650xcrop_5-2x-1.jpg.webp", name: "Amal", followers: "2.0M", type: "img" },
    { src: "/images/creators/542x650xcrop_7-2x-1.jpg.webp", name: "Tariq", followers: "1.8M", type: "img" },
  ]
];

// --- Team Members ---
const TEAM_MEMBERS = [
  {
    id: "team_1",
    name: { en: "Mohamed Hassen", ar: "محمد حسن" },
    category: { en: "Brand Strategist", ar: "خبير استراتيجيات العلامات التجارية" },
    localImage: "/images/mohamed-hassen.jpg",
    image: "/images/mohamed-hassen.jpg",
  },
  {
    id: "team_2",
    name: { en: "Ebrahim Raafat", ar: "إبراهيم رأفت" },
    category: { en: "Growth Marketer", ar: "خبير تسويق ونمو" },
    localImage: "/images/ebrahim-raafat.jpg",
    image: "/images/ebrahim-raafat.jpg",
  },
  {
    id: "team_3",
    name: { en: "Mahmoud Wael", ar: "محمود وائل" },
    category: { en: "Ops Manager", ar: "مدير العمليات" },
    localImage: "/images/mahmoud-wael.jpg",
    image: "/images/mahmoud-wael.jpg",
  },
  {
    id: "team_4",
    name: { en: "Kareem Zaki", ar: "كريم زكي" },
    category: { en: "Business Dev", ar: "تطوير الأعمال" },
    localImage: "/images/kareem-zaki.jpg",
    image: "/images/kareem-zaki.jpg",
  },
];

const METRICS = [
  { num: 250, suffix: "K+", title: { en: "TOTAL INFLUENCERS", ar: "إجمالي المؤثرين" }, desc: { en: "From nano to mega creators—strategically matched to your goals and audience.", ar: "من صناع المحتوى الصغار إلى المشاهير—نختارهم بعناية لتناسب أهدافك وجمهورك." } },
  { num: 50, suffix: "B+", title: { en: "TOTAL FOLLOWERS", ar: "إجمالي المتابعين" }, desc: { en: "A massive collective audience across all partnered influencers, delivering unmatched reach and brand visibility.", ar: "جمهور ضخم عبر جميع المؤثرين الشركاء، مما يوفر وصولاً ورؤية للعلامة التجارية لا مثيل لهما." } },
  { num: 500, suffix: "k+", title: { en: "TOTAL CONTENT", ar: "إجمالي المحتوى" }, desc: { en: "A vast volume of high-quality content produced by our influencer network, driving awareness, engagement, and measurable campaign success.", ar: "حجم هائل من المحتوى عالي الجودة الذي تنتجه شبكتنا، مما يؤدي إلى زيادة الوعي والتفاعل." } },
  { num: 1000, suffix: "+", title: { en: "BRAND SUCCESS STORIES", ar: "قصص نجاح" }, desc: { en: "We don't just launch campaigns—we help businesses grow.", ar: "نحن لا نطلق حملات فحسب—بل نساعد الشركات على النمو والازدهار." } },
  { num: 10, suffix: "+", title: { en: "COUNTRIES. ONE PLATFORM.", ar: "دولة. منصة واحدة." }, desc: { en: "Manage multi-market activations from a single dashboard, with precision and ease.", ar: "قم بإدارة الحملات في أسواق متعددة من لوحة تحكم واحدة، بدقة وسهولة متناهية." } },
  { num: 24, suffix: "/7", title: { en: "ALWAYS ON, ALWAYS AVAILABLE", ar: "دائماً متواجدون" }, desc: { en: "Our dedicated team provides 24/7 support for seamless campaign execution and influencer coordination.", ar: "يوفر فريقنا المخصص دعماً على مدار الساعة طوال أيام الأسبوع لضمان التنفيذ بسلاسة." } }
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, { duration: 3, ease: "easeOut", onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString(); } });
      return () => controls.stop();
    }
  }, [inView, value]);
  return <span ref={ref}>0</span>;
};

// --- Wahjan Custom Logo SVG ---
const WahjanIcon = ({ className, primaryColor = "#811A1A", secondaryColor = "#D8B6A4", dotColor = "#000000" }: { className?: string, primaryColor?: string, secondaryColor?: string, dotColor?: string }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(60, 60)">
      <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill={secondaryColor} />
      <g fill={primaryColor}>
        <path d="M 8 -38 C 8 -15 15 -8 38 -8 C 20 -12 12 -20 8 -38 Z" />
        <path d="M 38 8 C 15 8 8 15 8 38 C 12 20 20 12 38 8 Z" />
        <path d="M -8 38 C -8 15 -15 8 -38 8 C -20 12 -12 20 -8 38 Z" />
        <path d="M -38 -8 C -15 -8 -8 -15 -8 -38 C -12 -20 -20 -12 -38 -8 Z" />
      </g>
      <g fill={dotColor}>
        <circle cx="0" cy="-45" r="6" />
        <circle cx="31.8" cy="-31.8" r="6" />
        <circle cx="45" cy="0" r="6" />
        <circle cx="31.8" cy="31.8" r="6" />
        <circle cx="0" cy="45" r="6" />
        <circle cx="-31.8" cy="31.8" r="6" />
        <circle cx="-45" cy="0" r="6" />
        <circle cx="-31.8" cy="-31.8" r="6" />
      </g>
    </g>
  </svg>
);

// --- Navbar Component ---
const Navbar = ({ onOpenWork, lang, toggleLang }: { onOpenWork: () => void, lang: 'en' | 'ar', toggleLang: () => void }) => {
  const navLinks = [
    { name: lang === 'en' ? 'Who We Are' : 'من نحن', href: '#about' },
    { name: lang === 'en' ? 'Services' : 'خدماتنا', href: '#services' },
    { name: lang === 'en' ? 'Network' : 'الشبكة', href: '#network' },
    { name: lang === 'en' ? 'Campaigns' : 'الحملات', href: '#campaigns' },
    { name: lang === 'en' ? 'Events' : 'الفعاليات', href: '#events' },
    { name: lang === 'en' ? 'Work' : 'أعمالنا', href: '#work', action: onOpenWork },
    { name: lang === 'en' ? 'Contact' : 'تواصل معنا', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 px-6 lg:px-12 py-4 flex items-center justify-between apple-glass-light border-b border-white/40"
    >
      <div className="flex items-center gap-4 relative z-10 flex-1">
        <a href="#" className="flex items-center gap-3">
          <div className="relative w-11 h-11 flex items-center justify-center hover:scale-105 transition-transform duration-500 drop-shadow-md">
            <WahjanIcon className="w-full h-full wj-spin-slow" primaryColor="#811A1A" secondaryColor="#D8B6A4" dotColor="#1A1818" />
          </div>
          <div className="flex flex-col justify-center items-start mt-0.5">
            <span className="text-[22px] font-bold text-[#811A1A] leading-none mb-1 drop-shadow-sm font-['Amiri']">وهجان</span>
            <span className="text-[9px] tracking-[0.35em] text-[#1A1818]/80 font-bold leading-none uppercase font-sans">WAHJAN</span>
          </div>
        </a>
      </div>
      
      {/* Centered 3D Extra Bold Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8 text-sm lg:text-base font-black text-[#811A1A] tracking-wider z-20" style={{ perspective: "1000px" }}>
        {navLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              if (link.action) {
                e.preventDefault();
                link.action();
              } else if (link.href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -2,
              textShadow: "0px 10px 20px rgba(129, 26, 26, 0.4)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="cursor-pointer inline-block transition-colors hover:text-[#4A0B0B]"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* Right Section: Language Toggle & CTA */}
      <div className="flex items-center justify-end relative z-10 flex-1 gap-4">
        <button 
          onClick={toggleLang}
          className="text-[#811A1A] font-black text-[15px] tracking-widest hover:opacity-70 transition-opacity uppercase px-3 py-1.5 rounded-full border border-[#811A1A]/20 hover:scale-105 transform duration-300"
        >
          {lang === 'en' ? 'العربية' : 'EN'}
        </button>
        <button 
          onClick={() => {
            const target = document.querySelector('#contact');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#811A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4A0B0B] transition-all shadow-md hover:shadow-lg"
        >
          <span>{lang === 'en' ? "Let's Talk" : "تواصل معنا"}</span>
          {lang === 'en' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
        </button>
      </div>
    </motion.nav>
  );
};

// --- Work Trail Overlay Component ---
const WORK_IMAGES = [
  "1511707171634-5f897ff02aa9", "1529139574466-a303027c028b", "1459749411175-04bf5292ceea",
  "1512496015851-a1c8efa44155", "1505740420928-5e560c06d30e", "1414235077428-33898ed1e829",
  "1542751371-adc38448a05e", "1517836357463-d25dfe52a8a5", "1483985988355-763728e1935b"
];

const WorkOverlay = ({ onClose, lang }: { onClose: () => void, lang: 'en' | 'ar' }) => {
  const [trail, setTrail] = useState<any[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y);
    
    if (dist > 40) {
      lastPos.current = { x: clientX, y: clientY };
      const newImg = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        src: `https://images.unsplash.com/photo-${WORK_IMAGES[imageIndex.current % WORK_IMAGES.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
        rotation: Math.random() * 40 - 20,
        scale: Math.random() * 0.4 + 0.8
      };
      imageIndex.current++;
      setTrail(prev => [...prev, newImg].slice(-120)); 
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-[30px] overflow-hidden cursor-crosshair"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className={`text-[12vw] text-white/5 mix-blend-overlay tracking-tighter whitespace-nowrap select-none ${lang === 'en' ? 'font-serif' : "font-['Amiri']"}`}>
          {lang === 'en' ? 'Our Work' : 'أعمالنا'}
        </h2>
      </div>

      <button 
        onClick={onClose}
        className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-50 w-14 h-14 rounded-full apple-glass-dark border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group shadow-2xl`}
      >
        <X size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {trail.map((img) => (
        <motion.img
          key={img.id} src={img.src}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: img.scale }} exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute w-36 h-48 md:w-56 md:h-72 object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-none z-10"
          style={{ left: img.x, top: img.y, x: "-50%", y: "-50%", rotate: img.rotation }}
        />
      ))}
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 tracking-[0.3em] text-xs uppercase font-bold pointer-events-none select-none flex flex-col items-center gap-2">
        <Sparkles size={16} />
        <span>{lang === 'en' ? 'Move mouse to reveal coverage' : 'حرك الماوس لاكتشاف التغطيات'}</span>
      </div>
    </motion.div>
  );
};

// --- CATCHERS-STYLE PARALLAX PHOTOREEL COMPONENT ---
const HeroParallaxPhotoreel = ({ scrollY }: { scrollY: any }) => {
  // Alternating scroll parallax motion for columns (like catchers.agency)
  const yColEven = useTransform(scrollY, [0, 1200], [0, 240]);
  const yColOdd = useTransform(scrollY, [0, 1200], [0, -240]);

  return (
    <div className="ca-hero-bg">
      <div className="ca-photoreel-wrap">
        {PHOTOREEL_COLUMNS.map((col, colIdx) => {
          const isEven = colIdx % 2 === 0;
          const yTransform = isEven ? yColEven : yColOdd;

          return (
            <motion.div 
              key={colIdx} 
              style={{ y: yTransform }}
              animate={{
                y: isEven ? [0, -25, 0] : [0, 25, 0]
              }}
              transition={{
                duration: 7 + colIdx * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="ca-photoreel-col"
            >
              {col.map((item, itemIdx) => (
                <div key={itemIdx} className="ca-photoreel-card group">
                  {item.type === 'video' ? (
                    <video 
                      src={item.src} 
                      autoPlay 
                      playsInline 
                      loop 
                      muted 
                      className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.name} 
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92] group-hover:brightness-100" 
                    />
                  )}
                  {/* Subtle luxury overlay on each card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />
                  
                  {/* Creator mini badge */}
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl apple-glass-dark border border-white/10 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-bold truncate">{item.name}</span>
                    <span className="text-[10px] text-[#D8B6A4] font-semibold tracking-wider">{item.followers}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// --- DYNAMIC ROTATING HEADLINE COMPONENT ---
const RotatingHeadline = ({ lang }: { lang: 'en' | 'ar' }) => {
  const wordsAr = ["حملات المؤثرين", "المشاهير", "العلامات التجارية", "المبيعات والنمو", "الأثر والمكانة"];
  const wordsEn = ["Influencer Campaigns", "Mega Creators", "Iconic Brands", "Market Growth", "Cultural Impact"];
  const words = lang === 'ar' ? wordsAr : wordsEn;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${lang}-${index}`}
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -25, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#811A1A] inline-block font-extrabold italic drop-shadow-md"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="text-[#811A1A] ca-blink font-serif font-black ml-1 mr-1">_</span>
    </div>
  );
};

// --- CATCHERS-STYLE OVERVIEW CELEBRITY TILES (WHO WE ARE) ---
const OverviewTilesSection = ({ lang }: { lang: 'en' | 'ar' }) => {
  // State for interactive flipping tiles
  const [tile1Index, setTile1Index] = useState(0);
  const [tile2Index, setTile2Index] = useState(0);

  const tile1Items = [
    { name: { ar: "سارة الودعاني", en: "Sarah Al-Wadaani" }, tag: { ar: "جمال ولايف ستايل", en: "Beauty & Lifestyle" }, followers: "7.5M", img: "/images/sarah-alwadaani.jpg" },
    { name: { ar: "يارا النملة", en: "Yara Alnamlah" }, tag: { ar: "أزياء وجمال", en: "Fashion & Beauty" }, followers: "1.4M", img: "/images/yara-alnamlah.jpg" },
    { name: { ar: "وعد التركي", en: "Waad Al-Turki" }, tag: { ar: "جمال ومكياج", en: "Beauty & Makeup" }, followers: "3.2M", img: "/images/waad-alturki.jpg" },
  ];

  const tile2Items = [
    { name: { ar: "ريما الأسطى", en: "Rima Alosta" }, tag: { ar: "أزياء وموضة", en: "Fashion & Style" }, followers: "2.1M", img: "/images/rima-alosta.jpg" },
    { name: { ar: "منى الشيخ", en: "Mona Sheikh" }, tag: { ar: "لايف ستايل", en: "Lifestyle" }, followers: "1.8M", img: "/images/mona-sheikh.jpg" },
    { name: { ar: "أضوى الدخيل", en: "Adwa Al Dakheel" }, tag: { ar: "أعمال ومال", en: "Business & Tech" }, followers: "2.5M", img: "/images/adwa-aldakheel.jpg" },
  ];

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden wj-cream">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="wj-eyebrow mb-4">{lang === 'en' ? 'Who We Are' : 'من نحن'}</span>
          <h2 className={`text-5xl md:text-6xl tracking-tight mb-6 wj-ink ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
            {lang === 'en' ? 'Where Influence Meets' : 'حيث تلتقي القوة'} <span className="italic wj-red">{lang === 'en' ? 'Real Impact.' : 'بالتأثير الحقيقي.'}</span>
          </h2>
          <p className="text-lg md:text-xl font-bold leading-relaxed wj-ink-soft">
            {lang === 'en' 
              ? "We believe that influencer marketing is the ultimate bridge between visionary brands and their audiences. Wahjan engineers strategic campaigns that turn reach into cultural moments and measurable business growth."
              : "نؤمن بأن التسويق بالمشاهير والمؤثرين هو الجسر الحقيقي لنمو العلامات التجارية في العصر الرقمي. نبتكر في وهجان استراتيجيات تحول الوصول الجماهيري إلى لحظات فارقة ونمو استثنائي للمبيعات."
            }
          </p>
        </div>

        {/* Dynamic Catchers-Style Showcase Tiles Grid */}
        <div className="ca-overview-grid">
          
          {/* Tile 1: Flip Creator Card */}
          <div className="ca-tile-span-4 ca-overview-card h-[460px] cursor-pointer group" onClick={() => setTile1Index((prev) => (prev + 1) % tile1Items.length)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tile1Index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <img 
                  src={tile1Items[tile1Index].img} 
                  alt={tile1Items[tile1Index].name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="apple-glass-dark text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Repeat size={12} className="text-[#D8B6A4]" />
                    <span>{lang === 'en' ? 'Click to flip' : 'انقر للتبديل'}</span>
                  </span>
                  <span className="apple-glass-dark text-[#D8B6A4] text-xs font-extrabold px-3 py-1.5 rounded-full border border-white/10" dir="ltr">
                    {tile1Items[tile1Index].followers}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[11px] font-bold text-[#D8B6A4] uppercase tracking-widest mb-1">
                    {tile1Items[tile1Index].tag[lang]}
                  </p>
                  <h3 className={`text-3xl font-bold ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
                    {tile1Items[tile1Index].name[lang]}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tile 2: Large Signature Brand Tile ("Passion. Precision. Results.") */}
          <div className="ca-tile-span-8 ca-overview-card h-[460px] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#4A0B0B] via-[#811A1A] to-[#2A0505] text-[#F5EFEB]">
            <WahjanIcon className="absolute -bottom-20 -right-20 w-96 h-96 opacity-10 wj-spin-slow" primaryColor="#F5EFEB" secondaryColor="#D8B6A4" dotColor="#F5EFEB" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="wj-eyebrow-dark">{lang === 'en' ? 'Wahjan Core Philosophy' : 'فلسفة وهجان'}</span>
              <div className="w-10 h-10 rounded-full apple-glass-dark border border-white/20 flex items-center justify-center text-[#D8B6A4]">
                <Sparkles size={18} />
              </div>
            </div>

            <div className="relative z-10 my-auto py-4">
              <h3 className={`text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold tracking-tight ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
                {lang === 'en' ? (
                  <>Passion.<br /><span className="text-[#D8B6A4] italic">Precision.</span><br />Results.</>
                ) : (
                  <>الشغف.<br /><span className="text-[#D8B6A4] italic">الدقة.</span><br />النتائج.</>
                )}
              </h3>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
              <p className="text-sm font-semibold text-white/70 max-w-md">
                {lang === 'en' 
                  ? "We don't match names; we align visions. Premium talent representation that commands authority."
                  : "لا نختار المؤثرين عشوائياً، بل نهندس تحالفات استراتيجية تخلق صدى استثنائياً في الأسواق."
                }
              </p>
              <a 
                href="#network" 
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#D8B6A4] transition-colors whitespace-nowrap"
              >
                <span>{lang === 'en' ? 'Explore Network' : 'استكشف الشبكة'}</span>
                {lang === 'en' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              </a>
            </div>
          </div>

          {/* Tile 3: Video Feature Card (Catchers-style Hero Clip) */}
          <div className="ca-tile-span-7 ca-overview-card h-[460px] relative overflow-hidden group">
            <video 
              src="/images/creators/clip-website-hero.mp4" 
              autoPlay 
              playsInline 
              loop 
              muted 
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="apple-glass-dark text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>{lang === 'en' ? 'Live Production' : 'إنتاج حصري'}</span>
              </span>
              <span className="apple-glass-dark text-[#D8B6A4] text-xs font-extrabold px-3 py-1.5 rounded-full border border-white/10">
                100+ Campaigns
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[11px] font-bold text-[#D8B6A4] uppercase tracking-widest mb-1">
                {lang === 'en' ? 'High-End Content Creation' : 'إنتاج محتوى استثنائي'}
              </p>
              <h3 className={`text-3xl font-bold mb-2 ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
                {lang === 'en' ? 'Visuals That Command Attention' : 'مرئيات تأسر الجماهير'}
              </h3>
              <p className="text-sm font-semibold text-white/70 max-w-lg">
                {lang === 'en'
                  ? "From bespoke studio shoots to viral TikTok rollouts, we produce native content that engages and converts."
                  : "من جلسات التصوير الحصرية حتى الفيديوهات الفيروسية، نصنع محتوى يخطف الأبصار ويحقق أرقاماً قياسية."
                }
              </p>
            </div>
          </div>

          {/* Tile 4: Second Flip Creator Card */}
          <div className="ca-tile-span-5 ca-overview-card h-[460px] cursor-pointer group" onClick={() => setTile2Index((prev) => (prev + 1) % tile2Items.length)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tile2Index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <img 
                  src={tile2Items[tile2Index].img} 
                  alt={tile2Items[tile2Index].name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="apple-glass-dark text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Repeat size={12} className="text-[#D8B6A4]" />
                    <span>{lang === 'en' ? 'Click to flip' : 'انقر للتبديل'}</span>
                  </span>
                  <span className="apple-glass-dark text-[#D8B6A4] text-xs font-extrabold px-3 py-1.5 rounded-full border border-white/10" dir="ltr">
                    {tile2Items[tile2Index].followers}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[11px] font-bold text-[#D8B6A4] uppercase tracking-widest mb-1">
                    {tile2Items[tile2Index].tag[lang]}
                  </p>
                  <h3 className={`text-3xl font-bold ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
                    {tile2Items[tile2Index].name[lang]}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

// --- DYNAMIC INFLUENCER STREAMER MARQUEE ---
const InfluencerStreamerMarquee = ({ lang }: { lang: 'en' | 'ar' }) => {
  const row1 = REAL_INFLUENCERS.slice(0, 8);
  const row2 = REAL_INFLUENCERS.slice(8, 16);

  return (
    <section className="py-16 bg-[#1A0505] text-[#F5EFEB] relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="wj-eyebrow-dark mb-1">{lang === 'en' ? 'Elite Network Stream' : 'شبكة النخبة'}</span>
          <h3 className={`text-2xl md:text-3xl text-white ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
            {lang === 'en' ? 'Powering the Gulf & Arab World' : 'صناع التأثير في الخليج والوطن العربي'}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#D8B6A4] tracking-wider uppercase">
          <Sparkles size={14} />
          <span>{lang === 'en' ? '250K+ Creators in Network' : '+250 ألف مؤثر مسجل'}</span>
        </div>
      </div>

      {/* Row 1 Moving Left */}
      <div dir="ltr" className="wj-marquee py-2 mb-4">
        <div className="wj-marquee-track">
          {[...row1, ...row1].map((inf, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 rounded-2xl apple-glass-dark border border-white/10 mx-3 hover:scale-105 transition-transform duration-300">
              <img 
                src={inf.localImage || inf.image} 
                alt={inf.name.en} 
                className="w-12 h-12 rounded-full object-cover border border-[#D8B6A4]/40" 
              />
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">{inf.name[lang]}</h4>
                  <CheckCircle2 size={13} className="text-[#D8B6A4]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <span>{inf.category[lang]}</span>
                  <span>•</span>
                  <span className="text-[#D8B6A4] font-bold" dir="ltr">{inf.followers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Moving Right */}
      <div dir="ltr" className="wj-marquee py-2">
        <div className="wj-marquee-track wj-reverse">
          {[...row2, ...row2].map((inf, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3 rounded-2xl apple-glass-dark border border-white/10 mx-3 hover:scale-105 transition-transform duration-300">
              <img 
                src={inf.localImage || inf.image} 
                alt={inf.name.en} 
                className="w-12 h-12 rounded-full object-cover border border-[#D8B6A4]/40" 
              />
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">{inf.name[lang]}</h4>
                  <CheckCircle2 size={13} className="text-[#D8B6A4]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <span>{inf.category[lang]}</span>
                  <span>•</span>
                  <span className="text-[#D8B6A4] font-bold" dir="ltr">{inf.followers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Tilt Card For Influencers ---
const TiltCard = ({ influencer, lang }: { influencer: any, lang: 'en' | 'ar' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
      className="relative w-full h-[460px] rounded-[2rem] cursor-pointer group perspective-1000"
    >
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl bg-[#1A1818] border border-white/10" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        <img
          src={influencer.localImage || influencer.image}
          alt={influencer.name[lang]}
          onError={(e) => {
            if (e.currentTarget.src !== influencer.image) {
              e.currentTarget.src = influencer.image;
            }
          }}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Details Glass Card */}
        <div className="absolute bottom-4 left-4 right-4 p-5 rounded-3xl apple-glass-dark transition-transform duration-500 group-hover:translate-y-[-5px]" style={{ transform: "translateZ(80px)" }}>
          <div className="flex justify-between items-end">
            <div className="pointer-events-none pr-2">
              <p className="text-[#D8B6A4] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">{influencer.category[lang]}</p>
              <h3 className={`text-2xl text-white font-bold tracking-wide flex items-center gap-1.5 ${lang === 'en' ? 'font-serif' : "font-['Amiri']"}`}>
                <span>{influencer.name[lang]}</span>
                <CheckCircle2 size={16} className="text-[#D8B6A4]" />
              </h3>
            </div>
            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              {influencer.links && (Object.keys(influencer.links).length > 0) && (
                <div className="flex gap-1.5">
                  {influencer.links?.instagram && (
                    <a href={influencer.links.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:bg-[#E1306C] hover:scale-110 transition-all shadow-lg z-20">
                      <Instagram size={14} />
                    </a>
                  )}
                  {influencer.links?.tiktok && (
                    <a href={influencer.links.tiktok} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:bg-[#00f2fe] hover:text-black hover:scale-110 transition-all shadow-lg z-20">
                      <IconTikTok className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {influencer.links?.snapchat && (
                    <a href={influencer.links.snapchat} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 hover:bg-[#FFFC00] hover:text-black hover:scale-110 transition-all shadow-lg z-20">
                      <IconSnapchat className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
              {influencer.followers && (
                <span className="apple-glass-dark px-3 py-1 rounded-full text-xs font-extrabold text-[#D8B6A4] border-white/15 pointer-events-none" dir="ltr">{influencer.followers}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Shared animation helpers ---
const Reveal = ({ children, delay = 0, y = 40, className = "" }: { children: React.ReactNode, delay?: number, y?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <motion.div className="wj-progress" style={{ scaleX }} />;
};

const SectionHead = ({ eyebrow, title, accent, sub, lang, dark = false, center = false }: { eyebrow: string, title: string, accent: string, sub?: string, lang: 'en' | 'ar', dark?: boolean, center?: boolean }) => (
  <Reveal className={`mb-16 md:mb-20 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className={`mb-5 ${dark ? 'wj-eyebrow-dark' : 'wj-eyebrow'}`}>{eyebrow}</span>
    <h2 className={`text-5xl md:text-6xl tracking-tight mb-6 ${dark ? 'text-white' : 'wj-ink'} ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
      {title} <span className={`italic ${dark ? 'wj-sand' : 'wj-red'}`}>{accent}</span>
    </h2>
    {sub && <p className={`text-lg leading-relaxed font-bold ${dark ? 'wj-on-dark-soft' : 'wj-ink-soft'}`}>{sub}</p>}
  </Reveal>
);

// --- Clients marquee ---
const CLIENTS = ["American Eagle", "Jon & Vinny's", "Asateer", "Archi", "Spice", "The X", "Sign", "Kufta", "McDonald's", "Domino's", "Huawei", "Pizza Hut", "KFC"];

const MarqueeRow = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => {
  const row = [...items, ...items];
  return (
    <div dir="ltr" className="wj-marquee py-2">
      <div className="wj-marquee-fade-l" />
      <div className="wj-marquee-fade-r" />
      <div className={`wj-marquee-track ${reverse ? 'wj-reverse' : ''}`}>
        {row.map((name, i) => (
          <React.Fragment key={i}>
            <span className="wj-brand">{name}</span>
            <span className="wj-brand-dot" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ClientsMarquee = ({ lang }: { lang: 'en' | 'ar' }) => (
  <section className="wj-band py-14 relative overflow-hidden">
    <Reveal>
      <p className="wj-eyebrow text-center mb-8">{lang === 'en' ? 'Brands we work with' : 'علامات تجارية نعمل معها'}</p>
    </Reveal>
    <MarqueeRow items={CLIENTS} />
    <MarqueeRow items={[...CLIENTS].reverse()} reverse />
  </section>
);

// --- Services ---
const SERVICES = [
  { icon: <Megaphone size={28} strokeWidth={1.6} />, title: { en: "Influencer Campaigns", ar: "حملات المؤثرين" }, desc: { en: "End-to-end campaigns from strategy and creator matching to launch and reporting.", ar: "حملات متكاملة من الاستراتيجية واختيار المؤثرين حتى الإطلاق والتقارير." } },
  { icon: <Users size={28} strokeWidth={1.6} />, title: { en: "Talent Management", ar: "إدارة المواهب" }, desc: { en: "Contracts, deals and long-term career growth for the creators we represent.", ar: "عقود وصفقات ونمو مهني طويل المدى لصناع المحتوى الذين نمثلهم." } },
  { icon: <Clapperboard size={28} strokeWidth={1.6} />, title: { en: "Content Production", ar: "إنتاج المحتوى" }, desc: { en: "Concepts, shoots and edits that feel native to every platform and audience.", ar: "أفكار وتصوير ومونتاج يبدو أصيلاً لكل منصة ولكل جمهور." } },
  { icon: <CalendarDays size={28} strokeWidth={1.6} />, title: { en: "Events & Activations", ar: "الفعاليات والتفعيلات" }, desc: { en: "Launches, meetups and brand experiences designed to become content.", ar: "إطلاقات ولقاءات وتجارب للعلامات مصممة لتتحول إلى محتوى." } },
  { icon: <BarChart3 size={28} strokeWidth={1.6} />, title: { en: "Strategy & Insights", ar: "الاستراتيجية والتحليلات" }, desc: { en: "Audience data and performance reporting that prove what worked.", ar: "بيانات الجمهور وتقارير الأداء التي تثبت ما نجح فعلاً." } },
  { icon: <Target size={28} strokeWidth={1.6} />, title: { en: "Social Media Management", ar: "إدارة حسابات التواصل" }, desc: { en: "Always-on channel and community management that keeps momentum going.", ar: "إدارة مستمرة للقنوات والمجتمع للحفاظ على زخم الحملة." } },
];

const ServicesSection = ({ lang }: { lang: 'en' | 'ar' }) => (
  <section id="services" className="py-32 px-6 relative overflow-hidden wj-cream">
    <WahjanIcon className="wj-watermark wj-spin-slow" primaryColor="#811A1A" secondaryColor="#D8B6A4" dotColor="#1A1818" />
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHead
        lang={lang}
        eyebrow={lang === 'en' ? 'What We Do' : 'ماذا نقدم'}
        title={lang === 'en' ? 'Everything a campaign needs,' : 'كل ما تحتاجه حملتك،'}
        accent={lang === 'en' ? 'under one roof.' : 'تحت سقف واحد.'}
        sub={lang === 'en' ? "From the first idea to the final report, one team owns the whole journey." : "من الفكرة الأولى حتى التقرير النهائي، فريق واحد يتولى الرحلة كاملة."}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {SERVICES.map((s, i) => (
          <Reveal key={i} delay={(i % 3) * 0.1}>
            <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="wj-service h-full">
              <span className="wj-service-num">0{i + 1}</span>
              <div className="wj-service-icon">{s.icon}</div>
              <h3 className="wj-service-title">{s.title[lang]}</h3>
              <p className="wj-service-desc">{s.desc[lang]}</p>
              <span className="wj-service-line" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// --- Talent tracks (mega + rising) ---
const TRACKS = [
  {
    kind: "dark", icon: <Crown size={26} strokeWidth={1.6} />,
    title: { en: "Mega Stars", ar: "نجوم الصف الأول" },
    desc: { en: "Established names with huge reach, activated through long-term partnerships.", ar: "أسماء راسخة بجمهور ضخم، نفعّلها عبر شراكات طويلة المدى." },
    points: { en: ["Long-term partnership contracts", "Large multi-market campaigns", "Priority access for premium brands"], ar: ["عقود شراكة طويلة المدى", "حملات كبرى متعددة الأسواق", "أولوية الوصول للعلامات المميزة"] },
  },
  {
    kind: "light", icon: <Rocket size={26} strokeWidth={1.6} />,
    title: { en: "Rising Stars", ar: "النجوم الصاعدة" },
    desc: { en: "Emerging creators we sign early and grow with, season after season.", ar: "صناع محتوى صاعدون نتعاقد معهم مبكراً ونكبر معهم موسماً بعد موسم." },
    points: { en: ["Contracts that grow with the creator", "Strategy, content and deal support", "Fresh voices at accessible budgets"], ar: ["عقود تنمو مع المؤثر", "دعم في الاستراتيجية والمحتوى والصفقات", "أصوات جديدة بميزانيات مناسبة"] },
  },
];

const TracksSection = ({ lang }: { lang: 'en' | 'ar' }) => (
  <section className="py-28 px-6 wj-cream relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHead
        lang={lang}
        eyebrow={lang === 'en' ? 'Talent Strategy' : 'استراتيجية المواهب'}
        title={lang === 'en' ? 'Two tracks,' : 'مساران،'}
        accent={lang === 'en' ? 'one network.' : 'شبكة واحدة.'}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRACKS.map((t, i) => (
          <Reveal key={t.kind} delay={i * 0.15} className="h-full">
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={`wj-track ${t.kind === 'dark' ? 'wj-track-dark' : 'wj-track-light'}`}>
              <div className="wj-track-icon">{t.icon}</div>
              <h3 className={lang === 'en' ? 'font-serif' : 'font-serif-ar'}>{t.title[lang]}</h3>
              <p>{t.desc[lang]}</p>
              <ul>
                {t.points[lang].map((p, k) => <li key={k}>{p}</li>)}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// --- Campaigns (with detail modal) ---
const CAMPAIGNS = [
  { id: "c1", tag: { en: "Fashion · KSA", ar: "أزياء · السعودية" }, title: { en: "Seasonal Collection Launch", ar: "إطلاق مجموعة الموسم" }, big: "5M+", bigLabel: { en: "Total reach", ar: "إجمالي الوصول" },
    goal: { en: "Introduce a new seasonal collection to a young, style-driven audience.", ar: "تعريف جمهور شاب مهتم بالموضة بمجموعة الموسم الجديدة." },
    approach: { en: "A tiered roster of fashion creators, staggered content drops and a launch-day takeover.", ar: "قائمة متدرجة من مؤثري الموضة، ودفعات محتوى متتالية، وسيطرة كاملة يوم الإطلاق." },
    stats: [{ v: "5M+", l: { en: "Reach", ar: "وصول" } }, { v: "120+", l: { en: "Posts", ar: "منشور" } }, { v: "3.2%", l: { en: "Engagement", ar: "تفاعل" } }] },
  { id: "c2", tag: { en: "Food & Beverage · GCC", ar: "مطاعم ومشروبات · الخليج" }, title: { en: "New Branch Opening", ar: "افتتاح فرع جديد" }, big: "80K", bigLabel: { en: "Store visits", ar: "زيارات المتجر" },
    goal: { en: "Drive foot traffic to a newly opened branch in its first two weeks.", ar: "جذب الزوار إلى فرع جديد خلال أول أسبوعين من افتتاحه." },
    approach: { en: "Local creators, an invite-only tasting event and location-tagged stories.", ar: "مؤثرون محليون، وفعالية تذوق بدعوات خاصة، وقصص موسومة بالموقع." },
    stats: [{ v: "80K", l: { en: "Visits", ar: "زيارات" } }, { v: "45", l: { en: "Creators", ar: "مؤثر" } }, { v: "2 wks", l: { en: "Duration", ar: "المدة" } }] },
  { id: "c3", tag: { en: "Tech · MENA", ar: "تقنية · الشرق الأوسط" }, title: { en: "Product Unboxing Wave", ar: "موجة عرض المنتج" }, big: "2.4M", bigLabel: { en: "Video views", ar: "مشاهدات الفيديو" },
    goal: { en: "Build early buzz and trust ahead of a flagship device release.", ar: "بناء ضجة مبكرة وثقة قبل إطلاق جهاز رئيسي." },
    approach: { en: "Authentic unboxings and honest first-impressions from trusted tech voices.", ar: "فتح علب أصيل وانطباعات أولى صادقة من أصوات تقنية موثوقة." },
    stats: [{ v: "2.4M", l: { en: "Views", ar: "مشاهدة" } }, { v: "30", l: { en: "Creators", ar: "مؤثر" } }, { v: "4.1%", l: { en: "Engagement", ar: "تفاعل" } }] },
  { id: "c4", tag: { en: "Beauty · KSA", ar: "جمال · السعودية" }, title: { en: "Creator Co-Created Line", ar: "مجموعة بالشراكة مع المؤثرين" }, big: "12K", bigLabel: { en: "Units sold in week one", ar: "وحدة مباعة في الأسبوع الأول" },
    goal: { en: "Launch a limited line co-created with beauty creators.", ar: "إطلاق مجموعة محدودة بالشراكة مع مؤثرات الجمال." },
    approach: { en: "Creators shaped the product, fronted the launch and drove traffic to a dedicated drop page.", ar: "شاركت المؤثرات في تصميم المنتج وقدن الإطلاق ووجّهن الزوار لصفحة مخصصة." },
    stats: [{ v: "12K", l: { en: "Units", ar: "وحدة" } }, { v: "8", l: { en: "Co-creators", ar: "شريكة" } }, { v: "1 wk", l: { en: "Sell-through", ar: "نفاد المخزون" } }] },
];

const CampaignModal = ({ campaign, lang, onClose }: { campaign: any, lang: 'en' | 'ar', onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev || 'auto'; };
  }, [onClose]);

  return (
    <motion.div className="wj-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="wj-modal" dir={lang === 'ar' ? 'rtl' : 'ltr'}
        initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="wj-modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <span className="wj-eyebrow-dark mb-4">{campaign.tag[lang]}</span>
        <h3 className={`text-4xl md:text-5xl text-white mb-10 pe-12 ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>{campaign.title[lang]}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h4>{lang === 'en' ? 'The Goal' : 'الهدف'}</h4>
            <p className="font-bold leading-relaxed" style={{ color: 'rgba(245,239,235,0.8)' }}>{campaign.goal[lang]}</p>
          </div>
          <div>
            <h4>{lang === 'en' ? 'Our Approach' : 'أسلوبنا'}</h4>
            <p className="font-bold leading-relaxed" style={{ color: 'rgba(245,239,235,0.8)' }}>{campaign.approach[lang]}</p>
          </div>
        </div>
        <h4>{lang === 'en' ? 'The Results' : 'النتائج'}</h4>
        <div className="grid grid-cols-3 gap-4 mt-3">
          {campaign.stats.map((s: any, i: number) => (
            <motion.div key={i} className="wj-stat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }}>
              <strong dir="ltr">{s.v}</strong>
              <span>{s.l[lang]}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CampaignsSection = ({ lang, onOpen }: { lang: 'en' | 'ar', onOpen: (c: any) => void }) => (
  <section id="campaigns" className="py-32 px-6 relative overflow-hidden wj-cream">
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHead
        lang={lang}
        eyebrow={lang === 'en' ? 'Case Studies' : 'قصص نجاح'}
        title={lang === 'en' ? 'Top' : 'أبرز'}
        accent={lang === 'en' ? 'Campaigns.' : 'الحملات.'}
        sub={lang === 'en' ? "Open any campaign to see the goal, the approach and the results." : "افتح أي حملة لتعرف الهدف والأسلوب والنتائج."}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {CAMPAIGNS.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 0.12} className="h-full">
            <motion.button
              type="button" onClick={() => onOpen(c)}
              whileHover={{ y: -8, scale: 1.01 }} whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`wj-campaign wj-campaign-${i % 4} w-full`}
            >
              <WahjanIcon className="wj-campaign-mark" primaryColor="#F5EFEB" secondaryColor="#D8B6A4" dotColor="#F5EFEB" />
              <div className="relative z-10">
                <span className="wj-eyebrow-dark mb-4">{c.tag[lang]}</span>
                <h3 className={`text-3xl md:text-4xl text-white ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>{c.title[lang]}</h3>
              </div>
              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <div className="wj-campaign-big" dir="ltr">{c.big}</div>
                  <div className="text-sm font-bold" style={{ color: 'rgba(245,239,235,0.65)' }}>{c.bigLabel[lang]}</div>
                </div>
                <span className="wj-campaign-cta">
                  {lang === 'en' ? 'View details' : 'التفاصيل'}
                  {lang === 'en' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                </span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// --- Events & activations ---
const EVENTS = [
  { icon: <Users size={26} strokeWidth={1.6} />, title: { en: "Creator Meetups", ar: "لقاءات المؤثرين" }, desc: { en: "Intimate gatherings where brands and creators build real relationships.", ar: "لقاءات حميمة تبني علاقات حقيقية بين العلامات والمؤثرين." } },
  { icon: <Rocket size={26} strokeWidth={1.6} />, title: { en: "Launch Nights", ar: "ليالي الإطلاق" }, desc: { en: "Product and collection launches staged to be shared the moment they happen.", ar: "إطلاق منتجات ومجموعات مصمم ليُشارَك لحظة حدوثه." } },
  { icon: <Camera size={26} strokeWidth={1.6} />, title: { en: "Brand Experiences", ar: "تجارب العلامات" }, desc: { en: "Pop-ups and immersive spaces built around a brand story.", ar: "مساحات تفاعلية وتجارب غامرة مبنية حول قصة العلامة." } },
  { icon: <Star size={26} strokeWidth={1.6} />, title: { en: "Creator Summits", ar: "قمم صناع المحتوى" }, desc: { en: "Larger gatherings that bring the community, brands and talks together.", ar: "تجمعات أكبر تضم المجتمع والعلامات والجلسات الحوارية." } },
];

const EventsSection = ({ lang }: { lang: 'en' | 'ar' }) => {
  const word = lang === 'en' ? ['EVENTS', 'ACTIVATIONS', 'EXPERIENCES'] : ['فعاليات', 'تفعيلات', 'تجارب'];
  const strip = [...word, ...word, ...word, ...word];
  return (
    <section id="events" className="py-32 relative overflow-hidden wj-dark">
      <div className="wj-glow" style={{ width: 520, height: 520, top: -120, left: -120, background: '#811A1A', opacity: 0.45 }} />
      <div className="wj-glow" style={{ width: 460, height: 460, bottom: -140, right: -100, background: '#D8B6A4', opacity: 0.18, animationDelay: '-6s' }} />
      <WahjanIcon className="wj-watermark wj-watermark-light wj-spin-slow" primaryColor="#F5EFEB" secondaryColor="#D8B6A4" dotColor="#F5EFEB" />

      <div dir="ltr" className="wj-marquee mb-24" style={{ opacity: 0.9 }}>
        <div className="wj-marquee-track" style={{ animationDuration: '60s' }}>
          {[...strip, ...strip].map((w, i) => (
            <span key={i} className="wj-outline-text">{w}<b> ✦ </b></span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHead
          dark lang={lang}
          eyebrow={lang === 'en' ? 'Events & Activations' : 'الفعاليات والتفعيلات'}
          title={lang === 'en' ? 'Moments people' : 'لحظات يتحدث'}
          accent={lang === 'en' ? 'talk about.' : 'عنها الناس.'}
          sub={lang === 'en' ? "We design real-world experiences that turn guests into storytellers." : "نصمم تجارب على أرض الواقع تحوّل الضيوف إلى رواة قصص."}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((e, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="wj-ticket">
                <span className="wj-ticket-no">0{i + 1}</span>
                <div className="wj-ticket-icon">{e.icon}</div>
                <h3 className={lang === 'en' ? 'font-serif' : 'font-serif-ar'}>{e.title[lang]}</h3>
                <p>{e.desc[lang]}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex justify-center" delay={0.1}>
          <button 
            className="wj-btn-ghost" 
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {lang === 'en' ? 'Plan an event with us' : 'خطط فعاليتك معنا'}
            {lang === 'en' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
        </Reveal>
      </div>
    </section>
  );
};

// --- Process ---
const PROCESS = [
  { title: { en: "Discover", ar: "نكتشف" }, desc: { en: "We learn your brand, audience and goals.", ar: "نفهم علامتك وجمهورك وأهدافك." } },
  { title: { en: "Match", ar: "نختار" }, desc: { en: "We shortlist the creators who fit your story.", ar: "نرشّح المؤثرين الأنسب لقصتك." } },
  { title: { en: "Activate", ar: "ننفّذ" }, desc: { en: "Content, events and launch — run end to end.", ar: "محتوى وفعاليات وإطلاق — ننفذها من الألف إلى الياء." } },
  { title: { en: "Measure", ar: "نقيس" }, desc: { en: "Clear reporting on reach, engagement and impact.", ar: "تقارير واضحة عن الوصول والتفاعل والأثر." } },
];

const ProcessSection = ({ lang }: { lang: 'en' | 'ar' }) => (
  <section className="py-28 px-6 wj-cream relative overflow-hidden" style={{ borderTop: '1px solid rgba(129,26,26,0.1)' }}>
    <div className="max-w-6xl mx-auto relative z-10">
      <SectionHead center lang={lang}
        eyebrow={lang === 'en' ? 'How It Works' : 'كيف نعمل'}
        title={lang === 'en' ? 'From idea to' : 'من الفكرة إلى'}
        accent={lang === 'en' ? 'impact.' : 'الأثر.'}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
        <motion.div
          className={`wj-step-line ${lang === 'ar' ? 'wj-step-line-rtl' : ''}`}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {PROCESS.map((s, i) => (
          <Reveal key={i} delay={0.15 + i * 0.18} className="wj-step text-center relative z-10">
            <motion.div whileHover={{ scale: 1.1, rotate: 6 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="wj-step-circle">0{i + 1}</motion.div>
            <h3 className={lang === 'en' ? 'font-serif' : 'font-serif-ar'}>{s.title[lang]}</h3>
            <p>{s.desc[lang]}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN APPLICATION COMPONENT ---
export default function WahjanAgency() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState<any>(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    injectStyles();
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  // Filter influencers for Network section
  const categories = useMemo(() => [
    { id: 'all', en: 'All Roster', ar: 'كل النخبة' },
    { id: 'fashion', en: 'Fashion & Style', ar: 'أزياء وموضة' },
    { id: 'beauty', en: 'Beauty & Makeup', ar: 'جمال ومكياج' },
    { id: 'lifestyle', en: 'Lifestyle & Travel', ar: 'لايف ستايل وسياحة' },
    { id: 'tech', en: 'Business & Tech', ar: 'أعمال وتقنية' },
  ], []);

  const filteredInfluencers = useMemo(() => {
    if (selectedCategory === 'all') return REAL_INFLUENCERS;
    if (selectedCategory === 'fashion') return REAL_INFLUENCERS.filter(i => i.category.en.toLowerCase().includes('fashion'));
    if (selectedCategory === 'beauty') return REAL_INFLUENCERS.filter(i => i.category.en.toLowerCase().includes('beauty'));
    if (selectedCategory === 'lifestyle') return REAL_INFLUENCERS.filter(i => i.category.en.toLowerCase().includes('lifestyle') || i.category.en.toLowerCase().includes('travel'));
    if (selectedCategory === 'tech') return REAL_INFLUENCERS.filter(i => i.category.en.toLowerCase().includes('business') || i.category.en.toLowerCase().includes('tech'));
    return REAL_INFLUENCERS;
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen ${lang === 'en' ? 'lang-en' : 'lang-ar'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <ScrollProgress />
      
      <AnimatePresence>
        {isWorkOpen && <WorkOverlay onClose={() => setIsWorkOpen(false)} lang={lang} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {activeCampaign && <CampaignModal campaign={activeCampaign} lang={lang} onClose={() => setActiveCampaign(null)} />}
      </AnimatePresence>

      <Navbar onOpenWork={() => setIsWorkOpen(true)} lang={lang} toggleLang={toggleLang} />

      {/* ========================================================================= */}
      {/* --- HERO SECTION WITH CATCHERS-INSPIRED MULTI-COLUMN PARALLAX PHOTOREEL --- */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-[#F5EFEB]">
        
        {/* The Wall of Celebrity Photos (Catchers Parallax Photoreel) */}
        <HeroParallaxPhotoreel scrollY={scrollY} />

        {/* Luxury Vignette & Radial Masking with Wahjan Colors */}
        <div className="ca-hero-vignette" />

        {/* Centerpiece Content Box (Crystal Clear Glass & Contrast) */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full apple-glass-light text-[#811A1A] text-xs font-black tracking-[0.2em] uppercase mb-8 shadow-xl border border-[#811A1A]/20 bg-white/70 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#811A1A]" />
            <span>{lang === 'en' ? 'Middle East Premier Celebrity & Influencer Agency' : 'وكالة تسويق المشاهير والمؤثرين الرائدة في الشرق الأوسط'}</span>
          </motion.div>

          {/* Catchers-style Dynamic Headline with Rotating Words */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35, duration: 0.9 }} 
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-[92px] tracking-tight leading-[1.08] text-[#1A1818] mb-8 drop-shadow-xl ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}
          >
            {lang === 'en' ? (
              <>
                We Ignite <br />
                <RotatingHeadline lang={lang} />
              </>
            ) : (
              <>
                نشعل أكبر <br />
                <RotatingHeadline lang={lang} />
              </>
            )}
          </motion.h1>

          {/* Agency Mission Statement */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.55 }} 
            className="text-lg md:text-2xl text-[#1A1818]/85 max-w-3xl mx-auto mb-12 leading-relaxed font-bold tracking-wide drop-shadow-sm"
          >
            {lang === 'en' 
              ? "Wahjan connects visionary brands with the Arab world's most iconic celebrities and creators, engineering high-impact campaigns that dominate culture and ignite sales."
              : "وهجان هي المحطة التي تلتقي فيها كبرى العلامات التجارية بألمع المشاهير وأقوى صناع المحتوى في الوطن العربي—نهندس حملات استثنائية تصنع الحدث وتضاعف المبيعات."
            }
          </motion.p>

          {/* Quick CTA Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <button
              onClick={() => {
                const target = document.querySelector('#about');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-[#811A1A] text-white text-sm md:text-base font-bold shadow-[0_12px_32px_rgba(129,26,26,0.35)] hover:bg-[#4A0B0B] hover:scale-105 transition-all flex items-center gap-3 group"
            >
              <span>{lang === 'en' ? 'Discover Our Creators' : 'اكتشف مشاهيرنا'}</span>
              {lang === 'en' ? <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" /> : <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform" />}
            </button>

            <button
              onClick={() => {
                const target = document.querySelector('#contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full apple-glass-light border border-[#811A1A]/30 text-[#811A1A] text-sm md:text-base font-bold shadow-md hover:bg-white transition-all flex items-center gap-2"
            >
              <span>{lang === 'en' ? 'Start a Campaign' : 'أطلق حملتك معنا'}</span>
            </button>
          </motion.div>

        </div>

        {/* Circular Catchers-style Scroll Down Indicator */}
        <motion.div 
          onClick={() => {
            const target = document.querySelector('#about');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.15 }}
          className="absolute bottom-6 flex flex-col items-center gap-2 cursor-pointer z-10"
        >
          <div className="w-10 h-10 rounded-full apple-glass-light border border-[#811A1A]/20 flex items-center justify-center text-[#811A1A] shadow-lg animate-bounce">
            <ChevronDown size={20} />
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#811A1A]/70 uppercase">
            {lang === 'en' ? 'Scroll' : 'تمرير'}
          </span>
        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* --- CATCHERS-STYLE OVERVIEW SHOWCASE TILES ("WHO WE ARE" / "من نحن") --- */}
      {/* ========================================================================= */}
      <OverviewTilesSection lang={lang} />

      {/* ========================================================================= */}
      {/* --- INFLUENCER STREAMER MARQUEE (RIBBON OF CREATORS) --- */}
      {/* ========================================================================= */}
      <InfluencerStreamerMarquee lang={lang} />

      {/* Brands We Work With Marquee */}
      <ClientsMarquee lang={lang} />

      {/* Comprehensive Services */}
      <ServicesSection lang={lang} />

      {/* ========================================================================= */}
      {/* --- ROSTER / NETWORK SECTION (EXCLUSIVE TALENT GRID) --- */}
      {/* ========================================================================= */}
      <section id="network" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F5EFEB] z-0 pointer-events-none"></div>
        <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-[#811A1A] rounded-full blur-[120px] opacity-15 pointer-events-none z-0" />
        <motion.div animate={{ x: [0, -40, 0], y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-white rounded-full blur-[150px] opacity-90 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl text-[#1A1818]">
              <span className="text-[#811A1A] font-bold tracking-[0.2em] uppercase text-xs mb-4 block drop-shadow-sm">
                {lang === 'en' ? 'Exclusive Roster' : 'قائمة المشاهير الحصرية'}
              </span>
              <h2 className={`text-5xl md:text-7xl mb-6 tracking-tight ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
                {lang === 'en' ? 'The Wahjan ' : 'شبكة مشاهير '} 
                <span className="italic text-[#811A1A] drop-shadow-md">{lang === 'en' ? 'Network.' : 'وهجان.'}</span>
              </h2>
              <p className="text-[#1A1818]/80 text-lg leading-relaxed font-bold tracking-wide">
                {lang === 'en' 
                  ? "We exclusively represent the Arab world's most powerful creators. Personalities capable of shifting market trends with a single post." 
                  : "نحن نمثل حصرياً أقوى صناع المحتوى والمشاهير في الوطن العربي—شخصيات قادرة على تحريك الأسواق وتوجيه الرأي العام بمنشور واحد."
                }
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#811A1A] text-white shadow-md'
                      : 'apple-glass-light text-[#1A1818]/70 hover:text-[#811A1A] hover:bg-white'
                  }`}
                >
                  {cat[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredInfluencers.slice(0, visibleCount).map((influencer) => (
              <TiltCard key={influencer.id} influencer={influencer} lang={lang} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredInfluencers.length && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-8 py-3.5 rounded-full apple-glass-light border border-[#811A1A]/30 text-[#811A1A] font-bold text-sm hover:bg-[#811A1A] hover:text-white transition-all shadow-md"
              >
                {lang === 'en' ? 'Show More Creators' : 'عرض المزيد من المشاهير'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Talent Strategy Tracks */}
      <TracksSection lang={lang} />

      {/* ========================================================================= */}
      {/* --- METRICS & IMPACT SECTION --- */}
      {/* ========================================================================= */}
      <section id="impact" className="py-32 px-6 relative overflow-hidden border-t border-black/20">
        <div className="absolute inset-0 bg-[#2A0000] z-0 pointer-events-none"></div>
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#000000] rounded-full blur-[150px] opacity-60 pointer-events-none z-0" />
        <motion.div animate={{ x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D8B6A4] rounded-full blur-[200px] opacity-30 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#630000]/70 to-[#630000]/90 backdrop-blur-[60px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] z-0 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#D8B6A4] font-bold tracking-[0.2em] uppercase text-xs mb-4 block drop-shadow-md">
              {lang === 'en' ? 'Confident & Global' : 'ثقة وعالمية'}
            </span>
            <h2 className={`text-5xl md:text-6xl text-white tracking-tight ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
              {lang === 'en' ? 'The ' : ''} 
              <span className="italic text-[#D8B6A4] drop-shadow-lg">{lang === 'en' ? 'Impact' : 'تأثيرنا'}</span>
              {lang === 'en' ? ' in Numbers.' : ' بالأرقام.'}
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:gap-16">
            {METRICS.map((metric, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50, rotateX: -10 }} 
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", stiffness: 50 }} 
                className={`flex flex-col ${lang === 'en' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-6 md:gap-16 group perspective-1000`}
              >
                <div className={`w-full md:w-5/12 flex justify-center ${lang === 'en' ? 'md:justify-end' : 'md:justify-start'} items-center`} style={{ transformStyle: "preserve-3d" }}>
                  <h3 className="text-7xl md:text-8xl lg:text-[120px] font-black font-sans tracking-tighter text-outline-glass transform transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-y-12" dir="ltr">
                    <AnimatedNumber value={metric.num} /><span className="text-4xl md:text-5xl lg:text-7xl align-top ml-1">{metric.suffix}</span>
                  </h3>
                </div>
                <div className={`w-full md:w-7/12 text-center ${lang === 'en' ? 'md:text-left' : 'md:text-right'} apple-glass-dark p-8 md:p-10 rounded-[2rem] border border-white/5 transition-all duration-700 group-hover:bg-white/5 group-hover:border-white/20 hover:-translate-y-2 shadow-2xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <h4 className="text-white text-xl md:text-2xl font-bold mb-3 tracking-wide">{metric.title[lang]}</h4>
                  <p className="text-white/60 text-base md:text-lg font-bold leading-relaxed">{metric.desc[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Case Studies */}
      <CampaignsSection lang={lang} onOpen={setActiveCampaign} />

      {/* Events & Activations */}
      <EventsSection lang={lang} />

      {/* Process / How It Works */}
      <ProcessSection lang={lang} />

      {/* --- OUR HEROES (TEAM MEMBERS) --- */}
      <section id="heroes" className="py-32 px-6 bg-[#F5EFEB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 flex items-center gap-4">
            <h2 className={`text-4xl md:text-5xl text-[#1A1818] tracking-tight font-semibold ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
              {lang === 'en' ? 'Our Heroes' : 'أبطالنا'}
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#811A1A] to-[#D8B6A4] rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <TiltCard key={member.id} influencer={member} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM FOOTER --- */}
      <footer id="contact" className="bg-[#0A0A0A] text-[#F5EFEB] py-24 px-6 relative overflow-hidden border-t border-black/20">
        <div className="absolute inset-0 bg-black mix-blend-overlay opacity-15"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center justify-center mb-6">
              <WahjanIcon className="w-24 h-24 mb-4 drop-shadow-2xl" primaryColor="#F5EFEB" secondaryColor="#D8B6A4" dotColor="#F5EFEB" />
              <span className="text-5xl font-bold text-[#F5EFEB] mb-2 drop-shadow-md font-['Amiri']">وهجان</span>
              <span className="text-[11px] font-semibold tracking-[0.4em] text-[#F5EFEB]/70 uppercase font-sans">WAHJAN</span>
            </div>
            <p className={`text-[#F5EFEB]/70 max-w-sm text-base tracking-wide text-center md:text-start font-bold ${lang === 'ar' && 'leading-relaxed'}`}>
              {lang === 'en' ? "The premier influencer marketing agency orchestrating the Middle East's most iconic campaigns." : "الوكالة الرائدة في التسويق عبر المشاهير والمؤثرين، نصنع أكبر الحملات الأيقونية في الشرق الأوسط."}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-8">
            <h3 className={`text-4xl md:text-5xl italic drop-shadow-md ${lang === 'en' ? 'font-serif' : 'font-serif-ar'}`}>
              {lang === 'en' ? 'Ready to ignite?' : 'جاهز للانطلاق؟'}
            </h3>
            <button className="px-10 py-5 rounded-full bg-[#811A1A] border border-white/10 text-white text-base font-semibold hover:bg-[#a52222] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(129,26,26,0.3)] group">
              {lang === 'en' ? 'Start the Conversation' : 'ابدأ المحادثة'} 
              {lang === 'en' ? <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform opacity-80" /> : <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform opacity-80" />}
            </button>
          </div>
        </div>
        <div className={`max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-bold text-white/50 tracking-wider`}>
          <p>{lang === 'en' ? '© 2026 WAHJAN Agency. All rights reserved.' : '© 2026 وكالة وهجان. جميع الحقوق محفوظة.'}</p>
          <div className="flex gap-8 uppercase tracking-[0.15em]">
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Privacy' : 'الخصوصية'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Terms' : 'الشروط'}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === 'en' ? 'Instagram' : 'إنستجرام'}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
