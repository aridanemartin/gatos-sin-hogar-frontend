import {
  CatLocationFormFields,
  CatLocationFormSchema
} from '@interfaces/CatForm';
import { LatLng } from 'leaflet';
import { ChangeEvent, useEffect, useState } from 'react';
import { environment } from '@consts/environments';
import UseToast from '@hooks/UseToast';
import { ZodError, typeToFlattenedError } from 'zod';

export const AddLocationForm = ({ coords }: { coords: LatLng }) => {
  const { baseUrl } = environment;
  const { toastSuccess, toastError } = UseToast();
  const [errors, setErrors] = useState(
    {} as typeToFlattenedError<CatLocationFormFields>
  );

  console.log('===errors ==>', errors);

  const [selectedLocation, setSelectedLocation] = useState({
    name: null,
    description: null,
    x_coord: coords.lat,
    y_coord: coords.lng
  });

  useEffect(() => {
    setSelectedLocation({
      ...selectedLocation,
      x_coord: coords.lat,
      y_coord: coords.lng
    });
  }, [coords]);

  function handleChangeInput(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSelectedLocation({
      ...selectedLocation,
      [event.target.name]: event.target.value
    });
  }

  async function handleAddLocationFormSubmit() {
    try {
      const validatedData = CatLocationFormSchema.parse(selectedLocation);

      await fetch(`${baseUrl}/locations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedData)
      });

      toastSuccess('Gato guardado con éxito');
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('===zod===>', typeof error);

        const errorObj = error.flatten();
        setErrors(errorObj);
      } else {
        console.log(error);
        toastError('Error al guardar/actualizar el gato.');
      }
    }
  }

  return (
    <div>
      <label>Añadir Nueva Localización</label>
      <input
        type="text"
        name="name"
        placeholder="Nombre de la localización"
        onChange={handleChangeInput}
      />
      <label>Añadir Descripción</label>
      <textarea
        name="description"
        placeholder="Descripción de la localización"
        onChange={handleChangeInput}
      ></textarea>
      <button onClick={handleAddLocationFormSubmit}>Añadir Localización</button>
    </div>
  );
};
