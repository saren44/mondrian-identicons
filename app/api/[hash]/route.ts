import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { generateIdenticon } from "../generate";

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
  const identicon = generateIdenticon(params.hash)
  const data = identicon.toBuffer()

  const res = new NextResponse(data)
  res.headers.set('content-type', 'image/png')
  return res;
}
