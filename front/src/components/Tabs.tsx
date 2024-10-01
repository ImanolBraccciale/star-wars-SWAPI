"use client"
import { useState } from "react";
// Definición del componente de Tabs
const Tabs = ({ tabs }: { tabs: { label: string; content: JSX.Element }[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Contenedor de las etiquetas de las Tabs */}
      <div style={styles.tabList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            style={activeTab === index ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del Tab Activo */}
      <div style={styles.tabContent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

const styles = {
  tabList: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0",
    borderBottom: "2px solid #ccc",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  activeTab: {
    padding: "10px 20px",
    cursor: "pointer",
    borderBottom: "2px solid #0070f3",
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  tabContent: {
    padding: "20px 0",
  },
};

export default Tabs;
