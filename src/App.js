import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, ExternalHyperlink } from 'docx';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(name, 10, 20);
    doc.setFontSize(16);
    doc.text(`${email} ┊ ${phone} ┊ ${website} ┊ ${linkedin} ┊ ${github}`, 10, 40);
    doc.save('resume.pdf');
  };

  const handleDOCDownload = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: name, size: 44, bold: true })],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: email, size: 32 }),
                new TextRun({ text: ' ┊ ', size: 32 }),
                new TextRun({ text: phone, size: 32 }),
                new TextRun({ text: ' ┊ ', size: 32 }),
                new ExternalHyperlink({
                  link: website,
                  children: [new TextRun({ text: website, size: 32, style: 'Hyperlink' })],
                }),
                new TextRun({ text: ' ┊ ', size: 32 }),
                new ExternalHyperlink({
                  link: linkedin,
                  children: [new TextRun({ text: linkedin, size: 32, style: 'Hyperlink' })],
                }),
                new TextRun({ text: ' ┊ ', size: 32 }),
                new ExternalHyperlink({
                  link: github,
                  children: [new TextRun({ text: github, size: 32, style: 'Hyperlink' })],
                }),
              ],
            }),
          ],
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
        </form>
        <div className="buttons-container">
          <button onClick={handlePDFDownload}>Download as PDF</button>
          <button onClick={handleDOCDownload}>Download as DOC</button>
        </div>
      </div>
      <div className="letter-box-container">
        <div className="letter-box">
          <h1>A4 Resume Page</h1>
          <h2>{name}</h2>
          <p>{email} <b> ┊ </b> {phone} <b> ┊ </b> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a> <b> ┊ </b> <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a> <b> ┊ </b> <a href={github} target="_blank" rel="noopener noreferrer">{github}</a></p>
        </div>
      </div>
    </div>
  );
};

export default App;