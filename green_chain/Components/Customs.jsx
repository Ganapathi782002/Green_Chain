import { useState } from "react";
import { Str1 } from "../Components/index";
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

export default ({ customsModal, setCustomsModal, markInCustomsInspection }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });

  const markForCustomsInspection = () => {
    const receiver = textToEthereumAddress(getProduct.receiver);
    setGetProduct({ ...getProduct, receiver }); // Convert the receiver to a checksummed address
    markInCustomsInspection(getProduct);
  };

  return customsModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setCustomsModal(false)}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button className="p-2 text-gray-400 rounded-md hover-bg-gray-100" onClick={() => setCustomsModal(false)}>
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Mark for Customs Inspection
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setGetProduct({
                      ...getProduct,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
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
                onClick={() => markForCustomsInspection()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover-bg-indigo-500 active-bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus-ring-2"
              >
                Mark for Customs Inspection
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