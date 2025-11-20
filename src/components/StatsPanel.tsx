import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';
import { StorageService } from '../services/StorageService';
import './StatsPanel.css';

interface StatsPanelProps {
  onClose: () => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ onClose }) => {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    upcoming: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const events = await StorageService.getAllEvents();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayEvents = events.filter(e => {
      const eventDate = new Date(e.startDate);
      return eventDate >= today && eventDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
    });

    const weekEvents = events.filter(e => new Date(e.startDate) >= weekStart);
    const monthEvents = events.filter(e => new Date(e.startDate) >= monthStart);
    const upcomingEvents = events.filter(e => new Date(e.startDate) > now);

    setStats({
      total: events.length,
      today: todayEvents.length,
      thisWeek: weekEvents.length,
      thisMonth: monthEvents.length,
      upcoming: upcomingEvents.length,
    });
  };

  return (
    <div className="stats-overlay" onClick={onClose}>
      <div className="stats-panel" onClick={(e) => e.stopPropagation()}>
        <div className="stats-header">
          <h2>📊 事件统计</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="stats-content">
          <div className="stat-card stat-total">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-label">总事件</div>
              <div className="stat-value">{stats.total}</div>
            </div>
          </div>

          <div className="stat-card stat-today">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-label">今日事件</div>
              <div className="stat-value">{stats.today}</div>
            </div>
          </div>

          <div className="stat-card stat-week">
            <div className="stat-icon">📆</div>
            <div className="stat-info">
              <div className="stat-label">本周事件</div>
              <div className="stat-value">{stats.thisWeek}</div>
            </div>
          </div>

          <div className="stat-card stat-month">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-label">本月事件</div>
              <div className="stat-value">{stats.thisMonth}</div>
            </div>
          </div>

          <div className="stat-card stat-upcoming">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <div className="stat-label">即将到来</div>
              <div className="stat-value">{stats.upcoming}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
