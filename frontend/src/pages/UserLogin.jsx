import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ email, password });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user.email && user.password) {
      console.log("User logged in:", user);
    }
  }, [user]);

  return (
    <div className="p-7 flex flex-col min-h-screen bg-gray-100 justify-between">
      <div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-14 mb-7"
        />

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-3">What's your email?</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-lg placeholder:text-sm"
            autoFocus
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-3">Enter Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-lg placeholder:text-sm"
            placeholder="password"
          />
          <button
            type="submit"
            className="bg-[#111] text-white rounded py-2 px-4 w-full text-lg font-semibold hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-2">
          New here?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create a new account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="flex justify-center items-center bg-[#10b461] mb-5 text-white rounded py-2 px-4 w-full text-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
