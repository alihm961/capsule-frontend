import React, { useState } from 'react';
import Modal from 'react-modal';
import './style.css';
import { Clock, Globe, Smile, Trash } from 'lucide-react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CapsuleCard = ({ capsule, onDelete, showDelete = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!capsule) return null;

  const {
    title,
    reveal_at,
    mood,
    country,
    image_path,
    audio_path,
    message,
  } = capsule;

  const formattedDate = reveal_at
    ? new Date(reveal_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  


  const handleDownload = async (id, title = 'capsule') => {
  try {
    const token = localStorage.getItem('timeCapsuleToken');

    const response = await axios.get(`http://127.0.0.1:8000/api/v1/capsules/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/zip' });
    saveAs(blob, `${title || 'capsule'}.zip`);
    toast.success('Download started!');
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('Failed to download capsule');
  }
};
  

  return (
    <>
      <div className="capsule-card" onClick={handleToggle}>
        <h3 className="capsule-title" role="button" tabIndex={0}>
          {title || 'Untitled Capsule'}
        </h3>
        <p className="capsule-info">
          <Clock size={14} /> {formattedDate}
        </p>
        <p className="capsule-info">
          <Smile size={14} /> Mood: {mood?.name || 'Unknown'}
        </p>
        <p className="capsule-info">
          <Globe size={14} /> Country: {country?.name || 'Unknown'}
        </p>
        {showDelete && (
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash size={14} /> Delete
          </button>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={handleToggle}
        contentLabel="Capsule Details"
        className="capsule-modal"
        overlayClassName="capsule-modal-overlay"
      >
        <h2>{title}</h2>
        <p>
          <strong>Message:</strong> {message}
        </p>

        {image_path && (
          <img
            src={`http://127.0.0.1:8000/storage/${image_path}`}
            alt={title}
            style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
          />
        )}

        {audio_path && (
          <audio controls style={{ marginTop: '1rem' }}>
            <source src={`http://127.0.0.1:8000/storage/${audio_path}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        <p>
          <Clock size={14} /> Reveal Date: {formattedDate}
        </p>
        <p>
          <Smile size={14} /> Mood: {mood?.name}
        </p>
        <p>
          <Globe size={14} /> Country: {country?.name}
        </p>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => handleDownload(capsule.id, capsule.title)} className='download-btn'>Dounload ZIP</button>
          <button onClick={handleToggle} className="close-btn">Close</button>
        </div>
      </Modal>
    </>
  );
};

export default CapsuleCard;