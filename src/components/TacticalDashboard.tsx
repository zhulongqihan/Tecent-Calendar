import React, { useEffect, useState } from 'react';
import { CyberClock } from './CyberClock';
import './TacticalDashboard.css';

interface TacticalDashboardProps {
  onUnlock: () => void;
}

export const TacticalDashboard: React.FC<TacticalDashboardProps> = ({ onUnlock }) => {
  const [dots, setDots] = useState<string>('.');

  // 模拟加载点动画
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 监听鼠标移动以解锁
  useEffect(() => {
    const handleActivity = () => {
      onUnlock();
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [onUnlock]);

  return (
    <div className="tactical-dashboard">
      <div className="dashboard-overlay"></div>
      
      <div className="dashboard-center">
        <div className="dashboard-clock-container">
          <CyberClock />
        </div>
        
        <div className="dashboard-radar-ring"></div>
        <div className="dashboard-radar-scan"></div>
        
        <h1 className="dashboard-title">
          SYSTEM STANDBY
          <span className="dashboard-dots">{dots}</span>
        </h1>
        
        <div className="dashboard-status">
          <div>SECURE MODE: ACTIVE</div>
          <div>NETWORK: MONITORING</div>
          <div>THREAT LEVEL: LOW</div>
        </div>
      </div>

      <div className="dashboard-grid"></div>
    </div>
  );
};
