import { NextRequest, NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/marketDataProvider";

const TICKER_REGEX = /^[A-Z0-9.\-_]{1,15}$/;
const VALID_RANGES = ["1M", "6M", "1Y", "5Y"] as const;
type ValidRange = (typeof VALID_RANGES)[number];

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
	const searchParams = request.nextUrl.searchParams;
	const rawRange = searchParams.get("range") as ValidRange;
	const range: ValidRange = VALID_RANGES.includes(rawRange) ? rawRange : "1M";

	try {
		const historicalPrices = await financialDataProvider.getHistoricalPrices(
			ticker,
			range,
		);
		return NextResponse.json({
			success: true,
			ticker,
			range,
			data: historicalPrices,
		});
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: "Failed to fetch historical chart prices" },
			{ status: 500 },
		);
	}
}
