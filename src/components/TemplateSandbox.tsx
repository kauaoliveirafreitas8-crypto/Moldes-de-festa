import React, { useState } from 'react';
import { PARTY_THEMES, PRINTABLE_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Sparkles, Printer, ClipboardCheck, ArrowRight, Eye } from 'lucide-react';

interface TemplateSandboxProps {
  onOpenCheckout: () => void;
}

export default function TemplateSandbox({ onOpenCheckout }: TemplateSandboxProps) {
  const [activeThemeId, setActiveThemeId] = useState('safari');
  const [activeItemId, setActiveItemId] = useState('caixa_milk');
  const [childName, setChildName] = useState('ARTHUR');
  const [childAge, setChildAge] = useState(5);
  const [showCopied, setShowCopied] = useState(false);

  const activeTheme = PARTY_THEMES.find(t => t.id === activeThemeId) || PARTY_THEMES[0];
  const activeItem = PRINTABLE_ITEMS.find(i => i.id === activeItemId) || PRINTABLE_ITEMS[0];

  const handleDownloadDemo = () => {
    // Generate simple mock download of an SVG
    const svgElement = document.getElementById('sandbox-svg-element');
    if (svgElement) {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `molde_${activeItemId}_${childName.toLowerCase()}_${childAge}_anos.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    }
  };

  const renderSvgPreview = () => {
    const { color, accentColor, emoji, items } = activeTheme;
    const initial = childName.trim() ? childName.trim().charAt(0).toUpperCase() : '?';

    // SVG parameters
    const width = 360;
    const height = 360;

    switch (activeItem.previewSvgType) {
      case 'milk':
        return (
          <svg id="sandbox-svg-element" viewBox="0 0 360 360" className="w-full h-full bg-white rounded-xl shadow-inner max-h-[340px]">
            {/* Draw grid lines representing physical paper */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Print Header Info */}
            <text x="20" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ★ PREMIUM PRINT MOLD v4.2 - TESTE GRATUITO
            </text>
            <text x="340" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              MOLDE CAIXA MILK
            </text>

            {/* Fold & Cut Legend */}
            <line x1="20" y1="340" x2="60" y2="340" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="70" y="343" fill="#64748b" fontSize="9" fontFamily="sans-serif">LINHA DE CORTE</text>
            
            <line x1="170" y1="340" x2="210" y2="340" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="220" y="343" fill="#64748b" fontSize="9" fontFamily="sans-serif">LINHA DE DOBRA / FOLDA</text>

            <g transform="translate(10, 0)">
              {/* Outer Boundary (Cut line in red) */}
              <rect x="30" y="60" width="280" height="250" rx="4" fill="none" stroke="#f43f5e" strokeWidth="1.5" />

              {/* Fold guides (Dashed slate) */}
              <line x1="30" y1="130" x2="310" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="210" x2="310" y2="210" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="30" y1="280" x2="310" y2="280" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

              <line x1="100" y1="60" x2="100" y2="310" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="170" y1="60" x2="170" y2="310" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="240" y1="60" x2="240" y2="310" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

              {/* Glue tab background */}
              <path d="M 30 60 L 10 70 L 10 300 L 30 310 Z" fill="#f8fafc" stroke="#f43f5e" strokeWidth="1" strokeDasharray="1 1" />
              <text x="22" y="185" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" transform="rotate(-90 22 185)" textAnchor="middle">
                COLA / GLUE TAB
              </text>

              {/* Panel Graphics - Panel 2 (Main Front) */}
              <g transform="translate(100, 0)">
                <rect x="5" y="135" width="60" height="70" fill={activeTheme.bgColor.replace('bg-', '') === 'emerald-50' ? '#ecfdf5' : '#fef2f2'} rx="2" stroke={color} strokeWidth="1" />
                
                {/* Theme Deco */}
                <circle cx="35" cy="155" r="14" fill={`${color}22`} />
                <text x="35" y="160" fontSize="16" textAnchor="middle">{emoji}</text>

                {/* Name */}
                <text x="35" y="182" fill={accentColor} fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {childName || 'MOLDE'}
                </text>
                {/* Age */}
                <rect x="23" y="187" width="24" height="9" rx="3" fill={accentColor} />
                <text x="35" y="194" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {childAge} ANOS
                </text>
              </g>

              {/* Panel Graphics - Panel 4 (Secondary Front) */}
              <g transform="translate(240, 0)">
                <rect x="5" y="135" width="60" height="70" fill={activeTheme.bgColor.replace('bg-', '') === 'emerald-50' ? '#ecfdf5' : '#fef2f2'} rx="2" stroke={color} strokeWidth="1" />
                
                {/* Star Accent */}
                <path d="M 35 142 L 38 149 L 45 149 L 40 154 L 42 161 L 35 157 L 28 161 L 30 154 L 25 149 L 32 149 Z" fill={accentColor} />
                <text x="35" y="174" fill="#334155" fontSize="8" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">
                  OBRIGADO!
                </text>
                <text x="35" y="182" fill="#64748b" fontSize="6" fontFamily="sans-serif" textAnchor="middle">
                  PELA PRESENÇA
                </text>
              </g>

              {/* Milk top folding triangles */}
              <path d="M 30 130 L 65 95 L 100 130 Z" fill="none" stroke="#94a3b8" strokeDasharray="3 3" />
              <path d="M 170 130 L 205 95 L 240 130 Z" fill="none" stroke="#94a3b8" strokeDasharray="3 3" />
            </g>
          </svg>
        );

      case 'cone':
        return (
          <svg id="sandbox-svg-element" viewBox="0 0 360 360" className="w-full h-full bg-white rounded-xl shadow-inner max-h-[340px]">
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Print Header Info */}
            <text x="20" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ★ PREMIUM PRINT MOLD v4.2 - TESTE GRATUITO
            </text>
            <text x="340" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              MOLDE CAIXA PIRÂMIDE
            </text>

            <g transform="translate(180, 200)">
              {/* Main Cone fan shape */}
              {/* Outer curve */}
              <path d="M -130 -80 A 150 150 0 0 1 130 -80 L 0 50 Z" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
              
              {/* Folding segments (4 panels of pyramid tent) */}
              <line x1="0" y1="50" x2="-130" y2="-80" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="0" y1="50" x2="-65" y2="-135" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="0" y2="-150" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="65" y2="-135" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="130" y2="-80" stroke="#f43f5e" strokeWidth="1.5" />

              {/* Glue flap on side */}
              <path d="M 130 -80 L 140 -50 L 0 50 Z" fill="#f8fafc" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />

              {/* Custom graphics themed inside one pane */}
              <g transform="translate(-30, -75)">
                <circle cx="30" cy="30" r="18" fill="white" stroke={color} strokeWidth="1" />
                <text x="30" y="35" fontSize="20" textAnchor="middle">{emoji}</text>
                <text x="30" y="58" fill={accentColor} fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {childName}
                </text>
                <text x="30" y="68" fill="#475569" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
                  {childAge} ANOS
                </text>
              </g>
            </g>

            {/* Fold & Cut Legend */}
            <line x1="20" y1="340" x2="60" y2="340" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="70" y="343" fill="#64748b" fontSize="9" fontFamily="sans-serif">LINHA DE CORTE</text>
            <line x1="170" y1="340" x2="210" y2="340" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="220" y="343" fill="#64748b" fontSize="9" fontFamily="sans-serif">LINHA DE DOBRA / FOLDA</text>
          </svg>
        );

      case 'topper':
        return (
          <svg id="sandbox-svg-element" viewBox="0 0 360 360" className="w-full h-full bg-white rounded-xl shadow-inner max-h-[340px]">
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Header */}
            <text x="20" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ★ PREMIUM PRINT MOLD v4.2 - TESTE GRATUITO
            </text>
            <text x="340" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              TOPPER DE BOLO
            </text>

            <g transform="translate(180, 180)">
              {/* Outer starburst scallops */}
              <circle cx="0" cy="0" r="102" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="0" cy="0" r="100" fill={color} opacity="0.1" />
              <circle cx="0" cy="0" r="90" fill="#ffffff" stroke={color} strokeWidth="3" />
              
              {/* Decorative inner dotted ring */}
              <circle cx="0" cy="0" r="82" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" />

              {/* Large graphic */}
              <g transform="translate(0, -25)">
                <circle cx="0" cy="0" r="32" fill={`${color}22`} />
                <text x="0" y="10" fontSize="38" textAnchor="middle">{emoji}</text>
              </g>

              {/* Custom Banner Background */}
              <path d="M -110 25 L -95 10 L 95 10 L 110 25 L 95 40 L -95 40 Z" fill={accentColor} />
              <path d="M -95 10 L -95 40 L -105 50 L -105 20 Z" fill="#334155" opacity="0.3" />

              {/* Banner Text */}
              <text x="0" y="29" fill="#ffffff" fontSize="15" fontFamily="sans-serif" fontWeight="900" letterSpacing="1" textAnchor="middle">
                PARABÉNS {childName}
              </text>

              {/* Mini tag for age */}
              <g transform="translate(0, 52)">
                <rect x="-30" y="0" width="60" height="18" rx="9" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                <text x="0" y="13" fill="#1e293b" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {childAge} ANOS
                </text>
              </g>

              {/* Outer cute details based on active items */}
              <text x="-55" y="-35" fontSize="13">{items[0] ? (activeThemeId === 'safari' ? '🦒 border-white border' : activeThemeId === 'dinossauros' ? '🌋' : '💖') : ''}</text>
              <text x="45" y="-35" fontSize="13">{items[1] ? (activeThemeId === 'safari' ? '🐘' : activeThemeId === 'dinossauros' ? '🥚' : '✨') : ''}</text>
            </g>

            {/* Note text on printable layout */}
            <text x="180" y="325" fill="#64748b" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              ✂️ RECORTE AO REDOR DA LINHA TRACEJADA VERMELHA E COLE NO PALITO DE MADEIRA
            </text>
          </svg>
        );

      case 'flag':
        return (
          <svg id="sandbox-svg-element" viewBox="0 0 360 360" className="w-full h-full bg-white rounded-xl shadow-inner max-h-[340px]">
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Header */}
            <text x="20" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ★ PREMIUM PRINT MOLD v4.2 - TESTE GRATUITO
            </text>
            <text x="340" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              MOLDE BANDEIRINHA (VARAL)
            </text>

            <g transform="translate(40, 50)">
              {/* Outer Pennant Flag (Triangular) with top glue fold tab */}
              {/* Cut Line (Red) */}
              <path d="M 10 40 L 270 40 L 140 280 Z" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
              
              {/* Fold tab for string threading (Dashed gray-blue) */}
              <path d="M 10 40 L 10 10 L 270 10 L 270 40 Z" fill="#f8fafc" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="40" x2="270" y2="40" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

              <text x="140" y="28" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                DOBRA PARA PASSAR O BARBANTE (GLUE / THREAD TAB)
              </text>

              {/* Inner design margin */}
              <path d="M 25 50 L 255 50 L 140 255 Z" fill={`${color}12`} stroke={color} strokeWidth="2" strokeDasharray="6 4" />

              {/* The big initial letter */}
              <text x="140" y="155" fill={accentColor} fontSize="90" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">
                {initial}
              </text>

              {/* Child's whole name underneath letter */}
              <text x="140" y="185" fill="#475569" fontSize="12" fontFamily="sans-serif" fontWeight="600" textAnchor="middle" letterSpacing="2">
                {childName}
              </text>

              {/* Cute Icons Decorating the Pennant */}
              <g transform="translate(140, 215)">
                <circle cx="0" cy="0" r="16" fill="white" stroke={color} strokeWidth="1" />
                <text x="0" y="5" fontSize="16" textAnchor="middle">{emoji}</text>
              </g>

              {/* Tiny age star badge */}
              <g transform="translate(200, 95)">
                <path d="M 0 -10 L 3 -3 L 10 -3 L 5 2 L 7 9 L 0 5 L -7 9 L -5 2 L -10 -3 L -3 -3 Z" fill="#facc15" />
                <text x="0" y="14" fill="#1e293b" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  {childAge}a
                </text>
              </g>
            </g>

            <line x1="20" y1="340" x2="60" y2="340" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="70" y="343" fill="#64748b" fontSize="9" fontFamily="sans-serif">LINHA DE CORTE</text>
          </svg>
        );
    }
  };

  return (
    <div id="simulador-sandbox" className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden ring-4 ring-emerald-500/30">
      
      {/* Background Decorative glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Accent */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 p-2.5 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              Simulador de Moldes Ativo
            </h3>
            <p className="text-sm text-slate-400 font-sans">
              Personalize, visualize e teste baixar um molde gratuitamente!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          PRÉVIA EM ALTA QUALIDADE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Step 1: Child details */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              1. Identificação do Aniversariante
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  maxLength={16}
                  value={childName}
                  onChange={(e) => setChildName(e.target.value.toUpperCase())}
                  placeholder="NOME"
                  className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white focus:outline-none placeholder-slate-500 uppercase font-bold tracking-wider"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={childAge}
                  onChange={(e) => setChildAge(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="IDADE"
                  className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white text-center focus:outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Choose Theme */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
              2. Escolha o Tema do Conjunto
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PARTY_THEMES.map((theme) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setActiveThemeId(theme.id)}
                    role="button"
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer select-none ${
                      isActive
                        ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/20 font-bold text-white'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{theme.emoji}</span>
                    <span className="truncate">{theme.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Choose Item Layout */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
              3. Tipo de Molde para Visualizar
            </label>
            <div className="flex flex-col gap-2">
              {PRINTABLE_ITEMS.map((item) => {
                const isActive = item.id === activeItemId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    role="button"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs cursor-pointer select-none ${
                      isActive
                        ? 'bg-slate-800 border-amber-400 font-bold text-white shadow-md'
                        : 'bg-slate-800/40 border-slate-850 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                      isActive ? 'bg-amber-400 text-slate-900' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative border-4 border-dashed border-slate-800 rounded-2xl p-3 bg-slate-950 flex flex-col items-center justify-center min-h-[360px]">
            
            {/* SVG Renderer */}
            {renderSvgPreview()}

            {/* Scale watermark icon absolute */}
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur border border-slate-800 p-1.5 rounded-lg text-slate-400 text-[10px] font-mono flex items-center gap-1">
              <Printer className="w-3 h-3 text-amber-400" />
              <span>DPI: 300 (Pronto p/ Imprimir)</span>
            </div>
          </div>

          {/* Action buttons under preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div
              onClick={handleDownloadDemo}
              role="button"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-700/80 border border-slate-750 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all shadow-md group cursor-pointer select-none"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-slate-400" />
              Baixar Molde de Teste (.SVG)
            </div>
            <div
              onClick={onOpenCheckout}
              role="button"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 font-bold text-slate-950 py-3 px-4 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/20 uppercase cursor-pointer select-none text-center"
            >
              Liberar Pacote Completo (+2.500 moldes)
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Alert Success message when file downloaded */}
          <AnimatePresence>
            {showCopied && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 text-xs flex items-center gap-3"
              >
                <ClipboardCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold">Sucesso!</span> O arquivo SVG editável e com alta resolução do molde de teste foi gerado e baixado. Adquira o pacote completo para acessar todos os formatos (PDF, PNG, Studio V3) de mais de 2.500 modelos!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Trust disclaimer banner at the bottom of the simulator */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>Isso é uma prévia real que você pode imprimir em papel gramatura 180g</span>
        </div>
        <div className="text-slate-500">
          Suporta Silhouette Studio, Illustrator, Canva, Corel Draw, etc.
        </div>
      </div>

    </div>
  );
}
