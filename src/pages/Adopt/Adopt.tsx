import { useEffect, useState } from 'react';
import { ProfileCard } from '../../components/ProfileCard/ProfileCard';

interface Cat {
  id: number;
  name: string;
  gender: string;
  birth_date: Date;
  location_id: number;
  breed_id: number;
  has_chip: boolean;
  picture: Picture;
  description: string;
  has_passed_away: number;
  spayed_neutered: number;
  medical_conditions: string;
  dietary_needs: string;
  clinic_id: number;
}

export interface Picture {
  type: string;
  data: number[];
}

interface Pagination {
  itemsPerPage: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const AdoptPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    itemsPerPage: 11,
    totalCount: 1,
    totalPages: 1,
    currentPage: 1
  });

  useEffect(() => {
    async function fetchCats() {
      const response = await fetch(
        `http://localhost:7000/cats/?pageSize=${pagination.itemsPerPage}&page=${pagination.currentPage}`
      );
      const { data: cats, pagination: paginationObj } = await response.json();
      setCats(cats);
      setPagination(paginationObj);
    }
    fetchCats();
  }, [pagination.itemsPerPage, pagination.currentPage]);

  function fetchNextPage() {
    if (pagination.currentPage === pagination.totalPages) return;
    setPagination((prevState: Pagination) => {
      return {
        ...prevState,
        currentPage: prevState.currentPage + 1
      };
    });
  }

  function fetchPrevPage() {
    if (pagination.currentPage === 1) return;
    setPagination((prevState: Pagination) => {
      return {
        ...prevState,
        currentPage: prevState.currentPage - 1
      };
    });
  }

  return (
    <div>
      <button onClick={fetchPrevPage}>Prev Page</button>
      <button onClick={fetchNextPage}>Next Page</button>
      <h1>AdoptPage</h1>
      {cats.map((cat) => {
        return <ProfileCard key={cat.id} name={cat.name} />;
      })}
    </div>
  );
};
