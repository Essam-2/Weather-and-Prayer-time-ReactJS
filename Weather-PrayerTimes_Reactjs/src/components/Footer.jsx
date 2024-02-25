import React, { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="absolute bottom-0 w-full text-center text-sm p-4 ">
      Created by: Essam Anwar - @{currentYear}
    </div>
  );
};

export default Footer;
