@custom-variant dark (&:is(.dark *));

:root {
  /* Typography - SF Pro */
  --font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
  --font-size: 16px;
  
  /* New Dark Theme Color Palette */
  --color-background: #0B0B0C; /* Near-black background */
  --color-card: #121214; /* Card background */
  --color-text-primary: #FFFFFF; /* Primary text */
  --color-text-secondary: #B7B7C0; /* Secondary text */
  --color-accent-mint: #6EE7D2; /* Mint - CTAs */
  --color-accent-lilac: #C4B5FD; /* Lilac - tags/badges */
  --color-success: #34D399;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  
  /* 8-pt Spacing System */
  --space-1: 4px;   /* 0.5 units */
  --space-2: 8px;   /* 1 unit */
  --space-3: 12px;  /* 1.5 units */
  --space-4: 16px;  /* 2 units */
  --space-6: 24px;  /* 3 units */
  --space-8: 32px;  /* 4 units */
  
  /* Border Radius */
  --radius-card: 16px; /* Cards */
  --radius-input: 12px; /* Inputs */
  --radius-modal: 24px; /* Modals */
  
  /* Typography Scale */
  --text-h1: 28px;
  --text-h1-line: 34px;
  --text-h2: 22px;
  --text-h2-line: 28px;
  --text-body: 16px;
  --text-body-line: 24px;
  --text-caption: 13px;
  --text-caption-line: 18px;
  --text-button: 16px;
  --text-button-line: 16px;
  
  /* Semantic mappings */
  --background: var(--color-background);
  --foreground: var(--color-text-primary);
  --card: var(--color-card);
  --card-foreground: var(--color-text-primary);
  --popover: var(--color-card);
  --popover-foreground: var(--color-text-primary);
  --primary: var(--color-accent-mint);
  --primary-foreground: var(--color-background);
  --secondary: var(--color-accent-lilac);
  --secondary-foreground: var(--color-background);
  --muted: #1A1A1C;
  --muted-foreground: var(--color-text-secondary);
  --accent: var(--color-accent-mint);
  --accent-foreground: var(--color-background);
  --destructive: var(--color-error);
  --destructive-foreground: #ffffff;
  --border: rgba(255, 255, 255, 0.1);
  --input: transparent;
  --input-background: var(--color-card);
  --ring: var(--color-accent-mint);
  --radius: var(--radius-input);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-ring: var(--ring);
  --radius-sm: 8px;
  --radius-md: var(--radius-input);
  --radius-lg: var(--radius-card);
  --radius-xl: var(--radius-modal);
  
  /* Custom utility colors */
  --color-dark-bg: var(--color-background);
  --color-dark-card: var(--color-card);
  --color-white: var(--color-text-primary);
  --color-gray: var(--color-text-secondary);
  --color-mint: var(--color-accent-mint);
  --color-lilac: var(--color-accent-lilac);
  --color-green: var(--color-success);
  --color-yellow: var(--color-warning);
  --color-red: var(--color-error);
}

/* Custom utility classes */
@layer utilities {
  .bg-dark-bg { background-color: var(--color-dark-bg); }
  .bg-dark-card { background-color: var(--color-dark-card); }
  .bg-mint { background-color: var(--color-mint); }
  .bg-lilac { background-color: var(--color-lilac); }
  .bg-green { background-color: var(--color-green); }
  .bg-yellow { background-color: var(--color-yellow); }
  .bg-red { background-color: var(--color-red); }
  
  .text-white { color: var(--color-white); }
  .text-gray { color: var(--color-gray); }
  .text-mint { color: var(--color-mint); }
  .text-lilac { color: var(--color-lilac); }
  .text-green { color: var(--color-green); }
  .text-yellow { color: var(--color-yellow); }
  .text-red { color: var(--color-red); }
  
  .border-dark { border-color: rgba(255, 255, 255, 0.1); }
  .border-dark-20 { border-color: rgba(255, 255, 255, 0.2); }
  .border-dark-30 { border-color: rgba(255, 255, 255, 0.3); }
  
  /* Typography classes */
  .text-h1 { font-size: var(--text-h1); line-height: var(--text-h1-line); font-weight: 600; }
  .text-h2 { font-size: var(--text-h2); line-height: var(--text-h2-line); font-weight: 600; }
  .text-body { font-size: var(--text-body); line-height: var(--text-body-line); font-weight: 400; }
  .text-caption { font-size: var(--text-caption); line-height: var(--text-caption-line); font-weight: 500; }
  .text-button { font-size: var(--text-button); line-height: var(--text-button-line); font-weight: 500; }
  
  /* 8pt spacing utilities */
  .p-1 { padding: var(--space-1); }
  .p-2 { padding: var(--space-2); }
  .p-3 { padding: var(--space-3); }
  .p-4 { padding: var(--space-4); }
  .p-6 { padding: var(--space-6); }
  .p-8 { padding: var(--space-8); }
  
  .m-1 { margin: var(--space-1); }
  .m-2 { margin: var(--space-2); }
  .m-3 { margin: var(--space-3); }
  .m-4 { margin: var(--space-4); }
  .m-6 { margin: var(--space-6); }
  .m-8 { margin: var(--space-8); }
  
  .gap-1 { gap: var(--space-1); }
  .gap-2 { gap: var(--space-2); }
  .gap-3 { gap: var(--space-3); }
  .gap-4 { gap: var(--space-4); }
  .gap-6 { gap: var(--space-6); }
  .gap-8 { gap: var(--space-8); }
  
  /* Rounded corners */
  .rounded-card { border-radius: var(--radius-card); }
  .rounded-input { border-radius: var(--radius-input); }
  .rounded-modal { border-radius: var(--radius-modal); }
  
  /* Hairline dividers */
  .hairline { border-width: 1px; border-color: rgba(255, 255, 255, 0.2); }
  .hairline-30 { border-width: 1px; border-color: rgba(255, 255, 255, 0.3); }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-dark-bg text-white;
    font-family: var(--font-family);
  }
  
  /* Remove default typography since we have explicit classes */
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
  }
}

html {
  font-size: var(--font-size);
  font-family: var(--font-family);
}