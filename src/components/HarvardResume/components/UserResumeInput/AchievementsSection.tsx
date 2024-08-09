import React from "react";
import ReactQuill from "react-quill";

interface AchievementsSectionProps {
  achievements: string;
  setAchievements: (value: string) => void;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  setAchievements,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-gray-700 font-semibold">
        Achievements:
      </label>
      <ReactQuill
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
        value={achievements}
        onChange={setAchievements}
      />
    </div>
  );
};

export default AchievementsSection;
