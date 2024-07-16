import React, { useState, FormEvent, ChangeEvent, FC } from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./Signup.css";

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
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleChange(setFirstName)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleChange(setLastName)}
            required
          />
        </div>
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
        <button type="submit">Signup</button>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={toggleForm}>
            Signin
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
