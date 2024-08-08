import React from "react";

interface PreviewAchievementsSectionProps {
  achievements: string;
}

const PreviewAchievementsSection: React.FC<PreviewAchievementsSectionProps> = ({
  achievements,
}) => (
  <div className="w-full">
    <div
      dangerouslySetInnerHTML={{ __html: achievements }}
      className="mt-2 text-gray-600"
    />
  </div>
);

export default PreviewAchievementsSection;
