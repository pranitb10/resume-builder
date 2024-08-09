import React from "react";
import ReactQuill from "react-quill";
import FormInput from "../../../GenericComponents/FormInput";
import { Experience } from "../../../../types/userResumeInputTypes";

interface ExperienceSectionProps {
  experience: Experience[];
  handleExperienceChange: (
    index: number,
    field: keyof Experience,
    value: string
  ) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  handleExperienceChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-gray-700 font-semibold">
        Experience:
      </label>
      {experience.map((exp, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner"
        >
          <FormInput
            label="Period"
            type="text"
            value={exp.period}
            onChange={(e) =>
              handleExperienceChange(index, "period", e.target.value)
            }
          />
          <FormInput
            label="Position"
            type="text"
            value={exp.position}
            onChange={(e) =>
              handleExperienceChange(index, "position", e.target.value)
            }
          />
          <FormInput
            label="Company"
            type="text"
            value={exp.company}
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
          <label className="block mb-1 text-gray-700 mt-2">Description:</label>
          <ReactQuill
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            value={exp.description}
            onChange={(value) =>
              handleExperienceChange(index, "description", value)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
