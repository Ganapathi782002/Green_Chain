import React, { useState } from "react";

const FarmerPage = () => {
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can send the data to your blockchain service for processing
    // You might use a library like web3.js for Ethereum or another blockchain SDK

    // Example of how you might send data to a hypothetical blockchain function:
    // await blockchainService.saveData(location, pincode, pdfFile);

    // Clear form fields after submission
    setLocation("");
    setPincode("");
    setPdfFile(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit Data to Blockchain</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-600">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-gray-600">Pincode</label>
          <input
            type="number"
            id="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pdfFile" className="block text-gray-600">Upload PDF</label>
          <input
            type="file"
            id="pdfFile"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerPage;
