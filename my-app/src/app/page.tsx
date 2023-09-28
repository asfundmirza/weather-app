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
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData(city);
  }, [city]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCity(searchValue);
  };
  const temperatureInFahrenheit = weatherData?.main?.temp;
  const temperatureInCelsius = (temperatureInFahrenheit - 273.15).toFixed(2);
  return (
    <div className="flex justify-center items-center min-h-[100vh] min-w-[100vw]">
      <div className="flex  p-14   w-[600px]  m-3 rounded-lg  bg-black">
        <div className="flex-1 flex-col   ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:space-x-5 justify-between gap-3 items-center"
          >
            <input
              type="text"
              placeholder="City Name"
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-4 rounded-3xl text-lg outline-none w-full"
            />
            <button
              className="flex py-4 px-6 md:px-4 bg-slate-100 rounded-3xl justify-center text-center"
              type="submit"
            >
              Search
            </button>
          </form>
          {weatherData?.message === "city not found" ? (
            <div className="flex justify-center items-center mt-12">
              <h1 className="text-white md:text-4xl text-2xl text-center">
                City not found
              </h1>
            </div>
          ) : (
            <>
              {weatherData?.weather?.length > 0 && (
                <div className="flex md:flex-row flex-col justify-between items-center">
                  <div className="relative">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
                      alt="icon"
                      width={200}
                      height={200}
                      className="flex"
                    />
                    <p className="absolute text-white left-0 right-0  bottom-6 text-center">
                      {weatherData?.weather[0]?.description}
                    </p>
                  </div>
                  <div className="hidden md:block text-white md:text-6xl text-5xl font-semibold relative">
                    {temperatureInCelsius}
                    <span className="text-sm absolute top-0 right-[-2]">
                      °C
                    </span>
                  </div>

                  {/* for mobile */}

                  <div className="md:hidden flex justify-between items-center w-full  ">
                    <div className="text-white  text-2xl font-semibold">
                      {weatherData?.name}
                    </div>
                    <div className=" text-white  text-3xl font-semibold relative">
                      {temperatureInCelsius}
                      <span className="text-sm absolute top-0 right-[-2]">
                        °C
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="hidden md:block mt-3 text-center">
                <div className="text-white md:text-6xl text-2xl font-semibold">
                  {weatherData?.name}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
