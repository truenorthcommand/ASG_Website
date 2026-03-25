# ASG Website Design System

## Color Palette

### Primary Colors
- **ASG Green**: `#1B5E35` (oklch(32.5% 0.12 152))
  - Primary action color, used in buttons, accents, and highlights
  - Light variant: `#2E8B57` (oklch(48% 0.14 152))

- **ASG Navy**: `#1A2332` (oklch(18% 0.04 240))
  - Used for headings, text, and dark accents
  - Primary text color throughout the site

- **ASG Red**: `#C41E3A` (oklch(38% 0.18 20))
  - Alert and emergency color
  - Used for "Emergency 24/7" buttons and urgent CTAs

### Secondary Colors
- **White**: `#FFFFFF`
  - Header background
  - Hero content section background
  - Main content sections background

- **Dark Section**: `#22303b`
  - Stats section background (24/7, 100%, 10+, Kent)
  - CTA section background ("Ready to Work with a Team You Can Trust?")
  - Provides contrast and visual hierarchy

- **Warm Grey**: `#F5F5F0` (oklch(97% 0.005 90))
  - Card backgrounds
  - Light accent backgrounds

- **Silver**: Used for secondary accents

## Layout & Sections

### Header
- **Background**: White (`#FFFFFF`)
- **Text**: Navy (`#1A2332`) for links and labels
- **Phone Number**: Dark gray for contrast
- **Logo**: ASG transparent logo (top-left)
- **Emergency CTA**: Red button with white text

### Hero Section
- **Image**: Full-width aerial property photo (2048×536px WebP)
- **Height**: 384px mobile, 500px desktop
- **No overlay** — image displays unobstructed

### Hero Content Section
- **Background**: White (`#FFFFFF`)
- **Heading**: Navy with green accent on "Property Maintenance"
- **Body Text**: Dark gray (`#4B5563`)
- **CTAs**: "Report an Emergency" (red) and "Get a Quote" (green)

### Stats Section
- **Background**: Dark Section (`#22303b`)
- **Text**: White headings, light gray labels
- **Grid**: 2 columns mobile, 4 columns desktop
- **Stats**: 24/7, 100%, 10+, Kent & South East

### Content Sections (Why ASG, Services, Sectors)
- **Background**: White (`#FFFFFF`)
- **Headings**: Navy
- **Body Text**: Dark gray
- **Cards**: Light gray background with subtle shadows

### CTA Section
- **Background**: Dark Section (`#22303b`)
- **Heading**: White
- **Body Text**: Light gray
- **Buttons**: Green ("Get a Quote") and Red ("Emergency 24/7")

### Footer
- **Background**: White (`#FFFFFF`)
- **Headings**: Navy
- **Text**: Dark gray
- **Links**: Navy with hover to green
- **Attribution**: "Powered By TrueNorth Operations Group" (navy link)

## Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Headings**: Bold (700-900 weight), Navy color
- **Body Text**: Regular (400 weight), Dark gray color
- **Small Text**: 400 weight, Medium gray

## Button Styles

### Primary CTA (Green)
- Background: `#1B5E35`
- Text: White
- Hover: Darker green

### Emergency CTA (Red)
- Background: `#C41E3A`
- Text: White
- Hover: Darker red
- Animation: Pulsing dot indicator

### Secondary CTA (Navy outline)
- Background: Transparent
- Border: Navy
- Text: Navy
- Hover: Navy background with white text

## Spacing & Sizing

- **Container Max-Width**: 1280px (lg breakpoint)
- **Padding**: 1rem mobile, 1.5rem tablet, 2rem desktop
- **Section Padding**: 4rem vertical (py-16), 6rem on large screens (lg:py-24)
- **Gap**: 1.5rem (gap-6) for grids, 2rem (gap-8) on large screens

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

## Future Updates

When making design changes:
1. Update the CSS variables in `client/src/index.css`
2. Update this documentation file
3. Apply changes consistently across all pages
4. Test on mobile, tablet, and desktop viewports
5. Verify contrast ratios meet WCAG 2.2 AA standards
