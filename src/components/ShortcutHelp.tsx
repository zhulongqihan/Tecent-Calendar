import React from 'react';
import './ShortcutHelp.css';

interface ShortcutHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: 'N', description: '创建新事件', icon: '✨' },
  { key: 'T', description: '查看今日聚焦', icon: '🎯' },
  { key: 'P', description: '打开番茄钟', icon: '🍅' },
  { key: 'S', description: '打开统计面板', icon: '📊' },
  { key: 'D', description: '切换深色模式', icon: '🌙' },
  { key: 'B', description: '切换粒子背景', icon: '✨' },
  { key: 'Esc', description: '关闭当前面板', icon: '❌' },
  { key: '?', description: '显示快捷键帮助', icon: '❓' },
];

export const ShortcutHelp: React.FC<ShortcutHelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="shortcut-overlay" onClick={onClose}>
      <div className="shortcut-panel" onClick={(e) => e.stopPropagation()}>
        <div className="shortcut-header">
          <h3>⌨️ 快捷键</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="shortcut-content">
          {SHORTCUTS.map((shortcut, index) => (
            <div key={index} className="shortcut-item">
              <div className="shortcut-icon">{shortcut.icon}</div>
              <div className="shortcut-info">
                <span className="shortcut-desc">{shortcut.description}</span>
              </div>
              <div className="shortcut-key">
                <kbd>{shortcut.key}</kbd>
              </div>
            </div>
          ))}
        </div>
        <div className="shortcut-footer">
          <p>💡 提示：按 <kbd>?</kbd> 随时查看快捷键</p>
        </div>
      </div>
    </div>
  );
};
