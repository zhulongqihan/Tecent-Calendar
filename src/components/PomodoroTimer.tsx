import React, { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isOpen, onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // 计时结束
          clearInterval(intervalRef.current!);
          setIsActive(false);
          handleTimerComplete();
        }
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isActive, minutes, seconds, mode]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      // 播放通知
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🍅 番茄钟', {
          body: '工作时间结束！休息一下吧～',
        });
      }
      
      // 切换到休息模式
      setMode('break');
      setMinutes(newCount % 4 === 0 ? 15 : 5);
      setSeconds(0);
    } else {
      // 播放通知
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🍅 番茄钟', {
          body: '休息结束！继续加油～',
        });
      }
      
      // 切换到工作模式
      setMode('work');
      setMinutes(25);
      setSeconds(0);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  const skipToBreak = () => {
    setIsActive(false);
    setMode('break');
    setMinutes(5);
    setSeconds(0);
  };

  const handleClose = () => {
    if (isActive) {
      if (window.confirm('计时进行中，确定要退出吗？')) {
        setIsActive(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const progress = mode === 'work' 
    ? ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100
    : ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100;

  if (!isOpen) return null;

  return (
    <div className="pomodoro-overlay" onClick={handleClose}>
      <div className="pomodoro-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pomodoro-header">
          <h3>🍅 番茄钟</h3>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="pomodoro-content">
          <div className="mode-indicator">
            <span className={mode === 'work' ? 'active' : ''}>💼 工作</span>
            <span className={mode === 'break' ? 'active' : ''}>☕ 休息</span>
          </div>

          <div className="timer-display">
            <svg className="progress-ring" width="260" height="260">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f093fb" />
                  <stop offset="100%" stopColor="#f5576c" />
                </linearGradient>
              </defs>
              <circle
                className="progress-ring-bg"
                cx="130"
                cy="130"
                r="115"
              />
              <circle
                className="progress-ring-progress"
                cx="130"
                cy="130"
                r="115"
                strokeDasharray={`${2 * Math.PI * 115}`}
                strokeDashoffset={`${2 * Math.PI * 115 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="timer-text">
              <div className="time">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="timer-label">{mode === 'work' ? '专注中' : '休息中'}</div>
            </div>
          </div>

          <div className="timer-controls">
            <button className="control-btn" onClick={toggleTimer}>
              {isActive ? '⏸️ 暂停' : '▶️ 开始'}
            </button>
            <button className="control-btn secondary" onClick={resetTimer}>
              🔄 重置
            </button>
            {mode === 'work' && (
              <button className="control-btn secondary" onClick={skipToBreak}>
                ⏭️ 跳过
              </button>
            )}
          </div>

          <div className="pomodoro-stats">
            <div className="stat-item">
              <div className="stat-label">今日完成</div>
              <div className="stat-value">{pomodoroCount} 🍅</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
