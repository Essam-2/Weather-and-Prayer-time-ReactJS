import React from "react";

const PrayerTimes = ({ prayerInfo = {} }) => {
  return (
    <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <h2 className=" text-2xl text-black font-bold m-3">Prayer Times</h2>
      <div className="flex justify-center items-center gap-3">
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Fajir : {prayerInfo.Fajr}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Sunrise: {prayerInfo.Sunrise}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Dhuhr : {prayerInfo.Dhuhr}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">Asr : {prayerInfo.Asr}</h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">
              Maghrib : {prayerInfo.Maghrib}
            </h2>
          </div>
        </div>
        <div className="glass-card bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
          <div className="content">
            <h2 className="text-xl font-bold mb-2">Isha : {prayerInfo.Isha}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
