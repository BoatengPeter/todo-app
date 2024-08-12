import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
export async function GET() {
  const { userId, getToken } = auth();

  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }

  const token = await getToken({ template: "supabase" });

  // Fetch data from Supabase and return it.
  const data = { supabaseData: 'Hello World' };

  return NextResponse.json({ data });
}