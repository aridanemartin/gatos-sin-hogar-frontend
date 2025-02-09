import { forwardRef, useState, type Ref, type ChangeEvent, useEffect } from 'react';
import './SelectInput.scss';

interface SelectInputProps {
  name: string;
  label: string;
  options?: SelectInputOption[];
  isBooleanSelect?: boolean;
  hasEnumeratedOptions?: boolean;
  defaultValue?: string;
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
    hasEnumeratedOptions = false,
    defaultValue = ''
  }: SelectInputProps,
  ref: Ref<HTMLSelectElement>
) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    event.preventDefault();
    setValue(value);
  };

  const renderOptions = () => {
    if (isBooleanSelect) {
      return (
        <>
          <option value={'null'} key={0}>
            Se desconoce
          </option>
          <option value={'false'} key={1}>
            No
          </option>
          <option value={'true'} key={2}>
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
    <div className="selectInput">
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleChange} ref={ref} value={value}>
        {renderOptions()}
      </select>
    </div>
  );
});
