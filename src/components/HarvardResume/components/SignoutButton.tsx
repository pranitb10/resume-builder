import React from "react";

interface SignoutButtonProps {
  handleSignoutClick: () => void;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({
  handleSignoutClick,
}) => {
  return (
    <button
      className="self-end p-2 bg-blue-500 text-white cursor-pointer rounded m-2 hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
      onClick={handleSignoutClick}
    >
      Signout
    </button>
  );
};

export default SignoutButton;
