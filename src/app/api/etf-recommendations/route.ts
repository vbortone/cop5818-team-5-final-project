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
            role: "system",
            content:
              "You are an AI financial advisor. Respond only with valid JSON.",
          },
          {
            role: "user",
            content: `Please recommend some ETFs for a user with the following information: Name: ${name}, Age: ${age}, Retirement Age: ${retirementAge}, Job Title: ${jobTitle}, Income: ${income}, Savings: ${savings}, Savings Percentage: ${savingsPercentage}. Respond with a JSON array where each ETF has a 'ticker' and 'name'.`,
          },
        ],
      });
      console.log("OpenAI API Key:", process.env.OPENAI_API_KEY); // Debugging

      console.log("OpenAI Response:", response); // Debugging

    let recommendations = [];
    let content = response.choices[0].message?.content || "[]";
    console.log("Raw OpenAI Content:", response.choices[0].message?.content);
    content = content.trim();
    if (content.startsWith("```json")) content = content.slice(7);
    if (content.startsWith("```")) content = content.slice(3);
    if (content.endsWith("```")) content = content.slice(0, -3);
    recommendations = JSON.parse(content);

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
