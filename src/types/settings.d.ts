// Definition of fonts for Tailwind and Google Fonts.
export interface Fonts {
  [key: string]: {       // Type, purpose
    name: string;        // Font name
    weights?: number[];  // Weights to load
  };
}
