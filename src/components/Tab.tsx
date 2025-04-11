import React from "react";
import "./Tab.css";

const Tab = ({ tab, isActive, isPinned, onClick }) => {
  return (
    <div
      className={`tab ${isActive ? "active" : ""} ${isPinned ? "pinned" : ""}`}
      onClick={() => onClick(tab.id)}
      style={{
        background: isPinned ? "#F4F7F9" : "white",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "8px 12px",
        cursor: "pointer",
      }}
    >
      <span className="tab-name">{tab.name}</span>
    </div>
  );
};

export default Tab;
