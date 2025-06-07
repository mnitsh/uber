import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captain, setCaptain] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptain({ email, password });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (captain.email && captain.password) {
      console.log("Captain logged in:", captain);
    }
  }, [captain]);

  return (
    <div className="p-7 flex flex-col min-h-screen bg-gray-100 justify-between">
      <div>
        <img
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="Captain Uber Logo"
          className="w-14 mb-7"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-3">What's your email?</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-lg placeholder:text-sm"
            autoFocus
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-3">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-lg placeholder:text-sm"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="bg-[#111] text-white rounded py-2 px-4 w-full text-lg font-semibold hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-1">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-500 hover:underline">
            Register as Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login"
          className="flex justify-center items-center bg-[#f3c164] mb-5 text-white rounded py-2 px-4 w-full text-lg font-semibold hover:bg-orange-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
