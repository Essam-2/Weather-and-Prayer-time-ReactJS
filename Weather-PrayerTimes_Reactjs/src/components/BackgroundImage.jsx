import React, { useMemo } from "react";

const BackgroundImage = ({ data = {} }) => {
  const getBackgroundImage = useMemo(() => {
    const condition = data?.current?.condition?.text?.toLowerCase().trim();

    switch (condition) {
      case "sunny":
        return "/img/sunny.jpg";
      case "clear":
        return "/img/clear.jpg";
      case "partly cloudy":
      case "cloudy":
      case "overcast":
        return "/img/cloudy.jpg";
      case "light rain":
      case "rain":
        return "/img/rain.jpg";
      case "thunderstorm":
      case "patchy light rain with thunder":
        return "/img/thunderstorm.jpg";
      case "snow":
      case "ice pellets":
        return "/img/snowing.jpg";
      case "mist":
      case "fog":
        return "/img/fog.jpg";
      default:
        return "/img/default.jpg";
    }
  }, [data]);

  return (
    <img
      src={getBackgroundImage} // Updated image source
      className="w-full h-full object-cover absolute inset-0"
      alt="Background"
    />
  );
};

export default BackgroundImage;
