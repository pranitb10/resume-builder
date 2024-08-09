import React from "react";
import { Education } from "../../../../types/userResumeInputTypes";

interface EducationListProps {
  education: Education[];
}

const EducationList: React.FC<EducationListProps> = ({ education }) => (
  <div className="w-full">
    {education.map((edu, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col">
            <p className="font-semibold">{edu.school}</p>
            <div className="flex space-x-2">
              <p className="font-semibold">{edu.major}</p>
              <p className="font-semibold">{edu.gpa}</p>
            </div>
          </div>
          <p className="font-semibold">{edu.period}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: edu.description }}
          className="mt-2 text-gray-600"
        />
      </div>
    ))}
  </div>
);

export default EducationList;
