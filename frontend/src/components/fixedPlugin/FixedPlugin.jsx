// Chakra Imports
// Custom Icons
import React from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
export default function FixedPlugin(props) {
  const { ...rest } = props;
  const [darkmode, setDarkmode] = React.useState(false);

  //Set Dark Mode in Locustoreg get valsue
  React.useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode == "true") {
      document.body.classList.add("dark");
      setDarkmode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkmode(false);
    }
  }, []);

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={() => {
        if (darkmode) {
          document.body.classList.remove("dark");
          localStorage.setItem("darkMode", false);
          setDarkmode(false);
        } else {
          document.body.classList.add("dark");
          localStorage.setItem("darkMode", true);
          setDarkmode(true);
        }
      }}
      {...rest}
    >
      {/* // left={document.documentElement.dir === "rtl" ? "35px" : ""}
      // right={document.documentElement.dir === "rtl" ? "" : "35px"} */}
      <div className="cursor-pointer text-gray-600">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
