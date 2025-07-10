import { getAIResponse } from '@/lib/actions/ai.actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const response = await getAIResponse(prompt);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}