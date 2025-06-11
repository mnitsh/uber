import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { userDataContext } from "../context/UserContext";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: { firstName, lastName },
      email,
      password,
    };

    try {
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!password.trim()) {
        toast.error("Password is required");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be greater than 6 character");
        return;
      }
      if (!firstName.trim()) {
        toast.error("First Name is required");
        return;
      }
      const response = await axiosInstance.post("/v1/users/register", newUser);
      if (response.status === 201) {
        setUser(response.data.data.user);
        toast.success("User created successfully");
        setUser(response.data.data.user);
        localStorage.setItem("token", response.data.data.token);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-7 flex flex-col min-h-screen bg-gray-100 justify-between">
      <div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
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
          <h3 className="text-base font-medium mb-3">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full mb-6 text-base placeholder:text-sm"
            placeholder="password"
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
          <Link to="/login" className="text-blue-500 hover:underline">
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
          .
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
