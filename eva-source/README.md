# EVA™ by Elite Vita — Developer Handoff Package

**Version:** 10.11.37  
**Date:** April 2026  
**Prepared by:** Design Team

---

## What This Package Contains

```
eva-handoff/
├── README.md                          ← You are here
├── eva-prototype-v10_11_37.jsx        ← Desktop prototype (single-file, all screens)
├── eva-mobile-app-v10_11_37.jsx       ← Mobile PWA prototype (all screens, no IA/Flow views)
├── theme/
│   └── tokens.js                      ← Colour palette, typography, spacing, shadows
├── components/
│   └── CATALOGUE.js                   ← Every shared component with props and behaviour
├── data/
│   ├── blood-markers.js               ← 70 biomarkers across 6 systems (illustrative)
│   ├── dna-systems.js                 ← 3 DNA analysis systems with variants (illustrative)
│   └── supplements.js                 ← 7 supplements with clinical descriptions (illustrative)
├── navigation/
│   └── routes.js                      ← Screen registry (IDs, names, journey groups)
└── assets/
    └── (SVG logo paths are inline in tokens — extract as needed)
```

---

## Architecture Overview

The prototype is built as a single-file React application for rapid iteration. For production, split into standard React Native project structure.

### File Structure Guide (eva-prototype JSX)

| Lines | Section | Dev Relevance |
|-------|---------|---------------|
| 1–14 | Imports | Keep — standard React imports |
| 15–50 | Theme tokens | Port to your theme system |
| 51–77 | SVG logo paths, avatar URL | Extract to asset files |
| 78–230 | Shared components | Port to /components/ |
| 231–3877 | **All app screens** | **Primary dev reference** |
| 3878–3982 | SCREENS registry + screen meta | Port to navigation config |
| 3983–4119 | IAMapView | **Design tool — ignore** |
| 4120–4236 | TokensView | **Design tool — ignore** |
| 4237–4635 | UserFlowView | **Design tool — ignore** |
| 4636–4810 | App root + view switcher | Simplify — remove view switcher, keep navigation logic |

The mobile PWA file (`eva-mobile-app`) contains lines 1–3982 equivalent only — no design tool views.

### Theme System
- Two themes: light and dark (see `theme/tokens.js`)
- Theme consumed via React Context (`useTheme()` hook)
- All colours referenced as theme properties — no hardcoded values in components
- Typography: Gilroy (Plus Jakarta Sans as web fallback)

### Navigation
- Stack-based navigation with animated transitions (slide in/out)
- 4-tab bottom bar: Today, My Biology, Protocol, Profile
- Screen registry in `navigation/routes.js` maps IDs to components
- SubTarget pattern: some navigations pass a sub-screen target (e.g. navigate to Profile with `subTarget="reports"`)

### Screen Inventory (34+ screens)

| Screen ID | Name | Entry Point |
|-----------|------|-------------|
| splash | Splash | App launch |
| welcome | Welcome | After splash |
| learn | Learn More | Welcome → Learn More |
| create-account | Create Account | Welcome → Get Started |
| email-verify | Email Verification | After account creation |
| terms | Terms & Consent | After email verify |
| questionnaire | Health Questionnaire | After consent (6 steps) |
| book-test | Book Test | After questionnaire |
| fanfare | Celebration | After booking |
| signin | Sign In | Welcome → Sign In |
| otp-verify | OTP Verification | After sign in |
| forgot-password | Forgot Password | Sign in → Forgot |
| biometric-prompt | Biometric Setup | After OTP |
| welcome-back | Welcome Back | After biometric |
| today | Today (tab) | Main screen |
| deva-insight | DEVA™ Insight | Today → DEVA card |
| deva-action | DEVA™ Action | Insight → action |
| supplement-detail | Supplement Detail | Action → supplement |
| eva-age | EVA™ Age | Today → EVA Age tile |
| results-tab | My Biology (tab) | Tab bar |
| protocol | Protocol (tab) | Tab bar |
| profile | Profile (tab) | Tab bar (15 sub-sections) |
| report-viewer | My Reports | Download buttons / Profile |
| dna-report | DNA Reports | Wrapper → report-viewer with DNA tab |
| subscription | Subscription | Profile → Subscription |
| clinician-chat | Contact Clinician | Profile → Contact |
| safety-demo | Safety Gate | Triggered by critical markers |
| notifications | Notifications | Today → bell icon |
| retest | Re-Test Prompt | 90-day reminder |
| waiting | Waiting | Blood/DNA processing |
| results | Results Reveal | When results ready |

### Profile Sub-Sections (15)
Personal Information, Health Questionnaire, Notifications, Consent Management, Change Password, Subscription, Connected Devices (8 wearables), Contact Clinician, Help & FAQ (with Video Library), Test History, My Reports, My Supplements, Refer a Friend, EVA™ Store (Coming Soon), About EVA™

---

## Illustrative Data

All data in the prototype and data files is **illustrative only** — created to demonstrate screen layouts, component behaviour, and user flows. Specifically:

- Blood biomarker values, ranges, and clinical descriptions are representative examples
- DNA gene variants, risk levels, and polygenic scores are placeholder
- Supplement names, dosages, and rationales are illustrative
- Patient details (Daniel Salewski) are placeholder
- Video titles and durations reflect planned content but videos are not yet produced
- Pricing, package names, and subscription terms should be confirmed with the client

All clinical content, biomarker data, supplement protocols, and patient-facing copy must be reviewed and approved by Elite Vita's clinical team before production use.

---

## Video System

15 video placements throughout the app. All use the same VideoCard component.

**Behaviour:**
- Thumbnail → tap play → fullscreen overlay player
- Dismissable: full card → text link → removed
- FAQ library: permanent (no dismiss)
- Videos hosted on CDN (Cloudflare Stream or Mux recommended)
- Prototype uses simulated playback — replace with actual video element

**Placements:** See inline comments in prototype or the separate Video Placement Checklist document.

---

## Key Patterns for Dev Team

### Gender Gating
- Biological sex captured at Create Account screen
- Gates questionnaire step 6 (male: libido only; female: menstrual status with conditional sub-questions)
- Gates blood results (female-only hormones section)

### GCC Address System
- 6 countries: UAE, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar
- Country-dependent second dropdown label: Emirate (UAE), Region (Saudi), Governorate (Bahrain/Kuwait), Governorate (Oman), Municipality (Qatar)
- Changing country clears the area selection
- Profile supports up to 3 addresses with preferred delivery toggle

### Emirates ID Formatting
- Auto-formats as user types: 784-XXXX-XXXXXXX-X
- Toggle to Passport mode: free text, auto-uppercase, max 12 chars
- Image upload: 4 states (none → picking → loading → done)

### Test Status Demo States
- Today screen has a demo bar (development only) to simulate: Pending, Results Ready, Active
- Each state changes the progress card, DEVA™ availability, and overall screen content
- Remove demo bar for production

### Dark/Light Mode
- System, Light, Dark options (segmented control in Profile → Appearance)
- All components use theme tokens — switching is instant
- Persisted in app state

---

## What's Not in the Prototype

The following need backend implementation:
- Actual authentication (email/password, social auth, OTP, biometrics)
- Blood/DNA data ingestion from lab APIs (UniLab, OmicsEdge)
- Clinician dashboard and protocol approval workflow
- Payment processing (Stripe/Apple Pay/Google Pay)
- Push notifications
- Video CDN integration
- Supplement ordering and fulfilment
- Real-time DEVA™ generation engine
- Wearable integrations (Apple Health, Google Fit, Whoop, Oura, Garmin, etc.)
- UAE data residency and PDPL compliance infrastructure

---

## Outstanding Decisions

| Decision | Status | Impact |
|----------|--------|--------|
| DNA provider (SelfDecode vs OmicsEdge) | Awaiting Daniel | DNA data format, API integration |
| Bio Age visual concept | Awaiting Daniel (6 options presented) | EVA Age screen design |
| Per-marker blood category descriptions | Awaiting from client | Blood system intro text |
| Breast Cancer / Ovarian Cancer variant counts | TBC placeholder | Disease risk display |

---

## Brand Guidelines

Refer to the separate EVA™ Brand Guidelines PDF for:
- Logo usage rules and clear space
- Colour palette (matches tokens.js)
- Typography specifications
- Trademark rules (EVA™ always with ™ on first mention)
- Photography and imagery style
- Do's and don'ts
