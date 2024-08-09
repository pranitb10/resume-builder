import React from "react";
import { Skills } from "../../../../types/userResumeInputTypes";

interface PreviewSkillsSectionProps {
  skills: Skills;
}

const PreviewSkillsSection: React.FC<PreviewSkillsSectionProps> = ({
  skills,
}) => (
  <div className="w-full">
    <p className="font-normal">Technical: {skills.technical}</p>
    <p className="font-normal">Non-Technical: {skills.nonTechnical}</p>
    <p className="font-normal">Managerial: {skills.managerial}</p>
    <p className="font-normal">Soft: {skills.soft}</p>
  </div>
);

export default PreviewSkillsSection;
