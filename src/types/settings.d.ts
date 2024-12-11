// Definition of fonts for Tailwind and Google Fonts.
export interface Fonts {
  [key: string]: {       // Type, purpose
    name: string;        // Font name
    weights?: number[];  // Weights to load
  };
}

// Definition of a navigation (i.e. list of links).
export interface Nav {
  label: string;  // Label to display
  icon?: string;  // Icon
  url: string;    // Target URL
}
