import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { useRouter } from "next/router";

const TransporterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential)  => {
        
        const user = userCredential.user;
        const roleRef = doc(db, "role", user.uid);

        try {
          const roleSnapshot = await getDoc(roleRef);
          const roleData = roleSnapshot.data();
          if (roleData && roleData.role === "transporter") {
            toast.success("Login successful", { position: "top-right" });
            setTimeout(() => {
              router.reload();
            }, 1500);
          } else {
            toast.error("You are not a farmer.", { position: "top-right" });
          }
        } catch (error) {
          toast.error("Error checking user role.", { position: "top-right" });
          console.error(error);
        }
        
        //console.log(userCredential);
      })
      .catch((error) => {
        // Display an error toast
        toast.error("Login failed. Please check your email and password.", { position: "top-right" });
        console.error(error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Transporter Login</h1>
      <form onSubmit={signIn}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="border rounded-lg px-3 py-2 w-full pr-10"
          />
          <button
            type="button"
            className="absolute right-0 top-4.5 bottom-0 m-auto px-3 py-2 flex items-center text-blue-500 hover:text-gray-800"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
          Login
        </button>

        <Link href="/forgotpassword">
          <button className="menu-btn px-3 text-blue-500 hover:text-gray-800">
            Forgot password?
          </button>
        </Link>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default TransporterLogin;