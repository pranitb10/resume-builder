import React from "react";
import FormInput from "../../../GenericComponents/FormInput";
import { Skills } from "../../../../types/userResumeInputTypes";

interface SkillsSectionProps {
  skills: Skills;
  handleSkillsChange: (type: keyof Skills, value: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  handleSkillsChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-gray-700 font-semibold">Skills:</label>
      <div className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner">
        <FormInput
          label="Technical"
          type="text"
          value={skills.technical}
          onChange={(e) => handleSkillsChange("technical", e.target.value)}
        />
        <FormInput
          label="Non-Technical"
          type="text"
          value={skills.nonTechnical}
          onChange={(e) => handleSkillsChange("nonTechnical", e.target.value)}
        />
        <FormInput
          label="Managerial"
          type="text"
          value={skills.managerial}
          onChange={(e) => handleSkillsChange("managerial", e.target.value)}
        />
        <FormInput
          label="Soft"
          type="text"
          value={skills.soft}
          onChange={(e) => handleSkillsChange("soft", e.target.value)}
        />
      </div>
    </div>
  );
};

export default SkillsSection;
