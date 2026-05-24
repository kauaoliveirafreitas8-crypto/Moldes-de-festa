import React, { useState } from 'react';
import { PARTY_THEMES } from '../data';
import { Search, Download, CheckCircle, ArrowLeft, RefreshCw, FolderOpen, Grid, Sparkles, FileText, FileDown, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardSandboxProps {
  onReset: () => void;
}

interface KitInfo {
  id: string;
  name: string;
  count: number;
  category: string;
  bgColor: string;
  textColor: string;
  items: string[];
  emoji: string;
}

const DASHBOARD_KITS: KitInfo[] = [
  {
    id: 'mickey',
    name: 'Kit Completo Turma do Mickey',
    count: 320,
    category: 'Desenhos Animados',
    bgColor: 'from-red-600/20 to-slate-900',
    textColor: 'text-red-400',
    emoji: '🐭',
    items: ['Bandeirinhas Mickey', 'Cone de Pipoca Pateta', 'Caixa Milk Donald', 'Topper de Bolo Minnie']
  },
  {
    id: 'patrulha',
    name: 'Kit Patrulha Canina Escolar',
    count: 350,
    category: 'Séries Infantis',
    bgColor: 'from-blue-600/20 to-slate-900',
    textColor: 'text-blue-400',
    emoji: '🐶',
    items: ['Caixa Pirâmide Chase', 'Sacolinha Surpresa Marshall', 'Topper Skye', 'Adesivos Caninos']
  },
  {
    id: 'princesas_mega',
    name: 'Kit Castelo das Princesas',
    count: 400,
    category: 'Desenhos Clássicos',
    bgColor: 'from-pink-600/20 to-slate-900',
    textColor: 'text-pink-400',
    emoji: '🏰',
    items: ['Carruagem Recortável', 'Caixa Sushi Cinderela', 'Topper Ariel', 'Convite Realeza']
  },
  {
    id: 'herois_unidos',
    name: 'Vingadores & Heróis Super Kit',
    count: 420,
    category: 'Quadrinhos',
    bgColor: 'from-blue-700/20 to-slate-900',
    textColor: 'text-blue-400',
    emoji: '🦸',
    items: ['Escudo América Caixa', 'Caixa Bala Homem de Ferro', 'Máscaras Imprimíveis', 'Topper Hulk']
  },
  {
    id: 'safari_baby_unlocked',
    name: 'Safari Baby PREMIUM (SVG+Studio)',
    count: 280,
    category: 'Festas Tradicionais',
    bgColor: 'from-emerald-600/20 to-slate-900',
    textColor: 'text-emerald-400',
    emoji: '🐆',
    items: ['Caixa Milk Leão', 'Topper de Mesa Girafa', 'Bandeirinhas Folhas', 'Sacolinha Zebra']
  },
  {
    id: 'dino_adventure',
    name: 'Dinossauros & Selva Jurássica',
    count: 250,
    category: 'Aventura',
    bgColor: 'from-orange-600/20 to-slate-900',
    textColor: 'text-orange-400',
    emoji: '🌋',
    items: ['Caixa Cone T-Rex', 'Topper Vulcão', 'Tag de Agradecimento Pegada', 'Totem de Chão Tricerátops']
  },
  {
    id: 'candy_confeitaria',
    name: 'Confeitaria & Mundo do Sorvete',
    category: 'Festas Meninas',
    count: 210,
    bgColor: 'from-rose-500/20 to-slate-900',
    textColor: 'text-rose-400',
    emoji: '🍧',
    items: ['Caixa Bala Cupcake', 'Bandeirinhas Candy', 'Topper Donut', 'Cachepô Sorvete']
  },
  {
    id: 'astronauta_espacial',
    name: 'Odisséia Espacial / Astronauta',
    category: 'Aventura',
    count: 180,
    bgColor: 'from-indigo-600/20 to-slate-900',
    textColor: 'text-indigo-400',
    emoji: '🌌',
    items: ['Foguete 3D', 'Caixa Pirâmide Planeta', 'Topper Astronauta', 'Convite Galáxia']
  }
];

export default function DashboardSandbox({ onReset }: DashboardSandboxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [unlockedDownloads, setUnlockedDownloads] = useState<string[]>([]);

  const categories = ['Todos', 'Desenhos Animados', 'Festas Tradicionais', 'Aventura', 'Séries Infantis'];

  const filteredKits = DASHBOARD_KITS.filter(kit => {
    const matchesSearch = kit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          kit.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeCategory === 'Todos') return matchesSearch;
    return matchesSearch && kit.category === activeCategory;
  });

  const handleDownloadKit = (id: string, name: string) => {
    if (downloadingId) return;
    setDownloadingId(id);

    // Simulate 2 seconds compilation and ZIP generation 
    setTimeout(() => {
      setDownloadingId(null);
      setUnlockedDownloads(prev => [...prev, id]);

      // Trigger automatic simulated file download
      const element = document.createElement("a");
      const file = new Blob([`Simulação de Arquivo ZIP do Kit: ${name} contendo os moldes editáveis em .CDR, .SVG, .PDF, .STUDIO3`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${id}_kit_moldes_festa.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      
      {/* Background glow glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Notification bar */}
      <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-500 text-slate-950 font-bold flex items-center justify-center rounded-xl shrink-0 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-emerald-300 tracking-wide font-display">
              PAGAMENTO CONFIRMADO! ACESSO TOTAL CONFIGURADO
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Você acaba de simular o checkout e liberou todos os nossos +2.500 moldes de festas!
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="bg-transparent border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Voltar para Oferta Original
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-widest block mb-1">
            Plataforma do Aluno
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-2">
            <FolderOpen className="w-7 h-7 text-amber-400" />
            Central de Downloads VIP
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            Aqui você baixa todos os seus pacotes vetoriais editáveis para Silhouette, Corel, Illustrator e tesoura.
          </p>
        </div>
        
        {/* Statistics Pill */}
        <div className="flex items-center gap-4 bg-slate-950 border border-slate-850 px-4 py-3 rounded-2xl self-start md:self-auto">
          <div className="text-left border-r border-slate-800 pr-4">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">MOLDES TOTAIS</span>
            <span className="text-lg font-black text-amber-400 font-display">2.560</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">SUSTENTO FORMATO</span>
            <span className="text-xs font-bold text-white block mt-0.5">PDF, Studio, SVG</span>
          </div>
        </div>
      </div>

      {/* Searhbar and filter menu */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar por tema (Mickey, Patrulha, Caixa Milk, Topper...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none placeholder-slate-500 transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-850 text-slate-350 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of kits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKits.length > 0 ? (
          filteredKits.map(kit => {
            const hasDownloaded = unlockedDownloads.includes(kit.id);
            const isThisDownloading = downloadingId === kit.id;
            
            return (
              <div 
                key={kit.id}
                className={`bg-gradient-to-br ${kit.bgColor} border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all group`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-3xl p-2 bg-slate-950/60 rounded-xl group-hover:scale-110 transition-transform">
                      {kit.emoji}
                    </span>
                    <span className="bg-slate-950/80 text-[10px] font-mono text-slate-400 px-2 rounded-full border border-slate-850">
                      {kit.count} arquivos
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-100 group-hover:text-white transition-colors">
                    {kit.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Categoria: {kit.category}
                  </p>

                  {/* List of elements inside package */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-450 uppercase font-mono block mb-1">Moldes Inclusos:</span>
                    <ul className="grid grid-cols-2 gap-1">
                      {kit.items.map((it, idx) => (
                        <li key={idx} className="text-[11px] text-slate-350 flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60">
                  <button
                    disabled={isThisDownloading}
                    onClick={() => handleDownloadKit(kit.id, kit.name)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      hasDownloaded
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isThisDownloading
                        ? 'bg-slate-800 text-slate-400 border border-slate-755 cursor-not-allowed'
                        : 'bg-slate-950 hover:bg-slate-850 text-white border border-slate-750 font-semibold'
                    }`}
                  >
                    {isThisDownloading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        Gerando Download ZIP...
                      </>
                    ) : hasDownloaded ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Baixado com Sucesso! (Baixar Novamente)
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                        Baixar Kit .ZIP (Completo)
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 py-12 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
            <span className="text-3xl mb-2">🔍</span>
            <p className="font-bold text-sm text-slate-300">Nenhum tema encontrado</p>
            <p className="text-xs text-slate-500 mt-1">Experimente buscar por "patrulha" ou "mickey".</p>
          </div>
        )}
      </div>

    </div>
  );
}
