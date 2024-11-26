import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { name, age, retirementAge, jobTitle, income, savings, savingsPercentage } =
    await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          //While the prompt seems clear, subtle ambiguities might confuse the model. For example, the request for "valid JSON" might not enforce strict formatting.
          //Solution: Simplify and tighten the prompt
          role: "system",
          content: "You are an AI financial advisor. Respond with a valid JSON array of objects, where each object has 'ticker' and 'name' fields.",
        },
        {
          role: "user",
          content: `User details: { "name": "${name}", "age": ${age}, "retirementAge": ${retirementAge}, "jobTitle": "${jobTitle}", "income": ${income}, "savings": ${savings}, "savingsPercentage": ${savingsPercentage} }. Recommend ETFs as a JSON array.`,
        },
      ],
    });

    console.log("OpenAI API Full Response:", response);

    let recommendations = [];
    let content = response.choices[0]?.message?.content || "[]";
    console.log("Raw OpenAI Content:", content);

    try {
      content = content.trim();
      if (content.startsWith("```json")) content = content.slice(7);
      if (content.startsWith("```")) content = content.slice(3);
      if (content.endsWith("```")) content = content.slice(0, -3);
      recommendations = JSON.parse(content);

      // Validate the structure of the recommendations
      recommendations = recommendations.filter(
        (etf: { ticker: string; name: string }) => etf.ticker && etf.name
      );

      // Fallback if no valid recommendations
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        recommendations = [
          { ticker: "N/A", name: "No recommendations available" },
        ];
      }
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError, content);
      throw new Error("Invalid response format from OpenAI.");
    }

    return NextResponse.json({ recommendations });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
