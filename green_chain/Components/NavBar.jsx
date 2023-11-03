import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";
import { Nav1, Nav2, Nav3 } from "../Components/index";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { signOut } from "firebase/auth";

export default () => {
  const [state, setState] = useState(false);
  const [showFarmersOptions, setShowFarmersOptions] = useState(false);
  const [showRestaurantsOptions, setShowRestaurantsOptions] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn") && !target.closest(".dropdown-options")) {
        setShowFarmersOptions(false);
        setShowRestaurantsOptions(false);
      }
    };
  }, []);

  const signout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful!", { position: "top-right" });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          }`}
        >
          <Link href="/">
            <button className="menu-btn px-3 flex items-center justify-center gap-x-1 py-2 px-4 text-white
              font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
              Home
            </button>
          </Link>
          <div className="relative">
            <button
              className="menu-btn ml-3 px-3 flex items-center justify-center gap-x-1 py-2 px-4 text-white
              font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              onClick={() =>{
                setShowFarmersOptions(!showFarmersOptions)
                setShowRestaurantsOptions(false)
                
                
              }}
            >
              Farmers
            </button>
            {showFarmersOptions && (
              <ul className="absolute dropdown-options space-y-1 mt-2 bg-white border rounded-lg shadow-lg text-black-500">
                <Link href="/farmerslogin">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    Login
                  </li>
                </Link>
                <Link href="/farmersregistration">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    Register
                  </li>
                </Link>
                <Link href="/viewallfarmers">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    View All Farmers
                  </li>
                </Link>
                <Link href="#">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                     Tracking
                  </li>
                </Link>
              </ul>
            )}
          </div>
          <div className="relative">
            <button
              className="menu-btn px-3 ml-3 flex items-center justify-center gap-x-1 py-2 px-4 text-white
              font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              onClick={() => 
                {
                  setShowRestaurantsOptions(!showRestaurantsOptions)
                  setShowFarmersOptions(false)
              }}
            >
              Restaurants
            </button>
            {showRestaurantsOptions && (
              <ul className="absolute dropdown-options space-y-1 mt-2 bg-white border rounded-lg shadow-lg text-black-500">
                <Link href="/restaurantslogin">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    Login
                  </li>
                </Link>
                <Link href="/restaurantsregistration">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    Register
                  </li>
                </Link>
                <Link href="/viewallrestaurants">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    View All Restaurants
                  </li>
                </Link>
                <Link href="#">
                  <li className="cursor-pointer px-4 py-2 hover:bg-green-200">
                    Tracking
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
        <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
          {currentUser ? (
            <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
              {currentUser.slice(0, 25)}..
            </p>
          ) : (
            <button
              onClick={() => connectWallet()}
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white
              font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
              >
                Connect Wallet
                <Nav3 />
              </button>
            )}
          </div>
          {auth.currentUser && (
            <div className="">
              <button
                onClick={() => signout()}
                className="ml-4 flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover.bg-gray-700 active.bg-gray-900 rounded-full md.inline-flex"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  };
  