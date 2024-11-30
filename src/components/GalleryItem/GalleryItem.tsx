import { CatIcon } from '@assets/icons/svg/CatIcon';
import './GalleryItem.scss';

interface GalleryItemProps {
  src?: string;
  id: string;
  name: string;
  onClick?: () => void;
}

export const GalleryItem = ({ src, name, onClick }: GalleryItemProps) => {
  if (!src) {
    return (
      <div className="galleryItem">
        <CatIcon />
        <div className="galleryItem__overlay">
          <h2 className="galleryItem__title">{name}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="galleryItem" onClick={onClick}>
      <img src={src} />
      <div className="galleryItem__overlay">
        <h2 className="galleryItem__title">{name}</h2>
      </div>
    </div>
  );
};
