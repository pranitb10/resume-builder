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
import "./Signin.css";

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
    <div className="auth-form-container">
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleChange(setEmail)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signin</button>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={toggleForm}>
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
