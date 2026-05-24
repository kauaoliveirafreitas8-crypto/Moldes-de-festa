import { PartyTheme, PrintableItem } from './types';

export const PARTY_THEMES: PartyTheme[] = [
  {
    id: 'safari',
    name: 'Safari Baby',
    color: '#10b981', // emerald
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-900',
    accentColor: '#15803d',
    emoji: '🦁',
    items: ['Girafinha', 'Leãozinho', 'Elefantinho', 'Folhas Tropicais']
  },
  {
    id: 'dinossauros',
    name: 'Dinossauros',
    color: '#f97316', // orange
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-900',
    accentColor: '#c2410c',
    emoji: '🦖',
    items: ['T-Rex', 'Tricerátops', 'Vulcão', 'Pegadas Dino']
  },
  {
    id: 'princesas',
    name: 'Realeza Rosa',
    color: '#ec4899', // pink
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-900',
    accentColor: '#be185d',
    emoji: '👑',
    items: ['Coroa Real', 'Carruagem', 'Castelo', 'Flor de Liz']
  },
  {
    id: 'astronauta',
    name: 'Astronauta / Espaço',
    color: '#6366f1', // indigo
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-900',
    accentColor: '#4338ca',
    emoji: '🚀',
    items: ['Foguete', 'Planeta Saturno', 'Estrela Cadente', 'Astronauta Cute']
  },
  {
    id: 'superherois',
    name: 'Super-Heróis',
    color: '#ef4444', // red
    bgColor: 'bg-red-50',
    textColor: 'text-red-900',
    accentColor: '#b91c1c',
    emoji: '💥',
    items: ['Escudo Forte', 'Estrela Hero', 'Raio de Poder', 'Prédios Noturnos']
  },
  {
    id: 'confeitaria',
    name: 'Confeitaria / Mundo Doce',
    color: '#f43f5e', // rose
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-900',
    accentColor: '#be123c',
    emoji: '🧁',
    items: ['Cupcake', 'Donut', 'Sorvetinho', 'Confeitos coloridos']
  }
];

export const PRINTABLE_ITEMS: PrintableItem[] = [
  {
    id: 'caixa_milk',
    name: 'Caixa Milk Decorativa',
    category: 'caixa',
    previewSvgType: 'milk'
  },
  {
    id: 'caixa_piramide',
    name: 'Caixa Cone / Pirâmide',
    category: 'caixa',
    previewSvgType: 'cone'
  },
  {
    id: 'topper_bolo',
    name: 'Topper de Bolo Personalizado',
    category: 'topper',
    previewSvgType: 'topper'
  },
  {
    id: 'bandeirinha',
    name: 'Bandeirinha para Varal',
    category: 'bandeirinha',
    previewSvgType: 'flag'
  }
];
