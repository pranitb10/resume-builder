import React from "react";
import { Experience } from "../../../../types/userResumeInputTypes";

interface ExperienceListProps {
  experience: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experience }) => (
  <div className="w-full">
    {experience.map((exp, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="font-semibold">{exp.company}</p>
            <p className="font-semibold">{exp.position}</p>
          </div>
          <p className="font-semibold">{exp.period}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: exp.description }}
          className="mt-2 text-gray-600"
        />
      </div>
    ))}
  </div>
);

export default ExperienceList;
