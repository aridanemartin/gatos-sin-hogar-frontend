import { forwardRef, Ref } from 'react';

interface TextAreaInputProps {
  name: string;
  label: string;
  placeholder: string;
}

export const TextAreaInput = forwardRef(function TextAreaInput(
  { name, label, placeholder }: TextAreaInputProps,
  ref: Ref<HTMLTextAreaElement>
) {
  console.log('===> Se rerenderiza solo el textInput <===');

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} ref={ref} placeholder={placeholder} />
    </>
  );
});
