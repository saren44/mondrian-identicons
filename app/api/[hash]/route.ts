import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { generateIdenticon } from "../generate";
import { Identicon } from "../identicon";

type ResponseData = {
  title: string;
  devName: string;
  devId: string;
  gameId: string;
  data?: Array<string>;
};

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
