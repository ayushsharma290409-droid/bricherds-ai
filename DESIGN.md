# Design Brief: Bricherds.ai

## Purpose & Context
All-in-one AI platform for chat, image generation, document analysis, and code generation. Friendly, intelligent, approachable. Light-first theme emphasizing clarity and accessibility for power users and novices alike.

## Visual Direction & Tone
Modern, playful, tech-forward. Electric teal primary conveys AI innovation; warm orange accents add personality. Clean geometry with refined shadows — premium without coldness. Optimized for feature discovery and multi-capability navigation.

## Color Palette

| Token               | OKLCH Values     | Purpose                           |
|:------------------- |:---------------- |:--------------------------------- |
| Primary             | 0.58 0.19 200    | Electric teal — core AI brand     |
| Accent              | 0.65 0.24 35     | Warm orange — friendliness, CTAs  |
| Background          | 0.99 0.002 264   | Near-white with teal undertone    |
| Foreground          | 0.11 0.015 260   | Deep charcoal — text, UI          |
| Card                | 1.0 0 0          | Pure white — content containers  |
| Muted               | 0.92 0.01 200    | Subtle teal — secondary surfaces  |
| Destructive         | 0.55 0.22 25     | Red-orange — destructive actions  |
| Chart-1 to 5        | Varied (0.65–0.78, warm to cool spectrum) | Data visualization    |

## Typography
- **Display**: General Sans (weight 600–700, size 28–48px) — logo, main headings, feature titles
- **Body**: General Sans (weight 400–500, size 14–16px) — prose, UI labels, descriptions
- **Mono**: Geist Mono (weight 500, size 12–14px) — code, tokens, command outputs

## Structural Zones

| Zone            | Surface           | Treatment                                |
|:--------------- |:----------------- |:---------------------------------------- |
| Header          | `bg-card`         | `border-b border-border` — navigation, logo, user menu |
| Sidebar         | `bg-sidebar`      | `border-r border-sidebar-border` — conversation list, new chat |
| Main Content    | `bg-background`   | Feature grid area with cards; alt. `bg-muted` for sections |
| Feature Cards   | `bg-card`         | `shadow-card` — icon, title, description, CTA |
| Footer/Status   | `bg-muted/30`     | `border-t border-border` — subtle divider |

## Shape Language
- **Border radius**: `rounded-lg` (10px) for cards, `rounded-md` (6px) for buttons, `rounded-full` for avatars
- **Spacing**: 16px (base), 8px (tight), 24px (loose). Density increases in sidebar, relaxes in hero area.
- **Shadows**: `shadow-card` (subtle UI), `shadow-elevated` (feature highlights)

## Component Patterns
- **Buttons**: Primary (teal, full width on mobile), Secondary (muted), Destructive (red-orange). Always semantic color.
- **Cards**: Consistent `shadow-card`, full-width on mobile, grid layout on desktop. Icon + title + description + CTA per feature card.
- **Inputs**: `bg-input` background, `border-border`, `focus:ring-2 ring-primary`. Placeholder text in `muted-foreground`.
- **Navigation**: Sidebar on desktop (fixed, 240px), hamburger menu on mobile. Highlighted active state via `bg-sidebar-accent` + `text-sidebar-accent-foreground`.

## Motion & Interaction
- **Transitions**: All interactive elements use `transition-smooth` (0.3s, cubic-bezier). Buttons, links, hover states.
- **Entrance**: New cards slide up + fade (`animate-slide-up`). Staggered for grid items.
- **Pulse**: Active AI processing or live updates pulse subtly (`animate-pulse-subtle`).
- **No bounce**: Smooth, confident motion — avoids gamified feel.

## Signature Detail
Bricherds logo: stylized "B" with embedded lightning bolt or neural-network pattern, rendered in primary teal. Applied in header (full lockup), favicon (icon only), and chat bubbles (icon accent). Conveys intelligence + energy.

## Differentiation
Unlike generic AI dashboards (purple + gradients), Bricherds owns teal + orange. Icon suite unique per feature (Chat bubble, Image frame, Document page, Code brackets) ensures visual scanability. Card-based layout with clear hierarchy and no decoration clutter — information breathes.

## Constraints & Quality Bar
- No full-page gradients; use solid + accent accents only.
- Text always ≥4:1 WCAG AA contrast (verify via DevTools).
- Font size floor: 14px on mobile, 16px on desktop.
- Buttons always have at least 44px tap target (iOS/Android standard).
- No more than 3 accent colors per page section.
- All animations under 400ms; prefer 200–300ms for micro-interactions.

## Dark Mode (Future)
Inverted values: background ~0.145 (near-black), foreground ~0.95 (near-white), primary 0.8 (bright teal). To be designed after light theme stabilizes. Do NOT implement dark mode CSS until explicit request.
