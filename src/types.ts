export interface PartyTheme {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  emoji: string;
  items: string[];
}

export interface PrintableItem {
  id: string;
  name: string;
  category: 'caixa' | 'topper' | 'bandeirinha' | 'lembrancinha';
  previewSvgType: 'milk' | 'cone' | 'topper' | 'flag';
}

export interface CustomizationOptions {
  themeId: string;
  childName: string;
  childAge: number;
}
