# 🚀 Apta — Learn, Rank, Get Hired.

Apta is a two-sided, merit-based talent and hiring platform that combines Duolingo-like daily learning, LinkedIn-like professional identity, and Bumble-like recruiter discovery — all powered by a transparent ranking engine where skill is the only currency.

**🏆 Competition Prototype — Built with Next.js 15, React 19, TypeScript, Tailwind CSS v4 & Zustand**

## ✨ Core Concept

| For Candidates | For Recruiters |
|---|---|
| Take daily domain tests (5 min/day) | Define role requirements & minimum rank |
| Build streaks, earn ranking points | Get a curated stack of verified candidates via AI Scoring Engine |
| Rise from Unranked → Bronze → ... → Legend | Export matching talent directly to CSV |
| Get verified skills & certifications | Swipe right to shortlist, left to pass |
| Get discovered by top companies | View hiring funnel & pipeline analytics |

*Key principle: Rankings are earned, never bought. Pro users get better tools, NOT better visibility.*

## 🎮 Interactive Demo Flows

### Candidate Journey
- **Onboarding** → Connect LinkedIn, select domain, upload certificates
- **Dashboard** → View rank, streak heatmap, AI coaching suggestions
- **Daily Test** → Timed Duolingo-style quiz with instant feedback & scoring
- **Leaderboard** → Domain-filtered rankings with tier distribution

### Recruiter Journey (Powered by Redrob Competition Data)
- **Setup** → Define domain, minimum rank, required streak, and skills.
- **Search & Rank Engine** → Evaluates thousands of candidates from the competition dataset (`competition_candidates.json`) using a weighted scoring algorithm to find the absolute top matches.
- **Export / Swipe Discovery** → Export the top N candidates directly to CSV, or review candidate cards (with AI reasoning) by swiping.
- **Pipeline** → Kanban board with shortlisted, contacted, and interviewing stages, with AI-generated personalized outreach.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **State Management** | Zustand (Client-side Stores) |
| **Styling** | Tailwind CSS v4 |
| **UI** | Custom design system (15 primitives) |
| **Icons** | Lucide React |
| **Fonts** | Plus Jakarta Sans, Inter, JetBrains Mono |
| **Animations** | CSS keyframes + Intersection Observer |

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
├── data/                   # JSON datasets (competition_candidates.json) & Mock data
├── features/               # Domain-driven feature modules (e.g., search store)
├── services/               # Core logic (ranking algorithm, candidate retrieval, CSV export)
├── lib/                    # Utilities & constants
└── types/                  # TypeScript interfaces
```

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

## 📊 Pages & Routes (16 total)

| Route | Description |
|---|---|
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
| `/demo/recruiter/setup` | Job requirements setup & Candidate Search |
| `/demo/recruiter/swipe` | Swipe-based discovery |
| `/demo/recruiter/pipeline` | Hiring funnel kanban |

## 🎨 Design System
- **Colors**: Navy midnight base, orange primary accent, semantic colors (emerald, gold, rose, sky)
- **Rank Tiers**: Unranked → Bronze → Silver → Gold → Platinum → Diamond → Elite → Legend
- **Typography**: Plus Jakarta Sans (display), Inter (body), JetBrains Mono (stats)
- **Effects**: Glassmorphism, glow effects, grid backgrounds, scroll-triggered animations
- **Accessibility**: Keyboard navigation, reduced motion support, focus rings

## 📌 Notes
This is a competition prototype fully integrated with the provided dataset. Authentication and some AI features are mocked, but the Recruiter Search Engine actively processes the JSON dataset and performs live ranking, scoring, and CSV generation.

🏗 **Built With ❤️**
Made for competition by the Apta team. All rankings are earned, never bought.
