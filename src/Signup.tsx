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
  const [error, setError] = useState<string>("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <div className="max-w-md p-5 border border-gray-300 rounded-md">
          <h2 className="text-center text-2xl font-semibold">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block mb-2">First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={handleChange(setFirstName)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={handleChange(setLastName)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={handleChange(setPassword)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Signup
            </button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <a href="#" onClick={toggleForm} className="text-blue-500">
                Signin
              </a>
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
