# Icon Library

This directory contains the Doodler icon library. Icons are stored as React components following a consistent pattern.

## Structure

Each icon is a React component that:
- Accepts standard SVG props
- Has a `size` prop (default: 16)
- Uses `currentColor` for stroke/fill to inherit text color
- Follows the naming convention: `Icon{Name}.tsx`

## Usage

```tsx
import { IconPen, IconCheck, IconArrowRight } from '@/icons';

// Basic usage
<IconPen />

// With custom size
<IconPen size={24} />

// With custom color (via className or style)
<IconPen className="text-blue-500" />
<IconPen style={{ color: '#303030' }} />
```

## Available Icons

- `IconPen` - Pen/pencil icon
- `IconCheck` - Checkmark
- `IconCross` - X/close icon
- `IconArrowRight` - Right arrow
- `IconArrowLeft` - Left arrow
- `IconArrowUp` - Up arrow
- `IconArrowDown` - Down arrow
- `IconChevronRight` - Right chevron
- `IconChevronLeft` - Left chevron
- `IconChevronUp` - Up chevron
- `IconChevronDown` - Down chevron

## Adding New Icons

To add a new icon from the Figma library:

1. Get the icon SVG from Figma
2. Create a new file: `Icon{Name}.tsx`
3. Use the template from `IconPen.tsx` as a reference
4. Export the icon from `index.ts`
5. Update this README

## Icon Source

Icons are sourced from the Doodler Figma design system:
https://www.figma.com/design/OaEWVHSkN6nSBxGn28jwAk/Doodler-POC?node-id=3-4829
