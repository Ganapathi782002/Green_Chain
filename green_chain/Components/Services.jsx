import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { auth as firebaseAuth, db } from '../firebaseConfig';

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
  setTransportModal,
  setCustomsModal,
}) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the user's role based on their UID
    const user = firebaseAuth.currentUser;
    if (user) {
      getUserRole(user.uid);
    }
  }, []);

  const getUserRole = async (userId) => {
    const roleRef = doc(db, 'role', userId);
    try {
      const roleDoc = await getDoc(roleRef);
      if (roleDoc.exists()) {
        const role = roleDoc.data().role;
        setUserRole(role);
        console.log('User Role:', role);
      }
    } catch (error) {
      console.error('Error getting user role:', error);
    }
  };

  const servicesForRestaurantOwner = [
    {
      text: 'Start Shipment',
    },
    {
      text: 'Get Shipment',
    },
    {
      text: 'Shipment Count',
    },
    {
      text: 'User Profile',
    },
  ];

  const servicesForFarmer = [
    {
      text: 'Complete Shipment',
    },
    {
      text: 'Transport',
    },
    {
      text: 'Customs',
    },
  ];

  const openModelBox = (text) => {
    if (text === 'Start Shipment') {
      setStartModal(true);
    } else if (text === 'Get Shipment') {
      setGetModel(true);
    } else if (text === 'Shipment Count') {
      // Handle Shipment Count logic
    } else if (text === 'User Profile') {
      setOpenProfile(true);
    } else if (text === 'Complete Shipment') {
      setCompleteModal(true);
    }
    else if (text === 'Transport') {
      setTransportModal(true);
    }
    else if (text === 'Customs') {
      setCustomsModal(true);
    }
  };

  console.log('User Role:', userRole);

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {servicesForRestaurantOwner.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => openModelBox(item.text)}
                    className="w-full h-60 sm:h-52 md:h-56 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out"
                  >
                    {item.text}
                  </button>
                </li>
              ))}

            {userRole === 'farmer' &&
              servicesForFarmer.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => openModelBox(item.text)}
                    className="w-full h-60 sm:h-52 md:h-56 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
