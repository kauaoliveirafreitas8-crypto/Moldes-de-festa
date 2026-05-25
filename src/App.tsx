import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, ChevronDown } from 'lucide-react';
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

const FAQ_ITEMS = [
  {
    question: "Como vou receber os moldes?",
    answer: "A liberação do seu acesso é imediata! Se pagar por Pix ou Cartão, os dados de acesso são enviados diretamente para o seu e-mail cadastrado logo após a confirmação do pagamento. Você terá acesso à nossa Central de Downloads VIP na tela."
  },
  {
    question: "Quais são os formatos dos arquivos?",
    answer: "Todos os arquivos estão organizados e prontos para uso em alta definição. Você receberá arquivos editáveis em SVG (para Illustrator/outros programas), DXF/STUDIO3 (fatias e linhas para Silhouette Studio) e PDF de alta qualidade prontos para impressão direta e corte com tesoura."
  },
  {
    question: "Consigo editar os nomes e idades?",
    answer: "Sim! Os arquivos são compatíveis e flexíveis. Você pode alterar nomes, idades ou cores usando ferramentas como Silhouette Studio, Illustrator, Corel Draw ou outros programas de edição compatíveis de forma simples."
  },
  {
    question: "Por quanto tempo terei acesso?",
    answer: "Seu acesso é vitalício! Você pode baixar os arquivos hoje, amanhã ou daqui a um ano quantas vezes precisar. Não cobramos mensalidades, taxa única de apenas R$ 5,99."
  },
  {
    question: "Se eu tiver alguma dificuldade, terei ajuda?",
    answer: "Com certeza. Oferecemos suporte completo para te auxiliar no download ou qualquer outra questão técnica relacionada ao uso e impressão do material de forma simples e rápida."
  },
  {
    question: "Tem alguma garantia de satisfação?",
    answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se em até 7 dias você não gostar do material, devolvemos 100% do seu dinheiro sem nenhuma complicação."
  }
];

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 44, seconds: 12 });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleCtaClick = () => {
    window.location.href = "https://pay.lowify.com.br/checkout.php?product_id=iSeaBR";
  };

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

  // Automatic carousel slide transition (every 1.3 seconds)
  useEffect(() => {
    if (isPaid) return;
    const timer = setTimeout(() => {
      setCarouselIndex(prev => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
    }, 1300);
    return () => clearTimeout(timer);
  }, [carouselIndex, isPaid]);

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
              +3.500 <span className="text-red-500 uppercase">Moldes</span> de<br />
              Festa Infantil<br />
              <div className="relative inline-block mt-1">
                <span className="text-blue-500 relative z-10">PRONTOS</span>
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-[6px] sm:h-[8px] bg-blue-100 -rotate-1 rounded z-0" />
              </div>{' '}
              para baixar<br />
              e imprimir
            </h1>

            {/* Product Image below name */}
            <div className="mt-8 w-full max-w-xl rounded-3xl overflow-hidden shadow-md">
              <img 
                src="https://i.ibb.co/6JBVnsNr/Chat-GPT-Image-24-de-mai-de-2026-18-01-16.png" 
                alt="Kit de Moldes de Festas" 
                className="w-full h-auto object-cover select-none"
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
                onClick={handleCtaClick}
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

              {/* Interactive Carousel - Just Large Images without Boxed Card Section style */}
              <div className="w-full flex flex-col gap-4 items-center">
                
                {/* Main Large Image Stage */}
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 shadow-md">
                  <img 
                    src={CAROUSEL_IMAGES[carouselIndex]}
                    alt={`Festa infantil decorada com moldes ${carouselIndex + 1}`}
                    className="w-full h-full object-contain select-none transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
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
                  onClick={handleCtaClick}
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

            {/* 3. THIRD SECTION: COMO FUNCIONA & SIMULADOR DE MOLDES */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
                  Como funciona?
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-semibold mt-2">
                  Simples, rápido e sem complicação
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                
                {/* Passo 1 */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#e6fbf2] rounded-2xl flex items-center justify-center text-3xl mb-4 select-none">
                    ⚡
                  </div>
                  <span className="text-emerald-500 text-xs font-black tracking-widest uppercase mb-1 font-mono">
                    PASSO 1
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 font-display">
                    Acesso imediato
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Após a compra, você recebe acesso imediato a todo o material no e-mail.
                  </p>
                </div>

                {/* Passo 2 */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#e6fbf2] rounded-2xl flex items-center justify-center text-3xl mb-4 select-none">
                    👇
                  </div>
                  <span className="text-emerald-500 text-xs font-black tracking-widest uppercase mb-1 font-mono">
                    PASSO 2
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 font-display">
                    Escolha seus temas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Navegue por milhares de temas de festa infantil prontos.
                  </p>
                </div>

                {/* Passo 3 */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#e6fbf2] rounded-2xl flex items-center justify-center text-2xl mb-4 select-none">
                    🖨️
                  </div>
                  <span className="text-emerald-500 text-xs font-black tracking-widest uppercase mb-1 font-mono">
                    PASSO 3
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 font-display">
                    Imprima ou venda
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Imprima em casa ou personalize para vender kits completos.
                  </p>
                </div>

              </div>

            </section>

            {/* 4. FOURTH SECTION: OFERTA EXCLUSIVA COMPLETA */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              <div className="text-center mb-8">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  ⚡ OFERTA COMPLETA LIMITADA
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight mt-4">
                  Adquira Agora e Garanta Todos os Seus Moldes
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl mx-auto mb-6">
                  Leve o pacote completo com mais de 3.500 arquivos prontos e comece a festejar hoje mesmo.
                </p>
                {/* Product Image on TOP of Offer Section */}
                <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-md">
                  <img 
                    src="https://i.ibb.co/6JBVnsNr/Chat-GPT-Image-24-de-mai-de-2026-18-01-16.png" 
                    alt="Pacote de Moldes Completos" 
                    className="w-full h-auto object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Oferta Card */}
              <div className="w-full max-w-2xl bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] sm:text-xs font-extrabold px-6 py-2 rounded-bl-3xl uppercase tracking-wider">
                  OFERTA ATIVA ⭐
                </div>
                
                {/* List of included things */}
                <div className="space-y-4 mb-8 mt-4 sm:mt-2">
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-emerald-500 text-xl shrink-0">✓</span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">Mega Kit +3.500 Moldes de Festas</h4>
                      <p className="text-xs sm:text-sm text-slate-500">Mickey, Princesas, Heróis, Dinossauros, Safari e muito mais.</p>
                    </div>
                    <span className="ml-auto font-mono text-xs sm:text-sm text-slate-400 line-through shrink-0">R$ 97,00</span>
                  </div>
                  <div className="flex items-start gap-3 border-t border-slate-100 pt-3 text-left">
                    <span className="text-emerald-500 text-xl shrink-0">✓</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">Acesso Vitalício</h4>
                      <p className="text-xs sm:text-sm text-slate-500">Os moldes são seus para sempre, sem mensalidades ou taxas ocultas.</p>
                    </div>
                    <span className="ml-auto font-mono text-xs sm:text-sm text-emerald-500 font-extrabold shrink-0">INCLUÍDO</span>
                  </div>
                  <div className="flex items-start gap-3 border-t border-slate-100 pt-3 text-left">
                    <span className="text-emerald-500 text-xl shrink-0">✓</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">Garantia de 7 Dias</h4>
                      <p className="text-xs sm:text-sm text-slate-500">Garantia incondicional de satisfação ou reembolso integral.</p>
                    </div>
                    <span className="ml-auto font-mono text-xs sm:text-sm text-emerald-500 font-extrabold shrink-0">INCLUÍDO</span>
                  </div>
                  <div className="flex items-start gap-3 border-t border-slate-100 pt-3 text-left">
                    <span className="text-emerald-500 text-xl shrink-0">✓</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">Pagamento Seguro</h4>
                      <p className="text-xs sm:text-sm text-slate-500">Sua compra é autenticada e blindada em ambiente criptografado.</p>
                    </div>
                    <span className="ml-auto font-mono text-xs sm:text-sm text-emerald-500 font-extrabold shrink-0">CONFIRMADO</span>
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 text-center flex flex-col items-center shadow-2xl shadow-emerald-500/5 overflow-hidden">
                  {/* Premium Ribbon/Badge */}
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-bl-xl shadow-sm">
                    Tempo Limitado
                  </div>

                  <span className="text-rose-500 font-extrabold text-sm sm:text-base line-through tracking-wide">
                    De R$ 47,00 por
                  </span>

                  <div className="mt-3 text-slate-600 text-xs sm:text-sm font-semibold max-w-xs">
                    Hoje você leva tudo com acesso vitalício por apenas:
                  </div>

                  <div className="mt-3.5 flex items-baseline gap-1 select-none">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">R$</span>
                    <span className="text-5xl sm:text-6xl font-black text-emerald-500 font-display tracking-tight leading-none">5,99</span>
                  </div>

                  <div className="mt-3.5 flex items-center gap-1.5 text-slate-500">
                    <span className="text-emerald-500 text-xs">⚡</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Acesso imediato • Sem mensalidades</span>
                  </div>

                  {/* CTA button in Offer Card */}
                  <button
                    id="offer-purchase-cta"
                    onClick={handleCtaClick}
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-black text-base sm:text-lg py-4.5 px-6 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 active:shadow-md transition-all hover:scale-[1.015] active:scale-[0.985] flex items-center justify-center gap-3 tracking-wide cursor-pointer select-none uppercase font-display"
                  >
                    <span>🎁</span>
                    <span>Aproveitar Oferta Especial</span>
                  </button>
                  
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 mt-4 leading-normal">
                    *Acesso vitalício e definitivo. Download liberado na mesma hora da compra.
                  </span>
                </div>
              </div>
            </section>

            {/* 4.5. GUARANTEE SECTION: GARANTIA DE 7 DIAS */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              <div className="w-full max-w-2xl bg-[#EBF5FF] border border-[#DEECFD] rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center shadow-md relative overflow-hidden group">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm relative z-10 select-none">
                  🛡️
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-blue-900 font-display tracking-tight leading-tight relative z-10">
                  Garantia Especial de 7 Dias
                </h3>

                <p className="text-sm sm:text-base text-blue-950 font-medium mt-3 max-w-xl leading-relaxed relative z-10">
                  Fique 100% tranquila! Você tem <strong className="text-blue-900 font-extrabold">7 dias completos</strong> para testar e usar toda a nossa plataforma e baixar seus moldes favoritos.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed relative z-10">
                  Se por qualquer motivo você não amar os arquivos ou achar que não é para você, basta nos enviar um único e-mail e devolvermos <strong className="text-emerald-500 font-extrabold">100% do seu dinheiro</strong> de imediato. Sem burocracia ou complicações.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-xs font-bold text-blue-800 tracking-wider uppercase relative z-10">
                  <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Satisfação Garantida</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full">
                    <span>Compra 100% Blindada</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. FIFTH SECTION: PERGUNTAS FREQUENTES (FAQ) */}
            <section className="w-full max-w-4xl mt-14 pt-12 border-t border-slate-200/95 flex flex-col items-center">
              <div className="text-center mb-8">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  ❓ DÚVIDAS FREQUENTES
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight leading-tight mt-4">
                  Perguntas Frequentes
                </h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl mx-auto">
                  Ainda tem alguma dúvida? Confira as respostas para as perguntas mais comuns de nossas clientes:
                </p>
              </div>

              {/* Accordion container */}
              <div className="w-full max-w-2xl space-y-3">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-slate-950 transition-colors gap-4"
                      >
                        <span className="text-sm sm:text-base font-extrabold">{item.question}</span>
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} 
                        />
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 overflow-hidden ${
                          isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
                        }`}
                      >
                        <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-[#FAFCFE]">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
