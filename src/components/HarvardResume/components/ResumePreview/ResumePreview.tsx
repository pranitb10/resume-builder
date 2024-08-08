import React from "react";
import {
  Experience,
  Education,
  Skills,
} from "../../../../types/userResumeInputTypes";
import ContactInfo from "./ContactInfo";
import SectionTitle from "../../../GenericComponents/SectionTitle";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";
import PreviewSkillsSection from "./PreviewSkillsSection";
import PreviewAchievementsSection from "./PreviewAchievementsSection";

interface ResumePreviewProps {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  achievements: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  name,
  email,
  phone,
  linkedin,
  experience,
  education,
  skills,
  achievements,
}) => {
  return (
    <div className="w-full p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Resume Preview</h2>
      <div
        id="resume-preview"
        className="p-6 border border-gray-300 rounded bg-white shadow-lg"
      >
        <h3 className="text-2xl text-center font-bold mb-2">{name}</h3>
        <ContactInfo email={email} phone={phone} linkedin={linkedin} />
        <div className="flex flex-col items-center">
          <SectionTitle title="Experience" />
          <ExperienceList experience={experience} />
        </div>
        <div className="flex flex-col items-center">
          <SectionTitle title="Education" />
          <EducationList education={education} />
        </div>
        <div className="flex flex-col items-center">
          <SectionTitle title="Skills & Interests" />
          <PreviewSkillsSection skills={skills} />
        </div>
        <div className="flex flex-col items-center">
          <SectionTitle title="Achievements" />
          <PreviewAchievementsSection achievements={achievements} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
