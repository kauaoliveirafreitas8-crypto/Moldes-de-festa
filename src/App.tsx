import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, HelpCircle, ChevronDown, ChevronUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import CheckoutModal from './components/CheckoutModal';
import DashboardSandbox from './components/DashboardSandbox';

const CAROUSEL_IMAGES = [
  'https://i.ibb.co/jvgFwPVX/baby01.jpg',
  'https://i.ibb.co/S7fYCP5h/batman02.jpg',
  'https://i.ibb.co/dwJprwR3/ben1003.jpg',
  'https://i.ibb.co/N6HnL2xJ/Bob-esponja04.jpg',
  'https://i.ibb.co/spwDxsMz/branca-de-neve05.jpg',
  'https://i.ibb.co/fLWjsBK/dragonball06.jpg',
  'https://i.ibb.co/B2T3qn7P/espa-o07.jpg',
  'https://i.ibb.co/MDP3xhGR/gatinha08.jpg',
  'https://i.ibb.co/KpmnBCHt/homem-aranha09.jpg',
  'https://i.ibb.co/1GpZ01Pj/minie10.jpg',
  'https://i.ibb.co/nNwTYSzn/moana11.jpg',
  'https://i.ibb.co/yn5b86TP/poderoso-chefinho12.jpg',
  'https://i.ibb.co/zTQpzKqv/princesa0113.jpg',
  'https://i.ibb.co/gMZqy3tt/relampado-maquin14.jpg',
  'https://i.ibb.co/7dBx5PTG/roblox15.jpg',
  'https://i.ibb.co/fzCMKqdj/ursinho-puf16.jpg'
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 44, seconds: 12 });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamically obtain current date formatted as DD/MM/YYYY
  const getTodayFormatted = () => {
    const today = new Date();
    // Default to the correct Brazilian date representation
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // Scarcity countdown ticking effect
  useEffect(() => {
    const ticker = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  const nextSlide = () => {
    setCarouselIndex(prev => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex(prev => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white antialiased flex flex-col justify-between">
      
      {/* 1. TOP BANNER: OFERTA SOMENTE HOJE */}
      <header className="bg-emerald-500 text-white py-3.5 px-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
          <p className="font-extrabold text-xs sm:text-sm md:text-base tracking-[0.03em] font-display flex items-center justify-center gap-1.5">
            <span className="animate-bounce inline-block">🔥</span>
            <span>OFERTA SOMENTE HOJE {getTodayFormatted()}</span>
          </p>
          <div className="flex items-center justify-center gap-1 bg-emerald-600/60 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>EXPIRA EM: {formatNumber(countdown.hours)}:{formatNumber(countdown.minutes)}:{formatNumber(countdown.seconds)}</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 pb-16">
        
        {/* Landing Page Content Box Container */}
        {isPaid ? (
          /* UNLOCKED SYSTEM AREA (Purchased Mode) */
          <div className="max-w-4xl mx-auto px-4 mt-8">
            <DashboardSandbox onReset={() => setIsPaid(false)} />
          </div>
        ) : (
          /* FRONT SALES PAGE AREA */
          <div className="max-w-3xl mx-auto px-4 pt-10 sm:pt-14 flex flex-col items-center">
            
            {/* Pill Discount Badge */}
            <div className="animate-fade-in bg-amber-400 text-slate-950 font-black text-sm sm:text-base px-6 py-2 rounded-full shadow-lg shadow-amber-400/20 tracking-wider hover:scale-105 transition-transform cursor-pointer select-none mb-8">
              APENAS R$ 5,99
            </div>

            {/* Core Display Title / Headline */}
            <h1 className="text-[24px] sm:text-[38px] md:text-[44px] font-black tracking-tight leading-[1.1] sm:leading-[1.12] text-slate-900 text-center font-display max-w-2xl px-1">
              +2.500 <span className="text-red-600 uppercase">Moldes</span> de<br />
              Festa Infantil<br />
              <div className="relative inline-block mt-1">
                <span className="text-blue-600 relative z-10">PRONTOS</span>
                <span className="absolute left-0 -bottom-1 w-full h-[5px] sm:h-[6px] bg-yellow-400 rounded z-0" />
              </div>{' '}
              para baixar<br />
              e imprimir
            </h1>

            {/* Imagem do Produto abaixo da Headline */}
            <div className="w-full max-w-xl mt-6 animate-fade-in px-2">
              <img 
                src="https://i.ibb.co/6JBVnsNr/Chat-GPT-Image-24-de-mai-de-2026-18-01-16.png" 
                alt="Mais de 2500 moldes de festa infantil" 
                className="w-full h-auto rounded-3xl object-contain shadow-xl shadow-slate-200/50 hover:scale-[1.01] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gray Sub-headline */}
            <p className="mt-8 text-base sm:text-lg text-slate-500 text-center font-normal px-2 max-w-xl leading-relaxed">
              Arquivos digitais prontos para imprimir e montar festas incríveis em casa.
            </p>

            {/* Highlighted Green Subtitle */}
            <p className="mt-10 sm:mt-12 text-semibold text-sm sm:text-base text-emerald-500 font-bold text-center leading-relaxed">
              Baixe, imprima e monte sua festa em casa em poucos minutos.
            </p>

            {/* Comparison Guarantee Box */}
            <div className="w-full max-w-xl mt-6">
              <div className="bg-[#F1FBF7] border border-[#D3F5E7] rounded-3xl p-6 text-center shadow-sm relative overflow-hidden group hover:border-[#b0ecd1] transition-colors">
                <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                  Decoradoras cobram entre <strong className="text-slate-900 font-bold">R$300 e R$800</strong> para montar uma festa.
                </p>
                <p className="text-emerald-500 font-extrabold text-base sm:text-lg mt-3 leading-tight tracking-wide">
                  Aqui você paga apenas R$5,99.
                </p>
              </div>
            </div>

            {/* Main Green Action Button CTA */}
            <div className="w-full max-w-lg mt-8 px-2 flex flex-col items-center">
              <button
                id="main-purchase-cta"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-extrabold text-base sm:text-lg md:text-xl py-4 sm:py-5 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 active:shadow-md transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-3 tracking-wide cursor-pointer select-none uppercase font-display"
              >
                <span>🎉</span>
                <span>Quero meus moldes agora</span>
              </button>

              {/* Immediate Digital Access Warning Text */}
              <p className="mt-4 text-[10px] sm:text-xs font-black text-emerald-500 tracking-wider uppercase text-center font-display leading-tight px-1 select-none">
                PRODUTO 100% DIGITAL. ACESSO IMEDIATO APÓS PAGAMENTO.
              </p>
            </div>

            {/* Bottom Safe Checklist elements */}
            <div className="mt-8 mb-6 flex items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
                </span>
                <span>Pagamento 100% seguro</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs">
                  ✓
                </span>
                <span>Garantia de 7 dias</span>
              </div>
            </div>

            {/* 2. SECOND SECTION: CUSTOMER SHOWN PARTIES */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
                  Veja festas feitas com os moldes
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl mx-auto">
                  Resultados reais de quem já usou nossos arquivos
                </p>
              </div>

              {/* Interactive Carousel - Just Large Images with Manual Arrows */}
              <div className="w-full flex flex-col gap-4 items-center">
                
                {/* Main Large Image Stage with Left & Right arrows */}
                <div className="w-full relative flex items-center group">
                  
                  {/* Left Arrow Button */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 sm:left-4 z-10 bg-white/90 hover:bg-white active:bg-slate-100 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all border border-slate-100 cursor-pointer"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>

                  <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 shadow-md">
                    <img 
                      src={CAROUSEL_IMAGES[carouselIndex]}
                      alt={`Festa infantil decorada com moldes ${carouselIndex + 1}`}
                      className="w-full h-full object-contain select-none transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Arrow Button */}
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 sm:right-4 z-10 bg-white/90 hover:bg-white active:bg-slate-100 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all border border-slate-100 cursor-pointer"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>
                </div>

                {/* Indicator dot triggers */}
                <div className="flex items-center justify-center gap-2">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2.5 transition-all rounded-full cursor-pointer ${
                        carouselIndex === idx 
                          ? 'w-6 bg-emerald-500' 
                          : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Ir para slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* CTA Button below the carousel */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full max-w-xl mt-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-black text-sm sm:text-base md:text-lg py-4 px-6 rounded-2xl sm:rounded-3xl shadow-lg shadow-emerald-500/25 active:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 tracking-wider cursor-pointer select-none uppercase font-display"
                >
                  <span className="text-lg sm:text-xl">🎉</span>
                  <span>Quero fazer festas assim</span>
                </button>

              </div>

              {/* Seamless guarantee notice line below grid */}
              <p className="text-slate-400 text-xs text-center mt-8 max-w-sm font-medium px-4 leading-relaxed">
                Junte-se a mais de 12.400 mães e decoradoras que mudaram a forma de planejar festas infantis economizando de verdade.
              </p>

            </section>

            {/* 3. THIRD SECTION: HOW IT WORKS / COMO FUNCIONA */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              
              <div className="text-center mb-10 px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight">
                  Como funciona?
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
                  Simples, rápido e sem complicação
                </p>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 mb-8">
                
                {/* Passo 1 */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-slate-200/60">
                  <div className="w-16 h-16 rounded-[20px] bg-emerald-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <span className="text-emerald-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest font-display mb-2">
                    PASSO 1
                  </span>
                  <h3 className="text-slate-900 text-lg sm:text-xl font-black font-display mb-2">
                    Acesso imediato
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    Após a compra, você recebe acesso imediato a todo o material no e-mail.
                  </p>
                </div>

                {/* Passo 2 */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-slate-200/60">
                  <div className="w-16 h-16 rounded-[20px] bg-emerald-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">👆</span>
                  </div>
                  <span className="text-emerald-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest font-display mb-2">
                    PASSO 2
                  </span>
                  <h3 className="text-slate-900 text-lg sm:text-xl font-black font-display mb-2">
                    Escolha seus temas
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    Navegue por milhares de temas de festa infantil prontos.
                  </p>
                </div>

                {/* Passo 3 */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-slate-200/60">
                  <div className="w-16 h-16 rounded-[20px] bg-emerald-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">🖨️</span>
                  </div>
                  <span className="text-emerald-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest font-display mb-2">
                    PASSO 3
                  </span>
                  <h3 className="text-slate-900 text-lg sm:text-xl font-black font-display mb-2">
                    Imprima ou venda
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    Imprima em casa ou personalize para vender kits completos.
                  </p>
                </div>

              </div>

            </section>

            {/* 4. FOURTH SECTION: WARRANTY & FAQ */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              
              {/* Seção de Oferta (R$5,99 Price and Offer Block) */}
              <div className="w-full bg-gradient-to-b from-sky-50/50 via-pink-50/30 to-amber-50/40 rounded-[28px] p-5 sm:p-7 shadow-lg border border-sky-100/60 flex flex-col items-center gap-4.5 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-300/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Badge */}
                <span className="bg-sky-100/80 text-sky-700 text-[8px] sm:text-[9.5px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full font-display z-10 border border-sky-200/30">
                  OFERTA EXCLUSIVA DO DIA
                </span>

                {/* Centered Image, matching size of the offer card with premium subtle frame */}
                <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-xs border border-slate-100 bg-white p-1 relative z-10 hover:shadow-sm transition-shadow duration-300">
                  <img 
                    src="https://i.ibb.co/6JBVnsNr/Chat-GPT-Image-24-de-mai-de-2026-18-01-16.png" 
                    alt="Super Kit de Moldes" 
                    className="w-full h-auto rounded-lg object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center max-w-md z-10 mt-0.5">
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-800 tracking-tight leading-tight">
                    Super Kit Completo de Moldes
                  </h3>
                  <p className="text-slate-500 text-[10px] sm:text-[11px] mt-1 font-medium leading-relaxed font-display">
                    Acesso imediato e vitalício ao melhor acervo de arquivos prontos de festa infantil.
                  </p>
                </div>

                {/* List of features matching user requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full max-w-sm my-1 font-display z-10">
                  {[
                    "+2.500 moldes de festa",
                    "Acesso imediato",
                    "Arquivos para imprimir",
                    "Garantia de 7 dias",
                    "Acesso Vitalício"
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-1.5 bg-white/90 border border-slate-100/50 px-3 py-1.5 rounded-lg shadow-2xs hover:border-sky-500/10 transition-colors">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-[9px] shrink-0">
                        ✓
                      </span>
                      <span className="text-slate-600 text-[10px] sm:text-[11px] font-bold">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA side of offer */}
                <div className="w-full max-w-xs shrink-0 border-t border-slate-200/40 pt-4 flex flex-col items-center text-center z-10">
                  <span className="text-slate-400 text-[9px] sm:text-[10px] line-through font-semibold font-display">
                    De R$ 47 por
                  </span>
                  <div className="flex items-baseline gap-0.5 mt-0.5 justify-center font-display">
                    <span className="text-emerald-500 font-extrabold text-sm sm:text-base">R$</span>
                    <span className="text-emerald-500 font-black text-4xl sm:text-5xl tracking-tight leading-none">5,99</span>
                  </div>
                  <span className="text-slate-400 text-[8px] sm:text-[9px] font-bold uppercase mt-1 tracking-wider block font-display">
                    ACESSO VITALÍCIO • PAGAMENTO ÚNICO
                  </span>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full mt-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-black text-[11px] sm:text-xs py-2.5 px-4 rounded-lg shadow-sm shadow-emerald-500/15 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 tracking-wider cursor-pointer select-none uppercase font-display"
                  >
                    <span>⚡</span>
                    <span>Quero os moldes agora</span>
                  </button>
                </div>
              </div>

              {/* 7-Day Warranty block */}
              <div className="w-full bg-gradient-to-br from-sky-50 to-blue-100/60 text-slate-800 rounded-[28px] p-5 sm:p-8 shadow-md border border-blue-200/50 flex flex-col md:flex-row items-center gap-5 sm:gap-7 mb-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Blue Trust Stamp Illustration */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/10 border border-blue-550/20 rounded-full flex items-center justify-center relative shadow-inner">
                  <Award className="w-10 h-10 text-blue-600 stroke-[1.5]" />
                  <span className="absolute -bottom-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                    7 DIAS
                  </span>
                </div>

                {/* Warranty Info Content */}
                <div className="flex-1 text-center md:text-left">
                  <span className="text-blue-600 text-[11px] sm:text-xs font-black uppercase tracking-wider font-display block mb-0.5">
                    Garantia Blindada
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black font-display text-slate-900 mb-1.5 tracking-tight">
                    Sem Riscos: Garantia Incondicional de 7 Dias
                  </h3>
                  <p className="text-slate-600 text-[11px] sm:text-xs md:text-sm leading-relaxed font-semibold">
                    Temos certeza absoluta de que você vai amar os nossos moldes. Mas, se por qualquer motivo você não ficar 100% satisfeita em até 7 dias, basta nos enviar um e-mail para receber todo o seu dinheiro de volta na hora. Sem burocracia ou perguntas. O risco é todo nosso!
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="w-full max-w-3xl flex flex-col items-center px-4">
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-bold mb-3 font-display">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>DÚVIDAS FREQUENTES</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight leading-tight">
                    Perguntas Frequentes
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1.5 leading-relaxed">
                    Ainda tem alguma dúvida? Encontre a resposta abaixo
                  </p>
                </div>

                {/* FAQ List Accordion */}
                <div className="w-full flex flex-col gap-3">
                  {[
                    {
                      q: "Como vou receber os meus moldes?",
                      a: "O envio é 100% automático e imediato. Logo após a aprovação do pagamento, você receberá um e-mail com as instruções de acesso e link para baixar todo o material."
                    },
                    {
                      q: "Preciso de uma impressora profissional para usar?",
                      a: "Não! Todos os moldes foram projetados pensando na facilidade caseira. Você pode imprimi-los em qualquer impressora comum (jato de tinta ou laser) no papel que preferir."
                    },
                    {
                      q: "Os arquivos vêm em quais formatos?",
                      a: "Eles vêm prontos em formato PDF (de altíssima qualidade prontos para imprimir e cortar na tesoura) and também acompanham formato especial para quem usa máquina de corte (como Silhouette Studio DXF/SVG)."
                    },
                    {
                      q: "Por quanto tempo poderei acessar os moldes?",
                      a: "O seu acesso é Vitalício! Você poderá baixar e usar os moldes hoje, amanhã ou daqui a anos. Sempre estarão disponíveis no seu painel para quando precisar."
                    },
                    {
                      q: "Posso vender os moldes prontos e montados?",
                      a: "Com certeza, essa é uma ótima fonte de renda! Você tem permissão comercial completa para fabricar e vender os itens de papelaria montados e decorados para os seus clientes."
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-2xl border transition-all duration-300 ${
                        activeFaq === idx 
                          ? 'border-emerald-500/40 shadow-md shadow-emerald-500/5' 
                          : 'border-slate-100 shadow-sm hover:border-slate-200/80'
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                      >
                        <span className="text-slate-900 font-extrabold text-sm sm:text-base leading-snug font-display">
                          {item.q}
                        </span>
                        {activeFaq === idx ? (
                          <ChevronUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {activeFaq === idx && (
                        <div className="px-5 sm:px-6 pb-5 border-t border-slate-50/80 pt-4 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal animate-fadeIn">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

            </section>

          </div>
        )}

      </main>

      {/* Secure footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-400 select-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Moldes de Festa Infantil. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-slate-450">
            <span>Termos de Uso</span>
            <span>•</span>
            <span>Políticas de Privacidade</span>
          </div>
        </div>
      </footer>

      {/* 2. SECURE CHECKOUT MODAL */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onPaymentSuccess={() => {
          setIsCheckoutOpen(false);
          setIsPaid(true);
        }}
      />

    </div>
  );
}
