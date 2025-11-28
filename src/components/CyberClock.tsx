import React, { useState, useEffect } from 'react';
import './CyberClock.css';

export const CyberClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 50); // 50ms 刷新一次以显示毫秒

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const formatMs = (num: number) => num.toString().padStart(3, '0').substring(0, 2); // 只取前两位

  return (
    <div className="cyber-clock">
      <div className="clock-date">
        {time.getFullYear()}.{formatNumber(time.getMonth() + 1)}.{formatNumber(time.getDate())}
      </div>
      <div className="clock-time-group">
        <span className="clock-time">
          {formatNumber(time.getHours())}:{formatNumber(time.getMinutes())}:{formatNumber(time.getSeconds())}
        </span>
        <span className="clock-ms">
          .{formatMs(time.getMilliseconds())}
        </span>
      </div>
      <div className="clock-meta">
        TS: {Math.floor(time.getTime() / 1000)} UTC+8
      </div>
    </div>
  );
};
