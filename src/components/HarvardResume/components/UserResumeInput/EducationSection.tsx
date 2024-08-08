import React from "react";
import ReactQuill from "react-quill";
import FormInput from "../../../GenericComponents/FormInput";

interface Education {
  school: string;
  major: string;
  gpa: string;
  period: string;
  description: string;
}

interface EducationSectionProps {
  education: Education[];
  handleEducationChange: (
    index: number,
    field: keyof Education,
    value: string
  ) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  handleEducationChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-gray-700 font-semibold">
        Education:
      </label>
      {education.map((edu, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner"
        >
          <FormInput
            label="School"
            type="text"
            value={edu.school}
            onChange={(e) =>
              handleEducationChange(index, "school", e.target.value)
            }
          />
          <FormInput
            label="Major"
            type="text"
            value={edu.major}
            onChange={(e) =>
              handleEducationChange(index, "major", e.target.value)
            }
          />
          <FormInput
            label="GPA"
            type="text"
            value={edu.gpa}
            onChange={(e) =>
              handleEducationChange(index, "gpa", e.target.value)
            }
          />
          <FormInput
            label="Period"
            type="text"
            value={edu.period}
            onChange={(e) =>
              handleEducationChange(index, "period", e.target.value)
            }
          />
          <label className="block mb-1 text-gray-700 mt-2">Description:</label>
          <ReactQuill
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
            value={edu.description}
            onChange={(value) =>
              handleEducationChange(index, "description", value)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
