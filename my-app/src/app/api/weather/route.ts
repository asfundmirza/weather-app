import React from "react";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const latitude = searchParams.get("latitude");
  const longitutde = searchParams.get("longitutde");

  let url = "";

  if (address) {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&appid=" +
      "bc450695b5ce8bbd421f493b035030a2";
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitutde}&appid=bc450695b5ce8bbd421f493b035030a2`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json({ data });
}
