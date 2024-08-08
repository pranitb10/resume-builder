import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { auth } from "./firebaseConfig";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import html2canvas from "html2canvas";

interface Experience {
  period: string;
  position: string;
  company: string;
  description: string;
}

interface Education {
  school: string;
  major: string;
  gpa: string;
  period: string;
  description: string;
}

interface Skills {
  technical: string;
  nonTechnical: string;
  managerial: string;
  soft: string;
}

interface ResumeBuilderProps {
  onSignout: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onSignout }) => {
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
      <button
        className="self-end p-2 bg-blue-500 text-white cursor-pointer rounded m-2 hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
        onClick={handleSignoutClick}
      >
        Signout
      </button>
      <div className="flex flex-1 overflow-auto">
        <form className="flex flex-col w-1/2 p-5 bg-white shadow-lg rounded-lg">
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Name:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Email:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Phone:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Website:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              LinkedIn:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              GitHub:
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Experience:
            </label>
            {experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner"
              >
                <label className="block mb-1 text-gray-700">Period:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={exp.period}
                  onChange={(e) =>
                    handleExperienceChange(index, "period", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">
                  Position:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleExperienceChange(index, "position", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">
                  Company:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">
                  Description:
                </label>
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
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Education:
            </label>
            {education.map((edu, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner"
              >
                <label className="block mb-1 text-gray-700">School:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleEducationChange(index, "school", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">Major:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={edu.major}
                  onChange={(e) =>
                    handleEducationChange(index, "major", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">GPA:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleEducationChange(index, "gpa", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">Period:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                  type="text"
                  value={edu.period}
                  onChange={(e) =>
                    handleEducationChange(index, "period", e.target.value)
                  }
                />
                <label className="block mb-1 text-gray-700 mt-2">
                  Description:
                </label>
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
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-semibold">
              Skills:
            </label>
            <div className="mb-4 p-4 border border-gray-200 rounded bg-gray-50 shadow-inner">
              <label className="block mb-1 text-gray-700">Technical:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                type="text"
                value={skills.technical}
                onChange={(e) =>
                  handleSkillsChange("technical", e.target.value)
                }
              />
              <label className="block mb-1 text-gray-700 mt-2">
                Non-Technical:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                type="text"
                value={skills.nonTechnical}
                onChange={(e) =>
                  handleSkillsChange("nonTechnical", e.target.value)
                }
              />
              <label className="block mb-1 text-gray-700 mt-2">
                Managerial:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                type="text"
                value={skills.managerial}
                onChange={(e) =>
                  handleSkillsChange("managerial", e.target.value)
                }
              />
              <label className="block mb-1 text-gray-700 mt-2">Soft:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
                type="text"
                value={skills.soft}
                onChange={(e) => handleSkillsChange("soft", e.target.value)}
              />
            </div>
          </div>
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
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-between">
            <button
              className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
              type="button"
              onClick={handlePDFDownload}
            >
              Download as PDF
            </button>
            <button
              className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
              type="button"
              onClick={handleDOCDownload}
            >
              Download as DOC
            </button>
            <button
              className="p-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
              type="button"
              onClick={updatePreview}
            >
              Update Preview
            </button>
          </div>
        </form>
        <div className="w-full p-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Resume Preview
          </h2>
          <div
            id="resume-preview"
            className="p-6 border border-gray-300 rounded bg-white shadow-lg"
          >
            <h3 className="text-2xl text-center font-bold mb-2">{name}</h3>
            <div className="flex text-center justify-center items-center space-x-2 mb-4">
              <p className="mb-2">{email}</p>
              <p className="mb-2">|</p>
              <p className="mb-2">{phone}</p>
              <p className="mb-2">|</p>
              <p className="mb-2">{linkedin}</p>
            </div>
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-xl underline font-bold mb-2 text-gray-700">
                Experience
              </h4>
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
            </div>
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-xl underline font-bold mb-2 text-gray-700">
                Education
              </h4>
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
            </div>
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-xl underline font-bold mb-2 text-gray-700">
                Skills & Interests
              </h4>
              <div className="w-full">
                <p className="font-normal">Technical: {skills.technical}</p>
                <p className="font-normal">
                  Non-Technical: {skills.nonTechnical}
                </p>
                <p className="font-normal">Managerial: {skills.managerial}</p>
                <p className="font-normal">Soft: {skills.soft}</p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-xl underline font-bold mb-2 text-gray-700">
                Achievements
              </h4>
              <div className="w-full">
                <div
                  dangerouslySetInnerHTML={{ __html: achievements }}
                  className="mt-2 text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

// <div className="flex flex-col h-screen">
//   <button
//     className="self-end p-2 bg-blue-500 text-white cursor-pointer rounded m-2 hover:bg-blue-700"
//     onClick={handleSignoutClick}
//   >
//     Signout
//   </button>
//   <div className="flex flex-1 overflow-auto">
//     <form className="flex flex-col w-1/2 p-5">
//       <div className="mb-4">
//         <label className="block mb-1">Name:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Email:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Phone:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Website:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="text"
//           value={website}
//           onChange={(e) => setWebsite(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">LinkedIn:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="text"
//           value={linkedin}
//           onChange={(e) => setLinkedin(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">GitHub:</label>
//         <input
//           className="w-full p-2 border border-gray-300 rounded"
//           type="text"
//           value={github}
//           onChange={(e) => setGithub(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Experience:</label>
//         {experience.map((exp, index) => (
//           <div key={index} className="mb-4">
//             <label className="block mb-1">Period:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={exp.period}
//               onChange={(e) =>
//                 handleExperienceChange(index, "period", e.target.value)
//               }
//             />
//             <label className="block mb-1">Position:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={exp.position}
//               onChange={(e) =>
//                 handleExperienceChange(index, "position", e.target.value)
//               }
//             />
//             <label className="block mb-1">Company:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={exp.company}
//               onChange={(e) =>
//                 handleExperienceChange(index, "company", e.target.value)
//               }
//             />
//             <label className="block mb-1">Description:</label>
//             <ReactQuill
//               className="w-full p-2 border border-gray-300 rounded"
//               value={exp.description}
//               onChange={(value) =>
//                 handleExperienceChange(index, "description", value)
//               }
//             />
//           </div>
//         ))}
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Education:</label>
//         {education.map((edu, index) => (
//           <div key={index} className="mb-4">
//             <label className="block mb-1">School:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={edu.school}
//               onChange={(e) =>
//                 handleEducationChange(index, "school", e.target.value)
//               }
//             />
//             <label className="block mb-1">Major:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={edu.major}
//               onChange={(e) =>
//                 handleEducationChange(index, "major", e.target.value)
//               }
//             />
//             <label className="block mb-1">GPA:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={edu.gpa}
//               onChange={(e) =>
//                 handleEducationChange(index, "gpa", e.target.value)
//               }
//             />
//             <label className="block mb-1">Period:</label>
//             <input
//               className="w-full p-2 border border-gray-300 rounded"
//               type="text"
//               value={edu.period}
//               onChange={(e) =>
//                 handleEducationChange(index, "period", e.target.value)
//               }
//             />
//             <label className="block mb-1">Description:</label>
//             <ReactQuill
//               className="w-full p-2 border border-gray-300 rounded"
//               value={edu.description}
//               onChange={(value) =>
//                 handleEducationChange(index, "description", value)
//               }
//             />
//           </div>
//         ))}
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Skills:</label>
//         <div className="mb-2">
//           <label className="block mb-1">Technical:</label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="text"
//             value={skills.technical}
//             onChange={(e) =>
//               handleSkillsChange("technical", e.target.value)
//             }
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1">Non-Technical:</label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="text"
//             value={skills.nonTechnical}
//             onChange={(e) =>
//               handleSkillsChange("nonTechnical", e.target.value)
//             }
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1">Managerial:</label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="text"
//             value={skills.managerial}
//             onChange={(e) =>
//               handleSkillsChange("managerial", e.target.value)
//             }
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1">Soft:</label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded"
//             type="text"
//             value={skills.soft}
//             onChange={(e) => handleSkillsChange("soft", e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Achievements:</label>
//         <ReactQuill
//           className="w-full p-2 border border-gray-300 rounded"
//           value={achievements}
//           onChange={setAchievements}
//         />
//       </div>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <div className="flex justify-between">
//         <button
//           className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700"
//           type="button"
//           onClick={handlePDFDownload}
//         >
//           Download as PDF
//         </button>
//         <button
//           className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700"
//           type="button"
//           onClick={handleDOCDownload}
//         >
//           Download as DOC
//         </button>
//         <button
//           className="p-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-700"
//           type="button"
//           onClick={updatePreview}
//         >
//           Update Preview
//         </button>
//       </div>
//     </form>
//     <div className="w-full p-5">
//       <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
//       <div
//         id="resume-preview"
//         className="p-4 border border-gray-300 rounded"
//       >
//         <h3 className="text-lg text-center font-bold">{name}</h3>
//         <div className="flex text-center justify-center items-center space-x-2">
//           <p className="mb-2">{email}</p>
//           <p className="mb-2">|</p>
//           <p className="mb-2">{phone}</p>
//           <p className="mb-2">|</p>
//           {/* <p className="mb-2">Website: {website}</p> */}
//           <p className="mb-2">{linkedin}</p>
//           {/* <p className="mb-2">GitHub: {github}</p> */}
//         </div>
//         <h4 className="font-bold mb-2">Experience:</h4>
//         {experience.map((exp, index) => (
//           <div key={index} className="mb-2">
//             <p>Period: {exp.period}</p>
//             <p>Position: {exp.position}</p>
//             <p>Company: {exp.company}</p>
//             <div dangerouslySetInnerHTML={{ __html: exp.description }} />
//           </div>
//         ))}
//         <h4 className="font-bold mb-2">Education:</h4>
//         {education.map((edu, index) => (
//           <div key={index} className="mb-2">
//             <p>School: {edu.school}</p>
//             <p>Major: {edu.major}</p>
//             <p>GPA: {edu.gpa}</p>
//             <p>Period: {edu.period}</p>
//             <div dangerouslySetInnerHTML={{ __html: edu.description }} />
//           </div>
//         ))}
//         <h4 className="font-bold mb-2">Skills:</h4>
//         <p>Technical: {skills.technical}</p>
//         <p>Non-Technical: {skills.nonTechnical}</p>
//         <p>Managerial: {skills.managerial}</p>
//         <p>Soft: {skills.soft}</p>
//         <h4 className="font-bold mb-2">Achievements:</h4>
//         <div dangerouslySetInnerHTML={{ __html: achievements }} />
//       </div>
//     </div>
//   </div>
// </div>

// const handlePDFDownload = () => {
//   // if (!validateForm()) return;

//   // const doc = new jsPDF();

//   // doc.text(`Name: ${name}`, 10, 10);
//   // doc.text(`Email: ${email}`, 10, 20);
//   // doc.text(`Phone: ${phone}`, 10, 30);
//   // doc.text(`Website: ${website}`, 10, 40);
//   // doc.text(`LinkedIn: ${linkedin}`, 10, 50);
//   // doc.text(`GitHub: ${github}`, 10, 60);

//   // doc.text(`Experience:`, 10, 70);
//   // experience.forEach((exp, index) => {
//   //   doc.text(`Period: ${exp.period}`, 10, 80 + index * 20);
//   //   doc.text(`Position: ${exp.position}`, 10, 90 + index * 20);
//   //   doc.text(`Company: ${exp.company}`, 10, 100 + index * 20);
//   //   doc.text(`Description: ${exp.description}`, 10, 110 + index * 20);
//   // });

//   // doc.text(`Education:`, 10, 120);
//   // education.forEach((edu, index) => {
//   //   doc.text(`School: ${edu.school}`, 10, 130 + index * 20);
//   //   doc.text(`Major: ${edu.major}`, 10, 140 + index * 20);
//   //   doc.text(`GPA: ${edu.gpa}`, 10, 150 + index * 20);
//   //   doc.text(`Period: ${edu.period}`, 10, 160 + index * 20);
//   //   doc.text(`Description: ${edu.description}`, 10, 170 + index * 20);
//   // });

//   // doc.text(`Skills:`, 10, 180);
//   // doc.text(`Technical: ${skills.technical}`, 10, 190);
//   // doc.text(`Non-Technical: ${skills.nonTechnical}`, 10, 200);
//   // doc.text(`Managerial: ${skills.managerial}`, 10, 210);
//   // doc.text(`Soft: ${skills.soft}`, 10, 220);

//   // doc.text(`Achievements: ${achievements}`, 10, 230);

//   // doc.save("resume.pdf");

//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.getWidth();

//   // Centralize the name
//   const nameX = (pageWidth - doc.getTextWidth(name)) / 2;
//   doc.setFontSize(16);
//   doc.text(name, nameX, 10);

//   // Centralize the contact info
//   const contactParts = [email, phone, linkedin].filter(Boolean);
//   const contactInfo = contactParts.join(" | ");
//   const contactInfoWidth = doc.getTextWidth(contactInfo);
//   const contactInfoX = pageWidth - contactInfoWidth;
//   doc.setFontSize(12);
//   doc.text(contactInfo, contactInfoX, 20);

//   // Experience Section
//   doc.setFontSize(14);
//   doc.text("Experience:", 10, 30);
//   experience.forEach((exp, index) => {
//     const yOffset = 40 + index * 30;
//     doc.setFontSize(12);
//     doc.text(`Period: ${exp.period}`, 10, yOffset);
//     doc.text(`Position: ${exp.position}`, 10, yOffset + 10);
//     doc.text(`Company: ${exp.company}`, 10, yOffset + 20);
//     doc.text(`Description: ${exp.description}`, 10, yOffset + 30);
//   });

//   // Education Section
//   const educationYOffset = 40 + experience.length * 30;
//   doc.setFontSize(14);
//   doc.text("Education:", 10, educationYOffset);
//   education.forEach((edu, index) => {
//     const yOffset = educationYOffset + 10 + index * 30;
//     doc.setFontSize(12);
//     doc.text(`School: ${edu.school}`, 10, yOffset);
//     doc.text(`Major: ${edu.major}`, 10, yOffset + 10);
//     doc.text(`GPA: ${edu.gpa}`, 10, yOffset + 20);
//     doc.text(`Period: ${edu.period}`, 10, yOffset + 30);
//     doc.text(`Description: ${edu.description}`, 10, yOffset + 40);
//   });

//   // Skills Section
//   const skillsYOffset = educationYOffset + 10 + education.length * 30;
//   doc.setFontSize(14);
//   doc.text("Skills:", 10, skillsYOffset);
//   doc.setFontSize(12);
//   doc.text(`Technical: ${skills.technical}`, 10, skillsYOffset + 10);
//   doc.text(`Non-Technical: ${skills.nonTechnical}`, 10, skillsYOffset + 20);
//   doc.text(`Managerial: ${skills.managerial}`, 10, skillsYOffset + 30);
//   doc.text(`Soft: ${skills.soft}`, 10, skillsYOffset + 40);

//   // Achievements Section
//   const achievementsYOffset = skillsYOffset + 50;
//   doc.setFontSize(14);
//   doc.text("Achievements:", 10, achievementsYOffset);
//   doc.setFontSize(12);
//   doc.text(achievements, 10, achievementsYOffset + 10);

//   doc.save("resume.pdf");
// };
