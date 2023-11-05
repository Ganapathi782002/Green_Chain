import React, { useState } from "react";
import { db, auth } from "../firebaseConfig"; // Import Firebase auth
import { collection, getDocs, addDoc, query, where, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestaurantRegistration = () => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    email: "", // Add email field
    password: "", // Add password field
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          wasteType: [...formData.wasteType, name],
        });
      } else {
        setFormData({
          ...formData,
          wasteType: formData.wasteType.filter((item) => item !== name),
          cookedWastes: { ...formData.cookedWastes, [name]: null },
          uncookedWastes: { ...formData.uncookedWastes, [name]: null },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password in Firebase Authentication
      const { email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const roleRef = doc(db, "role", user.uid);
      const roleData = { role: "restaurant owner"};
      await setDoc(roleRef, roleData);
      // Add the form data to Firestore
      const restaurantRef = collection(db, "Restaurants");
      const restaurantDocRef = doc(restaurantRef, user.uid); // Use user's ID as the document ID
      await setDoc(restaurantDocRef, formData);

      // Display a success toast
      toast.success("Restaurant registration successful!", { position: "top-right" });

      // Clear the form data if needed
      setFormData({
        name: "",
        location: "",
        contact: "",
        email: "",
        password: "",
        wasteType: [],
        cookedWastes: {},
        uncookedWastes: {},
      });
    } catch (error) {
      // Display an error toast
      toast.error("Registration failed. Please check your information.", { position: "top-right" });
      console.error("Error registering restaurant", error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Restaurant Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            maxLength="150"
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
            maxLength="250"
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
            pattern="[0-9]{10}"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
          Submit
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default RestaurantRegistration;
