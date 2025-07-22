import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import CapsuleCard from '../../components/CapsuleCard';
import useUserCapsules from '../../hooks/useUserCapsules';
import api from '../../api/axios';
import './style.css';

const DashboardPage = () => {
  const {
    capsules,
    loading,
    error,
    refetch,
  } = useUserCapsules();

  const handleDelete = async (capsuleId) => {
    try {
      await api.delete(`/capsules/${capsuleId}`);
      refetch(); 
    } catch (error) {
      console.error('Failed to delete capsule:', error);
    }
  };

  const handleOpen = (capsule) => {
    const now = new Date();
    const reveal = new Date(capsule.revealDate || capsule.reveal_at);
    if (now >= reveal) {
      console.log('Capsule Opened:', capsule);
    } else {
      console.log('Capsule not revealed yet!');
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h1>Your Capsules</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading capsules!</p>}
        <div className="capsules-grid">
          {Array.isArray(capsules) && capsules.length > 0 ? (
            capsules.map((capsule, index) => (
              <CapsuleCard
                key={capsule.id || index}
                capsule={capsule}
                onDelete={() => handleDelete(capsule.id)}
                onOpen={() => handleOpen(capsule)}
                showDelete={true}
              />
            ))
          ) : (
            !loading && <p>No capsules found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;