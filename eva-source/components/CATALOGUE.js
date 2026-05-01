/**
 * EVA™ Component Catalogue
 * Shared components used across all screens
 * 
 * All components consume theme via useTheme() hook
 */

// ── Layout Components ──

/**
 * Card — Primary container for all content blocks
 * Props: { children, glow?: string (hex), onClick?: fn, style?: object }
 * Default: bg=s1, radius=16, padding=18, margin-bottom=12, border=b1
 * With glow: border colour derives from glow prop at 20% opacity
 * With onClick: cursor becomes pointer
 */

/**
 * TopBar — Back button + optional right content
 * Props: { onBack?: fn, right?: ReactNode }
 * Renders: "< Back" with ChevronLeft icon, or empty div if no onBack
 */

/**
 * TabBar — Bottom tab navigation (4 tabs)
 * Props: { active: "today"|"results-tab"|"protocol"|"profile", onNavigate: fn }
 * Tabs: Today, My Biology, Protocol, Profile
 * Each tab has SVG icon + label, active state uses purple highlight
 */

/**
 * Title — Screen title with optional subtitle
 * Props: { children, sub?: string, size?: number (default 22) }
 */

/**
 * Label — Section label (uppercase, tracked)
 * Props: { children, color?: string (default cyan) }
 * Style: 11px, letterSpacing 2.5, uppercase, bold
 */


// ── Interactive Components ──

/**
 * Btn — Primary/secondary button
 * Props: { children, variant?: "primary"|"secondary"|"ghost", onClick: fn, style?: object }
 * Primary: purple bg, white text, full width
 * Secondary: transparent bg, purple border, purple text
 * Ghost: no border, purple text
 */

/**
 * LoadingBtn — Button with loading spinner state
 * Props: { children, onClick: fn, loading: boolean, variant?: string, style?: object }
 */

/**
 * VideoCard — Video thumbnail with fullscreen player
 * Props: { title: string, duration: string, permanent?: boolean }
 * 
 * Three-state lifecycle (when not permanent):
 *   1. Full card — thumbnail with play button, title, duration, X dismiss
 *   2. Collapsed — "Watch: [title]" text link with small X
 *   3. Removed — returns null
 * 
 * Permanent mode (FAQ library): no dismiss button
 * 
 * Fullscreen player: overlay controls (play/pause, skip ±15s, progress bar)
 * Controls auto-hide after 3 seconds, tap screen to show
 * 
 * Production: replace simulated progress with actual video element
 * Videos hosted on CDN (Cloudflare Stream or Mux recommended)
 */

/**
 * InfoModal — Pop-out explainer overlay
 * Props: { title: string, text: string, onClose: fn, video?: boolean }
 * Renders: centred modal with backdrop blur, title, close button, text
 * When video=true: includes VideoCard "[title]: How It Works" above text
 * Used by: supplement info (ⓘ) buttons on Protocol screen
 */


// ── Display Components ──

/**
 * DanielAvatar — User avatar with fallback
 * Props: { size?: number (default 52), border?: string }
 * Loads Daniel_Salewski.png, falls back to "DS" initials on error
 */

/**
 * EVASymbol — EVA™ icon mark only
 * Props: { size?: number (default 40), color?: string }
 */

/**
 * EVALogo — EVA™ wordmark (symbol + E V A)
 * Props: { width?: number (default 120), color?: string }
 */

/**
 * EVAFullLogo — EVA™ wordmark + "by Elite Vita"
 * Props: { width?: number (default 120), color?: string }
 */

/**
 * MiniDNA — Small animated DNA helix (canvas-based)
 * Props: { w?: number, h?: number, emerald: string, gold: string, cyan: string }
 * Used in: EVA Age tiles, My Biology header
 */

/**
 * MiniDEVA — DEVA™ animated arc segments
 * Props: { size?: number (default 48) }
 * 6 segments in 3 colours matching DEVA™ 3×3 structure
 */

/**
 * Skeleton / SkeletonCard — Loading placeholders
 * Skeleton: Props: { width, height, radius, style }
 * SkeletonCard: Preset card-shaped skeleton
 */

/**
 * EmptyState — Empty state with icon, title, message
 * Props: { icon: ReactNode, title: string, message: string }
 */


// ── Icon Components ──
// All accept { size?: number, color?: string }

/**
 * PillIcon — Supplement capsule icon
 * ChevronLeft — Back arrow
 * ChevronRight — Forward/expand arrow
 * CheckIcon — Checkmark (used in lists, actions)
 * InfoIcon — Circle-i information icon
 * EyeIcon — Password show/hide ({ open: boolean })
 * AppleIcon — Apple logo (social auth)
 * GoogleIcon — Google logo (social auth)
 * DNAEmojiIcon — Decorative DNA strand
 * BloodDropIcon — Decorative blood drop
 * ClipboardIcon — Decorative clipboard
 */


// ── Utility Components ──

/**
 * ToastProvider — Global toast notification system
 * Wraps app. Provides toast.show(message, type) via context
 * Types: "success" (emerald), "warning" (gold), "error" (red)
 * Auto-dismisses after 2.5 seconds, slides up from bottom
 */

/**
 * FAQAccordion — Expandable FAQ list with video library
 * Self-contained component. 6 questions with expand/collapse.
 * Below questions: EVA™ Video Library (13 permanent VideoCards)
 */

/**
 * SafetyGateAlert — Critical marker alert overlay
 * Props: { level: "red"|"amber", marker, value, threshold, onBook, onDismiss }
 * Full-screen alert with pulse animation for critical biomarker values
 */
