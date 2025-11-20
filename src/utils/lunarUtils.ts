// @ts-ignore
import { Lunar, Solar } from 'lunar-javascript';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  yearInChinese: string;
  monthInChinese: string;
  dayInChinese: string;
  festival: string;
  term: string; // 节气
}

export class LunarUtils {
  // 获取指定日期的农历信息
  static getLunarDate(date: Date): LunarDate {
    const solar = Solar.fromDate(date);
    const lunar = solar.getLunar();
    
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      yearInChinese: lunar.getYearInChinese(),
      monthInChinese: lunar.getMonthInChinese(),
      dayInChinese: lunar.getDayInChinese(),
      festival: lunar.getFestivals().join(',') || '',
      term: lunar.getJieQi() || '',
    };
  }

  // 获取农历显示文本
  static getLunarText(date: Date): string {
    const lunar = this.getLunarDate(date);
    
    // 优先显示节日
    if (lunar.festival) {
      return lunar.festival;
    }
    
    // 其次显示节气
    if (lunar.term) {
      return lunar.term;
    }
    
    // 否则显示农历日期
    if (lunar.day === 1) {
      return lunar.monthInChinese;
    }
    
    return lunar.dayInChinese;
  }
}
