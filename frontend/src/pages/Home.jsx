import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="h-screen w-full pt-8 flex flex-col justify-between bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
          alt="Uber Logo"
          className="w-14 ml-8"
        />
        <div className="bg-white py-5 px-4 pb-7">
          <h2 className="text-3xl font-bold">Getting Started with Uber</h2>
          <Link
            className="block w-full bg-black text-white rounded py-3 mt-5 flex items-center justify-center font-semibold hover:bg-gray-800 transition"
            to="/login"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
