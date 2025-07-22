import { useState, useEffect } from 'react';
import api from '../api/axios';

let cache = null;

const useUserCapsules = () => {
  const [capsules, setCapsules] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  const fetchCapsules = async () => {
    try {
      const res = await api.get('/capsules/user');
      cache = res.data.data;
      setCapsules(cache);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cache) fetchCapsules();
  }, []);

  return { capsules, loading, error, refetch: fetchCapsules, setCapsules, };
};

export default useUserCapsules;