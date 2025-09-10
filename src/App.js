import React from 'react';
import './index.css';

function App() {
  const themes = [
    {
      title: "Girls' Night",
      desc: 'Sip and paint with your besties.',
      color: 'bg-pink-100',
      button: 'bg-pink-400 hover:bg-pink-500',
      img: 'https://img.icons8.com/external-flat-juicy-fish/100/external-painting-art-flat-flat-juicy-fish.png',
    },
    {
      title: "Couples' Night",
      desc: 'Romantic clay, paint, and music night.',
      color: 'bg-red-100',
      button: 'bg-red-400 hover:bg-red-500',
      img: 'https://img.icons8.com/color/96/love-painting.png',
    },
    {
      title: 'Family Fun',
      desc: 'Create, laugh, and bond together.',
      color: 'bg-blue-100',
      button: 'bg-blue-400 hover:bg-blue-500',
      img: 'https://img.icons8.com/color/96/family.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-pink-50 to-yellow-50 font-sans">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-10">
          <img src="https://img.icons8.com/color/96/paint-palette.png" alt="ArtDrop" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-deep">ArtDrop: Curated Art Experiences</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div key={idx} className={`rounded-2xl shadow-lg ${theme.color} p-6 hover:shadow-2xl transition`}>
              <img src={theme.img} alt={theme.title} className="w-full h-40 object-contain mb-4" />
              <h2 className="text-2xl font-semibold mb-1">{theme.title}</h2>
              <p className="text-gray-700 text-sm mb-4">{theme.desc}</p>
              <button className={`text-white px-4 py-2 rounded-full text-sm ${theme.button}`}>
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
