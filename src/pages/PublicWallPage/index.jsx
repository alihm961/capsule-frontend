import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import CapsuleCard from '../../components/CapsuleCard';
import api from '../../api/axios';
import useFilters from '../../hooks/useFilters';
import './style.css';

let cache = null;

const PublicWallPage = () => {
  const [capsules, setCapsules] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [filters, setFilters] = useState({
    country: '',
    mood: '',
    timeRanges: 'all',
  });

  const { moods, countries } = useFilters();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const params = {};
        if (filters.country) params.country = filters.country;
        if (filters.mood) params.mood = filters.mood;

        const res = await api.get('/capsules/public', { params });
        const data = res.data?.data || [];
        cache = data;
        setCapsules(data);
        localStorage.setItem('timeCapsulePublicCapsules', JSON.stringify(data));
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!cache) fetchCapsules();
  }, [filters.country, filters.mood]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCapsules = Array.isArray(capsules)
    ? capsules.filter((capsule) => {
        let match = true;
        if (filters.country && capsule.country?.name !== filters.country) match = false;
        if (filters.mood && capsule.mood?.name !== filters.mood) match = false;
        return match;
      })
    : [];

  return (
    <DashboardLayout>
      <div className="public-wall-page">
        <h1>Public Capsules</h1>

        <div className="filter-controls">
          <select name="country" value={filters.country} onChange={handleFilterChange}>
            <option value="">All Countries</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>

          <select name="mood" value={filters.mood} onChange={handleFilterChange}>
            <option value="">All Moods</option>
            {moods.map((mood, index) => (
              <option key={index} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <div className="capsules-grid">
          {filteredCapsules.length > 0 ? (
            filteredCapsules.map((capsule, index) => (
              <CapsuleCard
                key={index}
                capsule={capsule}
                onOpen={() => handleOpen(capsule)}
                showDelete={false}
              />
            ))
          ) : (
            <p>No public capsules found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublicWallPage;