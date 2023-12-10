import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { TextInput } from '../../../components/Inputs/TextInput/TextInput';

export const CatEditPage = () => {
  console.log('Se rerenderiza la página');
  const nameRef = useRef<HTMLInputElement>(null);
  const surnamesRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({
    name: false,
    surnames: false
  });
  // const [formData, setFormData] = useState({
  //   genders: any[],
  //   breeds: any[],
  //   locations: any[],
  //   clinics: any[],
  //   vaccines: any[],
  //   incidents: any[]
  // })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [breeds, locations, clinics, vaccines] = await Promise.all([
          // fetch(`http://localhost:7000/genders/`).then((res) => res.json()),
          fetch(`http://localhost:7000/breeds/`).then((res) => res.json()),
          fetch(`http://localhost:7000/locations/`).then((res) => res.json()),
          fetch(`http://localhost:7000/clinics/`).then((res) => res.json()),
          fetch(`http://localhost:7000/vaccines/`).then((res) => res.json())
          // fetch(`http://localhost:7000/incidents/`).then((res) => res.json()),
        ]);

        console.log('===>', locations);
        console.log('===>', breeds);
      } catch (error) {
        console.log('error!');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = nameRef?.current?.value || '';
    const surnames = surnamesRef?.current?.value || '';

    const nameError = name === '';
    const surnamesError = surnames === '';

    setErrors({
      name: nameError,
      surnames: surnamesError
    });

    if (!nameError && !surnamesError) {
      console.log('Form submitted successfully');
    }
  };

  console.log('errores===>', errors);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="name"
        label="Cat Name"
        type="text"
        ref={nameRef}
        placeholder="Name"
      />
      <TextInput
        name="surnames"
        label="Cat Surname"
        type="text"
        ref={surnamesRef}
        placeholder="Surnames"
      />
      <input type="submit" />
    </form>
  );
};
