import { forwardRef, useState, Ref, ChangeEvent } from 'react';

interface DateInputProps {
  name: string;
  label: string;
}

export const DateInput = forwardRef(function DateInput(
  { name, label }: DateInputProps,
  ref: Ref<HTMLInputElement>
) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.preventDefault();
    setValue(value);
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        type="date"
        ref={ref}
        value={value}
      />
    </>
  );
});
