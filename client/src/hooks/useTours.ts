import { useState, useEffect } from 'react';

// import { getAllTours } from '../lib/requests';
import { API_URL } from '../constants';

import { ITour } from '../types';

const useFetch = (url: string) => {
  const [data, setData] = useState<ITour[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    // to check if the component is mounted and avoid memory leaks
    let isMounted = true;
    setLoading(true);

    fetch(`${API_URL}${url}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          // console.log(data);
          setData(data.data.tours);
          setError(null);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      })
      .finally(() => isMounted && setLoading(false));

    // cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
