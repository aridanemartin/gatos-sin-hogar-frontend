import { forwardRef, useState, Ref, ChangeEvent } from 'react';

interface SelectInputProps {
  name: string;
  label: string;
  options?: SelectInputOption[];
  isBooleanSelect?: boolean;
  hasEnumeratedOptions?: boolean;
}

interface SelectInputOption {
  id: number;
  name: string;
}

export const SelectInput = forwardRef(function SelectInput(
  {
    name,
    label,
    options = [],
    isBooleanSelect = false,
    hasEnumeratedOptions = false
  }: SelectInputProps,
  ref: Ref<HTMLSelectElement>
) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    event.preventDefault();
    setValue(value);
  };

  const renderOptions = () => {
    if (isBooleanSelect) {
      return (
        <>
          <option value={'false'} key={0}>
            No
          </option>
          <option value={'true'} key={1}>
            Sí
          </option>
        </>
      );
    }

    return options.map((option) => {
      return (
        <option
          value={hasEnumeratedOptions ? option.id : option.name}
          key={option.id}
        >
          {option.name}
        </option>
      );
    });
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleChange} ref={ref} value={value}>
        {renderOptions()}
      </select>
    </>
  );
});
