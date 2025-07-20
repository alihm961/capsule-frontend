import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import CapsuleCard from '../../components/CapsuleCard';
import api from '../../api/axios';
import './style.css';

const DashboardPage = () => {
  const [capsules, setCapsules] = useState([]);

  const fetchCapsules = async () => {
    try {
      const res = await api.get('/capsules/user');
      console.log(' Fetched Capsules:', res.data);
      setCapsules(res.data.data);
    } catch (error) {
      console.error(' Failed to fetch capsules:', error);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  const handleDelete = async (capsuleId) => {
  try {
    await api.delete(`/capsules/${capsuleId}`);

    const updatedCapsules = capsules.filter((capsule) => capsule.id !== capsuleId);
    setCapsules(updatedCapsules);
    console.log('Capsule deleted successfully!');
  } catch (error) {
    console.error('Failed to delete capsule:', error);
  }
};

  const handleOpen = (capsule) => {
    if (new Date() >= new Date(capsule.revealDate)) {
      console.log(' Capsule Opened:', capsule);
    } else {
      console.log(' Capsule not revealed yet!');
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h1>Your Capsules</h1>

        <div className="capsules-grid">
          {Array.isArray(capsules) && capsules.length > 0 ? (
            capsules.map((capsule, index) => (
              <CapsuleCard
                key={index}
                capsule={capsule}
                onDelete={() => handleDelete(capsule.id)}
                onOpen={() => handleOpen(capsule)}
                showDelete={true}
              />
            ))
          ) : (
            <p> No capsules found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;