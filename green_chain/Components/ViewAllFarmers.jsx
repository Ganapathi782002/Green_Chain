import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, Timestamp, query, where, doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebaseConfig";
import { addDoc, getDocs as getDocsInvitations, collection as invitationsCollection } from "firebase/firestore";

const user = auth.currentUser;
const restaurantID = user.uid;

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

  const sendInvitation = async (restaurantId, farmerId) => {
    const notificationsRef = collection(db, "invitation");
    const currentTime = Timestamp.now();

    try {
      // Check if an invitation already exists for this farmer and restaurant

      const invitationQuery = query(invitationsCollection(db, "invitation"),
        where("restaurantId", "==", restaurantId),
        where("farmerId", "==", farmerId),
      );

      const farmersRef = collection(db, "Farmers");
      const farmerDocRef = doc(farmersRef, farmerId);

      const docSnapshot = await getDoc(farmerDocRef);

      var fname = null;

      if (docSnapshot.exists()) {
        const farmerData = docSnapshot.data();
        const farmerName = farmerData.name;
        fname = farmerName;
      } else {
        // Handle the case where the document doesn't exist
        console.log("Farmer document not found for the given ID.");
        toast.error("User not exist.", { position: "top-right" });
        fname = null; // or any other suitable response
      }

      const restaurantRef = collection(db, "Restaurants");
      const restaurantDocRef = doc(restaurantRef, restaurantID);

      const docsSnapshot = await getDoc(restaurantDocRef);

      var rname = null;

      if (docsSnapshot.exists()) {
        const restaurantData = docsSnapshot.data();
        const restaurantName = restaurantData.name;
        rname = restaurantName;
      } else {
        // Handle the case where the document doesn't exist
        console.log("Restaurant Owner document not found for the given ID.");
        toast.error("User not exist.", { position: "top-right" });
        rname = null; // or any other suitable response
      }

      const invitationSnapshot = await getDocsInvitations(invitationQuery);

      if (!invitationSnapshot.empty) {
        // Invitation already sent, display a notification
        toast.error("Invitation already sent.", { position: "top-right" });
        return;
      }

      // Add a new notification document to the Notifications collection
      await addDoc(notificationsRef, {
        rname,
        fname,
        sentTime: currentTime,
        status: "pending",
      });

      // Handle success
      toast.success("Invitation sent successfully!", { position: "top-right" });
    } catch (error) {
      // Handle error
      console.error("Error sending invitation:", error);
      toast.error("Error sending invitation. Please try again later.", { position: "top-right" });
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
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 transform hover:scale-105" onClick={() => sendInvitation(restaurantID, farmer.id)}>Notify Farmer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllFarmers;
