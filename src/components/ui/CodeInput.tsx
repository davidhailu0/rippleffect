import React, { useEffect, useRef } from 'react';

// Define the props type
interface CodeInputProps {
  confirmationCode: string;
  setConfirmationCode: (code: string) => void;
  loading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ confirmationCode, setConfirmationCode, loading }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]); // Define refs for input elements

  // Effect to update input values when confirmationCode changes (e.g., via paste)
  useEffect(() => {
    Array.from(confirmationCode).forEach((num, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = num;
      }
    });
  }, [confirmationCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newCode = Array.from(confirmationCode); // Convert the string to an array

    if (value.match(/^[0-9]$/)) {
      newCode[index] = value;
      setConfirmationCode(newCode.join('')); // Convert the array back to a string

      if (index < 5) {
        inputsRef.current[index + 1]?.focus(); // Move to the next input
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim();
    if (pastedData.match(/^[0-9]{6}$/)) {
      setConfirmationCode(pastedData);
      Array.from(pastedData).forEach((num, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index].value = num;
        }
      });
      inputsRef.current[5]?.focus(); // Move to the last input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (e.currentTarget.value === '' && index > 0) {
        inputsRef.current[index - 1]?.focus(); // Move to the previous input
      }
    }
  };

  return (
    <div className="flex justify-between w-full">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[index] = el!;
          }}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          disabled={loading} // Disable input fields when loading
        />
      ))}
    </div>
  );
};

export default CodeInput;
