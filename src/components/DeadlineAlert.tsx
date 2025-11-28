import React, { useMemo } from 'react';
import { CalendarEvent } from '../types';

interface DeadlineAlertProps {
  events: CalendarEvent[];
}

export const DeadlineAlert: React.FC<DeadlineAlertProps> = ({ events }) => {
  const urgentEvent = useMemo(() => {
    const now = new Date();
    // 筛选未来的任务
    const futureEvents = events.filter(e => new Date(e.endDate) > now);
    
    // 按结束时间排序
    futureEvents.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    
    // 取最近的一个
    if (futureEvents.length > 0) {
      const event = futureEvents[0];
      const diffTime = new Date(event.endDate).getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // 只有 3 天内的才算高危
      if (diffDays <= 7) {
        return { event, days: diffDays };
      }
    }
    return null;
  }, [events]);

  if (!urgentEvent) {
    return (
      <div className="cyber-card" style={{ padding: '15px', marginBottom: '20px', border: '1px solid var(--cyber-primary)' }}>
        <h4 style={{ color: 'var(--cyber-primary)', marginTop: 0, display: 'flex', justifyContent: 'space-between' }}>
          <span>🛡️ 安全状态</span>
          <span style={{ fontSize: '10px' }}>ALL CLEAR</span>
        </h4>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>
          当前无高危任务，系统运行平稳。
        </div>
      </div>
    );
  }

  const { event, days } = urgentEvent;
  const isDanger = days <= 2;

  return (
    <div className="cyber-card" style={{ 
      padding: '15px', 
      marginBottom: '20px',
      border: isDanger ? '1px solid var(--cyber-danger)' : '1px solid var(--cyber-warning)',
      boxShadow: isDanger ? '0 0 10px rgba(255, 0, 60, 0.2)' : 'none'
    }}>
      <h4 style={{ 
        color: isDanger ? 'var(--cyber-danger)' : 'var(--cyber-warning)', 
        marginTop: 0, 
        display: 'flex', 
        justifyContent: 'space-between' 
      }}>
        <span>{isDanger ? '⚠️ 高危任务警告' : '⚡ 临近任务提醒'}</span>
        <span style={{ fontSize: '10px' }}>DEADLINE</span>
      </h4>
      <div style={{ 
        fontSize: '18px', 
        fontFamily: 'monospace', 
        fontWeight: 'bold', 
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {event.title}
      </div>
      <div style={{ 
        color: isDanger ? 'var(--cyber-danger)' : 'var(--cyber-warning)', 
        fontSize: '14px', 
        marginTop: '5px',
        fontWeight: 'bold'
      }}>
        剩余时间: {days} 天
      </div>
    </div>
  );
};
