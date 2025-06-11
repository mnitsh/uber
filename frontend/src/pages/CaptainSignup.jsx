import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("car");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    try {
      // Validate input fields
      if (!firstName) {
        toast.error("First name is required.");
        return;
      }
      if (!email) {
        toast.error("Email is required.");
        return;
      }
      if (!password) {
        toast.error("Password is required.");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be greater than 6 character");
        return;
      }
      if (!vehicleColor) {
        toast.error("Vehicle color is required.");
        return;
      }
      if (!vehiclePlate) {
        toast.error("Vehicle plate number is required.");
        return;
      }
      // Send POST request to create captain account
      const response = await axiosInstance.post(
        "/v1/captians/register",
        captainData
      );
      if (response.status == 201) {
        setCaptain(response.data.data.captian);
        console.log(
          "Captain created successfully:",
          response.data.data.captian
        );
        localStorage.setItem("captainToken", response.data.data.token);
        setCaptain(response.data.data.captian);
        toast.success("Captain account created successfully!");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity(1);
        setVehicleType("car");
        navigate("/captain-home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create captain account.";
      console.error("Error creating captain account:", error);
      toast.error(errorMessage);
      return;
    }
  };
  return (
    <div className="p-7 flex flex-col min-h-screen bg-gray-100 justify-between">
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Captain Uber Logo"
          className="w-14 mb-7"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-3">What's your name?</h3>
          <div className="flex gap-4 mb-6">
            {/* Input fields for first and last name */}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              placeholder="First Name"
              autoFocus
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-base font-medium mb-3">What's your email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-base placeholder:text-sm"
            placeholder="email@example.com"
          />

          <h3 className="text-base font-medium mb-3">Vehicle Details</h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/4 text-base placeholder:text-sm"
              placeholder="Vehicle Color"
            />
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/4 text-base placeholder:text-sm"
              placeholder="Vehicle Plate"
            />

            {vehicleType !== "bike" && (
              <div className="relative w-1/4">
                <input
                  type="number"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm pr-10 text-center"
                  placeholder="Vehicle Capacity"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setVehicleCapacity((prev) => Number(prev) + 1)
                    }
                    className="text-gray-600 text-xs transition-transform hover:scale-125 active:scale-90 duration-150"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setVehicleCapacity((prev) =>
                        Math.max(0, Number(prev) - 1)
                      )
                    }
                    className="text-gray-600 text-xs transition-transform hover:scale-125 active:scale-90 duration-150"
                  >
                    ▼
                  </button>
                </div>
              </div>
            )}

            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/4 text-base placeholder:text-sm"
            >
              <option disabled value="">
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="van">Auto</option>
            </select>
          </div>

          <h3 className="text-base font-medium mb-3">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-base placeholder:text-sm"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="bg-[#111] text-white rounded py-2 px-4 w-full text-lg font-semibold hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create captain account
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-1">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <div>
        {/* Privacy Policy */}
        <p className="text-xs text-gray-400 text-center mt-8">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-blue-500">
            Terms of Service
          </Link>
          ,{" "}
          <Link to="/privacy" className="underline hover:text-blue-500">
            Privacy Policy
          </Link>
          , and{" "}
          <Link to="/captain-policy" className="underline hover:text-blue-500">
            Captain Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
