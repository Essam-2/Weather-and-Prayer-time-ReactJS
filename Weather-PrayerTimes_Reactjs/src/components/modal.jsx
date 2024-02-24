import React, { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";

const Modal = ({
  showModal,
  setShowModal,
  setLocation,
  fetchPrayerData,
  fetchWeatherData,
}) => {
  const [countryid, setCountryid] = useState(0);
  const [countryName, setCountryName] = useState("Canada");
  const [cityName, setCityName] = useState("Coral Harbour");
  const [stateid, setstateid] = useState(0);

  const handleSubmit = () => {
    setLocation({ city: cityName, country: countryName });
    fetchWeatherData();
    fetchPrayerData();
    setShowModal(false); // Close the modal after submitting
  };

  return (
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
              <h6>Country</h6>
              <CountrySelect
                showFlag={true}
                onChange={(e) => {
                  setCountryid(e.id);
                  setCountryName(e.name);
                }}
                placeHolder="Select Country"
              />
            </div>
            <div className="mb-4">
              <h6>State</h6>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              />
            </div>
            <div className="mb-4">
              <h6>City</h6>
              <CitySelect
                stateid={stateid}
                countryid={countryid}
                onChange={(e) => {
                  setCityName(e.name);
                }}
                placeHolder="Select City"
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
                onClick={handleSubmit}
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
  );
};

export default Modal;
