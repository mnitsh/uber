import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../comonents/LocationSearchPanel";

function Home() {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const pannelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickUp);
    console.log(destination);
  };

  useGSAP(() => {
    gsap.to(pannelRef.current, {
      height: openPanel ? "70%" : "0%",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [openPanel]);

  return (
    <div className="h-screen relative">
      <img
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
        alt="Uber Logo"
        className="w-16 left-5 top-5 absolute"
      />
      <div className="h-screen w-screen">
        {/* Image for temporary use */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end">
        <div className="h-[30%] bg-white p-6 relative">
          <form onSubmit={submitHandler}>
            <h5
              onClick={() => setOpenPanel(false)}
              className="absolute top-5 right-6 text-2xl"
            >
              <i
                className={`ri-arrow-down-wide-fill ${
                  openPanel ? "p-4" : "hidden"
                }`}
              ></i>
            </h5>
            <h4 className="font-semibold text-2xl">Find a trip</h4>
            <div className="line absolute h-16 w-1 top-[41%] bg-gray-900 rounded-full left-10"></div>
            <input
              className="bg-[#eee] text-lg px-12 py-2 w-full rounded-lg mt-5"
              type="text"
              onClick={(e) => {
                setOpenPanel(true);
              }}
              value={pickUp}
              placeholder="Add a pick-up location"
              onChange={(e) => setPickUp(e.target.value)}
            />
            <input
              className="bg-[#eee] text-lg px-12 py-2 w-full rounded-lg mt-3"
              type="text"
              onClick={(e) => setOpenPanel(true)}
              value={destination}
              placeholder="Enter your destination"
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={pannelRef} className="bg-white p-5">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
}

export default Home;
