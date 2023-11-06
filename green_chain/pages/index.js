import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col justify-center items-center">
      {/* Hero section with fadeInUp animation */}
      <div className="bg-purple-500 text-white py-10 px-4 text-center relative animate__animated animate__fadeInUp">
        <h1 className="text-4xl font-extrabold">
          <span className="glow-text">Farm-to-Table Waste Management</span>
        </h1>
        <p className="mt-4 text-lg">
          Connecting Farmers and Restaurants for Sustainable Waste Disposal
        </p>
      </div>

      {/* Call to Action with bounceIn animation */}
      <div className="mt-8 bg-green-500 text-white py-4 px-4 rounded-lg text-center animate__animated animate__bounceIn">
        <p className="text-lg">Join us in the journey towards sustainable waste management!</p>
        <button className="mt-2 bg-white text-green-500 py-2 px-6 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Index;
