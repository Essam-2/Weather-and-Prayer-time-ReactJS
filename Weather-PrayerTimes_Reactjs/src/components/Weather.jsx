import React, { useEffect, useState } from "react";

const Weather = ({ weatherInfo = {} }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <h2 className=" text-2xl text-black font-bold m-3">Weather</h2>
      <div className="flex justify-center items-center  gap-3">
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              {weatherInfo?.current?.condition?.text}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              {`${weatherInfo?.current?.temp_c}C`}
              {` (${weatherInfo?.current?.temp_f}F)`}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Humidity:{` ${weatherInfo?.current?.humidity}%`}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Cloud:
              {` ${weatherInfo?.current?.cloud}%`}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Feels Like:
              {` ${weatherInfo?.current?.feelslike_c}C/(${weatherInfo?.current?.feelslike_f}F)`}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Wind:
              {` ${weatherInfo?.current?.wind_kph} km/h`}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
