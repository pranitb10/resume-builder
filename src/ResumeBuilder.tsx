// import React, { useState, useEffect } from 'react';
// import { jsPDF } from 'jspdf';
// import { saveAs } from 'file-saver';
// import { Document, Packer, Paragraph, TextRun } from 'docx';
// import { auth } from './firebaseConfig';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import './ResumeBuilder.css';

// const ResumeBuilder = ({ onSignout }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [website, setWebsite] = useState('');
//   const [linkedin, setLinkedin] = useState('');
//   const [github, setGithub] = useState('');
//   const [experience, setExperience] = useState([{ period: '', position: '', company: '', description: '' }]);
//   const [education, setEducation] = useState([{ school: '', major: '', gpa: '', period: '', description: '' }]);
//   const [skills, setSkills] = useState({ technical: '', nonTechnical: '', managerial: '', soft: '' });
//   const [achievements, setAchievements] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setError('');
//   }, [name, email, phone, website, linkedin, github, experience, education, skills, achievements]);

//   const handleExperienceChange = (index, field, value) => {
//     const newExperience = [...experience];
//     newExperience[index][field] = value;
//     setExperience(newExperience);
//   };

//   const handleEducationChange = (index, field, value) => {
//     const newEducation = [...education];
//     newEducation[index][field] = value;
//     setEducation(newEducation);
//   };

//   const handleSkillsChange = (field, value) => {
//     setSkills({ ...skills, [field]: value });
//   };

//   const validateForm = () => {
//     if (!name || !email || !phone) {
//       setError('Please fill all required fields.');
//       return false;
//     }
//     for (const exp of experience) {
//       if (!exp.period || !exp.position || !exp.company) {
//         setError('Please fill all required fields in experience.');
//         return false;
//       }
//     }
//     for (const edu of education) {
//       if (!edu.school || !edu.major) {
//         setError('Please fill all required fields in education.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const handlePDFDownload = () => {
//     if (!validateForm()) return;

//     const doc = new jsPDF();

//     doc.text(`Name: ${name}`, 10, 10);
//     doc.text(`Email: ${email}`, 10, 20);
//     doc.text(`Phone: ${phone}`, 10, 30);
//     doc.text(`Website: ${website}`, 10, 40);
//     doc.text(`LinkedIn: ${linkedin}`, 10, 50);
//     doc.text(`GitHub: ${github}`, 10, 60);

//     doc.text(`Experience:`, 10, 70);
//     experience.forEach((exp, index) => {
//       doc.text(`Period: ${exp.period}`, 10, 80 + index * 20);
//       doc.text(`Position: ${exp.position}`, 10, 90 + index * 20);
//       doc.text(`Company: ${exp.company}`, 10, 100 + index * 20);
//       doc.text(`Description: ${exp.description}`, 10, 110 + index * 20);
//     });

//     doc.text(`Education:`, 10, 120);
//     education.forEach((edu, index) => {
//       doc.text(`School: ${edu.school}`, 10, 130 + index * 20);
//       doc.text(`Major: ${edu.major}`, 10, 140 + index * 20);
//       doc.text(`GPA: ${edu.gpa}`, 10, 150 + index * 20);
//       doc.text(`Period: ${edu.period}`, 10, 160 + index * 20);
//       doc.text(`Description: ${edu.description}`, 10, 170 + index * 20);
//     });

//     doc.text(`Skills:`, 10, 180);
//     doc.text(`Technical: ${skills.technical}`, 10, 190);
//     doc.text(`Non-Technical: ${skills.nonTechnical}`, 10, 200);
//     doc.text(`Managerial: ${skills.managerial}`, 10, 210);
//     doc.text(`Soft: ${skills.soft}`, 10, 220);

//     doc.text(`Achievements: ${achievements}`, 10, 230);

//     doc.save('resume.pdf');
//   };

//   const handleDOCDownload = async () => {
//     if (!validateForm()) return;

//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({ children: [new TextRun(`Name: ${name}`)] }),
//             new Paragraph({ children: [new TextRun(`Email: ${email}`)] }),
//             new Paragraph({ children: [new TextRun(`Phone: ${phone}`)] }),
//             new Paragraph({ children: [new TextRun(`Website: ${website}`)] }),
//             new Paragraph({ children: [new TextRun(`LinkedIn: ${linkedin}`)] }),
//             new Paragraph({ children: [new TextRun(`GitHub: ${github}`)] }),
//             new Paragraph({ children: [new TextRun(`Experience:`)] }),
//             ...experience.map(exp => [
//               new Paragraph({ children: [new TextRun(`Period: ${exp.period}`)] }),
//               new Paragraph({ children: [new TextRun(`Position: ${exp.position}`)] }),
//               new Paragraph({ children: [new TextRun(`Company: ${exp.company}`)] }),
//               new Paragraph({ children: [new TextRun(`Description: ${exp.description}`)] }),
//             ]),
//             new Paragraph({ children: [new TextRun(`Education:`)] }),
//             ...education.map(edu => [
//               new Paragraph({ children: [new TextRun(`School: ${edu.school}`)] }),
//               new Paragraph({ children: [new TextRun(`Major: ${edu.major}`)] }),
//               new Paragraph({ children: [new TextRun(`GPA: ${edu.gpa}`)] }),
//               new Paragraph({ children: [new TextRun(`Period: ${edu.period}`)] }),
//               new Paragraph({ children: [new TextRun(`Description: ${edu.description}`)] }),
//             ]),
//             new Paragraph({ children: [new TextRun(`Skills:`)] }),
//             new Paragraph({ children: [new TextRun(`Technical: ${skills.technical}`)] }),
//             new Paragraph({ children: [new TextRun(`Non-Technical: ${skills.nonTechnical}`)] }),
//             new Paragraph({ children: [new TextRun(`Managerial: ${skills.managerial}`)] }),
//             new Paragraph({ children: [new TextRun(`Soft: ${skills.soft}`)] }),
//             new Paragraph({ children: [new TextRun(`Achievements: ${achievements}`)] }),
//           ].flat(),
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, 'resume.docx');
//   };

//   const handleSignout = () => {
//     auth.signOut().then(() => {
//       onSignout();
//     });
//   };

//   const updatePreview = () => {
//     if (!validateForm()) return;
//     setError('');
//   };

//   return (
//     <div className="resume-builder-container">
//       <button className="signout-button" onClick={handleSignout}>Signout</button>
//       <div className="resume-content">
//         <form>
//           <div>
//             <label>Name:</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div>
//             <label>Phone:</label>
//             <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </div>
//           <div>
//             <label>Website:</label>
//             <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
//           </div>
//           <div>
//             <label>LinkedIn:</label>
//             <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
//           </div>
//           <div>
//             <label>GitHub:</label>
//             <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} />
//           </div>
//           <div>
//             <h3>Experience</h3>
//             {experience.map((exp, index) => (
//               <div key={index}>
//                 <label>Period:</label>
//                 <input
//                   type="text"
//                   value={exp.period}
//                   onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
//                   required
//                 />
//                 <label>Position:</label>
//                 <input
//                   type="text"
//                   value={exp.position}
//                   onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
//                   required
//                 />
//                 <label>Company:</label>
//                 <input
//                   type="text"
//                   value={exp.company}
//                   onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
//                   required
//                 />
//                 <label>Description:</label>
//                 <ReactQuill
//                   value={exp.description}
//                   onChange={(value) => handleExperienceChange(index, 'description', value)}
//                 />
//               </div>
//             ))}
//             <button type="button" onClick={() => setExperience([...experience, { period: '', position: '', company: '', description: '' }])}>
//               Add More Experience
//             </button>
//           </div>
//           <div>
//             <h3>Education</h3>
//             {education.map((edu, index) => (
//               <div key={index}>
//                 <label>School:</label>
//                 <input
//                   type="text"
//                   value={edu.school}
//                   onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
//                   required
//                 />
//                 <label>Major:</label>
//                 <input
//                   type="text"
//                   value={edu.major}
//                   onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
//                   required
//                 />
//                 <label>GPA:</label>
//                 <input
//                   type="text"
//                   value={edu.gpa}
//                   onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
//                 />
//                 <label>Period:</label>
//                 <input
//                   type="text"
//                   value={edu.period}
//                   onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
//                 />
//                 <label>Description:</label>
//                 <ReactQuill
//                   value={edu.description}
//                   onChange={(value) => handleEducationChange(index, 'description', value)}
//                 />
//               </div>
//             ))}
//             <button type="button" onClick={() => setEducation([...education, { school: '', major: '', gpa: '', period: '', description: '' }])}>
//               Add More Education
//             </button>
//           </div>
//           <div>
//             <h3>Skills</h3>
//             <label>Technical:</label>
//             <input type="text" value={skills.technical} onChange={(e) => handleSkillsChange('technical', e.target.value)} />
//             <label>Non-Technical:</label>
//             <input type="text" value={skills.nonTechnical} onChange={(e) => handleSkillsChange('nonTechnical', e.target.value)} />
//             <label>Managerial:</label>
//             <input type="text" value={skills.managerial} onChange={(e) => handleSkillsChange('managerial', e.target.value)} />
//             <label>Soft:</label>
//             <input type="text" value={skills.soft} onChange={(e) => handleSkillsChange('soft', e.target.value)} />
//           </div>
//           <div>
//             <h3>Achievements</h3>
//             <label>Description:</label>
//             <ReactQuill value={achievements} onChange={(value) => setAchievements(value)} />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="button" onClick={updatePreview}>Update Preview</button>
//           <button type="button" onClick={handlePDFDownload}>Download PDF</button>
//           <button type="button" onClick={handleDOCDownload}>Download DOCX</button>
//         </form>
//         <div className="preview-container">
//           <div className="a4-preview">
//             <div className="content">
//               <h1>{name}</h1>
//               <p>Email: {email} | Phone: {phone}</p>
//               <p>Website: {website} | LinkedIn: {linkedin} | GitHub: {github}</p>
//               <h2>Experience</h2>
//               {experience.map((exp, index) => (
//                 <div key={index}>
//                   <p><strong>Period:</strong> {exp.period}</p>
//                   <p><strong>Position:</strong> {exp.position}</p>
//                   <p><strong>Company:</strong> {exp.company}</p>
//                   <div dangerouslySetInnerHTML={{ __html: exp.description }} />
//                 </div>
//               ))}
//               <h2>Education</h2>
//               {education.map((edu, index) => (
//                 <div key={index}>
//                   <p><strong>School:</strong> {edu.school}</p>
//                   <p><strong>Major:</strong> {edu.major}</p>
//                   <p><strong>GPA:</strong> {edu.gpa}</p>
//                   <p><strong>Period:</strong> {edu.period}</p>
//                   <div dangerouslySetInnerHTML={{ __html: edu.description }} />
//                 </div>
//               ))}
//               <h2>Skills</h2>
//               <p><strong>Technical:</strong> {skills.technical}</p>
//               <p><strong>Non-Technical:</strong> {skills.nonTechnical}</p>
//               <p><strong>Managerial:</strong> {skills.managerial}</p>
//               <p><strong>Soft:</strong> {skills.soft}</p>
//               <h2>Achievements</h2>
//               <div dangerouslySetInnerHTML={{ __html: achievements }} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { auth } from "./firebaseConfig";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
// import "./ResumeBuilder.css";

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
    website,
    linkedin,
    github,
    experience,
    education,
    skills,
    achievements,
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
    if (!validateForm()) return;

    const doc = new jsPDF();

    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phone}`, 10, 30);
    doc.text(`Website: ${website}`, 10, 40);
    doc.text(`LinkedIn: ${linkedin}`, 10, 50);
    doc.text(`GitHub: ${github}`, 10, 60);

    doc.text(`Experience:`, 10, 70);
    experience.forEach((exp, index) => {
      doc.text(`Period: ${exp.period}`, 10, 80 + index * 20);
      doc.text(`Position: ${exp.position}`, 10, 90 + index * 20);
      doc.text(`Company: ${exp.company}`, 10, 100 + index * 20);
      doc.text(`Description: ${exp.description}`, 10, 110 + index * 20);
    });

    doc.text(`Education:`, 10, 120);
    education.forEach((edu, index) => {
      doc.text(`School: ${edu.school}`, 10, 130 + index * 20);
      doc.text(`Major: ${edu.major}`, 10, 140 + index * 20);
      doc.text(`GPA: ${edu.gpa}`, 10, 150 + index * 20);
      doc.text(`Period: ${edu.period}`, 10, 160 + index * 20);
      doc.text(`Description: ${edu.description}`, 10, 170 + index * 20);
    });

    doc.text(`Skills:`, 10, 180);
    doc.text(`Technical: ${skills.technical}`, 10, 190);
    doc.text(`Non-Technical: ${skills.nonTechnical}`, 10, 200);
    doc.text(`Managerial: ${skills.managerial}`, 10, 210);
    doc.text(`Soft: ${skills.soft}`, 10, 220);

    doc.text(`Achievements: ${achievements}`, 10, 230);

    doc.save("resume.pdf");
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
    // <div className="resume-builder-container">
    //   <button className="signout-button" onClick={handleSignoutClick}>
    //     Signout
    //   </button>
    //   <div className="resume-content">
    //     <form>
    //       <div>
    //         <label>Name:</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Email:</label>
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Phone:</label>
    //         <input
    //           type="tel"
    //           value={phone}
    //           onChange={(e) => setPhone(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Website:</label>
    //         <input
    //           type="url"
    //           value={website}
    //           onChange={(e) => setWebsite(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label>LinkedIn:</label>
    //         <input
    //           type="url"
    //           value={linkedin}
    //           onChange={(e) => setLinkedin(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label>GitHub:</label>
    //         <input
    //           type="url"
    //           value={github}
    //           onChange={(e) => setGithub(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <h3>Experience</h3>
    //         {experience.map((exp, index) => (
    //           <div key={index}>
    //             <label>Period:</label>
    //             <input
    //               type="text"
    //               value={exp.period}
    //               onChange={(e) =>
    //                 handleExperienceChange(index, "period", e.target.value)
    //               }
    //               required
    //             />
    //             <label>Position:</label>
    //             <input
    //               type="text"
    //               value={exp.position}
    //               onChange={(e) =>
    //                 handleExperienceChange(index, "position", e.target.value)
    //               }
    //               required
    //             />
    //             <label>Company:</label>
    //             <input
    //               type="text"
    //               value={exp.company}
    //               onChange={(e) =>
    //                 handleExperienceChange(index, "company", e.target.value)
    //               }
    //               required
    //             />
    //             <label>Description:</label>
    //             <ReactQuill
    //               value={exp.description}
    //               onChange={(value) =>
    //                 handleExperienceChange(index, "description", value)
    //               }
    //             />
    //           </div>
    //         ))}
    //         <button
    //           type="button"
    //           onClick={() =>
    //             setExperience([
    //               ...experience,
    //               { period: "", position: "", company: "", description: "" },
    //             ])
    //           }
    //         >
    //           Add More Experience
    //         </button>
    //       </div>
    //       <div>
    //         <h3>Education</h3>
    //         {education.map((edu, index) => (
    //           <div key={index}>
    //             <label>School:</label>
    //             <input
    //               type="text"
    //               value={edu.school}
    //               onChange={(e) =>
    //                 handleEducationChange(index, "school", e.target.value)
    //               }
    //               required
    //             />
    //             <label>Major:</label>
    //             <input
    //               type="text"
    //               value={edu.major}
    //               onChange={(e) =>
    //                 handleEducationChange(index, "major", e.target.value)
    //               }
    //               required
    //             />
    //             <label>GPA:</label>
    //             <input
    //               type="text"
    //               value={edu.gpa}
    //               onChange={(e) =>
    //                 handleEducationChange(index, "gpa", e.target.value)
    //               }
    //             />
    //             <label>Period:</label>
    //             <input
    //               type="text"
    //               value={edu.period}
    //               onChange={(e) =>
    //                 handleEducationChange(index, "period", e.target.value)
    //               }
    //             />
    //             <label>Description:</label>
    //             <ReactQuill
    //               value={edu.description}
    //               onChange={(value) =>
    //                 handleEducationChange(index, "description", value)
    //               }
    //             />
    //           </div>
    //         ))}
    //         <button
    //           type="button"
    //           onClick={() =>
    //             setEducation([
    //               ...education,
    //               {
    //                 school: "",
    //                 major: "",
    //                 gpa: "",
    //                 period: "",
    //                 description: "",
    //               },
    //             ])
    //           }
    //         >
    //           Add More Education
    //         </button>
    //       </div>
    //       <div>
    //         <h3>Skills</h3>
    //         <label>Technical:</label>
    //         <input
    //           type="text"
    //           value={skills.technical}
    //           onChange={(e) => handleSkillsChange("technical", e.target.value)}
    //         />
    //         <label>Non-Technical:</label>
    //         <input
    //           type="text"
    //           value={skills.nonTechnical}
    //           onChange={(e) =>
    //             handleSkillsChange("nonTechnical", e.target.value)
    //           }
    //         />
    //         <label>Managerial:</label>
    //         <input
    //           type="text"
    //           value={skills.managerial}
    //           onChange={(e) => handleSkillsChange("managerial", e.target.value)}
    //         />
    //         <label>Soft:</label>
    //         <input
    //           type="text"
    //           value={skills.soft}
    //           onChange={(e) => handleSkillsChange("soft", e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <h3>Achievements</h3>
    //         <label>Description:</label>
    //         <ReactQuill
    //           value={achievements}
    //           onChange={(value) => setAchievements(value)}
    //         />
    //       </div>
    //       {error && <p className="error">{error}</p>}
    //       <button type="button" onClick={updatePreview}>
    //         Update Preview
    //       </button>
    //       <button type="button" onClick={handlePDFDownload}>
    //         Download PDF
    //       </button>
    //       <button type="button" onClick={handleDOCDownload}>
    //         Download DOCX
    //       </button>
    //     </form>
    //     <div className="preview-container">
    //       <div className="a4-preview">
    //         <div className="content">
    //           <h1>{name}</h1>
    //           <p>
    //             Email: {email} | Phone: {phone}
    //           </p>
    //           <p>
    //             Website: {website} | LinkedIn: {linkedin} | GitHub: {github}
    //           </p>
    //           <h2>Experience</h2>
    //           {experience.map((exp, index) => (
    //             <div key={index}>
    //               <p>
    //                 <strong>Period:</strong> {exp.period}
    //               </p>
    //               <p>
    //                 <strong>Position:</strong> {exp.position}
    //               </p>
    //               <p>
    //                 <strong>Company:</strong> {exp.company}
    //               </p>
    //               <div dangerouslySetInnerHTML={{ __html: exp.description }} />
    //             </div>
    //           ))}
    //           <h2>Education</h2>
    //           {education.map((edu, index) => (
    //             <div key={index}>
    //               <p>
    //                 <strong>School:</strong> {edu.school}
    //               </p>
    //               <p>
    //                 <strong>Major:</strong> {edu.major}
    //               </p>
    //               <p>
    //                 <strong>GPA:</strong> {edu.gpa}
    //               </p>
    //               <p>
    //                 <strong>Period:</strong> {edu.period}
    //               </p>
    //               <div dangerouslySetInnerHTML={{ __html: edu.description }} />
    //             </div>
    //           ))}
    //           <h2>Skills</h2>
    //           <p>
    //             <strong>Technical:</strong> {skills.technical}
    //           </p>
    //           <p>
    //             <strong>Non-Technical:</strong> {skills.nonTechnical}
    //           </p>
    //           <p>
    //             <strong>Managerial:</strong> {skills.managerial}
    //           </p>
    //           <p>
    //             <strong>Soft:</strong> {skills.soft}
    //           </p>
    //           <h2>Achievements</h2>
    //           <div dangerouslySetInnerHTML={{ __html: achievements }} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-screen">
      <button
        className="self-end p-2 bg-blue-500 text-white cursor-pointer rounded m-2 hover:bg-blue-700"
        onClick={handleSignoutClick}
      >
        Signout
      </button>
      <div className="flex flex-1 overflow-auto">
        <form className="flex flex-col w-1/2 p-5">
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Website:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">LinkedIn:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">GitHub:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Experience:</label>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-1">Period:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={exp.period}
                  onChange={(e) =>
                    handleExperienceChange(index, "period", e.target.value)
                  }
                />
                <label className="block mb-1">Position:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleExperienceChange(index, "position", e.target.value)
                  }
                />
                <label className="block mb-1">Company:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                />
                <label className="block mb-1">Description:</label>
                <ReactQuill
                  className="w-full p-2 border border-gray-300 rounded"
                  value={exp.description}
                  onChange={(value) =>
                    handleExperienceChange(index, "description", value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Education:</label>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-1">School:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleEducationChange(index, "school", e.target.value)
                  }
                />
                <label className="block mb-1">Major:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={edu.major}
                  onChange={(e) =>
                    handleEducationChange(index, "major", e.target.value)
                  }
                />
                <label className="block mb-1">GPA:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={edu.gpa}
                  onChange={(e) =>
                    handleEducationChange(index, "gpa", e.target.value)
                  }
                />
                <label className="block mb-1">Period:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  value={edu.period}
                  onChange={(e) =>
                    handleEducationChange(index, "period", e.target.value)
                  }
                />
                <label className="block mb-1">Description:</label>
                <ReactQuill
                  className="w-full p-2 border border-gray-300 rounded"
                  value={edu.description}
                  onChange={(value) =>
                    handleEducationChange(index, "description", value)
                  }
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Skills:</label>
            <div className="mb-2">
              <label className="block mb-1">Technical:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={skills.technical}
                onChange={(e) =>
                  handleSkillsChange("technical", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Non-Technical:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={skills.nonTechnical}
                onChange={(e) =>
                  handleSkillsChange("nonTechnical", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Managerial:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={skills.managerial}
                onChange={(e) =>
                  handleSkillsChange("managerial", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Soft:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={skills.soft}
                onChange={(e) => handleSkillsChange("soft", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Achievements:</label>
            <ReactQuill
              className="w-full p-2 border border-gray-300 rounded"
              value={achievements}
              onChange={setAchievements}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-between">
            <button
              className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700"
              type="button"
              onClick={handlePDFDownload}
            >
              Download as PDF
            </button>
            <button
              className="p-2 bg-green-500 text-white cursor-pointer rounded hover:bg-green-700"
              type="button"
              onClick={handleDOCDownload}
            >
              Download as DOC
            </button>
            <button
              className="p-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-700"
              type="button"
              onClick={updatePreview}
            >
              Update Preview
            </button>
          </div>
        </form>
        <div className="w-1/2 p-5">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          <div className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="mb-2">Email: {email}</p>
            <p className="mb-2">Phone: {phone}</p>
            <p className="mb-2">Website: {website}</p>
            <p className="mb-2">LinkedIn: {linkedin}</p>
            <p className="mb-2">GitHub: {github}</p>
            <h4 className="font-bold mb-2">Experience:</h4>
            {experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <p>Period: {exp.period}</p>
                <p>Position: {exp.position}</p>
                <p>Company: {exp.company}</p>
                <div dangerouslySetInnerHTML={{ __html: exp.description }} />
              </div>
            ))}
            <h4 className="font-bold mb-2">Education:</h4>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p>School: {edu.school}</p>
                <p>Major: {edu.major}</p>
                <p>GPA: {edu.gpa}</p>
                <p>Period: {edu.period}</p>
                <div dangerouslySetInnerHTML={{ __html: edu.description }} />
              </div>
            ))}
            <h4 className="font-bold mb-2">Skills:</h4>
            <p>Technical: {skills.technical}</p>
            <p>Non-Technical: {skills.nonTechnical}</p>
            <p>Managerial: {skills.managerial}</p>
            <p>Soft: {skills.soft}</p>
            <h4 className="font-bold mb-2">Achievements:</h4>
            <div dangerouslySetInnerHTML={{ __html: achievements }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
