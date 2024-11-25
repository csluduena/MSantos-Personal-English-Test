import React from 'react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">¡Potenciá tu inglés!</h1>
        <h2 className="text-2xl text-blue-800 mb-8">¡Destacate en cada entrevista!</h2>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Iniciar Test
        </button>
      </div>
    </div>
  );
};

export default LandingPage;