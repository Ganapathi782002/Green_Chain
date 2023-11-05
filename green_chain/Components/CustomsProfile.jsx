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

const CustomsProfile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        // Fetch user data
        const userRef = doc(db, "Customs", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData.name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">Customs Profile</h1>
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
                <dt className="text-sm font-medium text-gray-500">Badge number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.badgeNumber}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.phoneNumber}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.departmentAgency}
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
    </div>
  );
};

export default CustomsProfile;