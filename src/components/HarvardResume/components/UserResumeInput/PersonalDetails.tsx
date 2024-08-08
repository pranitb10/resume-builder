import React from "react";
import FormInput from "../../../GenericComponents/FormInput";

interface PersonalDetailsProps {
  name: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setWebsite: (value: string) => void;
  setLinkedin: (value: string) => void;
  setGithub: (value: string) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  name,
  email,
  phone,
  website,
  linkedin,
  github,
  setName,
  setEmail,
  setPhone,
  setWebsite,
  setLinkedin,
  setGithub,
}) => {
  return (
    <div>
      <FormInput
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <FormInput
        label="Website"
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <FormInput
        label="LinkedIn"
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />
      <FormInput
        label="GitHub"
        type="text"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
    </div>
  );
};

export default PersonalDetails;
