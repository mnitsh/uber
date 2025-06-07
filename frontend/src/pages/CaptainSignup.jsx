import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [captain, setCaptain] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptain({ fullName: { firstName, lastName }, email, password });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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
              required
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
            required
          />
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
            Create account
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
