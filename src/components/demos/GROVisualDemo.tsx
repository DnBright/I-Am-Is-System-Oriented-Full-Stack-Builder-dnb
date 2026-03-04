'use client';

import { useEffect, useRef } from 'react';

const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gro Visual — Studio Desain Kreatif</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --black: #ffffff;
  --white: #09090d;
  --accent: #1a3bcc;
  --accent-light: #3554e8;
  --gray: #f9fafc;
  --gray2: #ffffff;
  --mid: #e1e4eb;
  --dim: #5c5c6e;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 400; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

nav { position: relative; top: 0; left: 0; transform: none; width: 100%; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 14px 40px; background: rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
.logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px; color: var(--white); text-decoration: none; display: flex; align-items: center; gap: 10px; }
.logo-mark { width: 28px; height: 28px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff; font-family: 'Bebas Neue', sans-serif; clip-path: polygon(0 0, 100% 0, 100% 100%, 18% 100%); }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a { color: var(--dim); text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; transition: color 0.3s; }
.nav-links a:hover { color: var(--white); }
.nav-cta { padding: 10px 24px; background: var(--accent); color: #fff; text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; border-radius: 50px; }
.nav-cta:hover { background: var(--accent-light); }

.hero { min-height: 90vh; display: grid; grid-template-columns: 1.1fr 0.9fr; align-items: center; }
.hero-left { display: flex; flex-direction: column; justify-content: center; padding: 60px 60px; }
.hero-tag { font-size: 11px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
.hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 8vw, 110px); line-height: 0.92; letter-spacing: -2px; color: var(--white); }
.hero-title span { color: var(--accent-light); display: block; }
.hero-desc { margin-top: 28px; font-size: 15px; line-height: 1.8; color: var(--dim); max-width: 460px; }
.hero-actions { margin-top: 40px; display: flex; gap: 24px; align-items: center; }
.btn-primary { padding: 16px 34px; background: var(--accent); color: #fff; text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s; display: inline-block; border-radius: 4px; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(26,59,204,0.25); }
.btn-ghost { color: var(--dim); text-decoration: none; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; transition: color 0.3s; }
.btn-ghost:hover { color: var(--accent); }

.hero-right { position: relative; height: 100%; min-height: 480px; background: var(--gray); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero-visual { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.grid-lines { position: absolute; inset: 0; background-image: linear-gradient(var(--mid) 1px, transparent 1px), linear-gradient(90deg, var(--mid) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.3; }
.hero-logo-svg { width: 65%; max-width: 420px; filter: drop-shadow(0 30px 50px rgba(0,0,0,0.08)); animation: floatUp 8s ease-in-out infinite; }

.marquee-wrap { overflow: hidden; border-top: 1px solid var(--mid); border-bottom: 1px solid var(--mid); background: var(--white); padding: 18px 0; }
.marquee-track { display: flex; gap: 60px; animation: marquee 25s linear infinite; white-space: nowrap; width: max-content; }
.marquee-item { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: var(--black); display: flex; align-items: center; gap: 20px; }
.marquee-item .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }

section { padding: 100px 60px; }
.section-label { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; display: block; }
.section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(44px, 5.5vw, 80px); line-height: 0.95; letter-spacing: -1px; color: var(--white); }

#services { background: var(--black); }
.services-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 70px; }
.services-intro-desc { font-size: 16px; line-height: 1.8; color: var(--dim); }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.service-card { background: var(--gray2); padding: 0; border: 1px solid var(--mid); transition: all 0.4s ease; border-radius: 20px; position: relative; overflow: hidden; }
.service-card:hover { transform: translateY(-10px); border-color: var(--accent); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
.service-img-wrapper { width: 100%; height: 200px; overflow: hidden; border-radius: 16px 16px 0 0; position: relative; }
.service-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.service-card:hover .service-img-wrapper img { transform: scale(1.08); }
.service-content { padding: 36px; position: relative; z-index: 1; }
.service-num { font-family: 'Bebas Neue', sans-serif; font-size: 70px; color: var(--gray); position: absolute; top: 8px; right: 16px; line-height: 1; opacity: 0.25; }
.service-icon { font-size: 32px; margin-bottom: 20px; color: var(--accent); }
.service-name { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 1px; margin-bottom: 16px; color: var(--white); }
.service-desc { font-size: 14px; line-height: 1.7; color: var(--dim); margin-bottom: 24px; }
.service-list { list-style: none; }
.service-list li { font-size: 13px; color: var(--white); font-weight: 500; padding: 9px 0; border-bottom: 1px solid var(--mid); display: flex; align-items: center; gap: 12px; }
.service-list li::before { content: '→'; color: var(--accent); font-size: 13px; font-weight: 900; }
.service-list li:last-child { border-bottom: none; }

.about-section { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: center; padding: 100px 60px; background: var(--gray); }
.about-visual { position: relative; width: 100%; max-width: 480px; aspect-ratio: 1/1; margin: 0 auto; }
.about-box-main { position: absolute; inset: 0 40px 40px 0; background: var(--black); border: 1px solid var(--mid); overflow: hidden; border-radius: 18px; box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
.about-box-main img { width: 100%; height: 100%; object-fit: cover; }
.about-box-accent { width: 200px; height: 170px; bottom: 0; right: 0; background: var(--accent); display: flex; align-items: center; justify-content: center; flex-direction: column; position: absolute; border-radius: 18px; box-shadow: 0 20px 40px rgba(26,59,204,0.3); }
.accent-box-num { font-family: 'Bebas Neue', sans-serif; font-size: 60px; color: #fff; line-height: 1; }
.accent-box-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.7); font-weight: 600; }
.about-desc { font-size: 16px; line-height: 1.85; color: var(--dim); margin-top: 28px; }
.about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 36px; }
.value-item { padding: 22px; background: var(--black); border: 1px solid var(--mid); border-radius: 12px; transition: all 0.3s; }
.value-item:hover { border-color: var(--accent); }
.value-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; margin-bottom: 8px; color: var(--white); }
.value-desc { font-size: 13px; line-height: 1.6; color: var(--dim); }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; padding-top: 40px; border-top: 1px solid var(--mid); }
.stat-card { background: var(--black); padding: 28px 20px; border-radius: 14px; text-align: center; border: 1px solid var(--mid); transition: all 0.3s; }
.stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: var(--accent); line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--dim); font-weight: 700; }

.portfolio-section { background: var(--black); overflow: hidden; padding-bottom: 140px; }
.portfolio-container { display: flex; flex-direction: column; gap: 18px; margin-top: 70px; }
.marquee-row { display: flex; gap: 18px; width: max-content; }
.marquee-row.forward { animation: marquee-horiz 50s linear infinite; }
.marquee-row.backward { animation: marquee-horiz-rev 50s linear infinite; }
.portfolio-item { width: 150px; height: 150px; flex-shrink: 0; background: var(--gray); border: 1px solid var(--mid); border-radius: 18px; display: flex; align-items: center; justify-content: center; padding: 20px; transition: all 0.4s; font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--accent); letter-spacing: 1px; }
.portfolio-item:hover { background: #fff; border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.05); }

.why-section { background: var(--black); }
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 70px; }
.why-card { padding: 36px; background: var(--gray2); border-radius: 22px; border: 1px solid var(--mid); transition: all 0.5s; position: relative; overflow: hidden; min-height: 300px; display: flex; flex-direction: column; justify-content: flex-end; }
.why-card-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: all 0.7s; z-index: 1; }
.why-card-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,13,0.2) 0%, rgba(9,9,13,0.95) 100%); opacity: 0; transition: all 0.5s; z-index: 2; }
.why-card:hover { transform: translateY(-12px); border-color: var(--accent); box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
.why-card:hover .why-card-img { opacity: 0.3; transform: scale(1.12); }
.why-card:hover .why-card-overlay { opacity: 1; }
.why-icon { font-size: 30px; color: var(--accent); margin-bottom: 22px; position: relative; z-index: 3; transition: all 0.4s; }
.why-card:hover .why-icon { transform: translateY(-8px) scale(1.1); color: #fff; }
.why-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; margin-bottom: 14px; color: var(--white); position: relative; z-index: 3; }
.why-desc { font-size: 13px; line-height: 1.8; color: var(--dim); position: relative; z-index: 3; transition: color 0.4s; }
.why-card:hover .why-desc { color: #fff; }

.process-section { background: var(--gray); }
.process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 70px; background: var(--mid); padding: 2px; border-radius: 22px; overflow: hidden; }
.process-step { padding: 50px 36px; background: var(--black); transition: all 0.4s; }
.process-step:hover { background: var(--gray2); }
.step-num { font-family: 'Bebas Neue', sans-serif; font-size: 72px; color: var(--mid); line-height: 1; margin-bottom: 18px; opacity: 0.5; }
.step-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; margin-bottom: 12px; color: var(--white); }
.step-desc { font-size: 13px; line-height: 1.8; color: var(--dim); }

.target-section { background: var(--black); }
.target-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 70px; }
.target-intro-desc { font-size: 15px; line-height: 1.8; color: var(--dim); }
.target-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.target-card { padding: 32px; background: var(--gray); border-radius: 18px; border: 1px solid transparent; transition: all 0.3s; text-align: center; }
.target-card:hover { transform: translateY(-5px); border-color: var(--accent); background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
.target-icon { font-size: 30px; margin-bottom: 18px; display: block; }
.target-name { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 12px; color: var(--white); }
.target-desc { font-size: 13px; line-height: 1.7; color: var(--dim); }

.testi-section { background: var(--gray); }
.testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 70px; }
.testi-card { padding: 40px; background: var(--black); border-radius: 22px; border: 1px solid var(--mid); }
.testi-stars { color: var(--accent); font-size: 13px; margin-bottom: 22px; letter-spacing: 2px; }
.testi-quote { font-size: 14px; line-height: 1.8; color: var(--white); font-style: italic; margin-bottom: 28px; }
.testi-divider { width: 40px; height: 3px; background: var(--accent); margin-bottom: 18px; }
.testi-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; color: var(--white); }
.testi-role { font-size: 11px; color: var(--dim); letter-spacing: 1px; text-transform: uppercase; margin-top: 5px; font-weight: 600; }

.cta-section { background: var(--accent); padding: 90px 60px; display: flex; justify-content: space-between; align-items: center; gap: 60px; position: relative; overflow: hidden; border-radius: 36px; margin: 0 60px 90px; }
.cta-section::before { content: 'GRO'; position: absolute; right: -20px; top: -40px; font-family: 'Bebas Neue', sans-serif; font-size: 300px; color: rgba(255,255,255,0.07); line-height: 1; pointer-events: none; }
.cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(44px, 5.5vw, 88px); line-height: 0.95; color: #fff; letter-spacing: -1px; position: relative; z-index: 1; }
.cta-sub { font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.8; margin-top: 22px; max-width: 380px; position: relative; z-index: 1; }
.cta-right { position: relative; z-index: 1; }
.btn-dark { padding: 18px 36px; background: #09090d; color: #fff; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; display: inline-block; border-radius: 4px; transition: all 0.3s; }
.btn-dark:hover { transform: translateY(-4px); background: #111; }
.cta-contact { margin-top: 14px; font-size: 14px; color: rgba(255,255,255,0.8); }
.cta-contact a { color: #fff; text-decoration: none; font-weight: 600; }

footer { background: var(--black); border-top: 1px solid var(--mid); padding: 90px 60px 60px; display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 70px; }
.footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 4px; color: var(--white); display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
.footer-tagline { font-size: 14px; color: var(--dim); line-height: 1.8; max-width: 300px; }
.footer-col-title { font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 26px; display: block; }
.footer-links { list-style: none; }
.footer-links li { margin-bottom: 14px; }
.footer-links a { color: var(--dim); text-decoration: none; font-size: 14px; transition: all 0.3s; }
.footer-links a:hover { color: var(--accent); padding-left: 5px; }
.footer-bottom { border-top: 1px solid var(--mid); padding: 26px 60px; display: flex; justify-content: space-between; align-items: center; background: var(--black); }
.footer-copy { font-size: 12px; color: var(--dim); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes floatUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
@keyframes marquee-horiz { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 9px)); } }
@keyframes marquee-horiz-rev { 0% { transform: translateX(calc(-50% - 9px)); } 100% { transform: translateX(0); } }
</style>
</head>
<body>

<nav>
  <a href="#" class="logo">
    <div class="logo-mark">G</div>
    GRO VISUAL
  </a>
  <ul class="nav-links">
    <li><a href="#services">Layanan</a></li>
    <li><a href="#about">Tentang</a></li>
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#why">Keunggulan</a></li>
    <li><a href="#contact">Kontak</a></li>
  </ul>
  <a href="#contact" class="nav-cta">Mulai Proyek</a>
</nav>

<section class="hero">
  <div class="hero-left">
    <p class="hero-tag">Studio Desain Kreatif — Yogyakarta</p>
    <h1 class="hero-title">Bangun<br><span>Kuat.</span><br>Tumbuh<br>Lebih Jauh.</h1>
    <p class="hero-desc">Gro Visual membantu bisnis membangun identitas visual yang kuat, modern, dan profesional — dari desain grafis, branding logo, hingga pengelolaan media sosial.</p>
    <div class="hero-actions">
      <a href="#contact" class="btn-primary">Konsultasi Gratis</a>
      <a href="#services" class="btn-ghost">Lihat Layanan ↓</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-visual">
      <div class="grid-lines"></div>
      <svg class="hero-logo-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <polygon points="60,360 360,40 360,360" fill="#0d0d12" stroke="rgba(26,59,204,0.12)" stroke-width="1"/>
        <polygon points="80,340 340,62 340,340" fill="#111118"/>
        <polygon points="252,98 338,62 338,148 288,148" fill="#09090d"/>
        <polygon points="255,101 336,65 336,145 290,145" fill="none" stroke="#3554e8" stroke-width="1.5"/>
        <polygon points="145,218 338,158 338,244 145,244" fill="#09090d"/>
        <polygon points="148,221 336,161 336,241 148,241" fill="none" stroke="#3554e8" stroke-width="1.5"/>
        <polygon points="80,290 338,262 338,340 80,340" fill="#09090d"/>
        <polygon points="83,293 336,265 336,337 83,337" fill="none" stroke="#3554e8" stroke-width="1.5"/>
      </svg>
    </div>
  </div>
</section>

<div class="marquee-wrap">
  <div class="marquee-track">
    <div class="marquee-item"><span class="dot"></span> Desain Grafis</div>
    <div class="marquee-item"><span class="dot"></span> Branding Logo</div>
    <div class="marquee-item"><span class="dot"></span> Manajemen Media Sosial</div>
    <div class="marquee-item"><span class="dot"></span> Identitas Visual</div>
    <div class="marquee-item"><span class="dot"></span> Strategi Brand</div>
    <div class="marquee-item"><span class="dot"></span> Pertumbuhan Digital</div>
    <div class="marquee-item"><span class="dot"></span> Desain Grafis</div>
    <div class="marquee-item"><span class="dot"></span> Branding Logo</div>
    <div class="marquee-item"><span class="dot"></span> Manajemen Media Sosial</div>
    <div class="marquee-item"><span class="dot"></span> Identitas Visual</div>
    <div class="marquee-item"><span class="dot"></span> Strategi Brand</div>
    <div class="marquee-item"><span class="dot"></span> Pertumbuhan Digital</div>
  </div>
</div>

<section id="services">
  <div class="services-intro">
    <div>
      <span class="section-label">Apa yang Kami Lakukan</span>
      <h2 class="section-title">Layanan<br>Unggulan</h2>
    </div>
    <p class="services-intro-desc">Kami menyediakan tiga layanan inti yang saling melengkapi untuk membangun brand Anda dari nol hingga siap bersaing di era digital — dengan pendekatan strategis, bukan sekadar estetis.</p>
  </div>
  <div class="services-grid">
    <div class="service-card">
      <div class="service-img-wrapper">
        <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80" alt="Desain Grafis">
      </div>
      <div class="service-content">
        <span class="service-num">01</span>
        <div class="service-icon">✦</div>
        <h3 class="service-name">Desain Grafis</h3>
        <p class="service-desc">Desain visual yang tegas, berkarakter, dan mampu berkomunikasi langsung dengan target audiens Anda.</p>
        <ul class="service-list">
          <li>Poster & Flyer Promosi</li>
          <li>Desain Konten Digital</li>
          <li>Banner & Iklan Visual</li>
          <li>Kemasan & Label Produk</li>
        </ul>
      </div>
    </div>
    <div class="service-card">
      <div class="service-img-wrapper">
        <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80" alt="Branding Logo">
      </div>
      <div class="service-content">
        <span class="service-num">02</span>
        <div class="service-icon">◈</div>
        <h3 class="service-name">Logo & Branding</h3>
        <p class="service-desc">Identitas brand yang kuat dan mudah diingat. Kami membangun sistem visual yang merepresentasikan nilai bisnis Anda.</p>
        <ul class="service-list">
          <li>Desain Logo Profesional</li>
          <li>Panduan Identitas Brand</li>
          <li>Palet Warna & Tipografi</li>
          <li>Rebranding & Pembaruan</li>
        </ul>
      </div>
    </div>
    <div class="service-card">
      <div class="service-img-wrapper">
        <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80" alt="Media Sosial">
      </div>
      <div class="service-content">
        <span class="service-num">03</span>
        <div class="service-icon">⊞</div>
        <h3 class="service-name">Manajemen Media Sosial</h3>
        <p class="service-desc">Kelola kehadiran digital Anda secara strategis dengan konten visual yang konsisten dan mendorong pertumbuhan.</p>
        <ul class="service-list">
          <li>Pembuatan Konten Visual</li>
          <li>Strategi & Kalender Konten</li>
          <li>Pengelolaan Feed Instagram</li>
          <li>Caption & Penulisan Konten</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="about-section" id="about">
  <div class="about-visual">
    <div class="about-box-main">
      <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80" alt="Gro Visual Studio">
    </div>
    <div class="about-box-accent">
      <span class="accent-box-num">3+</span>
      <span class="accent-box-label">Tahun Pengalaman</span>
    </div>
  </div>
  <div>
    <span class="section-label">Tentang Kami</span>
    <h2 class="section-title">Desain yang<br>Menggerakkan<br>Bisnis</h2>
    <p class="about-desc">Gro Visual lahir dari keyakinan bahwa desain bukan sekadar estetika — ia adalah strategi. Dengan konsep minimalis, tegas, dan berkarakter, kami hadir sebagai solusi bagi UMKM, startup, hingga perusahaan yang ingin meningkatkan citra brand mereka secara berkelanjutan di era digital.</p>
    <div class="about-values">
      <div class="value-item"><div class="value-title">Strategis</div><div class="value-desc">Setiap desain dibangun berdasarkan riset dan tujuan bisnis yang nyata.</div></div>
      <div class="value-item"><div class="value-title">Berkarakter</div><div class="value-desc">Visual yang khas dan konsisten membangun kepercayaan audiens.</div></div>
      <div class="value-item"><div class="value-title">Modern</div><div class="value-desc">Mengikuti tren desain terkini namun tetap relevan jangka panjang.</div></div>
      <div class="value-item"><div class="value-title">Kolaboratif</div><div class="value-desc">Kami bekerja bersama klien, bukan hanya untuk klien.</div></div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-num">100+</div><div class="stat-label">Proyek Selesai</div></div>
      <div class="stat-card"><div class="stat-num">50+</div><div class="stat-label">Klien Puas</div></div>
      <div class="stat-card"><div class="stat-num">3+</div><div class="stat-label">Tahun Aktif</div></div>
    </div>
  </div>
</div>

<section id="portfolio" class="portfolio-section">
  <div class="services-intro">
    <div>
      <span class="section-label">Portfolio Kami</span>
      <h2 class="section-title">Logo &<br>Identitas Visual</h2>
    </div>
    <p class="services-intro-desc">Ini adalah koleksi identitas visual yang kami bangun bersama klien. Kami fokus pada desain yang bersih, fungsional, dan penuh karakter.</p>
  </div>
  <div class="portfolio-container">
    <div class="marquee-row forward">
      ${['AURA', 'NEXUS', 'VANA', 'KOTA', 'DUNA', 'MELA', 'TEKA', 'BRIO'].map(n => `<div class="portfolio-item">${n}</div>`).join('')}
      ${['AURA', 'NEXUS', 'VANA', 'KOTA', 'DUNA', 'MELA', 'TEKA', 'BRIO'].map(n => `<div class="portfolio-item">${n}</div>`).join('')}
    </div>
    <div class="marquee-row backward">
      ${['ZIPO', 'FENA', 'LUMA', 'ORBI', 'SENA', 'RIVO', 'NOVA', 'PLEX'].map(n => `<div class="portfolio-item">${n}</div>`).join('')}
      ${['ZIPO', 'FENA', 'LUMA', 'ORBI', 'SENA', 'RIVO', 'NOVA', 'PLEX'].map(n => `<div class="portfolio-item">${n}</div>`).join('')}
    </div>
  </div>
</section>

<section id="why" class="why-section">
  <span class="section-label">Mengapa Gro Visual</span>
  <h2 class="section-title">Keunggulan<br>Kami</h2>
  <div class="why-grid">
    ${[
        { icon: '◎', title: 'Pendekatan Strategis', desc: 'Setiap keputusan visual didasarkan pada pemahaman mendalam tentang brand, target pasar, dan tujuan bisnis Anda.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
        { icon: '⬡', title: 'Identitas Konsisten', desc: 'Brand yang kuat butuh visual yang konsisten di semua platform. Kami memastikan setiap elemen berbicara dalam satu bahasa visual.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80' },
        { icon: '↗', title: 'Hasil yang Terukur', desc: 'Desain yang baik berdampak nyata pada pertumbuhan bisnis. Kami berkomitmen membangun visual yang meningkatkan kepercayaan audiens.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
        { icon: '◈', title: 'Revisi Tanpa Batas', desc: 'Kepuasan Anda adalah prioritas utama. Kami menyediakan revisi hingga hasil akhir benar-benar sesuai visi Anda.', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80' },
        { icon: '✦', title: 'Proses Transparan', desc: 'Anda selalu tahu perkembangan proyek Anda. Kami menjaga komunikasi terbuka di setiap tahap pengerjaan.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
        { icon: '⊕', title: 'Dukungan Pasca Proyek', desc: 'Hubungan kami tidak berhenti saat proyek selesai. Kami siap mendampingi penerapan aset brand Anda.', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80' },
    ].map(c => `<div class="why-card"><img src="${c.img}" class="why-card-img"><div class="why-card-overlay"></div><div class="why-icon">${c.icon}</div><h3 class="why-title">${c.title}</h3><p class="why-desc">${c.desc}</p></div>`).join('')}
  </div>
</section>

<section class="process-section" id="process">
  <span class="section-label">Bagaimana Kami Bekerja</span>
  <h2 class="section-title">Proses<br>Kerja Kami</h2>
  <div class="process-steps">
    <div class="process-step"><div class="step-num">01</div><h3 class="step-name">Konsultasi & Penggalian</h3><p class="step-desc">Kami mendengarkan dan memahami bisnis Anda secara mendalam — target audiens, nilai brand, kompetitor, hingga tujuan jangka panjang.</p></div>
    <div class="process-step"><div class="step-num">02</div><h3 class="step-name">Strategi Visual</h3><p class="step-desc">Merumuskan arah visual yang tepat — palet warna, tipografi, gaya desain, dan panduan visual yang menjadi fondasi identitas brand Anda.</p></div>
    <div class="process-step"><div class="step-num">03</div><h3 class="step-name">Eksekusi & Revisi</h3><p class="step-desc">Tim desainer kami mengeksekusi dengan presisi tinggi. Anda mendapatkan revisi hingga hasilnya benar-benar sesuai visi.</p></div>
    <div class="process-step"><div class="step-num">04</div><h3 class="step-name">Serah Terima & Tumbuh</h3><p class="step-desc">File final siap pakai, panduan brand lengkap, dan pendampingan penerapan agar brand Anda konsisten di semua platform.</p></div>
  </div>
</section>

<section class="target-section" id="target">
  <div class="target-intro">
    <div>
      <span class="section-label">Yang Kami Bantu</span>
      <h2 class="section-title">Untuk Siapa<br>Gro Visual?</h2>
    </div>
    <p class="target-intro-desc">Gro Visual dirancang untuk melayani berbagai jenis bisnis yang ingin tampil lebih profesional dan tumbuh lebih cepat melalui kekuatan identitas visual yang strategis.</p>
  </div>
  <div class="target-grid">
    <div class="target-card"><div class="target-icon">🏪</div><h3 class="target-name">UMKM</h3><p class="target-desc">Usaha kecil yang ingin tampil lebih profesional dan dipercaya pelanggan melalui identitas visual yang kuat.</p></div>
    <div class="target-card"><div class="target-icon">🚀</div><h3 class="target-name">Startup</h3><p class="target-desc">Bisnis rintisan yang membutuhkan brand identity solid sejak awal untuk bersaing dan menarik perhatian investor.</p></div>
    <div class="target-card"><div class="target-icon">🏢</div><h3 class="target-name">Perusahaan</h3><p class="target-desc">Korporasi yang ingin me-refresh brand atau membutuhkan materi visual profesional untuk berbagai keperluan bisnis.</p></div>
    <div class="target-card"><div class="target-icon">👤</div><h3 class="target-name">Brand Personal</h3><p class="target-desc">Freelancer dan profesional yang ingin membangun personal brand yang berkarakter kuat dan mudah dikenal.</p></div>
  </div>
</section>

<section class="testi-section">
  <span class="section-label">Kata Klien Kami</span>
  <h2 class="section-title">Apa yang Mereka<br>Katakan</h2>
  <div class="testi-grid">
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Gro Visual benar-benar memahami apa yang kami butuhkan. Logo yang mereka buat sekarang jadi identitas brand kami yang paling dikenal pelanggan. Prosesnya cepat dan hasilnya melebihi ekspektasi."</p><div class="testi-divider"></div><div class="testi-name">Rizky Pratama</div><div class="testi-role">Pemilik — Kedai Kopi, Yogyakarta</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Konten media sosial kami jauh lebih konsisten dan profesional. Engagement naik signifikan dan brand kami terasa lebih matang di mata audiens. Sangat direkomendasikan!"</p><div class="testi-divider"></div><div class="testi-name">Anindita Sari</div><div class="testi-role">Pendiri — Merek Fashion, Solo</div></div>
    <div class="testi-card"><div class="testi-stars">★★★★★</div><p class="testi-quote">"Gro Visual membantu dari nol — logo, warna, panduan brand, hingga template konten. Hasilnya sangat memuaskan dan benar-benar worth it untuk startup kami."</p><div class="testi-divider"></div><div class="testi-name">Dimas Wicaksono</div><div class="testi-role">Co-Founder — Tech Startup, Jakarta</div></div>
  </div>
</section>

<div class="cta-section" id="contact">
  <div>
    <h2 class="cta-title">Siap Tumbuh<br>Bersama?</h2>
    <p class="cta-sub">Mulai perjalanan membangun brand yang kuat bersama Gro Visual hari ini. Konsultasi pertama gratis, tanpa komitmen.</p>
  </div>
  <div class="cta-right">
    <a href="https://wa.me/6281234567890" class="btn-dark">Hubungi Kami Sekarang</a>
    <p class="cta-contact">WhatsApp: <a href="#">+62 812-3456-7890</a></p>
    <p class="cta-contact">Email: <a href="#">hello@grovisual.id</a></p>
    <p class="cta-contact">Instagram: <a href="#">@grovisual</a></p>
  </div>
</div>

<footer>
  <div>
    <div class="footer-logo"><div class="logo-mark" style="width:36px;height:36px;font-size:20px;">G</div> GRO VISUAL</div>
    <p class="footer-tagline">Studio kreatif yang membantu bisnis tumbuh melalui identitas visual yang kuat, modern, dan profesional di era digital.</p>
  </div>
  <div>
    <span class="footer-col-title">Layanan</span>
    <ul class="footer-links">
      <li><a href="#services">Desain Grafis</a></li>
      <li><a href="#services">Logo & Branding</a></li>
      <li><a href="#services">Manajemen Media Sosial</a></li>
      <li><a href="#why">Strategi Brand</a></li>
    </ul>
  </div>
  <div>
    <span class="footer-col-title">Hubungi Kami</span>
    <ul class="footer-links">
      <li><a href="#">hello@grovisual.id</a></li>
      <li><a href="#">Instagram @grovisual</a></li>
      <li><a href="#">WhatsApp</a></li>
      <li><a href="#">Yogyakarta, Indonesia</a></li>
    </ul>
  </div>
</footer>
<div class="footer-bottom">
  <span class="footer-copy">© 2024 Gro Visual. Hak Cipta Dilindungi.</span>
  <span class="footer-copy" style="color:#3554e8;">Bangun Kuat. Tumbuh Lebih Jauh.</span>
</div>

</body>
</html>
`;

export default function GROVisualDemo() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
            doc.open();
            doc.write(htmlContent);
            doc.close();
        }
    }, []);

    return (
        <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Gro Visual Demo"
            sandbox="allow-scripts allow-same-origin"
        />
    );
}
