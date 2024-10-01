"use client";

import { useState } from "react";

// Lógica de los tabs
const Tabs = ({ tabs }: { tabs: { label: string; content: JSX.Element }[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Contenedor de las etiquetas de las Tabs */}
      <div className="flex justify-around py-2 border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-5 cursor-pointer font-bold transition-colors 
              ${activeTab === index 
                ? "border-b-2 border-blue-500" // Tab seleccionada
                : "bg-transparent hover:bg-gray-200 hover:bg-opacity-50" // Hover gris transparente
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del Tab Activo */}
      <div className="py-5">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
