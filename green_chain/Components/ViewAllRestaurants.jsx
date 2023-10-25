import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ViewAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Fetch all restaurant data from Firestore
    const fetchRestaurantsData = async () => {
      const restaurantsRef = collection(db, "Restaurants");
      const restaurantsSnapshot = await getDocs(restaurantsRef);

      const restaurantData = [];
      restaurantsSnapshot.forEach((doc) => {
        // Exclude the password from the data
        const { password, ...data } = doc.data();
        restaurantData.push({ id: doc.id, ...data });
      });

      setRestaurants(restaurantData);
    };

    fetchRestaurantsData();
  }, []);

  const handleCardClick = (id) => {
    setExpanded(id === expanded ? null : id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              expanded === restaurant.id ? "bg-green-200" : "bg-green-500"
            }`}
            onClick={() => handleCardClick(restaurant.id)}
          >
            <h2 className="text-xl font-semibold text-white">{restaurant.name}</h2>
            {expanded === restaurant.id && (
              <div>
                <p><strong>Email:</strong> {restaurant.email}</p>
                <p><strong>Location:</strong> {restaurant.location}</p>
                <p><strong>Contact:</strong> {restaurant.contact}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllRestaurants;
