// app/api/fetchAndStoreMatches/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET() {
  try {
    const upcomingDocRef = doc(collection(db, 'cricket'), 'upcomingMatches')
    const upcomingDocSnap = await getDoc(upcomingDocRef)

    if (!upcomingDocSnap.exists()) {
      return NextResponse.json(
        { message: 'No upcoming matches found' },
        { status: 404 }
      )
    }

    const matchData = upcomingDocSnap.data()
    const matchIds = Object.keys(matchData)

    for (const matchId of matchIds) {
      const url = `https://crickbuzz-official-apis.p.rapidapi.com/match/${matchId}/squads`

      try {
        const response = await axios.get(url, {
          headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY || '',
            'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com'
          }
        })

        const squadData = response.data
        const playerDocRef = doc(collection(db, 'players'), matchId)
        await setDoc(playerDocRef, squadData)
        console.log(`Saved players for match ID: ${matchId}`)
      } catch (apiError) {
        console.error(`Error fetching match ${matchId}:`, apiError)
      }

      await delay(1000)
    }

    return NextResponse.json({
      message: 'Players fetched and saved successfully'
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Server error', error: String(err) },
      { status: 500 }
    )
  }
}