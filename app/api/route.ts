
import { NextRequest, NextResponse } from "next/server";
import { Identicon } from "./identicon";



//eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(req: NextRequest) {
  const identicon = new Identicon('')
  identicon.drawIdenticon();
  const data = identicon.img.toBuffer()


  const res = new NextResponse(data)
  res.headers.set('content-type', 'image/png')
  return res;
}
