import React, { useState, useEffect } from "react";
import { auth as firebaseAuth,db } from "../firebaseConfig";
import { collection, getDocs, addDoc, query } from "firebase/firestore"; // Import Firestore functions
import { createUserWithEmailAndPassword } from "firebase/auth";


const FarmerRegister = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    contact: "",
    farmSize: "",
    cultivationType: "",
    grade: "A+",
  });

  // Check if "Farmers" collection exists during component initialization
  useEffect(() => {
    checkAndCreateFarmersCollection();
  }, []);

  // Function to check and create the "Farmers" collection if it doesn't exist
  const checkAndCreateFarmersCollection = async () => {

    const farmersRef = collection(db, "Farmers"); // Reference to "Farmers" collection
    const farmersQuery = query(farmersRef); // Query to get documents from the collection

    try {

      const snapshot = await getDocs(farmersQuery);
      if (snapshot.empty) {
        // The collection is empty, so create it if it doesn't exist
        console.log("The 'Farmers' collection does not exist. Creating it...");
        await addDoc(farmersRef, { initialized: true });
      }
    } catch (error) {
      console.error("Error checking 'Farmers' collection:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the form data to Firestore
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formData.email,
        formData.password
      );

      // User creation successful
      const user = userCredential.user;
      console.log("User registration successful!");
      await addDoc(collection(db, "Farmers"), formData);

      // Handle success, e.g., show a success message or redirect
      console.log("Farmer registration successful!");

      // Clear the form data if needed
      setFormData({
        name: "",
        email: "",
        password: "",
        location: "",
        contact: "",
        farmSize: "",
        cultivationType: "",
        grade: "A+",
      });
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error registering farmer", error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Name, Email, and Password */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            maxLength="50"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* Location, Contact, Farm Size, Cultivation Type, and Grade */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location/Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            maxLength="50"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Contact Information (Phone Number)
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
            pattern="[0-9]{10}"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700">
            Farm Size (in acres)
          </label>
          <input
            type="text"
            id="farmSize"
            name="farmSize"
            value={formData.farmSize}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cultivationType" className="block text-sm font-medium text-gray-700">
            Type of Cultivation
          </label>
          <input
            type="text"
            id="cultivationType"
            name="cultivationType"
            value={formData.cultivationType}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerRegister;
