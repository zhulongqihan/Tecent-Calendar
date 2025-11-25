import React, { useState, useEffect } from 'react';
import './PomodoroWidget.css';

interface PomodoroWidgetProps {
  onFullMode: () => void;
}

export const PomodoroWidget: React.FC<PomodoroWidgetProps> = ({ onFullMode }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // 自动切换模式逻辑...简化版暂略
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-widget cyber-card">
      <div className="widget-header">
        <span className="widget-title">⚡ 专注终端</span>
        <button className="expand-btn" onClick={onFullMode}>[全屏模式]</button>
      </div>
      
      <div className={`widget-timer ${isActive ? 'active' : ''}`}>
        {formatTime(timeLeft)}
      </div>

      <div className="widget-status">
        系统状态: <span className={isActive ? 'status-active' : 'status-idle'}>
          {isActive ? '运行中' : '待机'}
        </span>
      </div>

      <div className="widget-controls">
        <button className="pomo-btn start" onClick={toggleTimer}>
          {isActive ? '暂停' : '启动'}
        </button>
        <button className="pomo-btn reset" onClick={resetTimer}>重置</button>
      </div>
    </div>
  );
};
