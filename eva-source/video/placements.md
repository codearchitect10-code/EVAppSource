# EVA™ — Video Placement Checklist

**Source:** Daniel's Video Placement Guide + Prototype v10.11.27
**Created:** 8 April 2026
**Type:** Technical Reference
**Entity:** Elite Vita

---

## Summary

15 video placements across the app. All use the same VideoCard component with fullscreen player. Videos on contextual screens are dismissable (3-state: full card → text link → removed). Videos in the FAQ library are permanent (no dismiss).

---

## Video Placements

| # | Screen | Video Title | Duration | Slot | Speaker | Notes |
|---|---|---|---|---|---|---|
| 1 | Today (top of scroll) | Welcome to EVA™ — Daniel's Story | 2:45 | 15 | Daniel (no lab coat) | First item in Today scroll area |
| 2 | Today (above DEVA™ card) | Understanding DEVA™ | 1:15 | 16 | Daniel (no lab coat) | Appears before the DEVA™ 3×3×3 card |
| 3 | Today (after EVA™ Age tile) | The Biological Age Reality Check | 0:40 | 4 | Daniel (no lab coat) | Below the EVA™ Age stat tile |
| 4 | EVA™ Age detail screen (bottom) | Biological Age vs. Chronological Age | 0:55 | 13 | Daniel (no lab coat) | Below "How EVA™ Calculates This", above disclaimer |
| 5 | DEVA™ Insight (inflammation card expanded) | The Hidden Inflammation Threat | 0:40 | 8 | Daniel (lab coat) | Only appears inside the hs-CRP/inflammation insight when expanded |
| 6 | My Biology → Blood tab (top) | Why Our Blood Panel is Superior | 2:00 | 22 | Daniel (lab coat) | Above system cards |
| 7 | My Biology → Blood tab (per marker) | [Marker Name]: Supplement Protocol | 0:30 | — | — | Dynamic — appears on each suboptimal/abnormal marker card |
| 8 | My Biology → DNA tab (top) | How We Read Your DNA | 2:45 | 23 | Daniel (lab coat) | Above Methylation/Diet/Disease sections |
| 9 | My Biology → Progress tab (top) | Six Months In — A Message from Daniel | 2:15 | 25 | Daniel (no lab coat) | Shows after 2nd blood panel logged |
| 10 | Protocol (top, below header) | How Your Protocol Was Built | 1:45 | 17 | Daniel (no lab coat) | Below "Reviewed by Dr. Nival" line |
| 11 | Protocol → Supplement ⓘ modals | [Supplement]: How It Works | 0:30 | — | — | Dynamic — appears inside each supplement info modal |
| 12 | Protocol (footer) | Supplement Quality & Certifications | 2:45 | 24 | Daniel (lab coat) | Bottom of Protocol scroll area |
| 13 | Profile → About EVA™ | The Clinical Difference | 0:40 | 10 | Daniel (lab coat) | Top of About section, above logo |
| 14 | Profile → Test History | What to Expect — Your Phlebotomist Visit | 1:15 | 21 | Phlebotomist | Above test list |
| 15 | Profile → Test History | Your Results Are In — Dr. Nival | 2:15 | 20 | Dr. Nival (lab coat) | Above test list, below phlebotomist video |

---

## FAQ Video Library

All 13 standalone videos are also available in Profile → Help & FAQ → EVA™ Video Library (below the FAQ questions). These are permanent — no dismiss option. Users who remove videos from contextual screens can always rewatch here.

---

## VideoCard Behaviour

- **Thumbnail**: gradient background, play button, title, duration, X dismiss
- **Tap play**: fullscreen overlay with semi-transparent controls (play/pause, skip ±15s, progress bar, elapsed/total time). Controls auto-hide after 3 seconds, tap screen to show
- **Dismiss (X)**: collapses to "Watch: [title]" text link with small X
- **Remove (X on text link)**: fully removed from screen (returns null)
- **Permanent mode** (FAQ library only): no X button, always visible

---

## Scripts NOT Placed in App

Per Daniel's guide, the following slots are website/social only — not in the app:

Slots 1, 2, 3, 5, 6, 7, 9, 11, 12, 14, 26, 27

---

## Hosting

Videos to be hosted on CDN (Cloudflare Stream or Mux recommended). Not bundled in app. VideoCard thumbnails will load poster images from CDN. Dev team handles streaming integration — prototype uses simulated playback.
