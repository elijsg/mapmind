import React, { useState } from 'react';
import axios from 'axios';

interface EmailPopupProps {
  onClose: () => void;
}

export const EmailPopup: React.FC<EmailPopupProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/save-user-data', {
        name,
        email,
      });

      if (response.status === 200) {
        console.log('User data saved successfully');
      } else {
        console.log('Error saving user data');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }

    onClose();
  };

  return (
    <div className="email-popup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-100
         mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-100 mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};
