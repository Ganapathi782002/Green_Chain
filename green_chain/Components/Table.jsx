import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const YourComponent = ({ setCreateShipmentModel, allShipmentsdata }) => {
  const [userRole, setUserRole] = useState(null);

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

  

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  // const addOneDay = (date) => {
  //   const newDate = new Date(date);
  //   newDate.setDate(newDate.getDate() + 1);
  //   return newDate;
  // };

  
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-gray-600 mt-2">
            Click Add Tracking to start tracking
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setCreateShipmentModel(true)}
            href="#"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add Tracking
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Recevier</th>
              <th className="py-3 px-6">PickupTime</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsdata?.map(
              (
                shipment,
                idx //Question mark is added to avoid undefined
              ) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.sender.slice(0, 15)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.receiver.slice(0, 15)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {converTime(shipment.pickupTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.distance} Kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {} Before 48 hrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.isPaid ? " Completed" : "Not Complete"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.status == 0
                      ? "Pending"
                      : shipment.status == 1
                      ? "In Transmission"
                      : shipment.status == 2
                      ? "Received By Transporter"
                      : shipment.status == 3
                      ? "In Customs Inspection"
                      : "Delivered"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default YourComponent;