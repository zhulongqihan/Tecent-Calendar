import React from 'react';
import './TagFilter.css';

const TAGS = [
  { id: 'all', name: '全部', color: '#667eea', icon: '📋' },
  { id: 'work', name: '工作', color: '#f5576c', icon: '💼' },
  { id: 'study', name: '学习', color: '#4facfe', icon: '📚' },
  { id: 'life', name: '生活', color: '#43e97b', icon: '🏠' },
  { id: 'sport', name: '运动', color: '#fa709a', icon: '⚽' },
  { id: 'entertainment', name: '娱乐', color: '#a8edea', icon: '🎮' },
];

interface TagFilterProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ selectedTag, onTagChange }) => {
  return (
    <div className="tag-filter">
      {TAGS.map(tag => (
        <button
          key={tag.id}
          className={`tag-btn ${selectedTag === tag.id ? 'active' : ''}`}
          style={{
            '--tag-color': tag.color,
            backgroundColor: selectedTag === tag.id ? tag.color : 'transparent',
            borderColor: tag.color,
            color: selectedTag === tag.id ? 'white' : tag.color,
          } as React.CSSProperties}
          onClick={() => onTagChange(tag.id)}
        >
          <span className="tag-icon">{tag.icon}</span>
          <span className="tag-name">{tag.name}</span>
        </button>
      ))}
    </div>
  );
};

export { TAGS };
