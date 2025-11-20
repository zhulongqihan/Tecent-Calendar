import React from 'react';
import './QuickAdd.css';

interface QuickAddProps {
  onQuickAdd: () => void;
}

export const QuickAdd: React.FC<QuickAddProps> = ({ onQuickAdd }) => {
  return (
    <button className="quick-add-btn" onClick={onQuickAdd} title="快速添加事件">
      <span className="plus-icon">+</span>
    </button>
  );
};
