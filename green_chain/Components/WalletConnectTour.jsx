import React, { useEffect } from 'react';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default function WalletConnectTour() {
  useEffect(() => {
    const startIntro = () => {
      const intro = introJs();

      intro.setOptions({
        steps: [
          {
            element: document.querySelector('.connect-wallet-btn'), // Replace with the actual selector for your button
            intro: 'Click here to connect your wallet.',
            position: 'bottom',
          },
          // Add more steps for other elements if needed
        ],
      });

      intro.start();
    };

    // Start the tour when the component is mounted
    startIntro();
  }, []);

  return (
    <button
      className="connect-wallet-btn"
      onClick={() => {
        // Handle wallet connection logic here
      }}
    >
      Connect Wallet
    </button>
  );
}