import React from 'react';
import './PlayerProfile.css';

interface PlayerProfileProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  focusTime: number; // 总专注时长（分钟）
  achievements?: string[]; // 成就列表
  totalTasks: number; // 真实任务数
  streakDays: number; // 连续打卡天数
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({ 
  level, xp, nextLevelXp, focusTime, achievements = [], totalTasks, streakDays 
}) => {
  const progressPercent = Math.min(100, (xp / nextLevelXp) * 100);

  return (
    <div className="player-profile cyber-card">
      <div className="avatar-container">
        <div className="avatar-glitch"></div>
        {/* 更换为赛博机器人风格头像 */}
        <img 
          src="https://api.dicebear.com/7.x/bottts/svg?seed=CyberCommander&backgroundColor=transparent" 
          alt="Avatar" 
          className="avatar-img" 
        />
        <div className="level-badge">Lv.{level}</div>
      </div>
      
      <div className="player-info">
        <h3 className="player-name">指挥官</h3>
        <div className="player-title">Lv.{level} 系统管理员</div>
      </div>

      {/* 勋章墙 */}
      {achievements.length > 0 && (
        <div className="badge-wall" style={{width: '100%', marginBottom: '15px', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center'}}>
          {achievements.map(badge => (
            <span key={badge} title={badge} style={{fontSize: '16px', cursor: 'help'}}>
              {badge.includes('早起') ? '🌅' : badge.includes('狂') ? '🔥' : badge.includes('潜') ? '🌊' : '🏅'}
            </span>
          ))}
        </div>
      )}

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
          <div className="stat-value">{totalTasks}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">连续打卡</div>
          <div className="stat-value">{streakDays}天</div>
        </div>
      </div>
    </div>
  );
};
