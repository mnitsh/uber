import React from "react";

function LocationSearchPanel({ setOpenPanel, setVehicalPanelOpen }) {
  //sample address
  const sampleAddress = [
    "23 Greenview Apartments, Sector 45, Bengaluru, Karnataka 560102",
    "2B Greenview Apartments, Sector 45, Bengaluru, Karnataka 560102",
    "2Y Greenview Apartments, Sector 45, Bengaluru, Karnataka 560102",
    "2C Greenview Apartments, Sector 45, Bengaluru, Karnataka 560102",
  ];

  return (
    <div>
      {sampleAddress.map((address, key) => (
        <div
          key={key}
          onClick={() => {
            setVehicalPanelOpen(true);
            setOpenPanel(false);
          }}
          className="flex justify-start items-center gap-2 my-2 border-2 border-gray-50 rounded-lg p-3 active:border-black"
        >
          <h3 className="h-8 w-12 rounded-[100%] bg-[#eee] flex items-center justify-center">
            <i className="ri-map-pin-line"></i>
          </h3>
          <h4 className="font-medium">{address}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
