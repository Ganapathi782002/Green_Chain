import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const sendResetEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
        // Display a success toast
        toast.success("Password reset email sent. Please check your email.", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      {emailSent ? (
        <p>Check your email for a password reset link.</p>
      ) : (
        <form onSubmit={sendResetEmail}>
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
          <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
            Reset Password
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
