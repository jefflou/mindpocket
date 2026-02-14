import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import {
  deleteBilibiliCredentials,
  getBilibiliCredentials,
  hasBilibiliCredentials,
  saveBilibiliCredentials,
} from "@/db/queries/bilibili-credentials"

export async function GET() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  })

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const hasCredentials = await hasBilibiliCredentials(session.user.id)
  return NextResponse.json({ hasCredentials })
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  })

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { sessdata, biliJct, buvid3 } = body

    if (!sessdata || !biliJct || !buvid3) {
      return NextResponse.json(
        { error: "Missing required fields: sessdata, biliJct, buvid3" },
        { status: 400 }
      )
    }

    await saveBilibiliCredentials(session.user.id, {
      sessdata,
      biliJct,
      buvid3,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save Bilibili credentials:", error)
    return NextResponse.json({ error: "Failed to save credentials" }, { status: 500 })
  }
}

export async function DELETE() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  })

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await deleteBilibiliCredentials(session.user.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete Bilibili credentials:", error)
    return NextResponse.json({ error: "Failed to delete credentials" }, { status: 500 })
  }
}
