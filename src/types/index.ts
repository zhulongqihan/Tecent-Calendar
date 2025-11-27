// 事件类型定义
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  reminderMinutes: number;
  color?: string;
  isAllDay?: boolean;
  tags?: string[]; // 标签数组，例如: ['work', 'important']
  isExternal?: boolean; // 是否为外部订阅事件（只读）
}

// 视图类型
export type ViewType = 'month' | 'week' | 'day' | 'agenda';

// 提醒选项（分钟）
export const REMINDER_OPTIONS = [
  { label: '事件发生时', value: 0 },
  { label: '提前5分钟', value: 5 },
  { label: '提前15分钟', value: 15 },
  { label: '提前30分钟', value: 30 },
  { label: '提前1小时', value: 60 },
  { label: '提前2小时', value: 120 },
  { label: '提前1天', value: 1440 },
  { label: '提前1周', value: 10080 },
];
