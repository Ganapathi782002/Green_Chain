import { useState, useEffect } from "react";
import { Str1 } from "../Components/index";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Web3 from "web3";

function textToEthereumAddress(text) {
  if (text && text.match(/^0x[0-9a-fA-F]{40}$/)) {
    // If it's a valid Ethereum address, return the checksummed address
    return Web3.utils.toChecksumAddress(text);
  } else {
    // Handle the case where the text is not a valid Ethereum address
    throw new Error('Invalid Ethereum address format');
  }
}

export default ({ transportModal, setTransportModal, markReceivedByTransporter }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });

  const [farmersData, setFarmersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all farmers' data from Firestore
    const fetchFarmersData = async () => {
      try {
        const farmersRef = collection(db, "Farmers");
        const farmersSnapshot = await getDocs(farmersRef);

        const farmers = [];
        farmersSnapshot.forEach((doc) => {
          const data = doc.data();

          // Check if accountID is a valid Ethereum address
          const accountID = textToEthereumAddress(data.accountID);

          farmers.push({
            id: doc.id,
            name: data.name,
            city: data.location, // Assuming the location field contains city information
            accountID: accountID,
          });
        });

        setFarmersData(farmers);
      } catch (error) {
        // Handle any errors that occur during data fetching
        setError(error.message);
      }
    };

    fetchFarmersData();
  }, []);

  const markReceived = () => {
    const receiver = textToEthereumAddress(getProduct.receiver);
    setGetProduct({ ...getProduct, receiver }); // Convert the receiver to a checksummed address
    markReceivedByTransporter(getProduct);
  };

  return transportModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setTransportModal(false)}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button className="p-2 text-gray-400 rounded-md hover-bg-gray-100" onClick={() => setTransportModal(false)}>
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Mark as Received by Transporter
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mt-3">
                {/* Dropdown for selecting the receiver */}
                <select
                  value={getProduct.reveiver}
                  onChange={(e) =>
                    setGetProduct({
                      ...getProduct,
                      receiver: e.target.value,
                    })
                  }
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">
                    Select a receiver
                  </option>
                  {farmersData.map((farmer) => (
                    <option key={farmer.id} value={textToEthereumAddress(farmer.accountID)}>
                      <strong>{farmer.name}</strong> ({farmer.city})
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Shipment ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setGetProduct({
                      ...getProduct,
                      index: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() => markReceived()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover-bg-indigo-500 active-bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus-ring-2"
              >
                Mark as Received
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};