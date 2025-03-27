import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { AdCategories } from '@/app/ads/adService';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function POST(request: Request) {
  const { question } = await request.json();

  console.log("process.env['OPENAI_API_KEY']:", process.env['OPENAI_API_KEY']);

  try {
    const prompt = 
      `Given only the following categories: "${AdCategories.join(", ")}", and the Question: "${question}".
      The categories may be broad. Given the list of categories, choose a single category that broadly matches
      the question. Respond with just the category name, nothing else.`;

    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: 'user', content: prompt }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
    });

    const suggestedCategory = chatCompletion.choices[0].message.content?.trim();

    // Validate that the returned category is in list
    const category = AdCategories.includes(suggestedCategory || '') ? suggestedCategory : 'None';
    return NextResponse.json({ "category": category });
  }
  catch (error: any) {
    console.error('Error categorizing question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
