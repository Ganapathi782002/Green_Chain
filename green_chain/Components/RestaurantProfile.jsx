import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";

const RestaurantProfile = () => {
  const [userData, setUserData] = useState({});
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const userRef = doc(db, "Restaurants", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchInvitations = async () => {
      try {
        if (userData.name) {
          const invitationsRef = collection(db, "invitation");
          const q = query(invitationsRef, where("rname", "==", userData.name));
          const invitationsSnapshot = await getDocs(q);
          const invitationData = [];

          invitationsSnapshot.forEach((doc) => {
            invitationData.push(doc.data());
          });

          setInvitations(invitationData);
        } else {
          console.error("userData.name is undefined");
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setIsLoading(false); // Set isLoading to false after data fetching is complete
      }
    };

    fetchUserData();
    fetchInvitations();
  }, [userData.name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">Restaurant Profile</h1>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {/* User Profile Information */}
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.location}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Contact No</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.contact}
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto bg-yellow-300 p-8 rounded shadow mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Invitations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {invitations.map((invitation, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg cursor-pointer bg-green-500"
            >
              <p className="text-xl font-semibold text-white">
                Receiver's Name: {invitation.fname}
              </p>
              <p>Status: {invitation.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;