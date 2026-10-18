# FitCue — product & design plan

> **Status:** design direction finalized · 18 Oct 2026
> **What it is:** a video-first gym app. Users answer a short quiz, get a personal multi-week plan made of coach-led follow-along videos, and train along with the video while logging sets. Free tier hooks, Premium subscription earns, add-ons (program packs, form checks, 1:1 coaching) raise revenue per user.

**Working name: FitCue.** A quick web search found no fitness app with this exact name, but run a proper trademark and App Store / Play Store check before launch.

---

## 1. Final design direction

**Dark + ember orange, structured like PowerPeak.**

After scanning about 140 Dribbble shots across three searches ("gym", "fitness paywall", "workout video player") and opening the ~20 most relevant, PowerPeak by Phenomenon Studio was the most complete reference: onboarding quiz, AI plan builder, plan review, workout detail with exercise videos, completion summary, stats, challenges and leaderboard. Its dark + orange palette also matches the best video-player reference (sandow v2), so the screens it lacks can be filled without the styles clashing.

The mockups in this repo are **original screens drawn in that direction**, not copies. The Dribbble shots belong to their designers and are linked in [section 9](#9-references-inspiration-only) as inspiration only. The orange pictogram athletes are placeholders for real video stills.

**Decision log**

| Version | Pick | Why it changed |
|---|---|---|
| v1 | Sharif Khan "GYM Mobile App" (dark + lime) | Best of the first 48 "gym" results, but only 3 screens |
| v2 | **PowerPeak (dark + orange)** | Broader search found a far more complete flow. Dark + lime (Tino + Sharif Khan + FitLife) stays as the fallback palette |

---

## 2. Complete flow

![FitCue complete flow](mockups/png/flow-overview.png)

Full-resolution, zoomable version: clone the repo and open [`mockups/flow.html`](mockups/flow.html) in a browser. Each screen is also exported to `mockups/png/` at 2× for dev handoff.

```
Welcome → Quiz (goal → level & equipment → schedule → body & limits) → Building plan
       → Plan preview → Create account → PAYWALL ─┬─ trial/subscribe → Home (Premium)
                                                   └─ close (×) ─────→ Home (Free: Week 1 only)

Home → Program → Workout overview → Video player ⇄ Rest & log set → Workout complete → Home
Library → Program / Coach profile · any 🔒 → Locked sheet → trial or one-time pack
Progress · Challenges → 🔒 Premium cards → Paywall
Profile → Manage subscription → Cancel → Win-back offer (discount or pause)
```

---

## 3. Screens

### Stage 1 · Acquire — quiz → plan → account → paywall

<p>
<img src="mockups/png/01-welcome.png" width="160" alt="Welcome">
<img src="mockups/png/02-goal.png" width="160" alt="Quiz: goal">
<img src="mockups/png/03-experience.png" width="160" alt="Quiz: level and equipment">
<img src="mockups/png/04-schedule.png" width="160" alt="Quiz: schedule">
<img src="mockups/png/05-body.png" width="160" alt="Quiz: body and limits">
</p>
<p>
<img src="mockups/png/06-building.png" width="160" alt="Building your plan">
<img src="mockups/png/07-plan-preview.png" width="160" alt="Plan preview">
<img src="mockups/png/08-signup.png" width="160" alt="Create account">
<img src="mockups/png/09-paywall.png" width="160" alt="Paywall">
</p>

| # | Screen | What it does | Paywall role |
|---|---|---|---|
| 01 | Welcome | One promise, one button. English / Hindi toggle. | — |
| 02 | Quiz · Goal | Build muscle / lose fat / get stronger / move better | — |
| 03 | Quiz · Level & equipment | Filters the library to what the user can do and owns | — |
| 04 | Quiz · Schedule | Days per week, which days, session length → plan + reminders | — |
| 05 | Quiz · Body & limits | Weight, height, age, injuries → starting loads and exercise swaps | — |
| 06 | Building your plan | Short build step that shows the answers mattered | — |
| 07 | Plan preview | Shows the finished 8-week plan before asking for anything | Week 1 free, Weeks 2–8 shown locked |
| 08 | Create account | Apple / Google / phone / email so plan and purchases sync | — |
| 09 | **Paywall** | Trial timeline (Today → Day 5 reminder → Day 7 billing), annual pre-selected | **Main conversion point.** × keeps the free tier |

### Stage 2 · Train — the daily loop

<p>
<img src="mockups/png/10-home.png" width="160" alt="Home">
<img src="mockups/png/11-library.png" width="160" alt="Library">
<img src="mockups/png/12-program.png" width="160" alt="Program">
<img src="mockups/png/13-workout.png" width="160" alt="Workout overview">
</p>
<p>
<img src="mockups/png/14-player.png" width="160" alt="Video player">
<img src="mockups/png/15-rest-log.png" width="160" alt="Rest and log set">
<img src="mockups/png/16-complete.png" width="160" alt="Workout complete">
</p>

| # | Screen | What it does | Paywall role |
|---|---|---|---|
| 10 | Home | Today's session as the hero, streak, week strip, continue watching | Gold upgrade card for free users |
| 11 | Library | Search, categories, programs, coaches, quick workouts | Lock badge on premium videos → sheet 19 |
| 12 | Program | A program is a video playlist grouped by week | Weeks 2+ and downloads locked for free |
| 13 | Workout overview | Moves, sets, equipment, knee-friendly swaps applied | Cast / download need Premium |
| 14 | **Video player** | Follow-along video, set counter, coach cue, up next, speed, captions | Coach voice cues, speed, cast: Premium |
| 15 | Rest & log set | Rest timer + log weight/reps/effort without stopping the video | Next-weight suggestion: Premium |
| 16 | Workout complete | Stats, personal record, streak, "how did it feel" feeds the next plan | — |

### Stage 3 · Retain

<p>
<img src="mockups/png/17-progress.png" width="160" alt="Progress">
<img src="mockups/png/18-challenges.png" width="160" alt="Challenges">
</p>

| # | Screen | What it does | Paywall role |
|---|---|---|---|
| 17 | Progress | Weekly volume, streak, personal records | Muscle balance + long-term trends blurred for free |
| 18 | Challenges | Monthly challenge, leaderboard, friends, badges | Coach-led challenges are Premium |

### Stage 4 · Monetize & account

<p>
<img src="mockups/png/19-locked.png" width="160" alt="Locked content sheet">
<img src="mockups/png/20-coach.png" width="160" alt="Coach profile">
<img src="mockups/png/21-form-check.png" width="160" alt="Form check add-on">
<img src="mockups/png/22-profile.png" width="160" alt="Profile and subscription">
<img src="mockups/png/23-winback.png" width="160" alt="Win-back offer">
</p>

| # | Screen | What it does | Paywall role |
|---|---|---|---|
| 19 | Locked content sheet | Any 🔒 opens this instead of a dead end | Trial for everything, or buy this program once |
| 20 | Coach profile | Coaches are the brand; their page sells their work | One-time packs + 1:1 coaching |
| 21 | Form check | Upload a set, the coach replies within 48 h | Credit packs, Premium gets 20% off |
| 22 | Profile & subscription | Plan status, downloads, Health apps, reminders, restore | Family plan upsell, Manage → cancel flow |
| 23 | Win-back offer | Shown once on cancel: 50% off 3 months, or pause | Store promotional offer |

---

## 4. Features by tier

| Area | Free (hook) | Premium (subscription) | Screens |
|---|---|---|---|
| Onboarding | Full quiz + personal plan preview | — | 02–07 |
| Programs | Week 1 of your plan + a few free quick workouts | All weeks, all programs, new videos monthly | 07, 11, 12 |
| Video player | Follow-along video, timer, set counter | Coach voice cues, speed control, cast to TV, offline downloads | 13, 14 |
| Logging | Reps and weight per set | Next-weight suggestions, automatic progression | 15 |
| Personalisation | Fixed plan from the quiz | Plan adapts to logged sets and "how did it feel" | 16 |
| Progress | Streak, weekly volume, personal records | Muscle balance, long-term trends, body measurements | 17 |
| Community | Public monthly challenges, leaderboard | Coach-led challenges | 18 |
| Integrations | — | Apple Health / Health Connect, heart-rate wearables | 22 |
| Nutrition (later) | Daily calorie target | Meal plans, macros | — |

**Add-ons on top of the subscription**

- **Program packs** — buy one program forever (₹799). Revenue share with the coach. (19, 20)
- **Form checks** — credit packs for async video reviews. (21)
- **1:1 coaching** — monthly, limited by coach capacity. (20)
- **Family plan** — up to 4 extra people. (22)

---

## 5. Pricing (starting points to A/B test)

| Product | Price | Notes |
|---|---|---|
| Premium monthly | ₹399 / month | No trial |
| **Premium annual** | **₹2,499 / year** (≈ ₹208 / month, 48% off) | 7-day free trial, pre-selected |
| Program pack | ₹799 one-time | Non-consumable purchase |
| Form check credits | ₹299 × 1 · ₹1,199 × 5 · ₹1,999 × 10 | Premium −20% |
| 1:1 coaching | from ₹2,999 / month | Per coach |
| Family add-on | +₹1,499 / year | Up to 4 people |
| Win-back | 50% off for 3 months | One per user |

**Paywall touchpoints:** after the plan preview (09) · any lock (19) · premium actions like download, cast, voice cues (13, 14) · blurred stats (17) · coach challenges (18) · home upgrade card (10) · cancel flow (23).

**Honesty rules (keep store reviewers and users on side)**

- The × on the paywall is always visible; closing keeps the free tier working.
- Actually send the Day 5 trial reminder the timeline promises.
- Countdown timers and "accepting clients" labels only when they're true.
- "Restore purchase" on the paywall and in Profile.
- Store rules: subscriptions, packs and form-check credits go through in-app purchase. Live 1:1 coaching *may* qualify for outside payment under Apple's person-to-person services rule (3.1.3(d)) — check the current guideline before building.

---

## 6. Design system

Source of truth: [`mockups/styles.css`](mockups/styles.css).

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0D0B0A` | App background (warm near-black, flatters video) |
| `--surface` / `-2` / `-3` | `#171311` / `#201A17` / `#2B231F` | Cards, inputs, tracks |
| `--text` / `--muted` / `--dim` | `#F7F3F0` / `#A8A09A` / `#6F6762` | Text hierarchy |
| `--ember` | `#FF5B1F` | Primary actions, progress, active tab |
| `--ember-grad` | `#FF8A3D → #FF5B1F → #E2410F` | Primary buttons, rings, video placeholders |
| `--gold` | `#FFC048` | **Only** Premium / PRO / paywall touchpoints |
| `--green` | `#34D399` | Personal records, success, "+12%" |
| Type | Inter Display (headings), Inter (UI) | 30 / 22 / 17 / 15 / 13 / 11 px |
| Radius | 10 · 16 · 22 · 28 px | Chips · buttons · cards · heroes |

**Rules:** orange means "do this", gold means "this is Premium" — never swap them. One primary button per screen, pinned to the bottom on full-screen flows. Video thumbnails always carry duration + lock state.

**Components in the mockups:** quiz option card, segmented control, number picker, day picker, chips, primary/ghost/light/gold buttons, plan selector, trial timeline, hero video card, tile, list row, lock badge, PRO badge, upgrade banner, stat card, bar chart, rest ring, stepper, player controls, set dots, coach cue, leaderboard row, bottom sheet, settings group, countdown.

---

## 7. Build notes

- **Video:** HLS adaptive streaming behind a CDN (e.g. S3 + MediaConvert + CloudFront, or a managed service like Mux / Cloudflare Stream). Signed, short-lived URLs so paid videos can't be scraped. Offline downloads encrypted per device.
- **Content model:** Coach → Program → Week → Session → Exercise (each exercise has a short demo loop + the follow-along segment, tagged by muscle, equipment, level, duration, knee/back/shoulder-safe swaps).
- **Subscriptions:** RevenueCat (or StoreKit 2 + Play Billing) with entitlements `premium`, plus non-consumables for packs and consumables for form-check credits. Use its paywall experiments to test prices.
- **Admin CMS:** upload videos, tag exercises, build programs, review form checks, see funnel analytics. Reference: Fitonist admin dashboard (section 9).
- **Funnel analytics events:** `quiz_step_completed`, `plan_preview_viewed`, `account_created`, `paywall_viewed {source}`, `trial_started`, `purchase {product}`, `workout_started/completed`, `lock_tapped {content}`, `cancel_flow_viewed`, `winback_accepted`.
- **Content production:** shoot real videos to replace the pictograms. Each exercise needs a front and side angle; thumbnails come from stills.

### Regenerating the mockups

```bash
cd mockups
pip install playwright && python -m playwright install chromium   # once
python3 build.py      # screens/*.html → flow.html
python3 export.py     # flow.html → png/*.png (or: python3 export.py 09-paywall)
```

Each screen is a small HTML fragment in `mockups/screens/` (metadata on the first line). Icons are `{{i:name}}`, figures are `{{fig:pose}}`.

---

## 8. Next steps

1. Trademark + store-name check for "FitCue".
2. Shoot 2–3 sample sessions with one coach to test the player and thumbnails.
3. Turn these mockups into a clickable prototype (or go straight to the app shell) and test the quiz → paywall flow with 5–10 target users.
4. Set up RevenueCat products and the paywall A/B test (annual price, trial length).
5. Build the admin CMS before scaling content.

---

## 9. References (inspiration only)

These shots belong to their designers. Use them for ideas, don't copy screens or photos. To get production designs in this style, hire a designer — several of these list themselves as available for work.

| Reference | Designer | What we took from it |
|---|---|---|
| [PowerPeak – Fitness Mobile App Design](https://dribbble.com/shots/26144127-PowerPeak-Fitness-Mobile-App-Design) | Phenomenon Studio | Overall structure, dark + orange palette, quiz, plan review, completion, challenges |
| [sandow v2 – Workout Video Player UI](https://dribbble.com/shots/25678465-sandow-v2-AI-Fitness-Nutrition-App-Workout-Video-Player-UI) | strangehelix | Program as a video playlist, "up next" card |
| [FitLife – Premium Paywall (Dark Mode)](https://dribbble.com/shots/27125323-FitLife-Premium-Paywall-Daily-Stats-UI-Dark-Mode) | Archana Hiremath | Dark paywall, yearly "save %" card, rupee pricing |
| [Calorie – High conversion paywall](https://dribbble.com/shots/21481349-Calorie-High-conversion-paywal-design) | Dibbendo Pranto | Trial timeline, limited-time offer screen |
| [Onboarding and paywall for fitness app](https://dribbble.com/shots/14687032-Onboarding-and-paywall-for-fitness-app) | Hanna | Pricing a video course in access tiers |
| [PEAK Coaching – Pricing & Payment](https://dribbble.com/shots/21550809-PEAK-Coaching-Pricing-Payment) | Bothrs | Credit bundles for coaching, referral after purchase |
| [Fitness & Nutrition App](https://dribbble.com/shots/26290699-Fitness-Nutrition-App) | Tino | Exercise video player with weight-progress chart (fallback lime palette) |
| [GYM Mobile App UI UX Design](https://dribbble.com/shots/26804100-GYM-Mobile-App-UI-UX-Design-Workout) | Sharif Khan | Trainer profile + offer banner (fallback lime palette) |
| [Fitonist – AI-Powered Gym Mobile App](https://dribbble.com/shots/25696711-Fitonist-AI-Powered-Gym-Mobile-App) | Outcrowd | Onboarding question order (live app — don't mirror its look) |
| [Fitonist – Admin analytical dashboard](https://dribbble.com/shots/27091865-Fitonist-Admin-analytical-dashboard-for-the-fitness-app) | Outcrowd | Admin CMS / analytics ideas |
