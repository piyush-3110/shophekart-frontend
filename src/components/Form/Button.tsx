import React from 'react';

interface ButtonProps {
  text: React.ReactNode;
  disabled: boolean; // Add this line
}

const Button: React.FC<ButtonProps> = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-700"
      disabled={disabled} // Add this line
    >
      {text}
    </button>
  );
};

export default Button;
