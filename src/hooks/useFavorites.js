import { useRouter } from 'next/navigation';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFavorites = ({ listingId, currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoritesIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.open();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();

        router.refresh();
        toast.success(
          `Listing ${hasFavorited ? 'removed from' : 'added to'} favorites`
        );
      } catch (error) {
        // console.error(error);
        toast.error('Something went wrong');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    toggleFavorite,
    hasFavorited,
  };
};

export default useFavorites;
