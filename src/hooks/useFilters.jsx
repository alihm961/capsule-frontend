import { useEffect, useState } from 'react';
import api from '../api/axios';

let cache = { moods: null, countries: null };

const useFilters = () => {
  const [moods, setMoods] = useState(cache.moods || []);
  const [countries, setCountries] = useState(cache.countries || []);

  useEffect(() => {
    if (!cache.moods) {
      api.get('/guest/moods')
        .then((res) => {
          const data = res.data?.data || [];
          const names = data.map((m) => m.name);
          cache.moods = names;
          setMoods(names);
        })
        .catch((err) => console.error('Failed', err));
    }

    if (!cache.countries) {
      api.get('/capsules/countries')
        .then((res) => {
          const data = res.data?.data || [];
          const names = data.map((c) => c.name);
          cache.countries = names;
          setCountries(names);
        })
        .catch((err) => console.error('Failed', err));
    }
  }, []);

  return { moods, countries };
};

export default useFilters;