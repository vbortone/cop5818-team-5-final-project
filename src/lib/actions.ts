"use server";
import OpenAI from "openai";

export type RetirementFormData = {
  name: string | null;
  age: number | null;
  retirementAge: number | null;
  jobTitle: string | null;
  income: number | null;
  currentSavings: number | null;
  savingsPercentage: number | null;
};

async function fetchEtfRecommendations(formData: RetirementFormData) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI financial advisor. Respond only with a valid JSON array of objects, where each object has 'ticker' and 'name' fields.",
        },
        {
          role: "user",
          content: `Please recommend some ETFs for a user with the following information: Name: ${formData.name}, Age: ${formData.age}, Retirement Age: ${formData.retirementAge}, Job Title: ${formData.jobTitle}, Income: ${formData.income}, Savings: ${formData.currentSavings}, Savings Percentage: ${formData.savingsPercentage}. Respond with a JSON array where each ETF has a 'ticker' and 'name'.`,
        },
      ],
    });

    console.log("OpenAI Response:", response); // Debugging

    let recommendations = [];
    let content = response.choices[0].message?.content || "[]";
    console.log("Raw OpenAI Content:", response.choices[0].message?.content);
    content = content.trim();
    if (content.startsWith("```json")) content = content.slice(7);
    if (content.startsWith("```")) content = content.slice(3);
    if (content.endsWith("```")) content = content.slice(0, -3);
    recommendations = JSON.parse(content);
    return recommendations;
}

export async function handleEtfRecommendations(formData: FormData) {
  const formValues = {
    name: formData.get("name"),
    age: formData.get("age"),
    retirementAge: formData.get("retirementAge"),
    jobTitle: formData.get("jobTitle"),
    income: formData.get("income"),
    currentSavings: formData.get("savings"),
    savingsPercentage: formData.get("savingsPercentage"),
  } as RetirementFormData;

  try {
    console.log("Form values:", formValues);

    // Fetch ETF recommendations
    const recommendedEtfs = await fetchEtfRecommendations(formValues);

    console.log("ETF recommendations:", recommendedEtfs);

    if (Array.isArray(recommendedEtfs)) {
      setEtfRecommendations(recommendedEtfs);

      // Send client data and recommendations to the database
      const dbResponse = await axios.post("/api/clients", {
        ...formValues,
        recommendations: recommendedEtfs, // Attach recommendations
      });

      if (dbResponse.status === 201) {
        console.log(
          "Client data and ETF recommendations saved:",
          dbResponse.data
        );
      } else {
        console.error("Error saving client data:", dbResponse.data.error);
      }

      // Fetch and process chart data
      const chartResponse = await fetch("/api/chartdata");

      if (chartResponse.ok) {
        const chartData = await chartResponse.json();

        if (Array.isArray(chartData) && chartData.length > 0) {
          console.log("Chart data received:", chartData);

          // Validate each data point
          chartData.forEach((dataPoint, index) => {
            if (
              !dataPoint.date ||
              dataPoint.etfPortfolio === undefined ||
              dataPoint.spx === undefined
            ) {
              console.error(
                `Invalid data format at index ${index}:`,
                dataPoint
              );
            }
          });

          setChartData(chartData); // Save chart data to state
        } else {
          console.error("No chart data received or unexpected format");
          setChartData([]); // Clear chart data if invalid
        }
      } else {
        console.error("Failed to load chart data:", chartResponse.status);
        throw new Error("Failed to load chart data");
      }
    } else {
      console.error(
        "Expected an array for ETF recommendations but received:",
        recommendedEtfs
      );
      setEtfRecommendations([]);
    }
  } catch (error) {
    console.error("Error in handleEtfRecommendations:", error);
  }
}
