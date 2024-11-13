import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Education');
    const collection = db.collection('Videos');

    const data = await collection.find({}).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}