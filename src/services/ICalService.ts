import ICAL from 'ical.js';
import { CalendarEvent } from '../types';

export class ICalService {
  // 导出为iCal格式
  static exportToICal(events: CalendarEvent[]): string {
    const comp = new ICAL.Component(['vcalendar', [], []]);
    comp.updatePropertyWithValue('prodid', '-//Calendar PWA//EN');
    comp.updatePropertyWithValue('version', '2.0');

    events.forEach(event => {
      const vevent = new ICAL.Component('vevent');
      const ev = new ICAL.Event(vevent);
      
      ev.uid = event.id;
      ev.summary = event.title;
      ev.description = event.description;
      ev.location = event.location;
      ev.startDate = ICAL.Time.fromJSDate(event.startDate, false);
      ev.endDate = ICAL.Time.fromJSDate(event.endDate, false);
      
      comp.addSubcomponent(vevent);
    });

    return comp.toString();
  }

  // 从iCal格式导入
  static importFromICal(icalString: string): CalendarEvent[] {
    try {
      const jcalData = ICAL.parse(icalString);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      return vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        
        return {
          id: event.uid || `imported_${Date.now()}_${Math.random()}`,
          title: event.summary || '无标题',
          description: event.description || '',
          location: event.location || '',
          startDate: event.startDate.toJSDate(),
          endDate: event.endDate.toJSDate(),
          reminderMinutes: 0,
          color: '#3788d8',
        };
      });
    } catch (error) {
      console.error('解析iCal失败:', error);
      throw new Error('无效的iCal文件格式');
    }
  }

  // 下载iCal文件
  static downloadICal(events: CalendarEvent[], filename: string = 'calendar.ics'): void {
    const icalString = this.exportToICal(events);
    const blob = new Blob([icalString], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // 从网络URL获取iCal
  static async fetchICalFromUrl(url: string): Promise<CalendarEvent[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
      const icalString = await response.text();
      return this.importFromICal(icalString);
    } catch (error) {
      console.error('从URL获取iCal失败:', error);
      throw error;
    }
  }
}
