import { forwardRef, useState, type ChangeEvent, type Ref, useEffect } from 'react';
import './TextInput.scss';

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  isFullWidth?: boolean;
}

export const TextInput = forwardRef(function TextInput(
  {
    name,
    label,
    placeholder,
    defaultValue = '',
    error,
    isFullWidth
  }: TextInputProps,
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
    <div className={`textInput ${isFullWidth ? 'textInput__fullWidth' : ''}`}>
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
