import React, { useState, useEffect } from "react";
import { auth as firebaseAuth,db } from "../firebaseConfig";
import { collection, getDocs, addDoc, query, where, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";

const FarmerRegister = () => {
  // State to hold form data
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountID: "",
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
  
  const checkAccountIDExists = async (accountID) => {
    const farmersRef = collection(db, "Farmers");
    const accountIDQuery = query(farmersRef, where("accountID", "==", accountID));

    const snapshot = await getDocs(accountIDQuery);
    return !snapshot.empty;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountIDExists = await checkAccountIDExists(formData.accountID);

    if (accountIDExists) {
      toast.error("Account ID already exists. Please Enter Your Account ID.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

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
      const roleRef = doc(db, "role", user.uid);
      const roleData = { role: "farmer" };
      await setDoc(roleRef, roleData);

      // await addDoc(collection(db, "Farmers"), formData);

      const farmersRef = collection(db, "Farmers");
      const farmerDocRef = doc(farmersRef, user.uid); // Use user's ID as the document ID
      await setDoc(farmerDocRef, formData);

      // Handle success, e.g., show a success message or redirect
      toast.success("Farmer registration successful!", {
        position: "top-right",
        autoClose: 5000, // Auto close the notification after 5 seconds
      });
      console.log("Farmer registration successful!");

      // Clear the form data if needed
      setFormData({
        name: "",
        email: "",
        password: "",
        accountID: "",
        location: "",
        contact: "",
        farmSize: "",
        cultivationType: "",
        grade: "A+",
      });
    } catch (error) {
      toast.error("Error registering farmer", {
        position: "top-right",
        autoClose: 5000, // Auto close the notification after 5 seconds
      });
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

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
            className="border rounded-lg px-3 py-2 w-full pr-10"
          />
          <button
            type="button"
            className="absolute right-0 top-4.5 bottom-0 m-auto px-3 py-2 flex items-center text-blue-500 hover:text-gray-800"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="accountID" className="block text-sm font-medium text-gray-700">
            Account ID (Mandatory)
          </label>
          <input
            type="text"
            id="accountID"
            name="accountID"
            value={formData.accountID}
            onChange={handleInputChange}
            required
            maxLength="75"
            placeholder="Enter your Account ID"
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
      <ToastContainer />
    </div>
  );
};

export default FarmerRegister;
