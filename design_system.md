# HashTrade AI - Design System

This document outlines the design system and theme for HashTrade AI. Use these guidelines for all future UI development to ensure consistency.

## Color Palette

### Core Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0B0F19` | Main application background (Deep rich dark) |
| `surface` | `#151B2B` | Card and container background |
| `surface-hover` | `#1E2538` | Hover state for surface elements |
| `primary` | `#3B82F6` | Primary brand color (Electric Blue) |
| `primary-dark` | `#2563EB` | Darker shade of primary for hover/active states |
| `accent` | `#06B6D4` | Accent color for highlights (Cyan) |
| `secondary` | `#64748B` | Muted text color |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#10B981` | Success messages, positive trends |
| `warning` | `#F59E0B` | Warnings, cautions |
| `danger` | `#EF4444` | Errors, negative trends, destructive actions |

## Typography

- **Font Family**: `Inter` (Google Fonts)
- **Usage**: Applied globally via `font-sans`.

## UI Patterns & Components

### 1. Glassmorphism & Backgrounds
- **Page Background**: `bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900`
- **Glass Cards**:
  ```tsx
  className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl"
  ```
- **Overlay/Glow**: Use absolute positioned divs with `blur-3xl` and low opacity for ambient glows.

### 2. Gradients
- **Text Gradient**:
  ```tsx
  className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
  ```
- **Icon Containers**:
  ```tsx
  className="bg-gradient-to-br from-blue-500 to-purple-600"
  ```

### 3. Inputs & Forms
- **Style**:
  ```tsx
  className="bg-slate-800/50 border border-slate-600/50 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
  ```

### 4. Buttons
- **Primary Button**:
  ```tsx
  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25"
  ```

### 5. Animations
- **Entrance**: `animate-in fade-in duration-500`
- **Pulse**: `animate-pulse` (for loading states or background elements)
- **Hover**: `hover:scale-105 transition-transform`

## Global Styles (`index.css`)
- **Scrollbar**: Custom styled with `bg-background` track and `bg-slate-700` thumb.
- **Selection**: `bg-primary/30 text-white`.
