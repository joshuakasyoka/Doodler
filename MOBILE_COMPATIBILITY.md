# Mobile Compatibility Guide

This document outlines the mobile-responsive design patterns implemented in the Doodler UI component library.

## Breakpoints

- **Mobile**: < 768px (default/base styles)
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

Breakpoints are defined in `src/styles/tokens.css`:
- `--doodler-breakpoint-mobile: 768px`
- `--doodler-breakpoint-tablet: 1024px`

## Mobile-First Approach

All components follow a mobile-first design pattern:
1. Base styles target mobile devices
2. Media queries enhance for larger screens
3. Progressive enhancement for tablet and desktop

## Touch-Friendly Design

### Minimum Touch Targets
- All interactive elements have a minimum size of **44x44px** on mobile
- Buttons, links, and form inputs meet accessibility guidelines
- Icon buttons have padding to increase touch area on mobile

### Touch Optimizations
- `touch-action: manipulation` prevents double-tap zoom delays
- `-webkit-tap-highlight-color: transparent` removes default tap highlights
- Proper spacing between interactive elements

## Component-Specific Mobile Adaptations

### Button
- Small buttons: 44px height on mobile, 32px on desktop
- Font sizes adjust: 14px on mobile, 12px on desktop for small buttons
- Full-width on mobile when in constrained layouts

### StepsComponent
- Navigation wraps on mobile for better readability
- Font size: 14px on mobile, 16px on desktop
- Steps can wrap to multiple lines if needed

### ImageDisplay
- Responsive image wrapper with aspect ratio preservation
- Full-width on mobile, fixed width on desktop
- Caption text centers on mobile, left-aligns on desktop

### Tab
- Touch-friendly padding: 12px vertical on mobile
- Font size: 14px on mobile, 16px on desktop
- Minimum height: 44px for touch targets

### Content
- Reduced padding on mobile: 12px vs 16px on desktop
- Text wraps properly with `word-wrap: break-word`
- Line height optimized for readability

### Prototype Page
- Reduced padding: 16px on mobile, 32px on desktop
- Content stacks vertically on mobile
- Logo scales: 28px on mobile, 32px on desktop
- Heading font size: 24px on mobile, 30px on desktop
- Step content switches from column to row layout at tablet breakpoint

## Responsive Utilities

### Container Class
```css
.container {
  width: 100%;
  max-width: 100%;
  padding-left: var(--doodler-spacing-16);
  padding-right: var(--doodler-spacing-16);
}
```

### Hide/Show Utilities
- `.hide-mobile` - Hidden on mobile, visible on tablet+
- `.show-mobile` - Visible on mobile, hidden on tablet+

### Text Responsive
- `.text-responsive` - Scales from 14px to 16px

## Best Practices

1. **Always test on real devices** - Emulators may not catch all touch issues
2. **Use relative units** - Prefer `rem`, `em`, or CSS custom properties over fixed pixels
3. **Flexible layouts** - Use flexbox/grid with appropriate wrapping
4. **Touch targets** - Ensure all interactive elements are at least 44x44px
5. **Text readability** - Maintain appropriate line heights and font sizes
6. **Image optimization** - Use responsive images with proper aspect ratios

## Testing Checklist

- [ ] All buttons are easily tappable (44x44px minimum)
- [ ] Text is readable without zooming
- [ ] Layout doesn't break on small screens
- [ ] Images scale properly
- [ ] Navigation is accessible
- [ ] Forms are usable on mobile
- [ ] No horizontal scrolling
- [ ] Touch interactions feel responsive

## Browser Support

- iOS Safari 12+
- Chrome Mobile
- Firefox Mobile
- Samsung Internet

All modern mobile browsers are supported with progressive enhancement.
