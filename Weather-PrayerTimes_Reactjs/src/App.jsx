import { useEffect, useState } from "react";
import "./App.css";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import Weather from "./components/Weather";
import PrayerTimes from "./components/PrayerTimes";
import axios from "axios";
import BackgroundImage from "./components/backgroundImage";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [Location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location"))
  );

  const [error, setError] = useState(null);

  const [prayerInfo, setPrayerInfo] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});

  const apiKey = "9c89cd66e9a44f578b501526230704";

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q="Coral Harbour"&aqi=yes`;
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(url);

      const weatherData = response?.data;
      setWeatherInfo(weatherData);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const url2 =
    "http://api.aladhan.com/v1/timingsByCity?city=London&country=United Kingdom&method=4";
  const fetchPrayerData = async () => {
    try {
      const response = await axios.get(url2);

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
  }, []);

  console.log("Weather: ", weatherInfo);
  console.log("Prayer Times", prayerInfo);

  // const handlChange = (event) => {
  //   const { name, value } = event.target;
  //   setLocation((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [name]: value,
  //     };
  //   });
  // };

  // const handlsubmit = (event) => {
  //   event.preventDefault();
  //   localStorage.setItem(
  //     "location",
  //     JSON.stringify({
  //       city: Location.city,
  //       country: Location.country,
  //     })
  //   );
  //   fetchWeatherData();
  //   fetchPrayerData();
  // };

  return (
    // <></>
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
      <TEModal show={showModal} setShow={setShowModal} className="">
        <TEModalDialog className="">
          <TEModalContent className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full">
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Change Location
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="mb-4 ">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500 block shadow-sm sm:text-sm"
                  placeholder="Enter city"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-primary-500 focus:border-primary-500 block shadow-sm sm:text-sm"
                  placeholder="Enter country"
                />
              </div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save changes
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
      {error && <div>Error: {error.message}</div>}
      {/* {Wether info} */}
      <Weather weatherInfo={weatherInfo} />
      {/* <Prayer Times */}
      <PrayerTimes prayerInfo={prayerInfo} />
    </div>
  );
}

export default App;
