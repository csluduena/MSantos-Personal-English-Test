import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default UserForm;