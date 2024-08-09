import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { auth } from "../../firebaseConfig";
import "react-quill/dist/quill.snow.css";
import html2canvas from "html2canvas";
import SignoutButton from "./components/SignoutButton";
import UserResumeInput from "./components//UserResumeInput/UserResumeInput";
import {
  Education,
  Experience,
  Skills,
} from "../../types/userResumeInputTypes";
import ResumePreview from "./components/ResumePreview/ResumePreview";

interface ResumeBuilderProps {
  onSignout: () => void;
}

const HarvardResume: React.FC<ResumeBuilderProps> = ({ onSignout }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [experience, setExperience] = useState<Experience[]>([
    { period: "", position: "", company: "", description: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { school: "", major: "", gpa: "", period: "", description: "" },
  ]);
  const [skills, setSkills] = useState<Skills>({
    technical: "",
    nonTechnical: "",
    managerial: "",
    soft: "",
  });
  const [achievements, setAchievements] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [
    name,
    email,
    phone,
    // website,
    linkedin,
    // github,
    // experience,
    // education,
    // skills,
    // achievements,
  ]);

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleSkillsChange = (field: keyof Skills, value: string) => {
    setSkills({ ...skills, [field]: value });
  };

  const validateForm = (): boolean => {
    if (!name || !email || !phone) {
      setError("Please fill all required fields.");
      return false;
    }
    for (const exp of experience) {
      if (!exp.period || !exp.position || !exp.company) {
        setError("Please fill all required fields in experience.");
        return false;
      }
    }
    for (const edu of education) {
      if (!edu.school || !edu.major) {
        setError("Please fill all required fields in education.");
        return false;
      }
    }
    return true;
  };

  const handlePDFDownload = () => {
    const input = document.getElementById("resume-preview");
    if (!input) {
      console.error("Element not found");
      return;
    }
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handleDOCDownload = async () => {
    if (!validateForm()) return;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun(`Name: ${name}`)] }),
            new Paragraph({ children: [new TextRun(`Email: ${email}`)] }),
            new Paragraph({ children: [new TextRun(`Phone: ${phone}`)] }),
            new Paragraph({ children: [new TextRun(`Website: ${website}`)] }),
            new Paragraph({ children: [new TextRun(`LinkedIn: ${linkedin}`)] }),
            new Paragraph({ children: [new TextRun(`GitHub: ${github}`)] }),
            new Paragraph({ children: [new TextRun(`Experience:`)] }),
            ...experience.map((exp) => [
              new Paragraph({
                children: [new TextRun(`Period: ${exp.period}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Position: ${exp.position}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Company: ${exp.company}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Description: ${exp.description}`)],
              }),
            ]),
            new Paragraph({ children: [new TextRun(`Education:`)] }),
            ...education.map((edu) => [
              new Paragraph({
                children: [new TextRun(`School: ${edu.school}`)],
              }),
              new Paragraph({ children: [new TextRun(`Major: ${edu.major}`)] }),
              new Paragraph({ children: [new TextRun(`GPA: ${edu.gpa}`)] }),
              new Paragraph({
                children: [new TextRun(`Period: ${edu.period}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Description: ${edu.description}`)],
              }),
            ]),
            new Paragraph({ children: [new TextRun(`Skills:`)] }),
            new Paragraph({
              children: [new TextRun(`Technical: ${skills.technical}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Non-Technical: ${skills.nonTechnical}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Managerial: ${skills.managerial}`)],
            }),
            new Paragraph({ children: [new TextRun(`Soft: ${skills.soft}`)] }),
            new Paragraph({
              children: [new TextRun(`Achievements: ${achievements}`)],
            }),
          ].flat(),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  const handleSignoutClick = () => {
    auth.signOut().then(() => {
      onSignout();
    });
  };

  const updatePreview = () => {
    if (!validateForm()) return;
    setError("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <SignoutButton handleSignoutClick={handleSignoutClick} />
      <div className="flex flex-1 overflow-auto">
        <UserResumeInput
          name={name}
          email={email}
          phone={phone}
          website={website}
          linkedin={linkedin}
          github={github}
          experience={experience}
          education={education}
          skills={skills}
          achievements={achievements}
          error={error}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setWebsite={setWebsite}
          setLinkedin={setLinkedin}
          setGithub={setGithub}
          setExperience={setExperience}
          setEducation={setEducation}
          setSkills={setSkills}
          setAchievements={setAchievements}
          handleExperienceChange={handleExperienceChange}
          handleEducationChange={handleEducationChange}
          handleSkillsChange={handleSkillsChange}
          handlePDFDownload={handlePDFDownload}
          handleDOCDownload={handleDOCDownload}
          updatePreview={updatePreview}
        />
        <ResumePreview
          name={name}
          email={email}
          phone={phone}
          linkedin={linkedin}
          experience={experience}
          education={education}
          skills={skills}
          achievements={achievements}
        />
      </div>
    </div>
  );
};

export default HarvardResume;
