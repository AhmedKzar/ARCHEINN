
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './translations';
import { Language } from './types';

/** 
 * ARCHEIN Assets & Configuration
 */
const LOGO_URL = "https://image2url.com/r2/default/images/1770665485995-d2c1b3c4-c782-4d8b-ad03-b17b9aafeb0f.png";
const FOUNDER_URL = "https://image2url.com/r2/default/images/1770666345050-d6a845ef-f528-4c98-a2b5-39a5316aa080.png";

// Interactive Background Component
const BlueprintBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 45;

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)'; 
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 280) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none opacity-40"
    />
  );
};

// Scroll Reveal Wrapper
const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Reusable Components
const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-col items-center justify-center gap-1 ${className} group cursor-pointer`}>
    <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all duration-500 group-hover:scale-105">
      <img 
        src={LOGO_URL} 
        alt="ARCHEIN" 
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/200x200?text=ARCHEIN";
        }}
      />
    </div>
  </div>
);

interface CourseCardProps {
  level: string;
  title: string;
  desc: string;
  price: string;
  modules: number;
  img: string;
  isRtl: boolean;
  label: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ level, title, desc, price, modules, img, isRtl, label }) => (
  <div className="group bg-white border border-zinc-100 rounded-[30px] overflow-hidden flex flex-col hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-6">
    <div className="relative h-72 overflow-hidden bg-zinc-100">
      <img src={img} alt={title} className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-125" />
      <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-1000"></div>
      <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} bg-zinc-900 text-white text-[10px] font-black px-5 py-2 uppercase tracking-widest shadow-2xl`}>LEVEL {level}</div>
      <div className={`absolute bottom-6 ${isRtl ? 'left-6' : 'right-6'} bg-blue-600 text-white text-base font-black px-6 py-3 rounded-full shadow-2xl transform transition-transform group-hover:scale-110`}>
        {price}
      </div>
    </div>
    <div className="p-10 flex flex-col flex-grow">
      <h3 className="text-2xl font-black mb-5 uppercase tracking-tighter text-zinc-900 leading-tight">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-10 flex-grow font-light">
        {desc}
      </p>
      <div className="flex justify-between items-center pt-8 border-t border-zinc-50">
        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">{modules} {label}</span>
        <button className="w-14 h-14 rounded-full border-2 border-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-zinc-100">
          <i className={`fas ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-lg`}></i>
        </button>
      </div>
    </div>
  </div>
);

interface WorkshopCardProps {
  title: string;
  desc: string;
  img: string;
  isRtl: boolean;
  btnText: string;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ title, desc, img, isRtl, btnText }) => (
  <div className="group bg-white border border-zinc-100 rounded-[24px] overflow-hidden flex flex-col hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700">
    <div className="relative h-56 overflow-hidden bg-zinc-100">
      <img src={img} alt={title} className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent"></div>
      <div className={`absolute bottom-5 ${isRtl ? 'right-5' : 'left-5'}`}>
        <span className="text-white text-[8px] font-black px-3 py-1 bg-blue-600 uppercase tracking-[0.3em]">Workshop</span>
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-xl font-black mb-3 uppercase tracking-tighter text-zinc-900">{title}</h3>
      <p className="text-zinc-400 text-[13px] leading-relaxed mb-8 flex-grow font-light">
        {desc}
      </p>
      <button className="w-full py-4 border-2 border-zinc-100 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-zinc-900 hover:text-white hover:border-zinc-900">
        {btnText}
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  return (
    <div className={`min-h-screen bg-white text-gray-900 selection:bg-blue-100 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <BlueprintBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <Logo />
            
            <div className="hidden lg:flex items-center space-x-10 rtl:space-x-reverse">
              <a href="#courses" className="text-[9px] font-black hover:text-blue-600 transition-colors uppercase tracking-[0.3em]">{t.nav.courses}</a>
              <a href="#workshops" className="text-[9px] font-black hover:text-blue-600 transition-colors uppercase tracking-[0.3em]">{t.nav.workshops}</a>
              <a href="#gallery" className="text-[9px] font-black hover:text-blue-600 transition-colors uppercase tracking-[0.3em]">{t.nav.gallery}</a>
              <a href="#about" className="text-[9px] font-black hover:text-blue-600 transition-colors uppercase tracking-[0.3em]">{t.nav.about}</a>
              <button 
                onClick={toggleLang}
                className="text-[9px] font-black border-2 border-zinc-900 rounded-full px-5 py-2 hover:bg-zinc-900 hover:text-white transition-all uppercase tracking-widest"
              >
                {lang === 'en' ? 'عربي' : 'English'}
              </button>
            </div>
            
            <div className="flex items-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-[9px] font-black hover:bg-blue-700 transition-all uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30">
                {t.nav.join}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 lg:pt-64 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="lg:w-3/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-blue-600"></div>
              <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase">
                {t.hero.badge}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-900 leading-[0.9] mb-10 tracking-tighter">
              {t.hero.title1} <br/>
              <span className="text-blue-600">ARCHEIN</span> <br/>
              {t.hero.title2}
            </h1>
            <p className="text-xl text-zinc-500 max-w-lg mb-12 leading-relaxed font-light">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-zinc-900 text-white px-10 py-5 rounded-full text-xs font-black flex items-center group hover:bg-blue-600 transition-all uppercase tracking-[0.2em]">
                {t.hero.explore}
                <i className={`fas ${isRtl ? 'fa-arrow-left mr-4' : 'fa-arrow-right ml-4'} transition-transform group-hover:translate-x-3 text-base`}></i>
              </button>
              <button className="bg-white border-2 border-zinc-100 text-zinc-900 px-10 py-5 rounded-full text-xs font-black hover:border-blue-200 transition-all uppercase tracking-[0.2em]">
                {t.hero.showcase}
              </button>
            </div>
          </Reveal>
        </div>
        <div className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-1/2 h-[700px] -z-10 overflow-hidden hidden lg:block ${isRtl ? 'rounded-r-[120px]' : 'rounded-l-[120px]'} shadow-2xl shadow-blue-500/10`}>
          <Reveal className="h-full w-full" >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop" 
              alt="Modern Architectural Form" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-[20000ms] hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <Reveal>
        <section className="bg-zinc-50 py-16 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-black tracking-tighter text-zinc-900">5.2K</span>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">{t.stats.activeStudents}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter mb-2 text-zinc-900">45+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">{t.stats.studios}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter mb-2 text-zinc-900">12</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">{t.stats.mentors}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter mb-2 text-zinc-900">98%</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">{t.stats.success}</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Courses Section */}
      <section id="courses" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter text-zinc-900">{t.courses.title}</h2>
              <p className="text-xl text-zinc-400 leading-relaxed font-light">{t.courses.subtitle}</p>
            </div>
            <a href="#" className="mt-8 md:mt-0 text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase flex items-center group">
              {t.courses.viewAll} 
              <i className={`fas ${isRtl ? 'fa-arrow-left mr-3' : 'fa-arrow-right ml-3'} transition-transform group-hover:translate-x-2 text-base`}></i>
            </a>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal className="delay-100">
              <CourseCard 
                level="01" 
                title={t.courses.course1} 
                desc={t.courses.desc1} 
                price={t.courses.price1}
                modules={12} 
                img="https://images.unsplash.com/photo-1590374585152-ca0e8194c0d6?q=80&w=1287&auto=format&fit=crop"
                isRtl={isRtl}
                label={t.courses.modules}
              />
            </Reveal>
            <Reveal className="delay-200">
              <CourseCard 
                level="02" 
                title={t.courses.course2} 
                desc={t.courses.desc2} 
                price={t.courses.price2}
                modules={8} 
                img="https://images.unsplash.com/photo-1518005020410-674e225916ba?q=80&w=1328&auto=format&fit=crop"
                isRtl={isRtl}
                label={t.courses.modules}
              />
            </Reveal>
            <Reveal className="delay-300">
              <CourseCard 
                level="03" 
                title={t.courses.course3} 
                desc={t.courses.desc3} 
                price={t.courses.price3}
                modules={15} 
                img="https://images.unsplash.com/photo-1511139088636-ca013ef400b1?q=80&w=1334&auto=format&fit=crop"
                isRtl={isRtl}
                label={t.courses.modules}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-32 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-20 text-center max-w-2xl mx-auto">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter text-zinc-900">{t.workshops.title}</h2>
            <p className="text-xl text-zinc-400 leading-relaxed font-light">{t.workshops.subtitle}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <WorkshopCard title={t.workshops.maquette} desc={t.workshops.maquetteDesc} img="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1470&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
            <WorkshopCard title={t.workshops.ai} desc={t.workshops.aiDesc} img="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
            <WorkshopCard title={t.workshops.revit} desc={t.workshops.revitDesc} img="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1470&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
            <WorkshopCard title={t.workshops.d5} desc={t.workshops.d5Desc} img="https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=1376&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
            <WorkshopCard title={t.workshops.photoshop} desc={t.workshops.photoshopDesc} img="https://images.unsplash.com/photo-1561070791-26c1458c4e4d?q=80&w=1470&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
            <WorkshopCard title={t.workshops.davinci} desc={t.workshops.davinciDesc} img="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1470&auto=format&fit=crop" isRtl={isRtl} btnText={t.workshops.register} />
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <Reveal>
        <section className="bg-blue-600 py-20 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[5000ms]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
            <a 
              href="https://t.me/ARCHNEST1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-16 py-7 rounded-full font-black shadow-2xl flex items-center hover:scale-105 transition-all hover:bg-zinc-50 active:scale-95 text-sm uppercase tracking-widest"
            >
              <i className={`fab fa-telegram ${isRtl ? 'ml-4' : 'mr-4'} text-3xl`}></i>
              {t.cta.telegram}
            </a>
          </div>
        </section>
      </Reveal>

      {/* About Section */}
      <section id="about" className="py-40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-10 bg-blue-600"></div>
              <span className="text-blue-600 font-black text-[11px] tracking-[0.5em] uppercase">{t.about.missionBadge}</span>
              <div className="h-[1px] w-10 bg-blue-600"></div>
            </div>
            <h2 className="text-6xl font-black mb-16 uppercase tracking-tighter leading-none text-zinc-900">{t.about.title}</h2>
          </Reveal>
          
          <Reveal className="delay-200">
            <div className="p-12 md:p-20 bg-white/60 backdrop-blur-xl shadow-2xl rounded-[40px] border border-white group transition-all duration-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 transition-all duration-1000 group-hover:w-full group-hover:opacity-5 -z-10"></div>
              
              <div className="flex flex-col items-center mb-12">
                <div className="relative w-48 h-48 mb-10">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"></div>
                  <img 
                    src={FOUNDER_URL} 
                    alt="Founder Ahmed Kzar" 
                    className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute -bottom-2 ${isRtl ? '-left-2' : '-right-2'} bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-xl border-4 border-white`}>
                    <i className="fas fa-quote-right text-base"></i>
                  </div>
                </div>
                <p className="text-3xl text-zinc-800 leading-[1.3] font-light italic tracking-tight max-w-2xl mx-auto">
                  "{t.about.bio}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 border-t border-zinc-100/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
                     <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{t.about.location}</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
                     <i className="fas fa-envelope"></i>
                  </div>
                  <a href="mailto:ahmedkzartuma@gmail.com" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-colors">Inquiry</a>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
                     <i className="fab fa-whatsapp"></i>
                  </div>
                  <a href="https://wa.me/9647867418843" target="_blank" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-colors">WhatsApp</a>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
                     <i className="fab fa-instagram"></i>
                  </div>
                  <a href="https://www.instagram.com/p.ahmedkzar/" target="_blank" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16 delay-400">
            <h4 className="text-4xl font-black mb-8 tracking-tighter uppercase text-zinc-900">{t.about.founderName}</h4>
            <div className="flex items-center justify-center opacity-30 grayscale scale-75">
              <Logo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-zinc-950 py-32 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-5xl font-black mb-8 leading-[1] tracking-tighter">
                {t.cta.title}
              </h2>
              <p className="text-zinc-500 mb-12 text-xl max-w-md font-light">
                {t.cta.description}
              </p>
              <form className="flex max-w-lg" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={t.cta.placeholder}
                  className="flex-grow bg-zinc-900 border-none px-8 py-5 rounded-l-full focus:ring-1 focus:ring-blue-600 outline-none text-sm transition-all"
                />
                <button className="bg-blue-600 text-white px-10 py-5 rounded-r-full font-black text-[10px] uppercase hover:bg-blue-700 transition-all tracking-[0.1em]">
                  {t.cta.subscribe}
                </button>
              </form>
            </Reveal>
            <div className="relative h-[450px]">
              <Reveal className="h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop" 
                  alt="Architecture Studio Environment" 
                  className="w-full h-full object-cover rounded-[40px] opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <Reveal className="col-span-1">
              <Logo className="scale-75 origin-left" />
              <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium mt-4">
                {t.footer.desc}
              </p>
              <div className="flex space-x-6 rtl:space-x-reverse">
                <a href="#" className="text-zinc-400 hover:text-blue-600 transition-all text-xl"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/p.ahmedkzar/" target="_blank" className="text-zinc-400 hover:text-blue-600 transition-all text-xl"><i className="fab fa-instagram"></i></a>
                <a href="https://t.me/ARCHNEST1" target="_blank" className="text-zinc-400 hover:text-blue-600 transition-all text-xl"><i className="fab fa-telegram-plane"></i></a>
              </div>
            </Reveal>
            
            <Reveal className="delay-100">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-zinc-300">{t.footer.foundation}</h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.1em]">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Academic Curriculum</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Grant Programs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Studio Access</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Design Lab</a></li>
              </ul>
            </Reveal>
            
            <Reveal className="delay-200">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-zinc-300">{t.footer.resources}</h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.1em]">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Student Showcase</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Digital Library</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Alumni</a></li>
              </ul>
            </Reveal>

            <Reveal className="delay-300">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-zinc-300">{t.footer.contact}</h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.1em] text-zinc-500">
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt mt-1 text-blue-600"></i>
                  <span>Baghdad, Al-Harthia, IQ</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone text-blue-600"></i>
                  <a href="tel:+9647867418843" className="hover:text-blue-600 transition-colors">+964 786 741 8843</a>
                </li>
              </ul>
            </Reveal>
          </div>
          
          <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-zinc-400 tracking-[0.4em] uppercase gap-6">
            <p>{t.footer.rights}</p>
            <div className="flex space-x-12 rtl:space-x-reverse">
              <a href="#" className="hover:text-zinc-900 transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
