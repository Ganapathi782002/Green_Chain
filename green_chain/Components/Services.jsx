import React from 'react';

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
}) => {
  const team = [
    {
      text: 'Complete Shipment',
    },
    {
      text: 'Get Shipment',
    },
    {
      text: 'Start Shipment',
    },
    {
      text: 'User Profile',
    },
    {
      text: 'Ship Count',
    },
  ];

  const openModelBox = (text) => {
    if (text === 'Complete Shipment') {
      setCompleteModal(true);
    } else if (text === 'Get Shipment') {
      setGetModel(true);
    } else if (text === 'Start Shipment') {
      setStartModal(true);
    } else if (text === 'User Profile') {
      setOpenProfile(true);
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, index) => (
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
