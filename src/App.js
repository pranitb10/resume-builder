import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [experience, setExperience] = useState([{ period: '', position: '', company: '', description: '' }]);
  const [education, setEducation] = useState([{ school: '', major: '', gpa: '', period: '', description: '' }]);
  const [skills, setSkills] = useState({ technical: '', nonTechnical: '', managerial: '', soft: '' });
  const [achievements, setAchievements] = useState('');

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleSkillsChange = (field, value) => {
    const newSkills = { ...skills };
    newSkills[field] = value;
    setSkills(newSkills);
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();

    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phone}`, 10, 30);
    doc.text(`Website: ${website}`, 10, 40);
    doc.text(`LinkedIn: ${linkedin}`, 10, 50);
    doc.text(`GitHub: ${github}`, 10, 60);

    doc.text(`Experience:`, 10, 70);
    experience.forEach((exp, index) => {
      doc.text(`Period: ${exp.period}`, 10, 80 + index * 10);
      doc.text(`Position: ${exp.position}`, 10, 90 + index * 10);
      doc.text(`Company: ${exp.company}`, 10, 100 + index * 10);
      doc.text(`Description: ${exp.description}`, 10, 110 + index * 10);
    });

    doc.text(`Education:`, 10, 120);
    education.forEach((edu, index) => {
      doc.text(`School: ${edu.school}`, 10, 130 + index * 10);
      doc.text(`Major: ${edu.major}`, 10, 140 + index * 10);
      doc.text(`GPA: ${edu.gpa}`, 10, 150 + index * 10);
      doc.text(`Period: ${edu.period}`, 10, 160 + index * 10);
      doc.text(`Description: ${edu.description}`, 10, 170 + index * 10);
    });

    doc.text(`Skills:`, 10, 180);
    doc.text(`Technical: ${skills.technical}`, 10, 190);
    doc.text(`Non-Technical: ${skills.nonTechnical}`, 10, 200);
    doc.text(`Managerial: ${skills.managerial}`, 10, 210);
    doc.text(`Soft: ${skills.soft}`, 10, 220);

    doc.text(`Achievements: ${achievements}`, 10, 230);

    doc.save('resume.pdf');
  };

  const handleDOCDownload = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(`Name: ${name}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Email: ${email}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Phone: ${phone}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Website: ${website}`)],
            }),
            new Paragraph({
              children: [new TextRun(`LinkedIn: ${linkedin}`)],
            }),
            new Paragraph({
              children: [new TextRun(`GitHub: ${github}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Experience:`)],
            }),
            ...experience.map(exp => [
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
            new Paragraph({
              children: [new TextRun(`Education:`)],
            }),
            ...education.map(edu => [
              new Paragraph({
                children: [new TextRun(`School: ${edu.school}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Major: ${edu.major}`)],
              }),
              new Paragraph({
                children: [new TextRun(`GPA: ${edu.gpa}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Period: ${edu.period}`)],
              }),
              new Paragraph({
                children: [new TextRun(`Description: ${edu.description}`)],
              }),
            ]),
            new Paragraph({
              children: [new TextRun(`Skills:`)],
            }),
            new Paragraph({
              children: [new TextRun(`Technical: ${skills.technical}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Non-Technical: ${skills.nonTechnical}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Managerial: ${skills.managerial}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Soft: ${skills.soft}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Achievements: ${achievements}`)],
            }),
          ].flat(),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'resume.docx');
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Resume Builder</h1>
        <form>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone: </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Portfolio Website: </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <label>LinkedIn: </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div>
            <label>GitHub: </label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div>
            <h3>Experience</h3>
            {experience.map((exp, index) => (
              <div key={index}>
                <label>Period: </label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                />
                <label>Position: </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                />
                <label>Company: </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <label>Description: </label>
                <input
                  type="text"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={() => setExperience([...experience, { period: '', position: '', company: '', description: '' }])}>Add More Experience</button>
          </div>
          <div>
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index}>
                <label>School: </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                />
                <label>Major: </label>
                <input
                  type="text"
                  value={edu.major}
                  onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                />
                <label>GPA: </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                />
                <label>Period: </label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                />
                <label>Description: </label>
                <input
                  type="text"
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={() => setEducation([...education, { school: '', major: '', gpa: '', period: '', description: '' }])}>Add More Education</button>
          </div>
          <div>
            <h3>Skills</h3>
            <label>Technical: </label>
            <input
              type="text"
              value={skills.technical}
              onChange={(e) => handleSkillsChange('technical', e.target.value)}
            />
            <label>Non-Technical: </label>
            <input
              type="text"
              value={skills.nonTechnical}
              onChange={(e) => handleSkillsChange('nonTechnical', e.target.value)}
            />
            <label>Managerial: </label>
            <input
              type="text"
              value={skills.managerial}
              onChange={(e) => handleSkillsChange('managerial', e.target.value)}
            />
            <label>Soft: </label>
            <input
              type="text"
              value={skills.soft}
              onChange={(e) => handleSkillsChange('soft', e.target.value)}
            />
          </div>
          <div>
            <label>Achievements: </label>
            <input
              type="text"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
            />
          </div>
          <div>
            <button type="button" onClick={handlePDFDownload}>Download PDF</button>
            <button type="button" onClick={handleDOCDownload}>Download DOCX</button>
          </div>
        </form>
      </div>
      <div className="preview-container">
        <div className="a4-preview">
          <div className="content">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Website: {website}</p>
            <p>LinkedIn: {linkedin}</p>
            <p>GitHub: {github}</p>
            <h3>Experience</h3>
            {experience.map((exp, index) => (
              <div key={index}>
                <p>Period: {exp.period}</p>
                <p>Position: {exp.position}</p>
                <p>Company: {exp.company}</p>
                <p>Description: {exp.description}</p>
              </div>
            ))}
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index}>
                <p>School: {edu.school}</p>
                <p>Major: {edu.major}</p>
                <p>GPA: {edu.gpa}</p>
                <p>Period: {edu.period}</p>
                <p>Description: {edu.description}</p>
              </div>
            ))}
            <h3>Skills</h3>
            <p>Technical: {skills.technical}</p>
            <p>Non-Technical: {skills.nonTechnical}</p>
            <p>Managerial: {skills.managerial}</p>
            <p>Soft: {skills.soft}</p>
            <h3>Achievements</h3>
            <p>{achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;