// src/app/api/clients/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data:", data);

  try {
    console.log("Attempting to save data:", data);

    // Extracting client data and recommendations from the request body
    const {
      name,
      age,
      retirementAge,
      jobTitle,
      income,
      currentSavings,
      savingsPercentage,
      recommendations, // Array of recommended ETFs
    } = data;

    // Create client and recommendations in a single Prisma transaction
    const client = await prisma.client.create({
      data: {
        name,
        age: parseInt(age, 10),
        retirementAge: parseInt(retirementAge, 10),
        jobTitle,
        income: parseFloat(income),
        currentSavings: parseFloat(currentSavings),
        savingsPercentage: parseFloat(savingsPercentage),
        recommendations: {
          create: recommendations?.map((rec: { ticker: string; name: string }) => ({
            ticker: rec.ticker,
            name: rec.name,
          })),
        },
      },
    });

    console.log("Data saved successfully:", client);
    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: { recommendations: true }, // Include related recommendations
    });

    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
