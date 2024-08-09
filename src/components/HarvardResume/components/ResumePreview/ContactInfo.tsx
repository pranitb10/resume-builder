import React from "react";

interface ContactInfoProps {
  email: string;
  phone: string;
  linkedin: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  linkedin,
}) => (
  <div className="flex text-center justify-center items-center space-x-2 mb-4">
    <p className="mb-2">{email}</p>
    <p className="mb-2">|</p>
    <p className="mb-2">{phone}</p>
    <p className="mb-2">|</p>
    <p className="mb-2">{linkedin}</p>
  </div>
);

export default ContactInfo;
