import React, { useMemo } from 'react';
import { CalendarEvent } from '../types';
import './ActivityHeatmap.css';

interface ActivityHeatmapProps {
  events: CalendarEvent[];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ events }) => {
  // 计算最近 16 周 (约4个月) 的数据
  const weeks = 16;
  const days = weeks * 7;
  
  const data = useMemo(() => {
    const today = new Date();
    // 将时间归零
    today.setHours(0, 0, 0, 0);
    
    // 生成日期网格
    const grid = [];
    // 从今天往前推 days 天
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      
      // 统计当天的任务数
      const count = events.filter(e => {
        const eDate = new Date(e.startDate);
        return eDate.toDateString() === dateStr;
      }).length;

      grid.push({ date: d, count });
    }
    return grid;
  }, [events]);

  // 获取颜色等级
  const getColorClass = (count: number) => {
    if (count === 0) return 'level-0';
    if (count <= 2) return 'level-1';
    if (count <= 4) return 'level-2';
    if (count <= 6) return 'level-3';
    return 'level-4';
  };

  // 按周分组渲染 (列优先布局)
  const weeksData = [];
  for (let i = 0; i < weeks; i++) {
    weeksData.push(data.slice(i * 7, (i + 1) * 7));
  }

  return (
    <div className="activity-heatmap cyber-card">
      <h4 className="heatmap-title">活跃度记录 (ACTIVITY LOG)</h4>
      <div className="heatmap-grid">
        {weeksData.map((week, wIndex) => (
          <div key={wIndex} className="heatmap-col">
            {week.map((day, dIndex) => (
              <div 
                key={dIndex}
                className={`heatmap-cell ${getColorClass(day.count)}`}
                title={`${day.date.toLocaleDateString()}: ${day.count} 任务`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>LESS</span>
        <div className="level-0"></div>
        <div className="level-1"></div>
        <div className="level-2"></div>
        <div className="level-3"></div>
        <div className="level-4"></div>
        <span>MORE</span>
      </div>
    </div>
  );
};
