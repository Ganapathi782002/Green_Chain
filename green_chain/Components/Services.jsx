import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
  setTransportModal,
  setCustomsModal,
}) => {
  const [userRole, setUserRole] = useState('loading');

  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserRole = async () => {
      try {
        // Create a reference to the "role" collection in Firestore
        const roleRef = doc(db, 'role', user.uid);
        const roleSnapshot = await getDoc(roleRef);
        const roleData = roleSnapshot.data();

        // Check if the role data exists and contains a 'role' field
        if (roleData && roleData.role) {
          // Set the userRole state to the role value
          setUserRole(roleData.role);
        } else {
          // Handle the case where the role data is missing or incomplete
          setUserRole('unknown role');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('error');
      }
    };

    fetchUserRole();
  }, []);

  const services = [
    {
      text: 'Start Shipment',
      allowedRoles: ['restaurant owner'],
    },
    {
      text: 'Complete Shipment',
      allowedRoles: ['farmer'],
    },
    {
      text: 'Transport',
      allowedRoles: ['transporter'],
    },
    {
      text: 'Customs Verification',
      allowedRoles: ['customs'],
    },
    {
      text: 'Get Shipment',
      allowedRoles: [], // Empty array means it's visible to all roles
    },
    {
      text: 'Shipment Count',
      allowedRoles: [], // Empty array means it's visible to all roles
    },
    {
      text: 'User Profile',
      allowedRoles: [], // Empty array means it's visible to all roles
    },
  ];

  const openModelBox = (text) => {
    if (text === 'Start Shipment') {
      setStartModal(true);
    } else if (text === 'Complete Shipment') {
      setCompleteModal(true);
    } else if (text === 'Get Shipment') {
      setGetModel(true);
    } else if (text === 'Shipment Count') {
      // Handle Shipment Count logic
    } else if (text === 'User Profile') {
      setOpenProfile(true);
    
    } else if (text === 'Transport') {
      setTransportModal(true);
    } else if (text === 'Customs Verification') {
      setCustomsModal(true);
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((item, index) => {
              if (
                item.allowedRoles.length === 0 ||
                item.allowedRoles.includes(userRole)
              ) {
                return (
                  <li key={index}>
                    <button
                      onClick={() => openModelBox(item.text)}
                      className="w-full h-60 sm:h-52 md:h-56 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl p-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out"
                    >
                      {item.text}
                    </button>
                  </li>
                );
              } else {
                return null; // Hide the button
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};