# 🚀 Apta — Learn, Rank, Get Hired.

**Apta** is a two-sided, merit-based talent and hiring platform that combines Duolingo-like daily learning, LinkedIn-like professional identity, and Bumble-like recruiter discovery — all powered by a transparent ranking engine where **skill is the only currency**.

> 🏆 *Competition Prototype — Built with Next.js 15, React 19, TypeScript & Tailwind CSS v4*

---

## ✨ Core Concept

| For Candidates | For Recruiters |
|---|---|
| Take daily domain tests (5 min/day) | Define role requirements & minimum rank |
| Build streaks, earn ranking points | Get a curated stack of verified candidates |
| Rise from Unranked → Bronze → ... → Legend | Swipe right to shortlist, left to pass |
| Get verified skills & certifications | Use AI-generated personalized outreach |
| Get discovered by top companies | View hiring funnel & pipeline analytics |

**Key principle**: Rankings are earned, never bought. Pro users get better tools, NOT better visibility.

---

## 🎮 Interactive Demo Flows

### Candidate Journey
1. **Onboarding** → Connect LinkedIn, select domain, upload certificates
2. **Dashboard** → View rank, streak heatmap, AI coaching suggestions
3. **Daily Test** → Timed Duolingo-style quiz with instant feedback & scoring
4. **Leaderboard** → Domain-filtered rankings with tier distribution

### Recruiter Journey
1. **Setup** → Define domain, minimum rank, required skills
2. **Swipe Discovery** → Review candidate cards, swipe or use keyboard arrows
3. **Pipeline** → Kanban board with shortlisted, contacted, interviewing stages

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | Custom design system (15 primitives) |
| Icons | Lucide React |
| Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |
| Animations | CSS keyframes + Intersection Observer |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (14 scrollable sections)
│   ├── candidates/         # Candidate journey page
│   ├── recruiters/         # Recruiter journey page
│   ├── rankings/           # Public leaderboard
│   ├── ai-tools/           # AI features showcase
│   ├── pricing/            # Pricing comparison
│   ├── faq/                # FAQ accordion
│   ├── login/              # Demo login choice
│   └── demo/
│       ├── candidate/      # Onboarding, Dashboard, Daily Test, Leaderboard
│       └── recruiter/      # Setup, Swipe Discovery, Pipeline
├── components/
│   ├── ui/                 # 15 shared UI primitives
│   ├── layout/             # Navbar, Footer
│   ├── marketing/          # 12 homepage sections
│   ├── pricing/            # Pricing components
│   └── faq/                # FAQ components
├── data/                   # Mock data (candidates, questions, pricing, etc.)
├── lib/                    # Utilities & constants
└── types/                  # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd apta-web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📊 Pages & Routes (16 total)

| Route | Description |
|-------|-------------|
| `/` | Homepage with 14 scrollable marketing sections |
| `/candidates` | Candidate journey deep-dive |
| `/recruiters` | Recruiter journey deep-dive |
| `/rankings` | Live leaderboard demo |
| `/ai-tools` | AI capabilities showcase |
| `/pricing` | Full pricing comparison |
| `/faq` | Frequently asked questions |
| `/login` | Demo login choice screen |
| `/demo/candidate/onboarding` | 3-step onboarding wizard |
| `/demo/candidate/dashboard` | Full candidate dashboard |
| `/demo/candidate/daily-test` | Interactive quiz interface |
| `/demo/candidate/leaderboard` | Domain-filtered rankings |
| `/demo/recruiter/setup` | Job requirements setup |
| `/demo/recruiter/swipe` | Swipe-based discovery |
| `/demo/recruiter/pipeline` | Hiring funnel kanban |

---

## 🎨 Design System

- **Colors**: Navy midnight base, orange primary accent, semantic colors (emerald, gold, rose, sky)
- **Rank Tiers**: Unranked → Bronze → Silver → Gold → Platinum → Diamond → Elite → Legend
- **Typography**: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (stats)
- **Effects**: Glassmorphism, glow effects, grid backgrounds, scroll-triggered animations
- **Accessibility**: Keyboard navigation, reduced motion support, focus rings

---

## 📌 Notes

> This is a **competition prototype**. Authentication, data persistence, and AI features are mocked to demonstrate the product vision and user experience. See the implementation plan for post-competition roadmap.

---

## 🏗 Built With ❤️

Made for competition by the Apta team. All rankings are earned, never bought.
