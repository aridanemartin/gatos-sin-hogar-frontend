import { forwardRef, useState, ChangeEvent, Ref } from 'react';

interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export const TextInput = forwardRef(function TextInput(
  { name, label, placeholder }: TextInputProps,
  ref: Ref<HTMLInputElement>
) {
  console.log('===> Se rerenderiza solo el textInput <===');
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.preventDefault();

    const hasError = value === '';
    if (hasError) setError(true);
    else setError(false);
    setValue(value);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        ref={ref}
        placeholder={placeholder}
        value={value}
      />
      {error && <p>El input está vacío</p>}
    </>
  );
});
