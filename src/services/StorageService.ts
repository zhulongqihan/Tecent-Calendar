import { CalendarEvent } from '../types';

const STORAGE_KEY = 'calendar_events';

export class StorageService {
  // 获取所有事件
  static async getAllEvents(): Promise<CalendarEvent[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const events = JSON.parse(data);
      // 将字符串日期转换回Date对象
      return events.map((event: any) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
      }));
    } catch (error) {
      console.error('获取事件失败:', error);
      return [];
    }
  }

  // 保存事件
  static async saveEvent(event: CalendarEvent): Promise<void> {
    try {
      const events = await this.getAllEvents();
      const index = events.findIndex(e => e.id === event.id);
      
      if (index >= 0) {
        events[index] = event;
      } else {
        events.push(event);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('保存事件失败:', error);
      throw error;
    }
  }

  // 删除事件
  static async deleteEvent(id: string): Promise<void> {
    try {
      const events = await this.getAllEvents();
      const filtered = events.filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('删除事件失败:', error);
      throw error;
    }
  }

  // 获取单个事件
  static async getEvent(id: string): Promise<CalendarEvent | null> {
    try {
      const events = await this.getAllEvents();
      return events.find(e => e.id === id) || null;
    } catch (error) {
      console.error('获取事件失败:', error);
      return null;
    }
  }

  // 清空所有事件
  static async clearAllEvents(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('清空事件失败:', error);
      throw error;
    }
  }

  // 导入事件（用于iCal导入）
  static async importEvents(events: CalendarEvent[]): Promise<void> {
    try {
      const existingEvents = await this.getAllEvents();
      const allEvents = [...existingEvents, ...events];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allEvents));
    } catch (error) {
      console.error('导入事件失败:', error);
      throw error;
    }
  }
}
