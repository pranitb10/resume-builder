import React, { Dispatch, SetStateAction } from "react";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import AchievementsSection from "./AchievementsSection";
import ButtonGroup from "./ButtonGroup";
import PersonalDetails from "./PersonalDetails";
import {
  Experience,
  Education,
  Skills,
} from "../../../../types/userResumeInputTypes";

interface UserResumeInputProps {
  name: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  achievements: string;
  error?: string;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setWebsite: Dispatch<SetStateAction<string>>;
  setLinkedin: Dispatch<SetStateAction<string>>;
  setGithub: Dispatch<SetStateAction<string>>;
  setExperience: Dispatch<SetStateAction<Experience[]>>;
  setEducation: Dispatch<SetStateAction<Education[]>>;
  setSkills: Dispatch<SetStateAction<Skills>>;
  setAchievements: Dispatch<SetStateAction<string>>;
  handleExperienceChange: (
    index: number,
    field: keyof Experience,
    value: string
  ) => void;
  handleEducationChange: (
    index: number,
    field: keyof Education,
    value: string
  ) => void;
  handleSkillsChange: (field: keyof Skills, value: string) => void;
  handlePDFDownload: () => void;
  handleDOCDownload: () => void;
  updatePreview: () => void;
}

const UserResumeInput: React.FC<UserResumeInputProps> = ({
  name,
  email,
  phone,
  website,
  linkedin,
  github,
  experience,
  education,
  skills,
  achievements,
  error,
  setName,
  setEmail,
  setPhone,
  setWebsite,
  setLinkedin,
  setGithub,
  setExperience,
  setEducation,
  setSkills,
  setAchievements,
  handleExperienceChange,
  handleEducationChange,
  handleSkillsChange,
  handlePDFDownload,
  handleDOCDownload,
  updatePreview,
}) => {
  return (
    <form className="flex flex-col w-1/2 p-5 bg-white shadow-lg rounded-lg">
      <PersonalDetails
        name={name}
        email={email}
        phone={phone}
        website={website}
        linkedin={linkedin}
        github={github}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        setWebsite={setWebsite}
        setLinkedin={setLinkedin}
        setGithub={setGithub}
      />
      <ExperienceSection
        experience={experience}
        handleExperienceChange={handleExperienceChange}
      />
      <EducationSection
        education={education}
        handleEducationChange={handleEducationChange}
      />
      <SkillsSection skills={skills} handleSkillsChange={handleSkillsChange} />
      <AchievementsSection
        achievements={achievements}
        setAchievements={setAchievements}
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ButtonGroup
        handlePDFDownload={handlePDFDownload}
        handleDOCDownload={handleDOCDownload}
        updatePreview={updatePreview}
      />
    </form>
  );
};

export default UserResumeInput;
