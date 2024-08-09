import React from "react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <h4 className="text-xl underline font-bold text-gray-700">{title}</h4>
);

export default SectionTitle;
