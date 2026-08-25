import {
  Company,
  CompanyProfile,
  MultiYearFinancials,
  MarketIndex,
  NewsImpactItem,
} from "@/types/financials";

export const DEMO_INDICES: MarketIndex[] = [
  {
    symbol: "NIFTY 50",
    name: "NIFTY 50",
    region: "INDIA",
    currentValue: 24836.10,
    changeValue: 142.30,
    changePercent: 0.58,
    sparkline: [24650, 24710, 24690, 24780, 24810, 24795, 24836.10],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
  },
  {
    symbol: "SENSEX",
    name: "BSE SENSEX",
    region: "INDIA",
    currentValue: 81381.25,
    changeValue: 418.60,
    changePercent: 0.52,
    sparkline: [80900, 81050, 81010, 81200, 81310, 81250, 81381.25],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
  },
  {
    symbol: "NIFTY BANK",
    name: "NIFTY Bank",
    region: "INDIA",
    currentValue: 51240.80,
    changeValue: -110.20,
    changePercent: -0.21,
    sparkline: [51450, 51400, 51320, 51290, 51350, 51200, 51240.80],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
  },
  {
    symbol: "NIFTY IT",
    name: "NIFTY IT Index",
    region: "INDIA",
    currentValue: 41890.15,
    changeValue: 560.40,
    changePercent: 1.36,
    sparkline: [41200, 41350, 41480, 41600, 41750, 41820, 41890.15],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
  },
  {
    symbol: "S&P 500",
    name: "S&P 500 Index",
    region: "GLOBAL",
    currentValue: 5864.67,
    changeValue: 24.15,
    changePercent: 0.41,
    sparkline: [5820, 5835, 5840, 5852, 5848, 5860, 5864.67],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
  },
  {
    symbol: "NASDAQ",
    name: "NASDAQ Composite",
    region: "GLOBAL",
    currentValue: 18518.61,
    changeValue: 112.80,
    changePercent: 0.61,
    sparkline: [18350, 18400, 18420, 18470, 18490, 18510, 18518.61],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
  },
  {
    symbol: "DOW JONES",
    name: "Dow Jones Industrial",
    region: "GLOBAL",
    currentValue: 43239.05,
    changeValue: 36.80,
    changePercent: 0.09,
    sparkline: [43180, 43210, 43190, 43220, 43250, 43230, 43239.05],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
  },
  {
    symbol: "FTSE 100",
    name: "FTSE 100",
    region: "GLOBAL",
    currentValue: 8245.10,
    changeValue: -15.40,
    changePercent: -0.19,
    sparkline: [8270, 8265, 8250, 8240, 8255, 8248, 8245.10],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 4:30 PM BST",
  },
  {
    symbol: "NIKKEI 225",
    name: "Nikkei 225",
    region: "GLOBAL",
    currentValue: 38981.75,
    changeValue: 289.10,
    changePercent: 0.75,
    sparkline: [38650, 38720, 38810, 38890, 38920, 38950, 38981.75],
    status: "LIVE",
    lastUpdated: "17 Aug 2026, 3:00 PM JST",
  }
];

export const DEMO_COMPANIES: Company[] = [
  {
    id: "tcs-nse",
    legalName: "Tata Consultancy Services Limited",
    displayName: "TCS",
    ticker: "TCS",
    exchange: "NSE",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    isin: "INE467B01029",
    sector: "IT_SERVICES",
    sectorName: "Information Technology",
    industry: "IT Services & Consulting",
    marketCap: 15248000000000, // ₹15.24 Lakh Cr
    currentPrice: 4182.50,
    changeValue: 34.20,
    changePercent: 0.82,
    peRatio: 31.4,
    pbRatio: 14.8,
    dividendYield: 1.85,
    high52Week: 4585.90,
    low52Week: 3456.25,
    dataSource: "National Stock Exchange of India (NSE)",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "reliance-nse",
    legalName: "Reliance Industries Limited",
    displayName: "Reliance Industries",
    ticker: "RELIANCE",
    exchange: "NSE",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    isin: "INE002A01018",
    sector: "CONGLOMERATE",
    sectorName: "Energy & Conglomerates",
    industry: "Oil, Retail & Telecom",
    marketCap: 20456000000000, // ₹20.45 Lakh Cr
    currentPrice: 3024.80,
    changeValue: -12.40,
    changePercent: -0.41,
    peRatio: 28.2,
    pbRatio: 2.65,
    dividendYield: 0.35,
    high52Week: 3217.90,
    low52Week: 2220.30,
    dataSource: "National Stock Exchange of India (NSE)",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "infosys-nse",
    legalName: "Infosys Limited",
    displayName: "Infosys",
    ticker: "INFY",
    exchange: "NSE",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    isin: "INE009A01021",
    sector: "IT_SERVICES",
    sectorName: "Information Technology",
    industry: "IT Services & Consulting",
    marketCap: 7854000000000, // ₹7.85 Lakh Cr
    currentPrice: 1892.40,
    changeValue: 21.60,
    changePercent: 1.15,
    peRatio: 29.1,
    pbRatio: 9.4,
    dividendYield: 2.1,
    high52Week: 1990.00,
    low52Week: 1358.35,
    dataSource: "National Stock Exchange of India (NSE)",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "hdfcbank-nse",
    legalName: "HDFC Bank Limited",
    displayName: "HDFC Bank",
    ticker: "HDFCBANK",
    exchange: "NSE",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    isin: "INE040A01034",
    sector: "BANKING_FINANCE",
    sectorName: "Banking & Financial Services",
    industry: "Private Commercial Banking",
    marketCap: 12890000000000, // ₹12.89 Lakh Cr
    currentPrice: 1698.20,
    changeValue: -4.80,
    changePercent: -0.28,
    peRatio: 19.3,
    pbRatio: 2.85,
    dividendYield: 1.15,
    high52Week: 1794.00,
    low52Week: 1363.55,
    dataSource: "National Stock Exchange of India (NSE)",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "asianpaints-nse",
    legalName: "Asian Paints Limited",
    displayName: "Asian Paints",
    ticker: "ASIANPAINT",
    exchange: "NSE",
    country: "India",
    currency: "INR",
    currencySymbol: "₹",
    isin: "INE021A01026",
    sector: "CONSUMER_RETAIL",
    sectorName: "Consumer Goods & Materials",
    industry: "Paints & Home Decor",
    marketCap: 2840000000000, // ₹2.84 Lakh Cr
    currentPrice: 2960.10,
    changeValue: 15.30,
    changePercent: 0.52,
    peRatio: 52.4,
    pbRatio: 16.8,
    dividendYield: 1.1,
    high52Week: 3422.00,
    low52Week: 2670.00,
    dataSource: "National Stock Exchange of India (NSE)",
    lastUpdated: "17 Aug 2026, 3:30 PM IST",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "apple-nasdaq",
    legalName: "Apple Inc.",
    displayName: "Apple",
    ticker: "AAPL",
    exchange: "NASDAQ",
    country: "United States",
    currency: "USD",
    currencySymbol: "$",
    isin: "US0378331005",
    sector: "CONSUMER_RETAIL",
    sectorName: "Consumer Electronics & Services",
    industry: "Technology Hardware, Storage & Peripherals",
    marketCap: 3480000000000, // $3.48T
    currentPrice: 228.45,
    changeValue: 1.85,
    changePercent: 0.82,
    peRatio: 33.8,
    pbRatio: 48.2,
    dividendYield: 0.44,
    high52Week: 237.23,
    low52Week: 164.08,
    dataSource: "NASDAQ Consolidated Market Data",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "microsoft-nasdaq",
    legalName: "Microsoft Corporation",
    displayName: "Microsoft",
    ticker: "MSFT",
    exchange: "NASDAQ",
    country: "United States",
    currency: "USD",
    currencySymbol: "$",
    isin: "US5949181045",
    sector: "IT_SERVICES",
    sectorName: "Information Technology",
    industry: "Systems Software & Cloud Infrastructure",
    marketCap: 3120000000000, // $3.12T
    currentPrice: 419.80,
    changeValue: -2.30,
    changePercent: -0.54,
    peRatio: 35.1,
    pbRatio: 11.2,
    dividendYield: 0.72,
    high52Week: 468.35,
    low52Week: 366.50,
    dataSource: "NASDAQ Consolidated Market Data",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
    marketStatus: "LIVE",
    isDemoData: true,
  },
  {
    id: "nvidia-nasdaq",
    legalName: "NVIDIA Corporation",
    displayName: "NVIDIA",
    ticker: "NVDA",
    exchange: "NASDAQ",
    country: "United States",
    currency: "USD",
    currencySymbol: "$",
    isin: "US67066G1040",
    sector: "SEMICONDUCTORS",
    sectorName: "Semiconductors",
    industry: "AI Hardware & GPU Accelerators",
    marketCap: 3340000000000, // $3.34T
    currentPrice: 136.20,
    changeValue: 3.45,
    changePercent: 2.60,
    peRatio: 58.6,
    pbRatio: 42.1,
    dividendYield: 0.03,
    high52Week: 140.76,
    low52Week: 45.11,
    dataSource: "NASDAQ Consolidated Market Data",
    lastUpdated: "17 Aug 2026, 4:00 PM EDT",
    marketStatus: "LIVE",
    isDemoData: true,
  }
];

export const DEMO_PROFILES: Record<string, CompanyProfile> = {
  "TCS": {
    company: DEMO_COMPANIES[0],
    plainLanguageOverview: {
      beginner: "TCS helps large global enterprises (like banks, airlines, and retailers) build software, manage IT systems, and adopt cloud and AI technologies. It sells specialized technical expertise and gets paid on project milestones and long-term service contracts.",
      intermediate: "TCS is one of the world's largest IT services, consulting, and business solutions organizations. Its business model relies on deploying skilled software engineers across global delivery centers, billing clients primarily under time-and-materials and fixed-price contracts.",
      advanced: "TCS operates an asset-light, high-operating-margin IT service delivery model characterized by industry-leading return on capital employed (ROCE > 50%), near-100% operating cash conversion, and negligible debt. It maintains long-standing relationships with Global 2000 corporations."
    },
    howItMakesMoney: [
      "Custom Software Development & Cloud Migration contracts for Fortune 500 companies",
      "Enterprise Application maintenance and 24/7 IT infrastructure management",
      "Proprietary software platforms licensing (TCS BaNCS for banking, ignio for AI/AIOps)",
      "Digital transformation consulting and cybersecurity advisory"
    ],
    businessSegments: [
      { name: "Banking, Financial Services & Insurance (BFSI)", revenueSharePercent: 37, description: "Core banking platform modernization, digital payments, risk & compliance software" },
      { name: "Consumer Business & Retail", revenueSharePercent: 16, description: "E-commerce platforms, supply chain analytics, omnichannel retail tech" },
      { name: "Life Sciences & Healthcare", revenueSharePercent: 11, description: "Clinical trial management, biotech data infrastructure, hospital ERP systems" },
      { name: "Manufacturing & Utilities", revenueSharePercent: 10, description: "Smart factory automation, IoT telemetry, predictive maintenance" },
      { name: "Technology & Services", revenueSharePercent: 9, description: "SaaS engineering, cloud partner enablement" },
      { name: "Communication, Media & Information", revenueSharePercent: 7, description: "5G network software, streaming infrastructure" },
      { name: "Energy, Resources & Others", revenueSharePercent: 10, description: "Grid management and enterprise asset solutions" }
    ],
    geographicExposure: [
      { region: "North America (USA & Canada)", percent: 50 },
      { region: "Continental Europe & UK", percent: 31 },
      { region: "India & Asia Pacific", percent: 14 },
      { region: "Latin America & Middle East", percent: 5 }
    ],
    keyCustomersOrPartners: ["Citigroup", "Marks & Spencer", "General Electric", "Microsoft Azure", "Amazon AWS", "Google Cloud"],
    majorDependencies: [
      "US and European corporate IT spending cycles",
      "Employee attrition and wage inflation in tech hubs",
      "Currency fluctuations (USD/INR and EUR/INR conversion rates)",
      "Visa regulations and cross-border mobility rules"
    ],
    peerTickers: ["INFY", "WIPRO", "HCLTECH", "TECHM"]
  },
  "RELIANCE": {
    company: DEMO_COMPANIES[1],
    plainLanguageOverview: {
      beginner: "Reliance is India's largest conglomerate. Originally an oil and petrochemicals giant, it has transformed into a telecom powerhouse (Jio) and India's biggest retail store chain (Reliance Retail), touching hundreds of millions of daily consumers.",
      intermediate: "Reliance operates across three primary pillars: Oil-to-Chemicals (refining and petrochem), Digital Services (Jio telecom & 5G data), and Organized Retail. It generates substantial operating cash flows from energy to fund rapid expansion in retail stores, 5G networks, and new energy giga-factories.",
      advanced: "Reliance's business strategy combines a cash-generative traditional downstream hydrocarbon complex (Gross Refining Margins sensitive) with high-growth consumer monopolies (Jio with >470M subscribers and Retail with >18,000 stores). It relies on continuous capital expenditure (capex) programs, requiring monitoring of net debt and interest coverage."
    },
    howItMakesMoney: [
      "Refining crude oil into petrol, diesel, jet fuel and downstream petrochemical polymers",
      "Mobile data subscriptions, fiber broadband, and digital entertainment via Jio",
      "Retail sales across grocery (Smart/Fresh), electronics (Digital), and fashion (Trends)",
      "Upstream oil & natural gas production from the KG-D6 basin",
      "New Energy solar panel, green hydrogen, and battery storage manufacturing"
    ],
    businessSegments: [
      { name: "Oil to Chemicals (O2C)", revenueSharePercent: 54, description: "Refining, petrochemicals, polymers, fuel marketing" },
      { name: "Reliance Retail", revenueSharePercent: 28, description: "18,000+ stores across grocery, fashion, electronics, and JioMart" },
      { name: "Digital Services (Jio)", revenueSharePercent: 14, description: "Telecom, fiber broadband, cloud services, and 5G networks" },
      { name: "Oil & Gas Upstream", revenueSharePercent: 3, description: "Deepwater natural gas extraction in KG-D6" },
      { name: "New Energy & Others", revenueSharePercent: 1, description: "Solar giga-factories and battery technology" }
    ],
    geographicExposure: [
      { region: "India (Domestic Market)", percent: 68 },
      { region: "International Exports (Refined Fuels & Petrochem)", percent: 32 }
    ],
    keyCustomersOrPartners: ["Indian Consumers (Jio & Retail)", "Global Oil Traders", "BP (British Petroleum)", "Google", "Meta"],
    majorDependencies: [
      "Global crude oil crack spreads and refining margins",
      "Domestic consumer spending in retail and telecom ARPU growth",
      "High ongoing Capex execution and debt servicing costs",
      "Government regulatory policies and fuel export duties"
    ],
    peerTickers: ["TCS", "BHARTIARTL", "ONGC", "IOC"]
  },
  "INFY": {
    company: DEMO_COMPANIES[2],
    plainLanguageOverview: {
      beginner: "Infosys is a leading global technology consulting and services firm. It designs computer systems, software platforms, and cloud infrastructure for multinational corporations, charging for engineering time and technological solutions.",
      intermediate: "Infosys is India's second-largest IT services provider. It delivers digital transformation, legacy system modernization, and enterprise cloud migrations with a strong presence in North American financial and manufacturing enterprises.",
      advanced: "Infosys maintains a high-margin, dividend-generative operating model with a strong focus on Generative AI platforms (Topaz) and cloud platforms (Cobalt). Compared to peers, its revenue growth has shown greater sensitivity to discretionary IT spending cycles."
    },
    howItMakesMoney: [
      "Application development and enterprise cloud migrations",
      "Core banking software licensing through its Finacle product suite",
      "Generative AI consulting, automation, and cybersecurity solutions",
      "Outsourced business process management (BPM)"
    ],
    businessSegments: [
      { name: "Financial Services & Insurance", revenueSharePercent: 28, description: "Banking software, Finacle deployments, wealth management systems" },
      { name: "Retail, CPG & Logistics", revenueSharePercent: 15, description: "Supply chain visibility, digital commerce platforms" },
      { name: "Manufacturing", revenueSharePercent: 14, description: "Connected products, PLM software, industrial IoT" },
      { name: "Energy, Utilities & Services", revenueSharePercent: 13, description: "Smart meters, field workforce optimization" },
      { name: "Communication & Telecom", revenueSharePercent: 12, description: "Telecom billing and customer experience" },
      { name: "Hi-Tech & Life Sciences", revenueSharePercent: 18, description: "Semiconductor design services and healthcare data" }
    ],
    geographicExposure: [
      { region: "North America", percent: 59 },
      { region: "Europe", percent: 28 },
      { region: "Rest of the World", percent: 10 },
      { region: "India", percent: 3 }
    ],
    keyCustomersOrPartners: ["Daimler", "Vanguard", "Microsoft", "SAP", "ServiceNow"],
    majorDependencies: [
      "Discretionary tech budgets in US Financial Services",
      "Wage costs and subcontractor expenses",
      "Foreign exchange volatility"
    ],
    peerTickers: ["TCS", "HCLTECH", "WIPRO", "LTIM"]
  },
  "HDFCBANK": {
    company: DEMO_COMPANIES[3],
    plainLanguageOverview: {
      beginner: "HDFC Bank is India's largest private sector bank. It gathers savings and deposits from millions of people and businesses, pays them interest, and lends that money out at higher interest rates to homebuyers, car buyers, and corporations.",
      intermediate: "HDFC Bank operates a vast branch and digital banking franchise. Its profitability is driven by its low-cost deposit franchise (CASA), disciplined underwriting (low NPAs), and fee income from credit cards, wealth management, and transaction banking.",
      advanced: "Following its mega-merger with parent HDFC Limited, HDFC Bank manages a massive balance sheet with over ₹25 Lakh Cr in loans. Key analytical metrics include Net Interest Margin (NIM) compression/expansion, Net NPA containment (<0.4%), CASA ratio stabilization, and Credit-to-Deposit (CD) ratio normalization."
    },
    howItMakesMoney: [
      "Net Interest Income (NII): Difference between interest earned on loans and interest paid on deposits",
      "Fee Income: Credit card interchange, loan processing fees, forex charges, and wealth management",
      "Treasury Operations: Trading in government bonds, corporate bonds, and foreign exchange",
      "Insurance and Mutual Fund distribution commissions"
    ],
    businessSegments: [
      { name: "Retail Banking & Home Loans", revenueSharePercent: 46, description: "Mortgages, auto loans, credit cards, personal loans, retail deposits" },
      { name: "Wholesale & Corporate Banking", revenueSharePercent: 32, description: "Working capital facilities, term loans to large conglomerates, project finance" },
      { name: "Commercial & Rural Banking", revenueSharePercent: 15, description: "MSME loans, tractor and agriculture credit, supply chain financing" },
      { name: "Treasury & Capital Markets", revenueSharePercent: 7, description: "Bond portfolios, foreign exchange desk, liquidity management" }
    ],
    geographicExposure: [
      { region: "Metro & Urban India", percent: 65 },
      { region: "Semi-Urban & Rural India", percent: 32 },
      { region: "Overseas Branches (DIFC, Bahrain, HK)", percent: 3 }
    ],
    keyCustomersOrPartners: ["Over 90 million retail bank account holders", "Top Indian Corporates", "Mastercard/Visa", "NPCI (UPI)"],
    majorDependencies: [
      "Reserve Bank of India (RBI) Repo Rate cycles and liquidity policies",
      "Credit quality across retail unsecured loans (credit cards, personal loans)",
      "Deposit mobilization speed to maintain loan growth without margin erosion"
    ],
    peerTickers: ["ICICIBANK", "KOTAKBANK", "AXISBANK", "SBIN"]
  },
  "AAPL": {
    company: DEMO_COMPANIES[5],
    plainLanguageOverview: {
      beginner: "Apple designs and sells consumer technology products (iPhone, Mac, iPad, Apple Watch) and generates recurring high-margin income from digital services (App Store, iCloud, Apple Pay, Apple Music).",
      intermediate: "Apple combines proprietary hardware design, premium pricing power, and an integrated iOS ecosystem with >2.2 billion active devices. Its Services division represents its fastest growing and most profitable revenue stream.",
      advanced: "Apple operates a capital-light supply chain model with negative working capital, generating colossal Free Cash Flow (> $100B annually). It returns virtually all excess cash to shareholders through extensive share repurchases, consistently boosting EPS."
    },
    howItMakesMoney: [
      "Hardware Sales: iPhone, Mac, iPad, Apple Watch, AirPods",
      "Services: App Store commissions (15-30%), iCloud storage, Apple Pay transaction fees, Apple Care",
      "Licensing: Google payments to remain the default search engine on Safari",
      "Digital Media: Apple TV+, Apple Music, Apple Arcade subscriptions"
    ],
    businessSegments: [
      { name: "iPhone", revenueSharePercent: 52, description: "Flagship smartphone hardware ecosystem" },
      { name: "Services", revenueSharePercent: 22, description: "App Store, iCloud, Apple Pay, Apple Care, Advertising" },
      { name: "Wearables, Home & Accessories", revenueSharePercent: 10, description: "Apple Watch, AirPods, HomePod" },
      { name: "Mac", revenueSharePercent: 8, description: "MacBook Pro, MacBook Air, Mac Studio with M-series chips" },
      { name: "iPad", revenueSharePercent: 8, description: "iPad Pro, Air, and Mini tablets" }
    ],
    geographicExposure: [
      { region: "Americas (US & Latin America)", percent: 42 },
      { region: "Europe", percent: 25 },
      { region: "Greater China (China, Hong Kong, Taiwan)", percent: 18 },
      { region: "Japan & Rest of Asia Pacific", percent: 15 }
    ],
    keyCustomersOrPartners: ["Global Consumers", "TSMC (Silicon foundry)", "Foxconn (Assembly)", "Google (Search partner)"],
    majorDependencies: [
      "iPhone replacement upgrade cycles",
      "Supply chain concentration in East Asia",
      "Regulatory antitrust scrutiny regarding App Store fees in the EU and US",
      "Greater China geopolitical and consumer market dynamics"
    ],
    peerTickers: ["MSFT", "GOOGL", "AMZN", "NVDA"]
  },
  "MSFT": {
    company: DEMO_COMPANIES[6],
    plainLanguageOverview: {
      beginner: "Microsoft builds software and cloud platforms that power modern offices and businesses—from Windows and Office 365 (Word, Excel, Teams) to the Azure cloud and Xbox gaming.",
      intermediate: "Microsoft is a global tech giant operating across Intelligent Cloud (Azure), Productivity & Business Processes (Office 365, LinkedIn), and More Personal Computing (Windows, Xbox, Surface). It is a principal beneficiary of the enterprise AI boom through its partnership with OpenAI.",
      advanced: "Microsoft features exceptional gross margins (>69%) and a diversified commercial recurring revenue model. Azure continues to drive growth, while Copilot integrations across the Office 365 installed base expand ARPU. Capex has expanded heavily to build AI data center capacity."
    },
    howItMakesMoney: [
      "Azure Cloud computing infrastructure and AI model hosting",
      "Office 365 commercial and consumer subscriptions",
      "LinkedIn talent solutions, premium subscriptions, and advertising",
      "Windows OEM operating system licenses",
      "Xbox hardware, Xbox Game Pass subscriptions, and Activision Blizzard game sales"
    ],
    businessSegments: [
      { name: "Intelligent Cloud (Azure)", revenueSharePercent: 43, description: "Azure public cloud, Windows Server, SQL Server, GitHub" },
      { name: "Productivity & Business (Office/LinkedIn)", revenueSharePercent: 33, description: "Office 365, Teams, LinkedIn, Dynamics 365 ERP" },
      { name: "More Personal Computing (Windows/Xbox)", revenueSharePercent: 24, description: "Windows OS, Xbox gaming, Surface devices, Bing search" }
    ],
    geographicExposure: [
      { region: "United States", percent: 51 },
      { region: "International (Europe, Asia, Americas)", percent: 49 }
    ],
    keyCustomersOrPartners: ["Global Enterprises", "OpenAI", "NVIDIA", "Government Agencies", "SMBs"],
    majorDependencies: [
      "Enterprise IT spend resilience and cloud migration velocity",
      "Return on massive AI infrastructure capex investments",
      "Data privacy and cybersecurity protections across Azure and Office"
    ],
    peerTickers: ["AAPL", "GOOGL", "AMZN", "ORCL"]
  },
  "NVDA": {
    company: DEMO_COMPANIES[7],
    plainLanguageOverview: {
      beginner: "NVIDIA designs the ultra-powerful graphics and AI chips (GPUs) that power Artificial Intelligence models like ChatGPT, high-end video games, and autonomous cars.",
      intermediate: "NVIDIA dominates the AI acceleration semiconductor market with >80% market share in data center GPUs (H100, B200 Blackwell). Its proprietary software stack (CUDA) creates deep vendor lock-in among AI developers worldwide.",
      advanced: "NVIDIA has achieved unprecedented revenue and margin expansion (>75% gross margins) driven by hyperscaler AI infrastructure buildouts. Working capital needs have expanded due to long foundry lead times and inventory commitments with TSMC."
    },
    howItMakesMoney: [
      "Data Center AI Acceleration: Selling Hopper and Blackwell GPUs, HGX systems, and InfiniBand networking to cloud providers",
      "Gaming: GeForce RTX graphics cards for PC gamers and creators",
      "Professional Visualization: Omniverse and workstation GPUs for 3D modeling and digital twins",
      "Automotive: DRIVE Orin chips and software for autonomous driving"
    ],
    businessSegments: [
      { name: "Data Center (AI & High-Performance Computing)", revenueSharePercent: 87, description: "H100, H200, B200 GPUs, NVLink, Quantum InfiniBand switches" },
      { name: "Gaming & AI PC", revenueSharePercent: 9, description: "GeForce RTX graphics cards and gaming laptops" },
      { name: "Professional Visualization & Auto", revenueSharePercent: 4, description: "Workstation graphics, autonomous vehicle chips" }
    ],
    geographicExposure: [
      { region: "United States (Hyperscalers)", percent: 46 },
      { region: "Singapore & Asia Pacific", percent: 22 },
      { region: "Taiwan (ODM assembly)", percent: 18 },
      { region: "Rest of World", percent: 14 }
    ],
    keyCustomersOrPartners: ["Microsoft", "Meta", "Amazon AWS", "Google Cloud", "TSMC", "Supermicro", "Dell"],
    majorDependencies: [
      "TSMC advanced packaging capacity (CoWoS) and semiconductor fabrication",
      "Hyperscaler AI capex continuation and sustainable enterprise AI ROI",
      "US export restrictions on high-end chips to China",
      "Working capital absorption in rapid inventory buildup"
    ],
    peerTickers: ["AMD", "INTC", "QCOM", "AVGO", "AAPL"]
  },
  "ASIANPAINT": {
    company: DEMO_COMPANIES[4],
    plainLanguageOverview: {
      beginner: "Asian Paints is India's largest decorative paint manufacturer. It makes paints, varnishes, wall textures, and home decor products sold through over 70,000 retail dealer counters across India.",
      intermediate: "Asian Paints commands market leadership in Indian decorative paints. Its key competitive moat is an automated direct-to-dealer supply chain that bypasses wholesale distributors, enabling multiple daily tinting machine deliveries.",
      advanced: "Asian Paints operates a high-return FMCG-style distribution model with ROCE > 30%. Because crude oil derivatives (titanium dioxide, solvents) make up over 50% of raw material costs, gross margins fluctuate with global oil prices. In recent years, new well-capitalized entrants (Grasim/Birla Opus) have increased competitive intensity."
    },
    howItMakesMoney: [
      "Decorative Paints: Interior and exterior wall paints, enamels, and wood finishes",
      "Industrial Coatings: Automotive coatings and protective industrial paints",
      "Home Improvement: Modular kitchens, sanitaryware, bath fittings, and wallpaper",
      "International Operations: Paints business across South Asia, Middle East, and Africa"
    ],
    businessSegments: [
      { name: "Decorative Paints (India)", revenueSharePercent: 84, description: "Interior/Exterior wall emulsions, primers, distempers, waterproofing" },
      { name: "International Business", revenueSharePercent: 8, description: "Operations in Nepal, Sri Lanka, Bangladesh, Middle East" },
      { name: "Industrial & Auto Coatings", revenueSharePercent: 5, description: "PPG Asian Paints joint venture for automotive OEM" },
      { name: "Home Improvement & Decor", revenueSharePercent: 3, description: "Sleek Modular Kitchens, Ess Ess bath fittings, Beautiful Homes stores" }
    ],
    geographicExposure: [
      { region: "India (Tier 1-4 Cities & Rural)", percent: 92 },
      { region: "International Markets", percent: 8 }
    ],
    keyCustomersOrPartners: ["75,000+ Paint Dealer Network", "Homeowners & Painting Contractors", "Automobile OEMs"],
    majorDependencies: [
      "Crude oil prices and titanium dioxide input costs",
      "Indian real estate construction and home repainting cycles",
      "Intensifying competition from new conglomerate entrants (Birla Opus)"
    ],
    peerTickers: ["BERGEPAINT", "KANSAINER", "AKZOINDIA"]
  }
};

export const DEMO_MULTI_YEAR_FINANCIALS: Record<string, MultiYearFinancials> = {
  "TCS": {
    ticker: "TCS",
    currency: "INR",
    currencySymbol: "₹",
    incomeStatements: [
      { year: 2026, revenue: 254800, revenueGrowthPercent: 7.2, employeeCosts: 142100, ebitda: 68700, ebitdaMarginPercent: 27.0, depreciation: 5200, ebit: 63500, interestExpense: 850, interestCoverageRatio: 74.7, taxExpense: 16100, netProfit: 46550, netProfitMarginPercent: 18.27, eps: 128.60, sharesOutstanding: 3620 },
      { year: 2025, revenue: 237800, revenueGrowthPercent: 5.6, employeeCosts: 132400, ebitda: 64200, ebitdaMarginPercent: 27.0, depreciation: 4950, ebit: 59250, interestExpense: 820, interestCoverageRatio: 72.3, taxExpense: 14900, netProfit: 43530, netProfitMarginPercent: 18.31, eps: 120.25, sharesOutstanding: 3620 },
      { year: 2024, revenue: 225200, revenueGrowthPercent: 14.1, employeeCosts: 124800, ebitda: 60500, ebitdaMarginPercent: 26.86, depreciation: 4700, ebit: 55800, interestExpense: 780, interestCoverageRatio: 71.5, taxExpense: 14100, netProfit: 40920, netProfitMarginPercent: 18.17, eps: 111.80, sharesOutstanding: 3660 },
      { year: 2023, revenue: 197400, revenueGrowthPercent: 16.8, employeeCosts: 109200, ebitda: 53100, ebitdaMarginPercent: 26.9, depreciation: 4400, ebit: 48700, interestExpense: 720, interestCoverageRatio: 67.6, taxExpense: 12300, netProfit: 35680, netProfitMarginPercent: 18.07, eps: 97.50, sharesOutstanding: 3660 },
      { year: 2022, revenue: 169000, revenueGrowthPercent: 16.2, employeeCosts: 93500, ebitda: 45600, ebitdaMarginPercent: 27.0, depreciation: 4000, ebit: 41600, interestExpense: 680, interestCoverageRatio: 61.2, taxExpense: 10600, netProfit: 30320, netProfitMarginPercent: 17.94, eps: 82.80, sharesOutstanding: 3660 }
    ],
    balanceSheets: [
      { year: 2026, totalAssets: 154200, totalLiabilities: 48500, shareholdersEquity: 105700, totalDebt: 7900, shortTermDebt: 1200, longTermDebt: 6700, cashAndEquivalents: 21500, receivables: 44800, currentAssets: 94200, currentLiabilities: 38200, workingCapital: 56000, currentRatio: 2.47, quickRatio: 2.47, debtToEquityRatio: 0.07 },
      { year: 2025, totalAssets: 142800, totalLiabilities: 45200, shareholdersEquity: 97600, totalDebt: 7500, shortTermDebt: 1100, longTermDebt: 6400, cashAndEquivalents: 18900, receivables: 41600, currentAssets: 86400, currentLiabilities: 35600, workingCapital: 50800, currentRatio: 2.43, quickRatio: 2.43, debtToEquityRatio: 0.08 },
      { year: 2024, totalAssets: 133500, totalLiabilities: 42100, shareholdersEquity: 91400, totalDebt: 7200, shortTermDebt: 1050, longTermDebt: 6150, cashAndEquivalents: 16800, receivables: 38900, currentAssets: 79800, currentLiabilities: 33400, workingCapital: 46400, currentRatio: 2.39, quickRatio: 2.39, debtToEquityRatio: 0.08 },
      { year: 2023, totalAssets: 121800, totalLiabilities: 38900, shareholdersEquity: 82900, totalDebt: 6800, shortTermDebt: 980, longTermDebt: 5820, cashAndEquivalents: 14500, receivables: 34500, currentAssets: 72100, currentLiabilities: 30800, workingCapital: 41300, currentRatio: 2.34, quickRatio: 2.34, debtToEquityRatio: 0.08 },
      { year: 2022, totalAssets: 108900, totalLiabilities: 34200, shareholdersEquity: 74700, totalDebt: 6200, shortTermDebt: 900, longTermDebt: 5300, cashAndEquivalents: 12800, receivables: 30200, currentAssets: 63500, currentLiabilities: 27100, workingCapital: 36400, currentRatio: 2.34, quickRatio: 2.34, debtToEquityRatio: 0.08 }
    ],
    cashFlowStatements: [
      { year: 2026, operatingCashFlow: 47200, capitalExpenditure: 3200, freeCashFlow: 44000, investingCashFlow: -5400, financingCashFlow: -39200, dividendsPaid: 36800, netChangeInCash: 2600 },
      { year: 2025, operatingCashFlow: 44100, capitalExpenditure: 3050, freeCashFlow: 41050, investingCashFlow: -4900, financingCashFlow: -37100, dividendsPaid: 34500, netChangeInCash: 2100 },
      { year: 2024, operatingCashFlow: 41800, capitalExpenditure: 2900, freeCashFlow: 38900, investingCashFlow: -4600, financingCashFlow: -34900, dividendsPaid: 32400, netChangeInCash: 2300 },
      { year: 2023, operatingCashFlow: 36900, capitalExpenditure: 2700, freeCashFlow: 34200, investingCashFlow: -4100, financingCashFlow: -31100, dividendsPaid: 28900, netChangeInCash: 1700 },
      { year: 2022, operatingCashFlow: 32400, capitalExpenditure: 2500, freeCashFlow: 29900, investingCashFlow: -3700, financingCashFlow: -27300, dividendsPaid: 25400, netChangeInCash: 1400 }
    ],
    quarterlySnapshots: [
      { quarter: "Q1 FY27", periodEndDate: "30 Jun 2026", revenue: 65200, netProfit: 12050, operatingCashFlow: 11800, ebitdaMarginPercent: 26.8, receivables: 44800, debt: 7900, yoyRevenueGrowth: 6.8, yoyProfitGrowth: 7.2 },
      { quarter: "Q4 FY26", periodEndDate: "31 Mar 2026", revenue: 64100, netProfit: 11820, operatingCashFlow: 12400, ebitdaMarginPercent: 27.2, receivables: 43900, debt: 7850, yoyRevenueGrowth: 7.4, yoyProfitGrowth: 8.1 },
      { quarter: "Q3 FY26", periodEndDate: "31 Dec 2025", revenue: 63200, netProfit: 11580, operatingCashFlow: 11600, ebitdaMarginPercent: 27.0, receivables: 42800, debt: 7700, yoyRevenueGrowth: 6.9, yoyProfitGrowth: 6.8 },
      { quarter: "Q2 FY26", periodEndDate: "30 Sep 2025", revenue: 62300, netProfit: 11100, operatingCashFlow: 11400, ebitdaMarginPercent: 27.1, receivables: 42100, debt: 7600, yoyRevenueGrowth: 7.5, yoyProfitGrowth: 6.5 }
    ]
  },
  "RELIANCE": {
    ticker: "RELIANCE",
    currency: "INR",
    currencySymbol: "₹",
    incomeStatements: [
      { year: 2026, revenue: 985000, revenueGrowthPercent: 9.8, rawMaterialCosts: 580000, ebitda: 182500, ebitdaMarginPercent: 18.53, depreciation: 52000, ebit: 130500, interestExpense: 22400, interestCoverageRatio: 5.83, taxExpense: 28900, netProfit: 79200, netProfitMarginPercent: 8.04, eps: 117.10, sharesOutstanding: 6765 },
      { year: 2025, revenue: 897000, revenueGrowthPercent: 2.6, rawMaterialCosts: 532000, ebitda: 168000, ebitdaMarginPercent: 18.73, depreciation: 47800, ebit: 120200, interestExpense: 21100, interestCoverageRatio: 5.70, taxExpense: 26100, netProfit: 73000, netProfitMarginPercent: 8.14, eps: 107.90, sharesOutstanding: 6765 },
      { year: 2024, revenue: 874000, revenueGrowthPercent: -2.5, rawMaterialCosts: 528000, ebitda: 154000, ebitdaMarginPercent: 17.62, depreciation: 43500, ebit: 110500, interestExpense: 19800, interestCoverageRatio: 5.58, taxExpense: 24200, netProfit: 66500, netProfitMarginPercent: 7.61, eps: 98.30, sharesOutstanding: 6765 },
      { year: 2023, revenue: 896000, revenueGrowthPercent: 23.4, rawMaterialCosts: 549000, ebitda: 142000, ebitdaMarginPercent: 15.85, depreciation: 38800, ebit: 103200, interestExpense: 18200, interestCoverageRatio: 5.67, taxExpense: 21800, netProfit: 63200, netProfitMarginPercent: 7.05, eps: 93.40, sharesOutstanding: 6765 },
      { year: 2022, revenue: 726000, revenueGrowthPercent: 47.0, rawMaterialCosts: 445000, ebitda: 118000, ebitdaMarginPercent: 16.25, depreciation: 34200, ebit: 83800, interestExpense: 16500, interestCoverageRatio: 5.08, taxExpense: 16800, netProfit: 50500, netProfitMarginPercent: 6.96, eps: 74.65, sharesOutstanding: 6765 }
    ],
    balanceSheets: [
      { year: 2026, totalAssets: 1845000, totalLiabilities: 995000, shareholdersEquity: 850000, totalDebt: 345000, shortTermDebt: 78000, longTermDebt: 267000, cashAndEquivalents: 165000, receivables: 42000, inventory: 156000, currentAssets: 412000, currentLiabilities: 385000, workingCapital: 27000, currentRatio: 1.07, quickRatio: 0.66, debtToEquityRatio: 0.41 },
      { year: 2025, totalAssets: 1720000, totalLiabilities: 935000, shareholdersEquity: 785000, totalDebt: 328000, shortTermDebt: 72000, longTermDebt: 256000, cashAndEquivalents: 152000, receivables: 385000, inventory: 142000, currentAssets: 378000, currentLiabilities: 362000, workingCapital: 16000, currentRatio: 1.04, quickRatio: 0.65, debtToEquityRatio: 0.42 },
      { year: 2024, totalAssets: 1610000, totalLiabilities: 880000, shareholdersEquity: 730000, totalDebt: 314000, shortTermDebt: 68000, longTermDebt: 246000, cashAndEquivalents: 141000, receivables: 34200, inventory: 138000, currentAssets: 345000, currentLiabilities: 338000, workingCapital: 7000, currentRatio: 1.02, quickRatio: 0.61, debtToEquityRatio: 0.43 },
      { year: 2023, totalAssets: 1495000, totalLiabilities: 815000, shareholdersEquity: 680000, totalDebt: 301000, shortTermDebt: 64000, longTermDebt: 237000, cashAndEquivalents: 134000, receivables: 31000, inventory: 128000, currentAssets: 320000, currentLiabilities: 315000, workingCapital: 5000, currentRatio: 1.01, quickRatio: 0.61, debtToEquityRatio: 0.44 },
      { year: 2022, totalAssets: 1360000, totalLiabilities: 740000, shareholdersEquity: 620000, totalDebt: 285000, shortTermDebt: 58000, longTermDebt: 227000, cashAndEquivalents: 125000, receivables: 27500, inventory: 119000, currentAssets: 295000, currentLiabilities: 290000, workingCapital: 5000, currentRatio: 1.02, quickRatio: 0.61, debtToEquityRatio: 0.46 }
    ],
    cashFlowStatements: [
      { year: 2026, operatingCashFlow: 154000, capitalExpenditure: 132000, freeCashFlow: 22000, investingCashFlow: -138000, financingCashFlow: -3500, dividendsPaid: 6765, netChangeInCash: 12500 },
      { year: 2025, operatingCashFlow: 142000, capitalExpenditure: 128000, freeCashFlow: 14000, investingCashFlow: -134000, financingCashFlow: 3000, dividendsPaid: 6420, netChangeInCash: 11000 },
      { year: 2024, operatingCashFlow: 131000, capitalExpenditure: 124000, freeCashFlow: 7000, investingCashFlow: -130000, financingCashFlow: 6000, dividendsPaid: 6080, netChangeInCash: 7000 },
      { year: 2023, operatingCashFlow: 118000, capitalExpenditure: 115000, freeCashFlow: 3000, investingCashFlow: -121000, financingCashFlow: 12000, dividendsPaid: 5750, netChangeInCash: 9000 },
      { year: 2022, operatingCashFlow: 98000, capitalExpenditure: 96000, freeCashFlow: 2000, investingCashFlow: -101000, financingCashFlow: 15000, dividendsPaid: 5410, netChangeInCash: 12000 }
    ],
    quarterlySnapshots: [
      { quarter: "Q1 FY27", periodEndDate: "30 Jun 2026", revenue: 254000, netProfit: 20400, operatingCashFlow: 39500, ebitdaMarginPercent: 18.6, receivables: 42000, debt: 345000, yoyRevenueGrowth: 10.2, yoyProfitGrowth: 8.5 },
      { quarter: "Q4 FY26", periodEndDate: "31 Mar 2026", revenue: 248000, netProfit: 19850, operatingCashFlow: 41200, ebitdaMarginPercent: 18.4, receivables: 40500, debt: 341000, yoyRevenueGrowth: 9.6, yoyProfitGrowth: 9.1 },
      { quarter: "Q3 FY26", periodEndDate: "31 Dec 2025", revenue: 242000, netProfit: 19500, operatingCashFlow: 37800, ebitdaMarginPercent: 18.5, receivables: 39800, debt: 335000, yoyRevenueGrowth: 9.4, yoyProfitGrowth: 7.9 },
      { quarter: "Q2 FY26", periodEndDate: "30 Sep 2025", revenue: 241000, netProfit: 19450, operatingCashFlow: 35500, ebitdaMarginPercent: 18.6, receivables: 39200, debt: 330000, yoyRevenueGrowth: 10.1, yoyProfitGrowth: 8.2 }
    ]
  },
  "HDFCBANK": {
    ticker: "HDFCBANK",
    currency: "INR",
    currencySymbol: "₹",
    incomeStatements: [
      { year: 2026, revenue: 168000, revenueGrowthPercent: 14.5, ebitda: 98000, ebitdaMarginPercent: 58.33, depreciation: 4200, ebit: 93800, interestExpense: 68000, interestCoverageRatio: 2.38, taxExpense: 17200, netProfit: 68600, netProfitMarginPercent: 40.83, eps: 90.20, sharesOutstanding: 7605 },
      { year: 2025, revenue: 146700, revenueGrowthPercent: 28.5, ebitda: 86200, ebitdaMarginPercent: 58.76, depreciation: 3800, ebit: 82400, interestExpense: 59000, interestCoverageRatio: 2.40, taxExpense: 15400, netProfit: 60800, netProfitMarginPercent: 41.45, eps: 79.95, sharesOutstanding: 7605 },
      { year: 2024, revenue: 114200, revenueGrowthPercent: 32.0, ebitda: 66800, ebitdaMarginPercent: 58.50, depreciation: 3100, ebit: 63700, interestExpense: 44000, interestCoverageRatio: 2.45, taxExpense: 11900, netProfit: 46100, netProfitMarginPercent: 40.37, eps: 60.60, sharesOutstanding: 7605 },
      { year: 2023, revenue: 86500, revenueGrowthPercent: 19.8, ebitda: 51200, ebitdaMarginPercent: 59.19, depreciation: 2500, ebit: 48700, interestExpense: 31000, interestCoverageRatio: 2.57, taxExpense: 9800, netProfit: 37900, netProfitMarginPercent: 43.82, eps: 67.80, sharesOutstanding: 5590 },
      { year: 2022, revenue: 72200, revenueGrowthPercent: 15.6, ebitda: 43100, ebitdaMarginPercent: 59.70, depreciation: 2100, ebit: 41000, interestExpense: 24500, interestCoverageRatio: 2.67, taxExpense: 8100, netProfit: 31800, netProfitMarginPercent: 44.04, eps: 57.30, sharesOutstanding: 5550 }
    ],
    balanceSheets: [
      { year: 2026, totalAssets: 3850000, totalLiabilities: 3410000, shareholdersEquity: 440000, totalDebt: 580000, shortTermDebt: 120000, longTermDebt: 460000, cashAndEquivalents: 240000, receivables: 0, currentAssets: 780000, currentLiabilities: 690000, workingCapital: 90000, currentRatio: 1.13, quickRatio: 1.13, debtToEquityRatio: 1.32 },
      { year: 2025, totalAssets: 3420000, totalLiabilities: 3040000, shareholdersEquity: 380000, totalDebt: 520000, shortTermDebt: 110000, longTermDebt: 410000, cashAndEquivalents: 210000, receivables: 0, currentAssets: 710000, currentLiabilities: 640000, workingCapital: 70000, currentRatio: 1.11, quickRatio: 1.11, debtToEquityRatio: 1.37 },
      { year: 2024, totalAssets: 3080000, totalLiabilities: 2750000, shareholdersEquity: 330000, totalDebt: 460000, shortTermDebt: 95000, longTermDebt: 365000, cashAndEquivalents: 180000, receivables: 0, currentAssets: 620000, currentLiabilities: 570000, workingCapital: 50000, currentRatio: 1.09, quickRatio: 1.09, debtToEquityRatio: 1.39 },
      { year: 2023, totalAssets: 2460000, totalLiabilities: 2180000, shareholdersEquity: 280000, totalDebt: 350000, shortTermDebt: 75000, longTermDebt: 275000, cashAndEquivalents: 150000, receivables: 0, currentAssets: 510000, currentLiabilities: 470000, workingCapital: 40000, currentRatio: 1.09, quickRatio: 1.09, debtToEquityRatio: 1.25 },
      { year: 2022, totalAssets: 2060000, totalLiabilities: 1820000, shareholdersEquity: 240000, totalDebt: 290000, shortTermDebt: 60000, longTermDebt: 230000, cashAndEquivalents: 125000, receivables: 0, currentAssets: 430000, currentLiabilities: 395000, workingCapital: 35000, currentRatio: 1.09, quickRatio: 1.09, debtToEquityRatio: 1.21 }
    ],
    cashFlowStatements: [
      { year: 2026, operatingCashFlow: 82000, capitalExpenditure: 4500, freeCashFlow: 77500, investingCashFlow: -24000, financingCashFlow: -46000, dividendsPaid: 15200, netChangeInCash: 12000 },
      { year: 2025, operatingCashFlow: 74000, capitalExpenditure: 4100, freeCashFlow: 69900, investingCashFlow: -21000, financingCashFlow: -41000, dividendsPaid: 13500, netChangeInCash: 12000 },
      { year: 2024, operatingCashFlow: 58000, capitalExpenditure: 3500, freeCashFlow: 54500, investingCashFlow: -18000, financingCashFlow: -32000, dividendsPaid: 10800, netChangeInCash: 8000 },
      { year: 2023, operatingCashFlow: 45000, capitalExpenditure: 2900, freeCashFlow: 42100, investingCashFlow: -14000, financingCashFlow: -24000, dividendsPaid: 8400, netChangeInCash: 7000 },
      { year: 2022, operatingCashFlow: 38000, capitalExpenditure: 2400, freeCashFlow: 35600, investingCashFlow: -12000, financingCashFlow: -21000, dividendsPaid: 7200, netChangeInCash: 5000 }
    ],
    bankingMetrics: [
      { year: 2026, netInterestIncome: 118500, netInterestMargin: 3.47, grossNPA: 38200, grossNPAPercent: 1.24, netNPA: 10200, netNPAPercent: 0.33, casaRatio: 38.2, capitalAdequacyRatio: 18.8, costToIncomeRatio: 40.2, returnOnAssets: 1.88, returnOnEquity: 16.7, totalAdvances: 2580000, totalDeposits: 2450000, creditGrowthPercent: 15.2, depositGrowthPercent: 16.4 },
      { year: 2025, netInterestIncome: 104200, netInterestMargin: 3.52, grossNPA: 33400, grossNPAPercent: 1.26, netNPA: 8900, netNPAPercent: 0.34, casaRatio: 37.9, capitalAdequacyRatio: 18.6, costToIncomeRatio: 40.8, returnOnAssets: 1.91, returnOnEquity: 16.9, totalAdvances: 2240000, totalDeposits: 2100000, creditGrowthPercent: 16.8, depositGrowthPercent: 15.8 },
      { year: 2024, netInterestIncome: 82400, netInterestMargin: 3.65, grossNPA: 26800, grossNPAPercent: 1.28, netNPA: 7100, netNPAPercent: 0.35, casaRatio: 38.4, capitalAdequacyRatio: 19.1, costToIncomeRatio: 41.5, returnOnAssets: 1.96, returnOnEquity: 17.2, totalAdvances: 1920000, totalDeposits: 1810000, creditGrowthPercent: 19.5, depositGrowthPercent: 18.2 },
      { year: 2023, netInterestIncome: 66800, netInterestMargin: 4.10, grossNPA: 18500, grossNPAPercent: 1.12, netNPA: 4500, netNPAPercent: 0.27, casaRatio: 44.0, capitalAdequacyRatio: 19.3, costToIncomeRatio: 39.8, returnOnAssets: 2.06, returnOnEquity: 18.1, totalAdvances: 1600000, totalDeposits: 1530000, creditGrowthPercent: 16.9, depositGrowthPercent: 16.8 },
      { year: 2022, netInterestIncome: 57400, netInterestMargin: 4.15, grossNPA: 15800, grossNPAPercent: 1.17, netNPA: 4200, netNPAPercent: 0.32, casaRatio: 46.8, capitalAdequacyRatio: 18.9, costToIncomeRatio: 38.3, returnOnAssets: 2.01, returnOnEquity: 17.8, totalAdvances: 1370000, totalDeposits: 1310000, creditGrowthPercent: 20.8, depositGrowthPercent: 16.8 }
    ],
    quarterlySnapshots: [
      { quarter: "Q1 FY27", periodEndDate: "30 Jun 2026", revenue: 43500, netProfit: 17800, operatingCashFlow: 21500, ebitdaMarginPercent: 58.4, yoyRevenueGrowth: 14.8, yoyProfitGrowth: 15.2 },
      { quarter: "Q4 FY26", periodEndDate: "31 Mar 2026", revenue: 42800, netProfit: 17250, operatingCashFlow: 22100, ebitdaMarginPercent: 58.2, yoyRevenueGrowth: 14.2, yoyProfitGrowth: 14.8 },
      { quarter: "Q3 FY26", periodEndDate: "31 Dec 2025", revenue: 41200, netProfit: 16900, operatingCashFlow: 19800, ebitdaMarginPercent: 58.5, yoyRevenueGrowth: 14.6, yoyProfitGrowth: 15.0 },
      { quarter: "Q2 FY26", periodEndDate: "30 Sep 2025", revenue: 40500, netProfit: 16650, operatingCashFlow: 18600, ebitdaMarginPercent: 58.2, yoyRevenueGrowth: 14.4, yoyProfitGrowth: 14.5 }
    ]
  },
  "AAPL": {
    ticker: "AAPL",
    currency: "USD",
    currencySymbol: "$",
    incomeStatements: [
      { year: 2026, revenue: 412000, revenueGrowthPercent: 6.8, rawMaterialCosts: 224000, ebitda: 142000, ebitdaMarginPercent: 34.47, depreciation: 11800, ebit: 130200, interestExpense: 3600, interestCoverageRatio: 36.17, taxExpense: 20800, netProfit: 105800, netProfitMarginPercent: 25.68, eps: 6.95, sharesOutstanding: 15220 },
      { year: 2025, revenue: 385800, revenueGrowthPercent: 2.0, rawMaterialCosts: 210000, ebitda: 131500, ebitdaMarginPercent: 34.09, depreciation: 11500, ebit: 120000, interestExpense: 3800, interestCoverageRatio: 31.58, taxExpense: 19200, netProfit: 97000, netProfitMarginPercent: 25.14, eps: 6.25, sharesOutstanding: 15520 },
      { year: 2024, revenue: 383300, revenueGrowthPercent: -2.8, rawMaterialCosts: 214000, ebitda: 125800, ebitdaMarginPercent: 32.82, depreciation: 11520, ebit: 114280, interestExpense: 3930, interestCoverageRatio: 29.08, taxExpense: 16740, netProfit: 96990, netProfitMarginPercent: 25.30, eps: 6.13, sharesOutstanding: 15820 },
      { year: 2023, revenue: 394300, revenueGrowthPercent: 7.8, rawMaterialCosts: 223500, ebitda: 130500, ebitdaMarginPercent: 33.10, depreciation: 11100, ebit: 119400, interestExpense: 2930, interestCoverageRatio: 40.75, taxExpense: 19300, netProfit: 99800, netProfitMarginPercent: 25.31, eps: 6.11, sharesOutstanding: 16330 },
      { year: 2022, revenue: 365800, revenueGrowthPercent: 33.3, rawMaterialCosts: 212900, ebitda: 120200, ebitdaMarginPercent: 32.86, depreciation: 10600, ebit: 109600, interestExpense: 2650, interestCoverageRatio: 41.36, taxExpense: 14530, netProfit: 94680, netProfitMarginPercent: 25.88, eps: 5.61, sharesOutstanding: 16870 }
    ],
    balanceSheets: [
      { year: 2026, totalAssets: 368000, totalLiabilities: 295000, shareholdersEquity: 73000, totalDebt: 102000, shortTermDebt: 14000, longTermDebt: 88000, cashAndEquivalents: 68000, receivables: 32000, inventory: 6400, currentAssets: 148000, currentLiabilities: 142000, workingCapital: 6000, currentRatio: 1.04, quickRatio: 0.99, debtToEquityRatio: 1.40 },
      { year: 2025, totalAssets: 352600, totalLiabilities: 290400, shareholdersEquity: 62200, totalDebt: 106000, shortTermDebt: 15000, longTermDebt: 91000, cashAndEquivalents: 62000, receivables: 29500, inventory: 6100, currentAssets: 143500, currentLiabilities: 145000, workingCapital: -1500, currentRatio: 0.99, quickRatio: 0.94, debtToEquityRatio: 1.70 },
      { year: 2024, totalAssets: 352580, totalLiabilities: 290437, shareholdersEquity: 62143, totalDebt: 111000, shortTermDebt: 15800, longTermDebt: 95200, cashAndEquivalents: 61550, receivables: 28180, inventory: 6330, currentAssets: 143566, currentLiabilities: 145308, workingCapital: -1742, currentRatio: 0.99, quickRatio: 0.94, debtToEquityRatio: 1.79 },
      { year: 2023, totalAssets: 352755, totalLiabilities: 302083, shareholdersEquity: 50672, totalDebt: 120000, shortTermDebt: 21100, longTermDebt: 98900, cashAndEquivalents: 48300, receivables: 29500, inventory: 4950, currentAssets: 135405, currentLiabilities: 153982, workingCapital: -18577, currentRatio: 0.88, quickRatio: 0.84, debtToEquityRatio: 2.37 },
      { year: 2022, totalAssets: 351002, totalLiabilities: 287912, shareholdersEquity: 63090, totalDebt: 124700, shortTermDebt: 15600, longTermDebt: 109100, cashAndEquivalents: 62640, receivables: 26280, inventory: 6580, currentAssets: 134836, currentLiabilities: 125481, workingCapital: 9355, currentRatio: 1.07, quickRatio: 1.02, debtToEquityRatio: 1.98 }
    ],
    cashFlowStatements: [
      { year: 2026, operatingCashFlow: 124000, capitalExpenditure: 11200, freeCashFlow: 112800, investingCashFlow: -8500, financingCashFlow: -110000, dividendsPaid: 15400, netChangeInCash: 5500 },
      { year: 2025, operatingCashFlow: 116400, capitalExpenditure: 10800, freeCashFlow: 105600, investingCashFlow: -7800, financingCashFlow: -106000, dividendsPaid: 15000, netChangeInCash: 2600 },
      { year: 2024, operatingCashFlow: 110543, capitalExpenditure: 10959, freeCashFlow: 99584, investingCashFlow: -3705, financingCashFlow: -108488, dividendsPaid: 14840, netChangeInCash: -1650 },
      { year: 2023, operatingCashFlow: 122151, capitalExpenditure: 10708, freeCashFlow: 111443, investingCashFlow: -22354, financingCashFlow: -110749, dividendsPaid: 14800, netChangeInCash: -10952 },
      { year: 2022, operatingCashFlow: 104038, capitalExpenditure: 11085, freeCashFlow: 92953, investingCashFlow: -14545, financingCashFlow: -93353, dividendsPaid: 14460, netChangeInCash: -3860 }
    ],
    quarterlySnapshots: [
      { quarter: "Q3 FY26", periodEndDate: "30 Jun 2026", revenue: 98500, netProfit: 24200, operatingCashFlow: 28900, ebitdaMarginPercent: 34.2, yoyRevenueGrowth: 7.1, yoyProfitGrowth: 8.4 },
      { quarter: "Q2 FY26", periodEndDate: "31 Mar 2026", revenue: 94800, netProfit: 23600, operatingCashFlow: 26400, ebitdaMarginPercent: 34.5, yoyRevenueGrowth: 6.8, yoyProfitGrowth: 7.9 },
      { quarter: "Q1 FY26", periodEndDate: "31 Dec 2025", revenue: 124200, netProfit: 33900, operatingCashFlow: 42100, ebitdaMarginPercent: 35.1, yoyRevenueGrowth: 7.4, yoyProfitGrowth: 8.8 },
      { quarter: "Q4 FY25", periodEndDate: "30 Sep 2025", revenue: 94500, netProfit: 24100, operatingCashFlow: 26600, ebitdaMarginPercent: 33.8, yoyRevenueGrowth: 5.9, yoyProfitGrowth: 6.2 }
    ]
  },
  "NVDA": {
    ticker: "NVDA",
    currency: "USD",
    currencySymbol: "$",
    incomeStatements: [
      { year: 2026, revenue: 128500, revenueGrowthPercent: 110.8, rawMaterialCosts: 32100, ebitda: 84500, ebitdaMarginPercent: 65.76, depreciation: 1800, ebit: 82700, interestExpense: 280, interestCoverageRatio: 295.3, taxExpense: 12400, netProfit: 70020, netProfitMarginPercent: 54.49, eps: 2.82, sharesOutstanding: 24800 },
      { year: 2025, revenue: 60920, revenueGrowthPercent: 125.8, rawMaterialCosts: 16600, ebitda: 37500, ebitdaMarginPercent: 61.56, depreciation: 1530, ebit: 35970, interestExpense: 250, interestCoverageRatio: 143.8, taxExpense: 4800, netProfit: 30920, netProfitMarginPercent: 50.75, eps: 1.25, sharesOutstanding: 24700 },
      { year: 2024, revenue: 26970, revenueGrowthPercent: 0.2, rawMaterialCosts: 11600, ebitda: 7100, ebitdaMarginPercent: 26.32, depreciation: 1480, ebit: 5620, interestExpense: 260, interestCoverageRatio: 21.6, taxExpense: -180, netProfit: 5540, netProfitMarginPercent: 20.54, eps: 0.22, sharesOutstanding: 24600 },
      { year: 2023, revenue: 26910, revenueGrowthPercent: 61.4, rawMaterialCosts: 9400, ebitda: 11200, ebitdaMarginPercent: 41.62, depreciation: 1170, ebit: 10030, interestExpense: 236, interestCoverageRatio: 42.5, taxExpense: 1890, netProfit: 8140, netProfitMarginPercent: 30.25, eps: 0.32, sharesOutstanding: 24500 },
      { year: 2022, revenue: 16680, revenueGrowthPercent: 52.7, rawMaterialCosts: 5800, ebitda: 5800, ebitdaMarginPercent: 34.77, depreciation: 1090, ebit: 4710, interestExpense: 184, interestCoverageRatio: 25.6, taxExpense: 680, netProfit: 3850, netProfitMarginPercent: 23.08, eps: 0.15, sharesOutstanding: 24500 }
    ],
    balanceSheets: [
      { year: 2026, totalAssets: 104000, totalLiabilities: 32000, shareholdersEquity: 72000, totalDebt: 9800, shortTermDebt: 1200, longTermDebt: 8600, cashAndEquivalents: 38000, receivables: 21500, inventory: 8900, currentAssets: 74000, currentLiabilities: 21000, workingCapital: 53000, currentRatio: 3.52, quickRatio: 3.10, debtToEquityRatio: 0.14 },
      { year: 2025, totalAssets: 65700, totalLiabilities: 22700, shareholdersEquity: 43000, totalDebt: 10200, shortTermDebt: 1250, longTermDebt: 8950, cashAndEquivalents: 26000, receivables: 9990, inventory: 5280, currentAssets: 44300, currentLiabilities: 15300, workingCapital: 29000, currentRatio: 2.90, quickRatio: 2.55, debtToEquityRatio: 0.24 },
      { year: 2024, totalAssets: 41180, totalLiabilities: 19080, shareholdersEquity: 22100, totalDebt: 11000, shortTermDebt: 1250, longTermDebt: 9750, cashAndEquivalents: 13300, receivables: 3830, inventory: 5160, currentAssets: 23070, currentLiabilities: 6560, workingCapital: 16510, currentRatio: 3.52, quickRatio: 2.73, debtToEquityRatio: 0.50 },
      { year: 2023, totalAssets: 44190, totalLiabilities: 17580, shareholdersEquity: 26610, totalDebt: 11800, shortTermDebt: 1000, longTermDebt: 10800, cashAndEquivalents: 19900, receivables: 4650, inventory: 2600, currentAssets: 28800, currentLiabilities: 4300, workingCapital: 24500, currentRatio: 6.70, quickRatio: 6.09, debtToEquityRatio: 0.44 },
      { year: 2022, totalAssets: 28790, totalLiabilities: 11900, shareholdersEquity: 16890, totalDebt: 7200, shortTermDebt: 1000, longTermDebt: 6200, cashAndEquivalents: 11500, receivables: 2420, inventory: 1820, currentAssets: 16000, currentLiabilities: 3900, workingCapital: 12100, currentRatio: 4.10, quickRatio: 3.63, debtToEquityRatio: 0.43 }
    ],
    cashFlowStatements: [
      { year: 2026, operatingCashFlow: 65400, capitalExpenditure: 3200, freeCashFlow: 62200, investingCashFlow: -6800, financingCashFlow: -46600, dividendsPaid: 420, netChangeInCash: 12000 },
      { year: 2025, operatingCashFlow: 28100, capitalExpenditure: 1400, freeCashFlow: 26700, investingCashFlow: -4200, financingCashFlow: -11200, dividendsPaid: 395, netChangeInCash: 12700 },
      { year: 2024, operatingCashFlow: 5640, capitalExpenditure: 1830, freeCashFlow: 3810, investingCashFlow: -3800, financingCashFlow: -8400, dividendsPaid: 398, netChangeInCash: -6560 },
      { year: 2023, operatingCashFlow: 9100, capitalExpenditure: 980, freeCashFlow: 8120, investingCashFlow: -4100, financingCashFlow: 3400, dividendsPaid: 398, netChangeInCash: 8400 },
      { year: 2022, operatingCashFlow: 5800, capitalExpenditure: 820, freeCashFlow: 4980, investingCashFlow: -2900, financingCashFlow: 1200, dividendsPaid: 390, netChangeInCash: 4100 }
    ],
    quarterlySnapshots: [
      { quarter: "Q2 FY27", periodEndDate: "31 Jul 2026", revenue: 35200, netProfit: 19800, operatingCashFlow: 18400, ebitdaMarginPercent: 66.4, yoyRevenueGrowth: 86.4, yoyProfitGrowth: 92.5 },
      { quarter: "Q1 FY27", periodEndDate: "30 Apr 2026", revenue: 32800, netProfit: 18200, operatingCashFlow: 16900, ebitdaMarginPercent: 65.8, yoyRevenueGrowth: 94.2, yoyProfitGrowth: 104.1 },
      { quarter: "Q4 FY26", periodEndDate: "31 Jan 2026", revenue: 31200, netProfit: 17100, operatingCashFlow: 15600, ebitdaMarginPercent: 65.2, yoyRevenueGrowth: 112.5, yoyProfitGrowth: 128.4 },
      { quarter: "Q3 FY26", periodEndDate: "31 Oct 2025", revenue: 29300, netProfit: 14920, operatingCashFlow: 14500, ebitdaMarginPercent: 65.4, yoyRevenueGrowth: 135.0, yoyProfitGrowth: 152.0 }
    ]
  }
};

export const DEMO_NEWS_DATA: Record<string, NewsImpactItem[]> = {
  "TCS": [
    {
      id: "tcs-news-1",
      headline: "TCS Secures $1.2 Billion Multi-Year Cloud and AI Modernization Deal with European Banking Giant",
      source: "Economic Times / Financial Markets Wire",
      date: "14 Aug 2026",
      category: "Results",
      geminiExplanation: "Long-term fixed-scope transformation contracts increase revenue visibility and improve operating cash flow over a 5-year timeline. Operating margin impact depends on initial transition deployment costs.",
      metricsToWatch: ["Order Book / TCV", "Operating Margin", "Operating Cash Flow", "DSO"],
      potentialStatementImpact: "Income Statement"
    },
    {
      id: "tcs-news-2",
      headline: "TCS Announces Board Approval for ₹18,000 Crore Share Buyback via Tender Offer",
      source: "BSE Corporate Announcements",
      date: "02 Aug 2026",
      category: "Dividend & Buyback",
      geminiExplanation: "Share repurchases reduce cash balances on the balance sheet and decrease the total share count, which mechanically increases Return on Equity (ROE) and Earnings Per Share (EPS).",
      metricsToWatch: ["Return on Equity (ROE)", "EPS", "Cash and Equivalents", "Shares Outstanding"],
      potentialStatementImpact: "Multiple"
    },
    {
      id: "tcs-news-3",
      headline: "TCS Launches Enterprise Generative AI Studio Suite with Microsoft Azure Integration",
      source: "TechCrunch / Enterprise Tech",
      date: "18 Jul 2026",
      category: "Expansion",
      geminiExplanation: "Expands higher-billing-rate consulting offerings without requiring heavy capital expenditure, preserving TCS's asset-light high ROCE model.",
      metricsToWatch: ["EBITDA Margin", "Revenue Per Employee", "ROCE"],
      potentialStatementImpact: "Income Statement"
    }
  ],
  "RELIANCE": [
    {
      id: "ril-news-1",
      headline: "Reliance Dispatches First Commercial Batch from Jamnagar Green Hydrogen Giga-Factory",
      source: "Mint / Energy Desk",
      date: "11 Aug 2026",
      category: "Capex",
      geminiExplanation: "Marks the transition of heavy multi-year Capital Work-in-Progress (CWIP) into productive operating assets. Watch for depreciation commencement on the income statement and revenue generation.",
      metricsToWatch: ["Capex", "Asset Turnover", "Depreciation", "Return on Capital Employed (ROCE)"],
      potentialStatementImpact: "Balance Sheet"
    },
    {
      id: "ril-news-2",
      headline: "Jio Platforms Reports 5G Subscriber Milestone Crossing 140 Million with ARPU Uptick to ₹198",
      source: "Telecom Lead / Bloomberg",
      date: "25 Jul 2026",
      category: "Results",
      geminiExplanation: "Rising ARPU directly flows through to operating margins because network fixed operational costs remain relatively flat.",
      metricsToWatch: ["EBITDA Margin", "Operating Cash Flow", "Free Cash Flow"],
      potentialStatementImpact: "Income Statement"
    },
    {
      id: "ril-news-3",
      headline: "Reliance Retail Expands Omnichannel Fulfillment Center Network to 45 New Cities",
      source: "Retail Economic Review",
      date: "08 Jul 2026",
      category: "Expansion",
      geminiExplanation: "Increases retail working capital and inventory requirements in the near-term while cementing market share against quick-commerce competitors.",
      metricsToWatch: ["Working Capital", "Inventory Days", "Current Ratio", "Operating Cash Flow"],
      potentialStatementImpact: "Balance Sheet"
    }
  ],
  "HDFCBANK": [
    {
      id: "hdfc-news-1",
      headline: "HDFC Bank Reports Credit Growth of 15.2% YoY with Net NPA Reaching Multi-Quarter Low of 0.33%",
      source: "RBI Bulletin / Business Standard",
      date: "15 Aug 2026",
      category: "Results",
      geminiExplanation: "Low Net NPA confirms loan underwriting quality remains solid, which reduces provisioning requirements on the income statement and protects return on assets.",
      metricsToWatch: ["Net NPA %", "Gross NPA %", "Return on Assets (ROA)", "Provision Coverage Ratio"],
      potentialStatementImpact: "Income Statement"
    },
    {
      id: "hdfc-news-2",
      headline: "HDFC Bank Mobilizes ₹1.2 Lakh Crore in Retail Term Deposits in Q1 Following Strategic Campaign",
      source: "Financial Express",
      date: "22 Jul 2026",
      category: "Results",
      geminiExplanation: "Accelerating deposit mobilization lowers the Credit-to-Deposit ratio towards the bank's target comfort zone, stabilizing Net Interest Margins (NIM).",
      metricsToWatch: ["Deposit Growth %", "CASA Ratio", "Net Interest Margin (NIM)", "Credit to Deposit Ratio"],
      potentialStatementImpact: "Multiple"
    }
  ]
};
