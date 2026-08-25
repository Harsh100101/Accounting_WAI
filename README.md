# AI-Powered Investment Lens 🔍

> *"Don't just show investors the number. Teach them what the number means, why they should care, and what they should investigate next."*

**AI-Powered Investment Lens** is an intelligent financial education and fundamental analysis platform designed specifically for first-time and non-commerce investors. It demystifies multi-year corporate financial statements, detects accounting inconsistencies, stress-tests investment theses, and grounds AI explanations directly in verified financial data.

---

## 🌟 Core Features

### 1. 💡 Three-Question Framework ("Explain Any Number")
Every financial metric across the platform is interactive and clickable. It provides immediate three-dimensional context:
1. **What does this number mean?** *(Plain language + relatable real-world analogies)*
2. **Why should I care as an investor?** *(Capital preservation, compounding relevance, downside risk)*
3. **What should I investigate next?** *(3–5 analytical questions to cross-examine)*

### 2. 🎓 Adaptive Three-Tier Learning Modes
- **Beginner**: Zero accounting jargon, everyday conceptual framing, and intuitive analogies.
- **Intermediate**: Clear accounting terminology (*DSO, Gross Margin compression, Working Capital, Accruals*).
- **Advanced**: In-depth DuPont decomposition, asset-liability spreads, and Economic Value Added (*EVA*).
- *Dynamically adapts all AI explanations and metric definitions across the platform on the fly.*

### 3. 📖 Financial Storyline (Multi-Year Evolution Timeline)
- Synthesizes 4–5 years of Revenue, Net Profit, Operating Cash Flow, Receivables, and Debt.
- Interactive timeline scrubber with dynamic AI synthesis detailing how the business converted revenue into cash across operating cycles.

### 4. 🚨 Three-Statement Consistency Engine & Contradiction Detector
- Cross-analyzes the **Income Statement**, **Balance Sheet**, and **Cash Flow Statement** simultaneously.
- Detects critical financial anomalies:
  - **Growth-Cash Mismatch**: Revenue ↑ while Operating Cash Flow ↓ and Receivables ↑↑
  - **Leverage-Driven ROE**: Rising ROE fueled by excessive borrowing rather than operating margin expansion
  - **Earnings Quality Divergence**: Net profit expansion lagging behind cash conversion
  - **Inventory Accumulation**: Inventory growth outpacing sales velocity
- Includes **"Ask the Next Question"** prompts with interactive accounting lessons.

### 5. 🥊 Thesis Challenger ("Stress-Test Your Thesis")
- Write an investment hypothesis in plain language (*e.g., "Company X will dominate cloud infrastructure for the next 5 years"*).
- The engine stress-tests the hypothesis against verified multi-year financial statements, exposing blindspots, leverage risks, and counter-evidence.

### 6. 🧠 Confirmation Bias Tracker
- Records pre-analysis sentiment (*Bullish / Neutral / Bearish / Unsure*) vs. post-analysis reality to help investors identify emotional bias before allocating capital.

### 7. 🤖 AI Financial Intelligence Tutor
- Real-time conversational tutor grounded directly in the active company's verified financial statements.
- Includes suggested follow-up prompts, financial grounding source disclaimers, and adaptive learning mode toggles.

### 8. 🏦 Sector-Aware Metric Engine
- Automatically adapts metric models for **Banks & Financial Institutions** (*NIM, GNPA, NNPA, CASA Ratio, Capital Adequacy Ratio, Credit/Deposit Growth, ROA*) vs. **IT Services, Conglomerates, Consumer, and Industrial** sectors.

### 9. ⚖️ Multi-Company Comparative Intelligence
- Benchmark 2–4 companies side-by-side with synchronized metric tables and automated differentiation analysis.

### 10. ⚡ "5 Things That Changed Since Last Quarter"
- Sequential quarterly shifts distilled into plain-language bullet takeaways.

### 11. 📰 Corporate News & Financial Statement Impact Engine
- Categorizes recent news (*Results, Capex, Management, Regulatory*) and maps each headline to potential impacts on the Income Statement, Balance Sheet, and Cash Flow statement with key metrics to monitor.

---

## 🔒 Security Architecture & Hardening

The application is built with security best practices:

| Layer | Security Measure | Implementation Details |
|---|---|---|
| **Secret Management** | `.gitignore` & Env Isolation | `.env*` secrets, private keys, certificates, and build caches are strictly ignored from version control. |
| **HTTP Security Headers** | Defense-in-Depth Headers | Configured in `next.config.js`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, and disabled `X-Powered-By`. |
| **API Boundaries** | Server-Side AI Client Isolation | The Google GenAI SDK and API keys remain strictly on the backend; client components communicate through validated `/api/*` routes. |
| **Input Validation** | Strict Length & Regex Bounding | Enforced character caps (500 chars on queries, 15 chars on tickers), ticker regex validation (`^[A-Z0-9.\-_]{1,15}$`), and parameter whitelisting to prevent DoS, memory exhaustion, and parameter pollution. |
| **AI Prompt Guardrails** | Prompt Injection Containment | User queries are sanitized and delimited inside `<user_question>` boundary tags with explicit system instructions to prevent prompt jailbreaks. |
| **Third-Party API Safety** | Symbol Whitelisting | All symbols are sanitized before querying external providers (Alpha Vantage, FMP, NewsAPI) to eliminate query injection and malformed requests. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **AI Engine**: Google Generative AI SDK (`@google/generative-ai`) with structured JSON schema outputs & rule-based fallbacks
- **Data Providers**: Pluggable provider architecture with live feeds (Alpha Vantage, Financial Modeling Prep, NewsAPI) and rich demo datasets covering Indian (NSE/BSE) and Global (NASDAQ/NYSE) equities.

---

## 📁 Project Structure

```
ai-investment-lens/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/                     # Backend API Routes
│   │   │   ├── company/[ticker]/    # Company quote, financials & chart endpoints
│   │   │   ├── gemini/              # AI Tutor & metric explanation endpoints
│   │   │   └── market/              # Search & indices endpoints
│   │   ├── company/[ticker]/        # Company fundamental intelligence page
│   │   ├── compare/                 # Multi-company comparison page
│   │   ├── explore/                 # Market screener & directory
│   │   ├── learn/                   # Educational curriculum & case studies
│   │   ├── portfolio/               # Watchlist & thesis tracker
│   │   ├── layout.tsx               # Root layout with navigation & providers
│   │   └── page.tsx                 # Landing page & market overview
│   ├── components/                  # UI Components
│   │   ├── company/                 # Financial health, scorecard, statements, news
│   │   ├── compare/                 # Comparison views & diff tables
│   │   ├── modals/                  # MetricExplainer modal (3-Question engine)
│   │   ├── thesis/                  # Thesis challenger & bias tracker
│   │   └── tutor/                   # AI Financial Intelligence Tutor
│   ├── context/                     # LearningModeContext (Beginner/Intermediate/Advanced)
│   ├── lib/
│   │   ├── engine/                  # Core analytical engines (Scorecard, Consistency, RedFlags)
│   │   ├── gemini/                  # Gemini AI client, prompt templates & fallback generators
│   │   └── providers/               # Market data abstraction & demo data registry
│   └── types/                       # TypeScript interfaces & financial schemas
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore configuration
├── next.config.js                   # Next.js configuration & security headers
├── package.json                     # Dependencies & npm scripts
├── tailwind.config.ts               # Custom color tokens & styling configuration
└── tsconfig.json                    # TypeScript compiler options
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher (Node 20+ recommended)
- **npm** or **yarn**

### 2. Installation
```bash
# Clone or navigate to the repository
git clone <repository-url>
cd ai-investment-lens

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file from the provided `.env.example`:
```bash
cp .env.example .env.local
```

Configure your environment keys in `.env.local`:
```env
# Google Gemini API Key (Optional - application runs seamlessly in DEMO MODE without it)
GEMINI_API_KEY=your_gemini_api_key_here

# Market Data API Providers (Optional - falls back to pre-verified multi-year financial models)
ALPHA_VANTAGE_API_KEY=
FINANCIAL_MODELING_PREP_API_KEY=
NEWS_API_KEY=

# Application Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Building for Production
```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```

---

## 🌐 API Routes Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/company/[ticker]` | Returns company profile, multi-year financials, health scorecard, anomalies, red flags, and news. |
| `GET` | `/api/company/[ticker]/chart?range=1M\|6M\|1Y\|5Y` | Returns historical price series for Recharts. |
| `GET` | `/api/market/search?q={query}` | Searches companies across local registry and live feeds. |
| `GET` | `/api/market/indices` | Fetches major global and Indian indices (Nifty 50, Sensex, S&P 500, Nasdaq). |
| `POST` | `/api/gemini/tutor` | Generates grounded tutor responses based on verified company statements. |
| `POST` | `/api/gemini/explain` | Generates 3-Question plain-language explanations for any financial metric. |

---

## 📊 Demo Mode & Resilient Architecture

When external API keys are not supplied:
- The platform automatically activates **Demo Mode**.
- A transparent `DEMO DATA` badge indicates that curated reference statements are in use.
- All analytical engines, contradiction detection, 3-question modals, interactive financial statements, and AI tutor features operate at full capability using multi-year financial statement models (covering **TCS, Reliance Industries, Infosys, HDFC Bank, Apple, Microsoft, NVIDIA, Asian Paints**, etc.).

---

## ⚖️ Regulatory & Educational Disclaimer

> **AI-Powered Investment Lens is strictly an educational and fundamental research platform.**  
> It does **NOT** provide direct "BUY", "SELL", or "HOLD" recommendations, nor does it provide personalized investment advice.  
> Metric signals are objectively categorized (*Positive Signal*, *Watch*, *Red Flag*, *Needs Context*, *Worth Investigating*).  
> All analysis is intended for financial literacy, conceptual understanding, and investment research training.

---

## 📄 License
This project is licensed under the MIT License.

