import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { emailRegex } from "./utils/emailRegex";

interface SigninProps {
  onSignin: (user: User) => void;
  toggleForm: () => void;
}

const Signin: FC<SigninProps> = ({ onSignin, toggleForm }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onSignin(userCredential.user);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setError("");
    };

  const inputClassNames = (hasError: boolean) =>
    `w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      hasError ? "border-red-500" : "border-gray-300"
    } relative`;

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          <h2 className="text-left text-4xl font-semibold text-gray-800 mb-2">
            Log In
          </h2>
          <p className="text-left text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>
          <div className="text-center mt-4">
            <button
              type="button"
              className="w-full py-3 bg-white border border-gray-300 rounded shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Log in with Google
            </button>
          </div>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form onSubmit={handleSignin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                required
                className={inputClassNames(!emailRegex.test(email) && !!error)}
              />
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">
                  Password:
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange(setPassword)}
                required
                className={inputClassNames(!!error && password === "")}
              />
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span
                  className="text-gray-500 text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide PW" : "Show PW"}
                </span>
              </div> */}
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
              Log In
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="text-left mt-6 text-sm text-gray-600">
              Not a member?
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-500 hover:underline ml-1"
              >
                Sign Up now
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

export default Signin;
