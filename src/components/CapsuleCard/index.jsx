import React from 'react';
import './style.css';
import { Clock, Globe, Smile, Trash } from 'lucide-react';

const CapsuleCard = ({ capsule, onDelete, onOpen, showDelete = true }) => {
  if (!capsule) return null;

  const { title, reveal_at, mood, country, image_path } = capsule;

  const formattedDate = reveal_at
    ? new Date(reveal_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="capsule-card">
      {image_path && (
        <img
          src={image_path}
          alt={title || 'Capsule Image'}
          className="capsule-image"
        />
      )}

      <h3
        className="capsule-title"
        onClick={onOpen}
        role="button"
        tabIndex={0}
      >
        {title || 'Untitled Capsule'}
      </h3>

      <p className="capsule-info">
        <Clock size={14} /> Reveal Date: {formattedDate}
      </p>
      <p className="capsule-info">
        <Smile size={14} /> Mood: {mood?.name || 'Unknown'}
      </p>
      <p className="capsule-info">
        <Globe size={14} /> Country: {country?.name || 'Unknown'}
      </p>

      {showDelete && (
        <button className="delete-btn" onClick={onDelete}>
          <Trash size={14} /> Delete
        </button>
      )}
    </div>
  );
};

export default CapsuleCard;