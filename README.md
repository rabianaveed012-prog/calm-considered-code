# Rabia's Polished Portfolio

Act as a Senior UI/UX Engineer. Completely refactor and rebuild this portfolio website for "Rabia Naveed" (UI/UX Designer & Graphic Designer) into a modern, ultra-clean, pixel-perfect layout inspired by top design portfolios.

DESIGN SYSTEM & VISUAL RULES (STRICT NON-MESSY GUIDELINES):
- Color Palette: Soft Off-White Background (#F8F9FA), Elevated White Card Surfaces (#FFFFFF), High-Contrast Charcoal Dark Text (#111827), Muted Grey Secondary Text (#6B7280), subtle light grey borders (#E5E7EB).
- Grid & Spacing: Generous white space (min 80px to 120px padding between sections). Strict 12-column grid alignment with no overlapping elements.
- Typography: Sans-serif (Inter or Plus Jakarta Sans) with precise typographic scale and high visual hierarchy.
- Cards & Components: 12px to 16px soft rounded corners, subtle 1px border (#E5E7EB), and gentle hover elevation (`box-shadow: 0 4px 20px rgba(0,0,0,0.03)`).

LAYOUT & SECTION-BY-SECTION STRUCTURE:

1. NAVBAR (Sticky Glassmorphism)
- Fixed header with `backdrop-filter: blur(12px)` and a subtle bottom border.
- Left: Logo text "Rabia Naveed" (Bold, 18px).
- Center: Links (About, Work, Services, Certifications, Contact).
- Right: Pill-shaped CTA button "Let's talk".

2. HERO SECTION (Centered & Clean)
- Top Badge: "Available for freelance projects • Gujranwala, Pakistan 🇵🇰"
- Headline: Centered "Principal UI/UX designer building calm, considered digital products." (Bold, 52px+).
- Subheadline: Centered "I research, design, and systemise interfaces — from first user interview to a documented component library."
- Background Effect: Add a subtle, slow-moving ambient radial glow orb behind the text with very low opacity.
- Social Links Row: Centered row with LinkedIn, Upwork, Behance, and GitHub (NO Figma link).

3. CONTINUOUS MARQUEE TICKER
- Smooth infinite looping ticker displaying: "UI/UX Design • Web App Design • Mobile Apps • Landing Pages • Brand Identity • Design Systems •"

4. ABOUT ME SECTION (Abdulwahab Style)
- Left Side Image Frame: High-impact portrait photo with `object-fit: cover`, proper zoomed height filling the card naturally without awkward white space margins.
- Right Side Bio:
  - Headline: "Design that earns its place on the screen."
  - Bio text explaining research-driven UX and systematic interface handovers.
  - 2-Column Checklist: User research & interviews, Wireframing & Information architecture, Interface & Interaction design, Design systems & tokens, Interactive prototyping, Accessibility & responsive design.
- Integrated Stats Row (Bottom of About Section): A sleek horizontal 4-card row:
  - "2+" Years designing products
  - "20+" Projects delivered
  - "8" Professional certifications
  - "3.78" CGPA, BS Software Engineering

5. SELECTED WORK (Dynamic Project Grid)
- Headline: "Selected work"
- Subtitle: "Case studies across product, web, mobile, and brand."
- Category Filter Tabs: "All", "Web Design", "App Design", "Logo & Branding", "Social Media Posts", "Graphics".
- 2-Column Grid of project cards with tag pills, titles, and clean thumbnail placeholders ready for inner page routing.

6. MY DESIGN PROCESS (Workflow Section)
- Headline: "How I turn complex ideas into seamless products."
- 4 Numbered Horizontal Cards:
  - 01. Discover & Research — "Understanding user needs, competitor analysis, and mapping key product requirements before touching the canvas." (Tags: User Research, Competitive Audit, User Journeys)
  - 02. Wireframing & Architecture — "Structuring user flows, information architecture, and low-fidelity prototypes to validate core logic." (Tags: Information Architecture, Wireframes, User Flows)
  - 03. High-Fidelity UI & Prototyping — "Designing pixel-perfect, scalable interfaces with strict design tokens, dynamic components, and interactive prototypes." (Tags: UI Design, Interactive Prototypes, Design Tokens)
  - 04. Design System & Handover — "Documenting component libraries, auto-layout tokens, and redlines to ensure flawless frontend implementation." (Tags: Component Library, Figma Handover, Design System)

7. SERVICES (Animated Grid)
- Headline: "End-to-end design solutions tailored for growth."
- 6 Responsive animated cards with subtle hover lift and gradient border glow:
  - Website Design (Tags: Responsive, SEO-Friendly, Conversion UI)
  - Landing Pages (Tags: Hero Sections, CTAs, Lead Gen)
  - Web App & SaaS (Tags: Dashboards, SaaS UI, Complex Flows)
  - Mobile App Design (Tags: iOS / Android, Design Systems, Prototyping)
  - Logo Design (Tags: Vector Mark, Typography, Iconography)
  - Brand Guidelines (Tags: Brand Strategy, Color Tokens, Style Guides)

8. ENDORSEMENTS & TESTIMONIALS (Elevated Theme)
- Headline: "What collaborators say."
- 4 Elevated cards with subtle quote accents, avatar circles, bold client names, and role pills:
  - Goran Karanovic (Upwork Client • Strategy Specialist): "Rabia turned complex project requirements into a seamless design solution. Exceptional UX understanding and execution."
  - Muhammad Hussnain (Senior UI/UX Designer & Mentor): "Demonstrates an exceptional understanding of user-centric design principles and visual hierarchy. Her ability to translate complex logic into intuitive interfaces makes her a standout designer."
  - Ali Hassan (AI & Full-Stack Developer): "Working with Rabia on UI/UX integration was seamless. She delivers pixel-perfect designs, structured Figma components, and edge-case layouts."
  - Kinza Shafique (Design Mentor): "Rabia has an exceptional creative drive and an impressive ability to turn complex design challenges into intuitive, user-friendly experiences."

9. CERTIFICATIONS & CREDENTIALS
- Headline: "Certifications & Recognition"
- Clean, minimal 2-column list layout:
  - Foundations of User Experience (UX) Design — Google (Coursera)
  - Start the UX Design Process — Google (Coursera)
  - Graphic Design Certification — DigiSkills
  - WordPress Development — DigiSkills
  - Freelancing & Client Management — DigiSkills
  - Active Listening & Communication — Coursera / DigiSkills

10. CONTACT & FOOTER SECTION
- Large high-contrast email CTA: "rabianaveed@email.com"
- Location display: "Gujranwala, Punjab, Pakistan"
- Social links & Copyright notice.

alos remove cgpa from the design

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/99c638ff-2aa9-4323-ace1-4d82f9fe9fa7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
