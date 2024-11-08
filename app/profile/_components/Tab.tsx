// Tab.tsx
"use client";

interface TabProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isSelected, onClick }) => (
  <button
    className={`px-4 py-2 ${isSelected ? "text-white border-b-2 border-white" : "text-gray-500"}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tab;
