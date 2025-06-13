import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../comonents/LocationSearchPanel";
import VehiclePannel from "../comonents/VehiclePannel";
import ConfirmRide from "../comonents/ConfirmRide";
import WaitingForDriver from "../comonents/WaitForDriver";
import { use } from "react";
import LookingForDriver from "../comonents/LookingForDriver";

function Home() {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const pannelRef = useRef(null);
  const [vehicalPanelOpen, setVehicalPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRideRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const createRide = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickUp);
    console.log(destination);
  };

  useGSAP(() => {
    gsap.to(pannelRef.current, {
      height: openPanel ? "70%" : "0%",
    });
  }, [openPanel]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehicalPanelOpen ? "translateY(0)" : "",
    });
  }, [vehicalPanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRideRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "",
    });
  }, [waitingForDriver]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "",
    });
  }, [vehicleFound]);

  return (
    <div className="h-screen relative overflow-hidden">
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
        <div className="h-[30%] p-6 relative bg-white">
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
        <div ref={pannelRef} className="bg-white px-5">
          <LocationSearchPanel
            setVehicalPanelOpen={setVehicalPanelOpen}
            setOpenPanel={setOpenPanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="z-10 fixed bottom-0 px-3 py-10 w-full bg-white translate-y-full pt-12"
      >
        <VehiclePannel
          setVehicalPanelOpen={setVehicalPanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* confirm ride pannel */}
      <div
        ref={confirmRideRef}
        className="z-10 fixed bottom-0 px-3 py-10 w-full bg-white translate-y-full pt-12"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for a driver */}
      <div
        ref={vehicleFoundRef}
        className="z-10 fixed bottom-0 px-3 py-10 w-full bg-white translate-y-full pt-12"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting for driver */}
      <div
        ref={waitingForDriverRef}
        className="z-10 fixed bottom-0 px-3 py-10 w-full bg-white translate-y-full pt-12"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
}

export default Home;
