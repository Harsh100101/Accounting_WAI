import { NextRequest, NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/marketDataProvider";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQ = searchParams.get("q") || "";
  // Bound search query length to 50 chars and remove dangerous control characters
  const cleanQ = rawQ.slice(0, 50).replace(/[^\w\s.\-_]/gi, "").trim();

  try {
    const results = await financialDataProvider.searchCompanies(cleanQ);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}

