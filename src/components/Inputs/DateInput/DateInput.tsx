import { forwardRef, useState, Ref, ChangeEvent, useEffect } from 'react';
import './DateInput.scss';

interface DateInputProps {
  name: string;
  label: string;
  defaultValue?: string;
  error?: boolean;
}

export const DateInput = forwardRef(function DateInput(
  { name, label, defaultValue = '', error = false }: DateInputProps,
  ref: Ref<HTMLInputElement>
) {
  const [value, setValue] = useState(defaultValue);
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    setValue(defaultValue.split('T')[0]);
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    event.preventDefault();
    setValue(value);
  };

  return (
    <div className="dateInput">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        type="date"
        ref={ref}
        value={value}
        max={maxDate}
      />
      {error && <p>Inserte una fecha</p>}
    </div>
  );
});
