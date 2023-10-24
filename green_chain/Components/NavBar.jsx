import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";
import { Nav1, Nav2, Nav3 } from "../Components/index";
import Link from "next/link";
export default () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-green-600 pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a href="#">
            <img
              src="https://logo.com/image-cdn/images/kts928pd/production/438d53780735a1f3ce6549d6909bc19b8eb5f2b0-338x337.png?w=1080&q=72"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
            <Link href="/">
              <button className="menu-btn px-3 text-black-500 hover:text-gray-800">
                  Home
              </button>
            </Link>
            <Link href="/farmers">
              <button className="menu-btn px-3 text-black-500 hover:text-gray-800">
                Farmers
              </button>
            </Link>
            <Link href="/restaurant">
              <button className="menu-btn px-3 text-black-500 hover:text-gray-800">
                Hotels/Restaurants
              </button>
            </Link>
          
          
          
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {currentUser ? (
              <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                {currentUser.slice(0, 25)}..
              </p>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Connect Wallet
                <Nav3 />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};