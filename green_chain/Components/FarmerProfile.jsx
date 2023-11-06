import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";

const FarmerProfile = () => {
  const [userData, setUserData] = useState({});
  const [invitations, setInvitations] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        // Fetch user data
        const userRef = doc(db, "Farmers", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        }

        if (userData.name) {
          const invitationsRef = collection(db, "invitation");
          const q = query(invitationsRef, where("fname", "==", userData.name));
          const invitationsSnapshot = await getDocs(q);
          const invitationData = [];

          invitationsSnapshot.forEach((doc) => {
            invitationData.push({ ...doc.data(), id: doc.id });
          });

          setInvitations(invitationData);
        } else {
          // Handle the case when userData.name is undefined
          console.error("userData.name is undefined");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData.name]);

  const handleAccept = async (invitation) => {
    try {
      const invitationRef = doc(db, "invitation", invitation.id);
      await updateDoc(invitationRef, { status: "accepted" });
    } catch (error) {
      console.log("Error accepting invitation:", error);
    }
  };

  const handleReject = async (invitation) => {
    try {
      const invitationRef = doc(db, "invitation", invitation.id);
      await updateDoc(invitationRef, { status: "rejected" });
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">Farmer Profile</h1>
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
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
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
                <dt className="text-sm font-medium text-gray-500">
                  Contact No
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.contact}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Farm Size</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.farmSize}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Cultivation Method
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.cultivationType}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Grade</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.grade}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto mt-8">
        <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4">
          Update Profile
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
          Delete Profile
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-yellow-300 p-8 rounded shadow mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Invitations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {invitations.map((invitation, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg cursor-pointer bg-green-500"
            >
              <p className="text-xl font-semibold text-white">
                Sender's Name: {invitation.rname}
              </p>
              <p>Status: {invitation.status}</p>
              <div>
                {invitation.status === "pending" && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAccept(invitation)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(invitation)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
