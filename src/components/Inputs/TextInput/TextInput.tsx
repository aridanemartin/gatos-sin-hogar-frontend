import { forwardRef, useState, ChangeEvent, Ref, useEffect } from 'react';
import './TextInput.scss';

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
}

export const TextInput = forwardRef(function TextInput(
  { name, label, placeholder, defaultValue = '', error }: TextInputProps,
  ref: Ref<HTMLInputElement>
) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div className="textInput">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        ref={ref}
        placeholder={placeholder}
        value={value}
      />
      {error && <p>{error}</p>}
    </div>
  );
});
