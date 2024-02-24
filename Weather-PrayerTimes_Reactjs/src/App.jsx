import { useEffect, useState } from "react";
import "./App.css";
import { TERipple } from "tw-elements-react";
import Weather from "./components/Weather";
import PrayerTimes from "./components/PrayerTimes";
import axios from "axios";
import BackgroundImage from "./components/backgroundImage";
import Modal from "./components/modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const defaultLocation = { city: "Coral Harbour", country: "Canada" };
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || defaultLocation
  );

  const [error, setError] = useState(null);

  const [prayerInfo, setPrayerInfo] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});

  const apiKey = "9c89cd66e9a44f578b501526230704";

  const weatherAPI = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q="${location.city}"&aqi=yes`;
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(weatherAPI);

      const weatherData = response?.data;
      setWeatherInfo(weatherData);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const prayerTimesAPI = `http://api.aladhan.com/v1/timingsByCity?city=${location.city}&country=${location.country}&method=4`;
  const fetchPrayerData = async () => {
    try {
      const response = await axios.get(prayerTimesAPI);

      const PrayerTimes = response?.data?.data?.timings;
      setPrayerInfo(PrayerTimes);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchPrayerData();
  }, [location]);

  return (
    <div className="relative w-screen h-screen">
      <BackgroundImage data={weatherInfo} />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex justify-between px-40 w-full items-center">
        <div className="flex items-center justify-center">
          <img
            src={weatherInfo?.current?.condition?.icon || ""}
            className="w-60 h-60 mr-4 "
            alt="Cloudy"
          />
          <div className="flex items-end ">
            <h1 className="text-black font-bold text-9xl">
              {weatherInfo?.location?.name || ""}
            </h1>
            <p className="text-black text-5xl mb-5">
              ,{weatherInfo?.location?.country || ""}
            </p>
          </div>
        </div>
        <div className="">
          {/* <!-- Button trigger modal --> */}
          <TERipple rippleColor="">
            <button
              type="button"
              className="glass-card-btn rounded-lg shadow-lg p-6 text-black font-medium uppercase  leading-normal transition duration-150 ease-in-out hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none focus:ring-0 active:bg-bg-neutral-50"
              onClick={() => setShowModal(true)}
            >
              Change Location
            </button>
          </TERipple>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        setLocation={setLocation}
        fetchWeatherData={fetchWeatherData}
        fetchPrayerData={fetchPrayerData}
      />
      {error && <div className="text-red-500">Error: {error.message}</div>}
      {/* {Wether info} */}
      <Weather weatherInfo={weatherInfo} />
      {/* <Prayer Times */}
      <PrayerTimes prayerInfo={prayerInfo} />
    </div>
  );
}

export default App;
