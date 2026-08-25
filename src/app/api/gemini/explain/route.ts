import { NextRequest, NextResponse } from "next/server";
import { getThreeQuestionExplanation } from "@/lib/engine/threeQuestionEngine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metricKey, value, context } = body;

    if (!metricKey) {
      return NextResponse.json(
        { success: false, error: "Metric key is required" },
        { status: 400 }
      );
    }

    const explanation = getThreeQuestionExplanation(metricKey, value, context);
    return NextResponse.json({ success: true, data: explanation });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Explanation failed" },
      { status: 500 }
    );
  }
}
