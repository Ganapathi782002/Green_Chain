import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const FarmerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Farmer Login</h1>
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

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default FarmerLogin;
