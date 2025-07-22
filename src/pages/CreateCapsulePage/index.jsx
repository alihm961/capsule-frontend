import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../api/axios';
import useMoods from '../../hooks/useMoods'; 
import './style.css';

const CreateCapsulePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    revealDate: new Date().toISOString().split('T')[0],
    mood_id: '',
    country: '',
    privacy: 'private',
    surpriseMode: false,
    image: null,
    audio: null,
  });

  const { moods, loading, error } = useMoods();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageBase64 = formData.image ? await convertToBase64(formData.image) : null;
      const audioBase64 = formData.audio ? await convertToBase64(formData.audio) : null;

      const payload = {
        title: formData.title,
        message: formData.message,
        image: imageBase64,
        audio: audioBase64,
        mood_id: formData.mood_id,
        is_public: formData.privacy === 'public',
        is_surprise: formData.surpriseMode,
        reveal_at: formData.revealDate || null,
      };

      const token = localStorage.getItem('token');
      await api.post('/capsules/create', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage('Capsule created!');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setErrorMessage('Error creating capsule');
    }
  };

  return (
    <DashboardLayout>
      <div className="create-capsule-page">
        <h1>Create New Capsule</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="capsule-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            value={formData.message}
            onChange={handleChange}
          />
          <input
            type="date"
            name="revealDate"
            value={formData.revealDate}
            onChange={handleChange}
          />

          <select
            name="mood_id"
            required
            value={formData.mood_id}
            onChange={handleChange}
          >
            <option value="">Select Mood</option>
            {moods.map((mood) => (
              <option key={mood.id} value={mood.id}>
                {mood.name}
              </option>
            ))}
          </select>

          <div className="privacy-options">
            <label>
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={formData.privacy === 'private'}
                onChange={handleChange}
              />
              Private
            </label>
            <label>
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={formData.privacy === 'public'}
                onChange={handleChange}
              />
              Public
            </label>
          </div>

          <label>
            <input
              type="checkbox"
              name="surpriseMode"
              checked={formData.surpriseMode}
              onChange={handleChange}
            />
            Surprise Mode
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleChange}
          />

          <button type="submit">Save Capsule</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCapsulePage;