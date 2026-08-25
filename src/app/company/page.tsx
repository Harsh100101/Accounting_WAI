"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	Building2,
	FileSpreadsheet,
	Sparkles,
	Layers,
	ShieldAlert,
	Scale,
	Newspaper,
	Brain,
	Bot,
	ArrowLeft,
	Activity,
	RefreshCw,
	AlertCircle,
} from "lucide-react";

// UPDATED IMPORTS: Pointing to the new "company-ui" folder
import { CompanyHeader } from "../../components/company/CompanyHeader";
import { BusinessModelExplainer } from "../../components/company/BusinessModelExplainer";
import { FinancialHealthScorecard } from "../../components/company/FinancialHealthScorecard";
import { FinancialStoryline } from "../../components/company/FinancialStoryline";
import { ContradictionDetector } from "../../components/company/ContradictionDetector";
import { StatementViewer } from "../../components/company/StatementViewer";
import { EarningsQualitySection } from "../../components/company/EarningsQualitySection";
import { RedFlagsEngine } from "../../components/company/RedFlagsEngine";
import { QuarterlyChangeCard } from "../../components/company/QuarterlyChangeCard";
import { NewsImpactSection } from "../../components/company/NewsImpactSection";
import { PeerAnalysis } from "../../components/company/PeerAnalysis";

import { ThesisChallenger } from "../../components/thesis/ThesisChallenger";
import { AiFinancialTutor } from "../../components/tutor/AiFinancialTutor";
import {
	Company,
	CompanyProfile,
	MultiYearFinancials,
	FinancialStory,
	NewsImpactItem,
} from "@/types/financials";

export default function CompanyIntelligencePage() {
	const params = useParams();
	const router = useRouter();
	const rawTicker = ((params.ticker as string) || "AAPL").toUpperCase();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [company, setCompany] = useState<Company | null>(null);
	const [profile, setProfile] = useState<CompanyProfile | null>(null);
	const [financials, setFinancials] = useState<MultiYearFinancials | null>(
		null,
	);
	const [news, setNews] = useState<NewsImpactItem[]>([]);
	const [peerCompanies, setPeerCompanies] = useState<Company[]>([]);
	const [scorecard, setScorecard] = useState<any>(null);
	const [anomalies, setAnomalies] = useState<any[]>([]);
	const [redFlags, setRedFlags] = useState<any[]>([]);
	const [quarterlyChanges, setQuarterlyChanges] = useState<any>(null);
	const [story, setStory] = useState<FinancialStory | null>(null);

	const [activeTab, setActiveTab] = useState<
		| "overview"
		| "story"
		| "contradictions"
		| "financials"
		| "quality"
		| "risks"
		| "quarterly"
		| "peers"
		| "news"
		| "thesis"
	>("overview");
	const [isTutorOpen, setIsTutorOpen] = useState(false);

	const fetchCompanyData = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(`/api/company/${rawTicker}`);
			const json = await res.json();

			if (json.success && json.data) {
				const d = json.data;
				setCompany(d.company);
				setProfile(d.profile);
				setFinancials(d.financials);
				setNews(d.news || []);
				setPeerCompanies(d.peers || []);
				setScorecard(d.scorecard);
				setAnomalies(d.anomalies || []);
				setRedFlags(d.redFlags || []);
				setQuarterlyChanges(d.quarterlyChanges);
				setStory(d.story);
			} else {
				setError(json.error || "Failed to load company intelligence");
			}
		} catch (err: any) {
			setError(err.message || "Network error loading company data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCompanyData();
	}, [rawTicker]);

	const tabs = [
		{ id: "overview", label: "Intelligence Hub", icon: Activity },
		{ id: "story", label: "Financial Story", icon: Sparkles },
		{
			id: "contradictions",
			label: "Contradictions",
			icon: Layers,
			badge: anomalies.length,
		},
		{ id: "financials", label: "Statements & Ratios", icon: FileSpreadsheet },
		{ id: "quality", label: "Earnings Quality", icon: ShieldAlert },
		{
			id: "risks",
			label: "Red Flags",
			icon: ShieldAlert,
			badge: redFlags.length > 0 ? redFlags.length : undefined,
		},
		{ id: "quarterly", label: "Quarterly Shifts", icon: Activity },
		{ id: "peers", label: "Peers", icon: Scale },
		{ id: "news", label: "News & Impact", icon: Newspaper },
		{ id: "thesis", label: "My Thesis", icon: Brain },
	];

	if (loading) {
		return (
			<div className="space-y-8 animate-pulse">
				<div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
				<div className="h-96 rounded-2xl bg-white border border-slate-200 p-8 flex flex-col items-center justify-center space-y-4 shadow-xs">
					<RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
					<div className="text-center space-y-1">
						<h2 className="text-lg font-bold text-slate-900">
							Loading Live Data for {rawTicker}...
						</h2>
						<p className="text-xs text-slate-500">
							Fetching real-time quotes, 5-year financials, and AI analysis
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !company) {
		return (
			<div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4 max-w-lg mx-auto mt-12 shadow-sm">
				<AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
				<h2 className="text-lg font-bold text-slate-900">
					Could Not Load {rawTicker}
				</h2>
				<p className="text-xs text-slate-500">
					{error || "Company not found in live feed."}
				</p>
				<div className="flex items-center justify-center gap-3 pt-2">
					<button
						onClick={() => router.push("/")}
						className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold"
					>
						Go Back
					</button>
					<button
						onClick={fetchCompanyData}
						className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Back Button */}
			<button
				onClick={() => router.push("/")}
				className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors"
			>
				<ArrowLeft className="w-3.5 h-3.5" />
				<span>Back to Market Dashboard</span>
			</button>

			{/* 1. Header Toolbar with Interactive Recharts Chart */}
			<CompanyHeader
				company={company}
				onOpenTutor={() => setIsTutorOpen(true)}
				onOpenThesis={() => setActiveTab("thesis")}
			/>

			{/* 2. Navigation Tabs */}
			<div className="border-b border-slate-200 overflow-x-auto">
				<div className="flex items-center gap-1.5 min-w-max pb-2">
					{tabs.map((t) => {
						const Icon = t.icon;
						const isActive = activeTab === t.id;
						return (
							<button
								key={t.id}
								onClick={() => setActiveTab(t.id as any)}
								className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
									isActive
										? "bg-indigo-600 text-white shadow-xs"
										: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
								}`}
							>
								<Icon className="w-3.5 h-3.5" />
								<span>{t.label}</span>
								{t.badge !== undefined && (
									<span
										className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
											isActive
												? "bg-white/20 text-white"
												: "bg-indigo-100 text-indigo-700"
										}`}
									>
										{t.badge}
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{/* 3. Tab Contents */}
			<div className="space-y-8">
				{/* Overview Tab (Curated Complete Lens) */}
				{activeTab === "overview" && (
					<div className="space-y-8">
						{profile && <BusinessModelExplainer profile={profile} />}
						{scorecard && <FinancialHealthScorecard scorecard={scorecard} />}
						{story && financials && (
							<FinancialStoryline story={story} financials={financials} />
						)}
						<ContradictionDetector anomalies={anomalies} />
						{quarterlyChanges && (
							<QuarterlyChangeCard quarterlyChange={quarterlyChanges} />
						)}
						<RedFlagsEngine redFlags={redFlags} />
					</div>
				)}

				{/* Dedicated Financial Story Tab */}
				{activeTab === "story" && story && financials && (
					<FinancialStoryline story={story} financials={financials} />
				)}

				{/* Dedicated Contradictions Tab */}
				{activeTab === "contradictions" && (
					<ContradictionDetector anomalies={anomalies} />
				)}

				{/* Dedicated Financial Statements Tab */}
				{activeTab === "financials" && financials && (
					<StatementViewer financials={financials} />
				)}

				{/* Dedicated Earnings Quality Tab */}
				{activeTab === "quality" && financials && (
					<EarningsQualitySection financials={financials} />
				)}

				{/* Dedicated Red Flags Tab */}
				{activeTab === "risks" && <RedFlagsEngine redFlags={redFlags} />}

				{/* Dedicated Quarterly Shifts Tab */}
				{activeTab === "quarterly" && quarterlyChanges && (
					<QuarterlyChangeCard quarterlyChange={quarterlyChanges} />
				)}

				{/* Dedicated Peers Tab */}
				{activeTab === "peers" && (
					<PeerAnalysis
						currentCompany={company}
						peerCompanies={peerCompanies}
					/>
				)}

				{/* Dedicated News & Impact Tab */}
				{activeTab === "news" && <NewsImpactSection news={news} />}

				{/* Dedicated Thesis Challenger Tab */}
				{activeTab === "thesis" && financials && (
					<ThesisChallenger company={company} financials={financials} />
				)}
			</div>

			{/* AI Financial Tutor Drawer */}
			{financials && (
				<AiFinancialTutor
					isOpen={isTutorOpen}
					onClose={() => setIsTutorOpen(false)}
					company={company}
					financials={financials}
				/>
			)}
		</div>
	);
}
