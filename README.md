# Doodler UI

A React + TypeScript component library implementing the "Doodler" design system, built with Vite in library mode.

## Design System

### Tokens

**Colors:**
- Active: `#1D2021`
- Hover: `#2A2E2F`
- Black: `#292E31`
- Beige Accent: `#FCEFDC`
- Grey: `#F4F4F4`
- Outline Grey: `#E9E9E9`
- White: `#FFFFFF`
- Text Primary: `#303030`
- Text Secondary: `rgba(0,0,0,0.5)`
- Surface Tertiary: `#171717`

**Spacing:** 4px, 8px, 12px, 16px, 24px

**Radius:** 8px (buttons), 16px (chips/pills)

**Fonts:**
- Headings/Buttons: "Bricolage Grotesque" variable (400/500 weights, font-variation-settings: 'opsz' 14, 'wdth' 100)
- Body: "Inter" 400

All tokens are available as CSS custom properties.

## Components

### Button

A versatile button component with variants, sizes, and icon support.

**Variants:**
- `primary` - Dark background with white text
- `outline` - Transparent background with white text and grey border

**Sizes:**
- `large` - 48px height, 16px text, 24px/16px padding
- `small` - 32px height, 12px text, 16px/8px padding

**Props:**
- `variant?: 'primary' | 'outline'`
- `size?: 'large' | 'small'`
- `startIcon?: React.ReactNode` - Icon before text (20px, 8px gap)
- `endIcon?: React.ReactNode` - Icon after text (20px, 8px gap)
- `disabled?: boolean` - 40% opacity when disabled
- Standard button HTML attributes

### IconButton

An icon-only button with accessibility support.

**Sizes:**
- `large` - 24px icon
- `small` - 20px icon

**Props:**
- `size?: 'large' | 'small'`
- `aria-label: string` - Required for accessibility
- Standard button HTML attributes

### Chip

A pill-shaped chip component for labels and tags.

**Variants:**
- `default` - Black background, white text
- `secondary` - White background, black text, grey border
- `outline` - Transparent, white text, outline border

**Props:**
- `variant?: 'default' | 'secondary' | 'outline'`
- Standard div HTML attributes

## Installation

```bash
npm install
```

## Development

### Run Demo

```bash
npm run dev
```

### Build Library

```bash
npm run build
```

This generates:
- `dist/doodler-ui.es.js` - ES module format
- `dist/doodler-ui.umd.js` - UMD format
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Compiled CSS

### Storybook

View all components with matrix stories:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

## Usage

```tsx
import { Button, IconButton, Chip } from 'doodler-ui';
import 'doodler-ui/styles';

function App() {
  return (
    <>
      <Button variant="primary" size="large" startIcon={<Icon />}>
        Click me
      </Button>
      
      <IconButton size="large" aria-label="Close">
        <CloseIcon />
      </IconButton>
      
      <Chip variant="default">Label</Chip>
    </>
  );
}
```

## Project Structure

```
doodler-ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── Button.stories.tsx
│   │   ├── IconButton/
│   │   │   ├── IconButton.tsx
│   │   │   ├── IconButton.css
│   │   │   └── IconButton.stories.tsx
│   │   └── Chip/
│   │       ├── Chip.tsx
│   │       ├── Chip.css
│   │       └── Chip.stories.tsx
│   ├── styles/
│   │   ├── tokens.css
│   │   └── index.css
│   ├── index.ts          # Main entry point
│   └── demo.tsx          # Development demo
├── .storybook/           # Storybook configuration
├── vite.config.ts        # Vite library mode config
└── package.json
```

## License

MIT
# Doodler
