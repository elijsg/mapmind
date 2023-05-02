import React, { FormEvent } from 'react';

interface PopupProps {
  userName: string;
  userEmail: string;
  setUserName: (value: string) => void;
  setUserEmail: (value: string) => void;
  submitForm: () => void;
  setShowPopup: (value: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ userName, userEmail, setUserName, setUserEmail, submitForm, setShowPopup }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
    setShowPopup(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Enter your name and email</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            className="bg-gray-100 border border-gray-200 rounded px-4 py-1 w-full mt-2"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="userEmail" className="mt-4">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            className="bg-gray-100 border border-gray-200 rounded px-4 py-1 w-full mt-2"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mt-4">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
