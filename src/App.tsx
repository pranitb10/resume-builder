// import React, { useState, useEffect } from 'react';
// import Signup from './Signup';
// import Signin from './Signin';
// import ResumeBuilder from './ResumeBuilder';
// import { getUser } from './firebaseConfig';
// import './App.css';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [showSignup, setShowSignup] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       const currentUser = await getUser();
//       setUser(currentUser);
//     };
//     checkUser();
//   }, []);

//   const toggleForm = () => {
//     setShowSignup(!showSignup);
//   };

//   return (
//     <div className="app">
//       {user ? (
//         <ResumeBuilder onSignout={() => setUser(null)} />
//       ) : (
//         <div className="auth-container">
//           {showSignup ? (
//             <Signup onSignup={setUser} toggleForm={toggleForm} />
//           ) : (
//             <Signin onSignin={setUser} toggleForm={toggleForm} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect, FC } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import ResumeBuilder from "./ResumeBuilder";
import { getUser } from "./firebaseConfig";
import "./App.css";

interface User {
  uid: string;
  email: string;
}

const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
