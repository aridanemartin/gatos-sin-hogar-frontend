import { GalleryItem } from '@components/GalleryItem/GalleryItem';
import './ImageGallery.scss';
import { useNavigate } from 'react-router';
import { ArrowRightIcon } from '@assets/icons/svg/ArrowRightIcon';
import { ArrowLeftIcon } from '@assets/icons/svg/ArrowLeftIcon';

export interface ImageGalleryProps<T> {
  items: T[];
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  pagination: {
    itemsPerPage: number;
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

interface ProfileCardProps {
  id: string;
  picture: string;
  name: string;
  src: string;
}

export const ImageGallery = ({
  items,
  fetchNextPage,
  fetchPrevPage,
  pagination
}: ImageGalleryProps<ProfileCardProps>) => {
  const navigate = useNavigate();
  const { totalPages, currentPage } = pagination;
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const handleNavigate = (id: string) => {
    navigate(`/gatos/${id}`);
  };

  return (
    <>
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
      <div className="imageGallery__buttons">
        <button
          className="imageGallery__prevButton"
          onClick={fetchPrevPage}
          disabled={isFirstPage}
        >
          <ArrowLeftIcon />
        </button>

        <span>
          {currentPage} de {totalPages}
        </span>

        <button
          className="imageGallery__nextButton"
          onClick={fetchNextPage}
          disabled={isLastPage}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
};
