
import { NextRequest, NextResponse } from "next/server";
import { Identicon } from "../identicon";

export function GET(
  req: NextRequest,
  { params }: { params: { hash: string } },
) {
  const identicon = new Identicon(params.hash)
  identicon.drawIdenticon();
  const data = identicon.img.toBuffer()

  const res = new NextResponse(data)
  res.headers.set('content-type', 'image/png')
  return res;
}
