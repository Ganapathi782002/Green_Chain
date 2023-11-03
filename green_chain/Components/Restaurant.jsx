import React from "react";
import Link from "next/link";
import { auth } from "../firebaseConfig";

const Restaurant = () => {
  return (
    <div>
      <div
        className="flex justify-center space-x-4"
        style={{ marginTop: "20px" }}
      >
        <Link href="/restaurantsregistration">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-105">
            Register
          </button>
        </Link>
        <Link href="/restaurantslogin">
        {!auth.currentUser && ( <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 transform hover:scale-105">
            Login
          </button>)}
        </Link>
        <Link href="/viewallrestaurants">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 transform hover:scale-105">
            View All Restaurants
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
