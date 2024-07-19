// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import './Signin.css';

// const Signin = ({ onSignin, toggleForm }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       onSignin(userCredential.user);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Signin</h2>
//       <form onSubmit={handleSignin}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         {error && <p className="error">{error}</p>}
//         <button type="submit">Signin</button>
//         <p>Don't have an account? <a href="#" onClick={toggleForm}>Signup</a></p>
//       </form>
//     </div>
//   );
// };

// export default Signin;
import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

interface SigninProps {
  onSignin: (user: User) => void;
  toggleForm: () => void;
}

const Signin: FC<SigninProps> = ({ onSignin, toggleForm }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    };

  return (
    <div className="max-w-md mx-auto p-5 border border-gray-300 rounded-md mt-5">
      <h2 className="text-center text-2xl font-semibold">Signin</h2>
      <form onSubmit={handleSignin}>
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
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
        >
          Signin
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="#" onClick={toggleForm} className="text-blue-500">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
