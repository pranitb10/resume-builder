import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-gray-700 font-semibold">{label}:</label>
      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-300"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
