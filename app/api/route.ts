import Image from "image-js";
import { sha512 } from "js-sha512";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { generateIdenticon } from "./generate";
import { Identicon } from "./identicon";




export function GET(req: NextRequest) {
  const identicon = new Identicon('')
  identicon.drawIdenticon();
  const data = identicon.img.toBuffer()


  const res = new NextResponse(data)
  res.headers.set('content-type', 'image/png')
  return res;
}
