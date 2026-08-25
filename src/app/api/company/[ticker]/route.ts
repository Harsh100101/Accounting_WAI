import { NextRequest, NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/marketDataProvider";
import { generateHealthScorecard } from "@/lib/engine/healthScorecardEngine";
import { analyzeThreeStatementConsistency } from "@/lib/engine/consistencyEngine";
import { evaluateRedFlags } from "@/lib/engine/redFlagEngine";
import { getQuarterlyChanges } from "@/lib/engine/quarterlyChangeEngine";
import { generateFinancialStory } from "@/lib/gemini/geminiClient";

const TICKER_REGEX = /^[A-Z0-9.\-_]{1,15}$/;

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ ticker: string }> },
) {
	const { ticker: tickerParam } = await params;
	const rawTicker = (tickerParam || "").toUpperCase().trim();

	if (!rawTicker || !TICKER_REGEX.test(rawTicker)) {
		return NextResponse.json(
			{ success: false, error: "Invalid ticker format." },
			{ status: 400 },
		);
	}

	const ticker = rawTicker;

	try {
		const company = await financialDataProvider.getCompanyQuote(ticker);
		if (!company) {
			return NextResponse.json(
				{ success: false, error: "Company not found" },
				{ status: 404 },
			);
		}

		const profile = await financialDataProvider.getCompanyProfile(ticker);
		const financials =
			await financialDataProvider.getMultiYearFinancials(ticker);
		const news = await financialDataProvider.getCompanyNews(ticker);
		const peers = await financialDataProvider.getPeerCompanies(ticker);

		let scorecard = null;
		let anomalies: any[] = [];
		let redFlags: any[] = [];
		let quarterlyChanges = null;
		let story = null;

		if (financials) {
			scorecard = generateHealthScorecard(financials, company.sector);
			anomalies = analyzeThreeStatementConsistency(financials);
			redFlags = evaluateRedFlags(financials, company.sector);
			quarterlyChanges = getQuarterlyChanges(financials);
			story = await generateFinancialStory(company, financials);
		}

		return NextResponse.json({
			success: true,
			data: {
				company,
				profile,
				financials,
				news,
				peers,
				scorecard,
				anomalies,
				redFlags,
				quarterlyChanges,
				story,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}
