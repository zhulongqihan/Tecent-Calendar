import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';
import './DailyBriefing.css';

interface DailyBriefingProps {
  events: CalendarEvent[];
  onClose: () => void;
}

export const DailyBriefing: React.FC<DailyBriefingProps> = ({ events, onClose }) => {
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  // 计算今日数据
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayEvents = events.filter(e => {
    const d = new Date(e.startDate);
    d.setHours(0,0,0,0);
    return d.getTime() === today.getTime();
  });
  
  // 寻找高危任务
  const urgentEvents = events.filter(e => {
    const end = new Date(e.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000; // 3天内
  });

  const lines = [
    `身份确认: 指挥官 (COMMANDER)`,
    `系统时间: ${new Date().toLocaleDateString()}`,
    `--------------------------------`,
    `今日任务: ${todayEvents.length} 个作战目标`,
    `高危警报: ${urgentEvents.length} 个任务临近 DEADLINE`,
    `系统状态: 在线`,
    `--------------------------------`,
    `"Stay sharp. Stay focused."`
  ];

  // 打字机效果
  useEffect(() => {
    let currentLineIndex = 0;
    let charIndex = 0;
    let currentText = '';
    
    const interval = setInterval(() => {
      if (currentLineIndex >= lines.length) {
        clearInterval(interval);
        setStep(2); // 完成
        return;
      }

      const line = lines[currentLineIndex];
      
      if (charIndex < line.length) {
        currentText += line[charIndex];
        setDisplayText(currentText);
        charIndex++;
      } else {
        currentText += '\n';
        setDisplayText(currentText);
        currentLineIndex++;
        charIndex = 0;
      }
    }, 30); // 打字速度

    return () => clearInterval(interval);
  }, [events]); // 依赖 events 确保数据加载后再播放

  const handleStart = () => {
    // 添加退出动画类名
    const el = document.querySelector('.daily-briefing');
    if (el) el.classList.add('closing');
    setTimeout(onClose, 800);
  };

  return (
    <div className="daily-briefing">
      <div className="briefing-content">
        <div className="briefing-header">
          <div className="scan-line"></div>
          TACTICAL BRIEFING // DAILY LOG
        </div>
        <pre className="briefing-text">{displayText}<span className="cursor">_</span></pre>
        
        {step === 2 && (
          <button className="briefing-btn" onClick={handleStart}>
            [ INITIALIZE SYSTEM ]
          </button>
        )}
      </div>
    </div>
  );
};
