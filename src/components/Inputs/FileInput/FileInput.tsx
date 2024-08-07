import { ChangeEvent, Ref, forwardRef, useState } from 'react';

export const FileInput = forwardRef(function FileInput(
  {
    name,
    label,
    onReset
  }: { name: string; label: string; onReset: () => void },
  ref: Ref<HTMLInputElement>
) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/webp'
      ) {
        // Change this to 'image/webp' to only allow WebP images
        setError('Por favor, sube una imagen en formato WebP.');
        setPreviewUrl('');
        onReset();
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleResetImage = () => {
    setPreviewUrl('');
    setError('');
    onReset();
  };

  return (
    <div className="fileInput">
      <label htmlFor={name}>{label}</label>
      <input type="file" name={name} ref={ref} onChange={handleFileChange} />
      {previewUrl && (
        <>
          <img
            src={previewUrl}
            alt="Vista previa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button onClick={handleResetImage}>Borrar</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
});
