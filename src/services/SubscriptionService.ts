import { CalendarEvent } from '../types';

export interface Subscription {
  id: string;
  name: string;
  url: string;
  color: string;
  lastUpdated?: number;
}

const SUBS_STORAGE_KEY = 'calendar_subscriptions';

export class SubscriptionService {
  // 获取所有订阅源
  static getSubscriptions(): Subscription[] {
    const data = localStorage.getItem(SUBS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // 添加订阅源
  static addSubscription(sub: Subscription): void {
    const subs = this.getSubscriptions();
    subs.push(sub);
    localStorage.setItem(SUBS_STORAGE_KEY, JSON.stringify(subs));
  }

  // 删除订阅源
  static removeSubscription(id: string): void {
    const subs = this.getSubscriptions().filter(s => s.id !== id);
    localStorage.setItem(SUBS_STORAGE_KEY, JSON.stringify(subs));
  }

  // 获取所有订阅源的事件
  static async fetchAllSubscribedEvents(): Promise<CalendarEvent[]> {
    const subs = this.getSubscriptions();
    let allEvents: CalendarEvent[] = [];

    for (const sub of subs) {
      try {
        const events = await this.fetchAndParseIcal(sub);
        allEvents = [...allEvents, ...events];
      } catch (error) {
        console.error(`Failed to fetch subscription ${sub.name}:`, error);
      }
    }
    return allEvents;
  }

  // Fetch 并解析单个 iCal
  private static async fetchAndParseIcal(sub: Subscription): Promise<CalendarEvent[]> {
    try {
      // 注意：实际生产环境中，直接从浏览器 fetch 第三方 URL 可能会遇到 CORS 跨域问题
      // 这里假设 URL 支持 CORS，或者使用 CORS 代理
      const response = await fetch(sub.url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const icalData = await response.text();
      return this.parseICS(icalData, sub);
    } catch (error) {
      console.error(`Error fetching ICS from ${sub.url}:`, error);
      return [];
    }
  }

  // 简单的 ICS 解析器
  private static parseICS(icsContent: string, sub: Subscription): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    const lines = icsContent.split(/\r\n|\n|\r/);
    
    let currentEvent: any = null;
    let inEvent = false;

    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        inEvent = true;
        currentEvent = {};
      } else if (line.startsWith('END:VEVENT')) {
        inEvent = false;
        if (currentEvent && currentEvent.summary && currentEvent.dtstart) {
          events.push({
            id: `sub_${sub.id}_${events.length}`,
            title: currentEvent.summary,
            description: `[${sub.name}] ${currentEvent.description || ''}`,
            location: currentEvent.location || '',
            startDate: this.parseDate(currentEvent.dtstart),
            endDate: currentEvent.dtend ? this.parseDate(currentEvent.dtend) : new Date(this.parseDate(currentEvent.dtstart).getTime() + 60*60*1000),
            reminderMinutes: 0, // 默认为0
            color: sub.color,
            isExternal: true, // 标记为外部事件
            tags: ['订阅']
          });
        }
        currentEvent = null;
      } else if (inEvent && currentEvent) {
        const [key, ...values] = line.split(':');
        const value = values.join(':');
        
        if (key.includes('SUMMARY')) currentEvent.summary = value;
        if (key.includes('DESCRIPTION')) currentEvent.description = value;
        if (key.includes('LOCATION')) currentEvent.location = value;
        if (key.includes('DTSTART')) currentEvent.dtstart = value;
        if (key.includes('DTEND')) currentEvent.dtend = value;
      }
    }

    return events;
  }

  // 解析 ICS 日期字符串 (e.g., 20231127T090000Z)
  private static parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    
    // 处理 YYYYMMDD 格式
    if (dateStr.length === 8) {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      return new Date(year, month, day);
    }

    // 处理 YYYYMMDDTHHmmSSZ 格式
    // 简单处理，不考虑复杂时区，默认为本地或 UTC
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    
    let hour = 0, minute = 0, second = 0;
    if (dateStr.includes('T')) {
      const timePart = dateStr.split('T')[1];
      hour = parseInt(timePart.substring(0, 2));
      minute = parseInt(timePart.substring(2, 4));
      second = parseInt(timePart.substring(4, 6));
    }

    // 如果是 UTC (Z结尾)，需要转换时区？这里简化直接返回
    return new Date(year, month, day, hour, minute, second);
  }
}
