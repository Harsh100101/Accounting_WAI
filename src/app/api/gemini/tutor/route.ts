import { NextRequest, NextResponse } from "next/server";
import { financialDataProvider } from "@/lib/providers/marketDataProvider";
import { askAiFinancialTutor } from "@/lib/gemini/geminiClient";
import { LearningMode } from "@/types/financials";

const ALLOWED_LEARNING_MODES: LearningMode[] = ["beginner", "intermediate", "advanced"];
const TICKER_REGEX = /^[A-Z0-9.\-_]{1,15}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, ticker, learningMode } = body;

    // Validate existence & types
    if (!question || typeof question !== "string" || !ticker || typeof ticker !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid question and ticker are required." },
        { status: 400 }
      );
    }

    const trimmedQuestion = question.trim();
    const cleanTicker = ticker.trim().toUpperCase();

    // Enforce size bounds to prevent prompt flooding & DoS
    if (trimmedQuestion.length === 0 || trimmedQuestion.length > 500) {
      return NextResponse.json(
        { success: false, error: "Question must be between 1 and 500 characters." },
        { status: 400 }
      );
    }

    if (!TICKER_REGEX.test(cleanTicker)) {
      return NextResponse.json(
        { success: false, error: "Invalid ticker format." },
        { status: 400 }
      );
    }

    const validatedMode: LearningMode = ALLOWED_LEARNING_MODES.includes(learningMode)
      ? learningMode
      : "beginner";

    const company = await financialDataProvider.getCompanyQuote(cleanTicker);
    const financials = await financialDataProvider.getMultiYearFinancials(cleanTicker);

    if (!company || !financials) {
      return NextResponse.json(
        { success: false, error: "Company or financials not found." },
        { status: 404 }
      );
    }

    const answer = await askAiFinancialTutor(
      trimmedQuestion,
      company,
      financials,
      validatedMode
    );

    return NextResponse.json({ success: true, data: answer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Tutor processing error." },
      { status: 500 }
    );
  }
}

