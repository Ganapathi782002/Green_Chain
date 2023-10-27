import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAllFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Fetch all farmers' data from Firestore
    const fetchFarmersData = async () => {
      const farmersRef = collection(db, "Farmers");
      const farmersSnapshot = await getDocs(farmersRef);

      const farmerData = [];
      farmersSnapshot.forEach((doc) => {
        // Include email in the data
        const data = doc.data();
        farmerData.push({ id: doc.id, ...data });
      });

      setFarmers(farmerData);
    };

    fetchFarmersData();
  }, []);

  const handleCardClick = (id) => {
    setExpanded(id === expanded ? null : id);
  };

  const sendEmailToFarmer = async (farmerEmail) => {
    try {
      const templateParams = {
        to_email: farmerEmail, // Set the recipient's email address
        from_name: 'Your Name', // Replace with your name
        message: 'Your custom message goes here.', // Replace with your custom message
      };

      const response = await emailjs.send(
        'service_myontes', // Replace with your service ID
        'template_o1otf6h', // Replace with your template ID
        templateParams,
        'rhp-i4OeiW7-BMsb1' // Replace with your user ID
      );

      console.log('Email sent successfully:', response);

      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error sending email:', error);

      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farmers Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              expanded === farmer.id ? "bg-green-200" : "bg-green-500"
            }`}
            onClick={() => handleCardClick(farmer.id)}
          >
            <h2 className="text-xl font-semibold text-white">{farmer.name}</h2>
            {expanded === farmer.id && (
              <div>
                <p><strong>Email:</strong> {farmer.email}</p>
                <p><strong>Location:</strong> {farmer.location}</p>
                <p><strong>Contact:</strong> {farmer.contact}</p>
                <p><strong>Farm Size:</strong> {farmer.farmSize}</p>
                <p><strong>Cultivation Type:</strong> {farmer.cultivationType}</p>
                <p><strong>Grade:</strong> {farmer.grade}</p>
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 transform hover:scale-105" onClick={() => sendEmailToFarmer(farmer.email)}>Send Email</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllFarmers;
