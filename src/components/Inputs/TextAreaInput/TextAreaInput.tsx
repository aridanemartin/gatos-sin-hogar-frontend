import { forwardRef, Ref, ChangeEvent, useState, useEffect } from 'react';
import './TextAreaInput.scss';

interface TextAreaInputProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  error?: boolean;
}

export const TextAreaInput = forwardRef(function TextAreaInput(
  { name, label, placeholder, error, defaultValue = '' }: TextAreaInputProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div className="textAreaInput">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <p>El input está vacío</p>}
    </div>
  );
});
