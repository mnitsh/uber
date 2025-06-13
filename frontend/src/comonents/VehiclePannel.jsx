import React from "react";

function VehiclePannel({ setVehicalPanelOpen, setConfirmRidePanel }) {
  return (
    <div>
      <h5
        onClick={() => setVehicalPanelOpen(false)}
        className="w-[93%] absolute top-0 text-center "
      >
        <i className="ri-arrow-down-wide-fill text-3xl text-gray-300"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setVehicalPanelOpen(false);
        }}
        className="flex items-center justify-between w-full p-3 border-2 rounded-xl mb-2 active:border-black"
      >
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="car logo"
          className="h-12"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-400 ">
            Affordable, Compact ride
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setVehicalPanelOpen(false);
        }}
        className="flex items-center justify-between w-full p-3 border-2 rounded-xl mb-2 active:border-black"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="car logo"
          className="h-12"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            MotoGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-400 ">
            Affordable, Moter cycle ride
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹63.30</h2>
      </div>

      <div
        onClick={() => {
          setConfirmRidePanel(true);
          setVehicalPanelOpen(false);
        }}
        className="flex items-center justify-between w-full p-3  border-2 rounded-xl mb-2 active:border-black"
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="car logo"
          className="h-12"
        />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-400 ">
            Affordable, Auto rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹123.70</h2>
      </div>
    </div>
  );
}

export default VehiclePannel;
