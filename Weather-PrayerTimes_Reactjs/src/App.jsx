import { useEffect, useState } from "react";
import "./App.css";
import { TERipple } from "tw-elements-react";
import Weather from "./components/Weather";
import PrayerTimes from "./components/PrayerTimes";
import axios from "axios";
import BackgroundImage from "./components/backgroundImage";
import Modal from "./components/modal";
import Footer from "./components/Footer";

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
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 xl:flex xl:justify-between xl:items-center xl:flex-row xl:px-40 sm:flex sm:flex-col sm:items-center sm:justify-center w-full">
        <div className="xl:flex xl:items-center xl:flex-row xl:justify-center sm:flex sm:flex-col sm:items-center sm:justify-center w-full">
          <img
            src={weatherInfo?.current?.condition?.icon || ""}
            className="2xl:w-60 2xl:h-60 xl:h-56 xl:w-56 xl:mr-4 sm:h-40 sm:w-40"
            alt="Cloudy"
          />
          <div className="xl:flex items-end w-full sm:text-center sm:mb-5">
            <h1 className="text-black font-bold 2xl:text-9xl xl:text-6xl sm:text-2xl">
              {weatherInfo?.location?.name || ""}
            </h1>
            <p className="text-black 2xl:text-5xl xl:text-3xl 2xl:mb-5">
              ,{weatherInfo?.location?.country || ""}
            </p>
          </div>
        </div>
        <div className="">
          {/* <!-- Button trigger modal --> */}
          <TERipple rippleColor="">
            <button
              type="button"
              className="glass-card-btn rounded-lg shadow-lg 2xl:p-6 xl:p-4 sm:p-2 sm:text-xs xl:text-base text-black font-medium uppercase  leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-bg-neutral-50"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
