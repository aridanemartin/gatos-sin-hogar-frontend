import { forwardRef, useState, Ref, ChangeEvent } from 'react';

interface SelectInputProps {
  name: string;
  label: string;
  options: string[];
}

export const SelectInput = forwardRef(function SelectInput(
  { name, label, options }: SelectInputProps,
  ref: Ref<HTMLSelectElement>
) {
  console.log('===> Se rerenderiza solo el input <===');
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    event.preventDefault();
    setValue(value);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleChange} ref={ref} value={value}>
        {options.map((option) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </>
  );
});
