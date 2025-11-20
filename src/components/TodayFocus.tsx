import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';
import { StorageService } from '../services/StorageService';
import { format } from 'date-fns';
import './TodayFocus.css';

interface TodayFocusProps {
  isOpen: boolean;
  onClose: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const TodayFocus: React.FC<TodayFocusProps> = ({ isOpen, onClose, onEventClick }) => {
  const [todayEvents, setTodayEvents] = useState<CalendarEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  const loadEvents = async () => {
    const allEvents = await StorageService.getAllEvents();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const todayList = allEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= today && eventDate < tomorrow;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const upcomingList = allEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= tomorrow;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).slice(0, 5);

    setTodayEvents(todayList);
    setUpcomingEvents(upcomingList);
  };

  const getDaysUntil = (date: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const days = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '明天';
    if (days === 2) return '后天';
    return `${days}天后`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="focus-overlay" onClick={onClose}></div>
      <div className={`today-focus ${isOpen ? 'open' : ''}`}>
        <div className="focus-header">
          <h3>🎯 今日聚焦</h3>
          <button className="focus-close" onClick={onClose}>×</button>
        </div>

        <div className="focus-content">
          <div className="focus-section">
            <div className="section-title">
              <span>📅 今日事件</span>
              <span className="event-count">{todayEvents.length}</span>
            </div>
            {todayEvents.length === 0 ? (
              <div className="empty-message">
                <span className="empty-icon">✨</span>
                <p>今天暂无安排</p>
              </div>
            ) : (
              <div className="event-list">
                {todayEvents.map(event => (
                  <div
                    key={event.id}
                    className="focus-event"
                    style={{ borderLeftColor: event.color || '#667eea' }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="event-time">
                      {format(new Date(event.startDate), 'HH:mm')}
                    </div>
                    <div className="event-info">
                      <div className="event-title">{event.title}</div>
                      {event.location && (
                        <div className="event-location">📍 {event.location}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="focus-section">
            <div className="section-title">
              <span>⏰ 即将到来</span>
              <span className="event-count">{upcomingEvents.length}</span>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="empty-message">
                <span className="empty-icon">🎉</span>
                <p>暂无即将到来的事件</p>
              </div>
            ) : (
              <div className="event-list">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className="focus-event upcoming"
                    style={{ borderLeftColor: event.color || '#667eea' }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="event-badge">
                      {getDaysUntil(new Date(event.startDate))}
                    </div>
                    <div className="event-info">
                      <div className="event-title">{event.title}</div>
                      <div className="event-date">
                        {format(new Date(event.startDate), 'MM月dd日 HH:mm')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
