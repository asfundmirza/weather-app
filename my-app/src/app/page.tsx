"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setweatherData] = useState("");
  const [city, setCity] = useState("lahore");

  async function fetchData(cityName: string) {
    try {
      const res = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await res.json()).data;
      setweatherData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData("london");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="flex  p-12 rounded-lg bg-black">
        <div className="flex flex-col space-y-10 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:space-x-5 justify-center gap-3 items-center"
          >
            <input
              type="text"
              placeholder="City Name"
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-2 rounded-3xl text-lg"
            />
            <button
              className="flex py-2 px-4 bg-slate-100 rounded-3xl justify-center text-center"
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="flex md:flex-row flex-col justify-between">
            <div className="text-white">weather icon</div>
            <div className="text-white">weather temperature</div>
          </div>
          <div className="flex justify-center">
            <div className="text-white">location</div>
          </div>
        </div>
      </div>
    </div>
  );
}
