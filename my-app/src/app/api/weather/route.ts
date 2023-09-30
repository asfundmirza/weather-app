import React from "react";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const addressApiUrl = process.env.NEXT_PUBLIC_API_ADDRESS;
  const latLongApiUrl = process.env.NEXT_PUBLIC_API_LAT_LONG;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  let url = "";

  if (address) {
    url = `${addressApiUrl}?q=${address}&appid=${apiKey}`;

    // "https://api.openweathermap.org/data/2.5/weather?q=" +
    //   address +
    //   "&appid=" +
    //   "bc450695b5ce8bbd421f493b035030a2";
  } else {
    url = `${latLongApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json({ data });
}
