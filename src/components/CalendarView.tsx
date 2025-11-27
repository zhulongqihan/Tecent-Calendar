import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, ViewType } from '../types';
import { StorageService } from '../services/StorageService';
import { SubscriptionService } from '../services/SubscriptionService';
import { LunarUtils } from '../utils/lunarUtils';
import './CalendarView.css';

moment.locale('zh-cn');
const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot: (start: Date, end: Date) => void;
  refreshTrigger: number;
  selectedTag?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onSelectEvent,
  onSelectSlot,
  refreshTrigger,
  selectedTag = 'all',
}) => {
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [showLunar, setShowLunar] = useState(true);

  // 加载事件
  const loadEvents = useCallback(async () => {
    // 1. 获取本地存储的事件
    const localEvents = await StorageService.getAllEvents();
    
    // 2. 获取订阅的外部事件
    const subscribedEvents = await SubscriptionService.fetchAllSubscribedEvents();
    
    // 3. 合并
    const combinedEvents = [...localEvents, ...subscribedEvents];
    
    console.log('Loaded events:', combinedEvents.length); // Debug
    setAllEvents(combinedEvents);
  }, []);

  // 根据标签过滤事件
  useEffect(() => {
    if (selectedTag === 'all') {
      setEvents(allEvents);
    } else {
      const filtered = allEvents.filter(event => {
        // 优先使用tags字段
        if (event.tags && event.tags.includes(selectedTag)) {
          return true;
        }
        // 兼容旧方式：关键词匹配
        return event.description?.toLowerCase().includes(`#${selectedTag}`) ||
               event.title?.toLowerCase().includes(selectedTag);
      });
      setEvents(filtered);
    }
  }, [selectedTag, allEvents]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents, refreshTrigger]);

  // 事件样式
  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || '#3788d8',
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0',
        display: 'block',
      },
    };
  };

  // 自定义日期头部显示（包含农历）
  const CustomDateHeader = ({ date, label }: { date: Date; label: string }) => {
    const lunarText = showLunar ? LunarUtils.getLunarText(date) : '';
    
    return (
      <div className="custom-date-header">
        <span className="date-number">{label}</span>
        {showLunar && (
          <span className="lunar-text">{lunarText}</span>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-toolbar">
        <button onClick={() => setShowLunar(!showLunar)}>
          {showLunar ? '隐藏农历' : '显示农历'}
        </button>
      </div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{ height: '100%' }}
        view={view}
        onView={setView as any}
        date={date}
        onNavigate={setDate}
        onSelectEvent={onSelectEvent}
        onSelectSlot={({ start, end }: { start: Date; end: Date }) => onSelectSlot(start, end)}
        selectable
        eventPropGetter={eventStyleGetter}
        components={{
          month: {
            dateHeader: CustomDateHeader,
          },
        }}
        messages={{
          today: '今天',
          previous: '上一页',
          next: '下一页',
          month: '月',
          week: '周',
          day: '日',
          agenda: '日程',
          date: '日期',
          time: '时间',
          event: '事件',
          noEventsInRange: '此时间段内没有事件',
          showMore: (total: number) => `+ 更多 (${total})`,
        }}
      />
    </div>
  );
};
