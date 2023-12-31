"use client";

import { useEffect, useState } from "react";
import { weatherType } from "../../typings";
export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [weatherData, setweatherData] = useState<weatherType>();

  const addressApiUrl = process.env.NEXT_PUBLIC_API_ADDRESS;
  const latLongApiUrl = process.env.NEXT_PUBLIC_API_LAT_LONG;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  async function fetchData(cityName: string) {
    try {
      const res = await fetch(`api/weather?address=${cityName}`);
      const jsonData = (await res.json()).data;
      setweatherData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchindCoordinates(latitude: number, longitude: number) {
    try {
      const res = await fetch(
        `api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const jsonData = (await res.json()).data;
      setweatherData(jsonData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          fetchindCoordinates(latitude, longitude);
          setLocationAllowed(true); // User allowed access
          console.log("allowed access");
        },
        function (error) {
          if (error.code === 1) {
            // User denied access
            setLocationAllowed(false);
            console.log("denied access");
          }
        }
      );
    }
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fetchData(searchValue);
    setSearchValue("");
  };
  const temperatureInFahrenheit = weatherData?.main?.temp;
  const temperatureInCelsius =
    temperatureInFahrenheit !== undefined &&
    (temperatureInFahrenheit - 273.15).toFixed(2);
  return (
    <div className="flex justify-center items-center min-h-[100vh] min-w-[100vw]">
      <div className="flex  p-14   w-[600px]  m-3 rounded-3xl  bg-gradient-to-r from-indigo-800 via-purple-600 to-cyan-200">
        <div className="flex-1 flex-col   ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:space-x-5 justify-between gap-3 items-center"
          >
            <input
              type="text"
              value={searchValue}
              autoFocus
              required
              placeholder="City Name"
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-4 rounded-full text-lg outline-none w-full "
            />
            <button
              className="flex py-4 px-6 md:px-4 bg-slate-400 hover:bg-black text-white rounded-full justify-center text-center"
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
              {weatherData &&
              weatherData?.weather?.length > 0 &&
              weatherData?.main?.temp ? (
                <>
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

                  <div className="hidden md:block mt-3 text-center">
                    <div className="text-white text-4xl font-semibold">
                      {weatherData?.name}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center mt-12">
                  {locationAllowed ? (
                    <div
                      className="  inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <div>Please allow location access</div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
