// app/api/cricket/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://crickbuzz-official-apis.p.rapidapi.com/match/115012',
      headers: {
        'x-rapidapi-key': '6a1ca939a2msh7193cece8848ad4p12cb78jsn956ea6cd4529',
        'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
