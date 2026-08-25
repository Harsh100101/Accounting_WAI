import { NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/marketDataProvider";

export async function GET() {
  try {
    const indices = await financialDataProvider.getMarketIndices();
    return NextResponse.json({ success: true, data: indices });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch market indices" },
      { status: 500 }
    );
  }
}
