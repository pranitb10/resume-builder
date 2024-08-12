import React, { useState, useEffect, FC } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import ResumeBuilder from "./components/HarvardResume/HarvardResume";
import { getUser } from "./firebaseConfig";
import { User as FirebaseUser } from "firebase/auth";

const App: FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showSignup, setShowSignup] = useState<boolean>(true);

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
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <ResumeBuilder onSignout={() => setUser(null)} />
      ) : (
        <div className="w-full h-full flex">
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
