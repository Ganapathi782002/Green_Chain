import React, { useState } from "react";
import { db, auth } from "../firebaseConfig"; // Import Firebase configuration
import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs, addDoc, query, where, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword // Import createUserWithEmailAndPassword from Firebase auth
} from "firebase/auth";

const CustomsRegister = () => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    badgeNumber: "",
    departmentAgency: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user in Firebase Authentication using createUserWithEmailAndPassword
      const userCredential = await createUserWithEmailAndPassword(
        auth, // Pass 'auth' as the first argument
        formData.email,
        formData.password
      );

      // Assign the user the "Transporter" role in Firestore
      const user = userCredential.user;
      console.log("User registration successful!");
      const roleRef = doc(db, "role", user.uid);
      const roleData = { role: "customs" };
      await setDoc(roleRef, roleData);

      // await addDoc(collection(db, "Farmers"), formData);

      const farmersRef = collection(db, "Customs");
      const farmerDocRef = doc(farmersRef, user.uid); // Use user's ID as the document ID
      await setDoc(farmerDocRef, formData);

      // Store additional information in Firestore
      // await db.collection("Transport").doc(user.uid).set({
      //   name: formData.name,
      //   email: formData.email,
      //   phoneNumber: formData.phoneNumber,
      //   companyName: formData.companyName,
      //   vehicleType: formData.vehicleType,
      // });

      // Clear the form and show a success message
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        badgeNumber: "",
        departmentAgency: "",
      });
      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 5000, // Auto close the toast after 5 seconds
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Customs Registration</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            onChange={handleChange}
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Badge Number
          </label>
          <input
            type="number"
            name="badgenumber"
            value={formData.companyName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <input
            type="text"
            name="departmentAgency"
            value={formData.departmentAgency}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CustomsRegister;
