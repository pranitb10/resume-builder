import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

interface SignupProps {
  onSignup: (user: User) => void;
  toggleForm: () => void;
}

const Signup: FC<SignupProps> = ({ onSignup, toggleForm }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      onSignup(userCredential.user);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-left text-4xl font-semibold text-gray-800 mb-2">
            Sign Up
          </h2>
          <p className="text-left text-gray-500 mb-6">
            Enter your credentials to create an account
          </p>
          <div className="text-center mt-4">
            <button
              type="button"
              className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <img
                src="/google-logo.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              Sign up with Google
            </button>
          </div>
          <div className="flex items-center mt-6 mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                value={firstName}
                onChange={handleChange(setFirstName)}
                required
                className={`w-full p-3 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Last Name:
              </label>
              <input
                type="text"
                value={lastName}
                onChange={handleChange(setLastName)}
                required
                className={`w-full p-3 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                required
                className={`w-full p-3 border ${
                  !emailRegex.test(email) && error
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange(setPassword)}
                required
                className={`w-full p-3 border ${
                  error && password === ""
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {/* <p
                className="text-sm text-gray-600 cursor-pointer mt-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide PW" : "Show PW"}
              </p> */}
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember information?
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Sign up
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="text-left mt-6 text-sm text-gray-600">
              Already a member?
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-500 hover:underline ml-1"
              >
                Log In now
              </a>
            </p>
            <p className="text-left mt-6 text-xs text-gray-500">
              © 2022 Acme, All rights reserved
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center bg-[#F2F2F2]">
        <p className="text-4xl font-bold text-gray-700">vitae</p>
      </div>
    </div>
  );
};

export default Signup;
