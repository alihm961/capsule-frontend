import { useEffect, useState } from 'react';
import api from '../api/axios';

let cache = null;

const useMoods = () => {
  const [moods, setMoods] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cache) {
      api.get('/guest/moods')
        .then(res => {
          const data = res.data?.data || [];
          cache = data;
          setMoods(data);
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }
  }, []);

  return { moods, loading, error };
};

export default useMoods;