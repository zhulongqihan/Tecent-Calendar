import React from 'react';
import './PlayerProfile.css';

interface PlayerProfileProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  focusTime: number; // 总专注时长（分钟）
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({ level, xp, nextLevelXp, focusTime }) => {
  const progressPercent = Math.min(100, (xp / nextLevelXp) * 100);

  return (
    <div className="player-profile cyber-card">
      <div className="avatar-container">
        <div className="avatar-glitch"></div>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="avatar-img" />
        <div className="level-badge">Lv.{level}</div>
      </div>
      
      <div className="player-info">
        <h3 className="player-name">指挥官</h3>
        <div className="player-title">Lv.{level} 系统管理员</div>
      </div>

      <div className="xp-container">
        <div className="xp-info">
          <span>经验值 (EXP)</span>
          <span>{xp} / {nextLevelXp}</span>
        </div>
        <div className="xp-bar-bg">
          <div className="xp-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">专注时长</div>
          <div className="stat-value">{Math.floor(focusTime / 60)}小时</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">任务完成</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">连续打卡</div>
          <div className="stat-value">5天</div>
        </div>
      </div>
    </div>
  );
};
