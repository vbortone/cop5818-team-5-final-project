// src/app/api/clients/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request, RequestContext) {
  const data = await request.json();
  console.log("Received data:", data); // Add this to verify data received

  try {
    const client = prisma.client.create({
      data: {
        name: data.name,
        age: data.age,
        retirementAge: data.retirementAge,
        jobTitle: data.jobTitle,
        income: data.income,
        currentSavings: data.currentSavings,
        savingsPercentage: data.savingsPercentage,
      },
    });

    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error) {
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