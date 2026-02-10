import { NextResponse } from "next/server";

let claimed = false;

export async function POST(req: Request) {
  if (claimed) {
    return NextResponse.json({ error: "Already claimed" }, { status: 403 });
  }

  const body = await req.json();

  const valid =
    body.herNumber === Number(process.env.PUZZLE_HER_NUMBER) &&
    body.myNumber === Number(process.env.PUZZLE_MY_NUMBER) &&
    body.herSign === process.env.PUZZLE_HER_SIGN &&
    body.mySign === process.env.PUZZLE_MY_SIGN;

  if (!valid) {
    return NextResponse.json({ error: "Invalid combination" }, { status: 401 });
  }

  claimed = true;

  return NextResponse.json({
    code: process.env.SECRET_PHRASE,
  });
}
