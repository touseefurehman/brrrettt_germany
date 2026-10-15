export const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
export const btnPrimary = `${btnBase} rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2`;
export const btnHero = `${btnBase} bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover`;
export const btnGhost = `${btnBase} rounded-md hover:bg-accent hover:text-accent-foreground`;
