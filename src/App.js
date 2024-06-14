import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import ResumeBuilder from './ResumeBuilder';
import { getUser } from './firebaseConfig';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    checkUser();
  }, []);

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="app">
      {user ? (
        <ResumeBuilder onSignout={() => setUser(null)} />
      ) : (
        <div className="auth-container">
          {showSignup ? (
            <Signup onSignup={setUser} toggleForm={toggleForm} />
          ) : (
            <Signin onSignin={setUser} toggleForm={toggleForm} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;