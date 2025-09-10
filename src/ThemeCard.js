import React from "react";

const ThemeCard = ({ theme, onClick }) => (
  <div
    className="cursor-pointer hover:shadow-2xl transition-all bg-white rounded-2xl p-6 flex flex-col items-center justify-between text-center border border-gray-200"
    onClick={() => onClick(theme)}
  >
    <img
      src={theme.image}
      alt={theme.name}
      onError={(e) => (e.target.style.display = "none")}
      className="w-20 h-20 mb-4"
    />
    <h3 className="text-xl font-bold text-purple-700 mb-1">{theme.name}</h3>
    <p className="text-sm text-gray-600 mb-4">{theme.description}</p>
    <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition">
      View Supplies
    </button>
  </div>
);

export default ThemeCard;
