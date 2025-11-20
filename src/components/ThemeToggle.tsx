import React from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} title={isDark ? '切换到浅色模式' : '切换到深色模式'}>
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};
