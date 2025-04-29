import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      className='w-full border p-2 mb-4'
      rows={24}
      placeholder='Введіть текст для конвертації...'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
