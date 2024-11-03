// src/app/api/clients/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received data:", data); // Add this to verify data received

  try {
    console.log("Attempting to save data:", data);

    const client = await prisma.client.create({
      data: {
        name: data.name,
        age: parseInt(data.age, 10),
        retirementAge: parseInt(data.retirementAge, 10),
        jobTitle: data.jobTitle,
        income: parseFloat(data.income),
        currentSavings: parseFloat(data.currentSavings),
        savingsPercentage: parseFloat(data.savingsPercentage),
      },
    });

    console.log("Data saved successfully:", client); 
    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  } 
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}