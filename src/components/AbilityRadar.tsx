import React, { useMemo } from 'react';
import { CalendarEvent } from '../types';
import './AbilityRadar.css';

interface AbilityRadarProps {
  events: CalendarEvent[];
}

export const AbilityRadar: React.FC<AbilityRadarProps> = ({ events }) => {
  // 计算五维属性
  const stats = useMemo(() => {
    const scores = {
      INT: 10, // 智力 (学习, 工作)
      STR: 10, // 力量 (运动)
      CHR: 10, // 魅力 (社交, 娱乐)
      VIT: 10, // 耐力 (生活, 琐事)
      MND: 10  // 精神 (其他)
    };

    // 筛选最近30天的事件
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentEvents = events.filter(e => 
      new Date(e.endDate) > thirtyDaysAgo && new Date(e.endDate) <= now
    );

    recentEvents.forEach(e => {
      // 计算时长 (小时)
      const duration = (new Date(e.endDate).getTime() - new Date(e.startDate).getTime()) / (1000 * 60 * 60);
      const hours = Math.max(0.5, duration); // 最小0.5小时

      // 根据 Tag 或 标题 归类
      const tagStr = (e.tags || []).join(' ').toLowerCase() + ' ' + e.title.toLowerCase();
      
      if (tagStr.includes('学习') || tagStr.includes('代码') || tagStr.includes('作业') || tagStr.includes('work') || tagStr.includes('study')) {
        scores.INT += hours * 5;
      } else if (tagStr.includes('运动') || tagStr.includes('健身') || tagStr.includes('sport') || tagStr.includes('gym')) {
        scores.STR += hours * 8; // 运动权重高一点
      } else if (tagStr.includes('社交') || tagStr.includes('聚会') || tagStr.includes('social') || tagStr.includes('date')) {
        scores.CHR += hours * 5;
      } else if (tagStr.includes('生活') || tagStr.includes('购物') || tagStr.includes('life')) {
        scores.VIT += hours * 3;
      } else {
        scores.MND += hours * 2; // 娱乐/休息
      }
    });

    // 归一化到 0-100，设置上限
    const normalize = (val: number) => Math.min(100, Math.floor(val));
    
    return [
      { label: 'INT', value: normalize(scores.INT), full: '智力' },
      { label: 'STR', value: normalize(scores.STR), full: '力量' },
      { label: 'CHR', value: normalize(scores.CHR), full: '魅力' },
      { label: 'MND', value: normalize(scores.MND), full: '精神' },
      { label: 'VIT', value: normalize(scores.VIT), full: '耐力' },
    ];
  }, [events]);

  // SVG 参数
  const size = 160;
  const center = size / 2;
  const radius = size / 2 - 30; // 留出文字空间
  const angleStep = (Math.PI * 2) / 5;

  // 计算顶点坐标
  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2; // 从正上方开始
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // 生成雷达多边形路径
  const radarPath = stats.map((s, i) => getPoint(s.value, i)).join(' ');
  
  // 生成背景网格 (3层)
  const gridPaths = [100, 66, 33].map(percent => {
    return stats.map((_, i) => getPoint(percent, i)).join(' ');
  });

  return (
    <div className="ability-radar cyber-card">
      <h4 className="radar-title">能力分布图 (STATS)</h4>
      <div className="radar-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* 背景网格 */}
          {gridPaths.map((path, i) => (
            <polygon 
              key={i} 
              points={path} 
              className="radar-grid"
            />
          ))}
          
          {/* 轴线 */}
          {stats.map((_, i) => {
            const endPoint = getPoint(100, i);
            return (
              <line 
                key={i}
                x1={center} y1={center}
                x2={endPoint.split(',')[0]} y2={endPoint.split(',')[1]}
                className="radar-axis"
              />
            );
          })}

          {/* 数据区域 */}
          <polygon points={radarPath} className="radar-area" />
          
          {/* 顶点标记 */}
          {stats.map((s, i) => {
            const [x, y] = getPoint(s.value, i).split(',');
            return (
              <circle 
                key={i} 
                cx={x} cy={y} 
                r="3" 
                className="radar-point"
              />
            );
          })}

          {/* 文字标签 */}
          {stats.map((s, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 15;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            return (
              <text 
                key={i} 
                x={x} y={y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="radar-label"
              >
                {s.label}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* 属性数值列表 */}
      <div className="radar-stats-list">
        {stats.map(s => (
          <div key={s.label} className="stat-row">
            <span className="stat-name">{s.label}</span>
            <div className="stat-bar-bg">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${s.value}%`, opacity: s.value / 100 + 0.3 }}
              ></div>
            </div>
            <span className="stat-num">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
