import { GalleryItem } from '@components/GalleryItem/GalleryItem';
import './ImageGallery.scss';
import { useNavigate } from 'react-router';

export interface ImageGalleryProps<T> {
  items: T[];
}

interface ProfileCardProps {
  id: string;
  picture: string;
  name: string;
  src: string;
}

export const ImageGallery = ({
  items
}: ImageGalleryProps<ProfileCardProps>) => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/gatos/${id}`);
  };

  return (
    <div className="imageGallery">
      {items.map((item) => {
        return (
          <GalleryItem
            id={item.id}
            key={item.id}
            name={item.name}
            src={item.picture}
            onClick={() => handleNavigate(item.id)}
          />
        );
      })}
    </div>
  );
};
