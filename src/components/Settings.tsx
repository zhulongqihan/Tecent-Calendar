import React, { useState } from 'react';
import { StorageService } from '../services/StorageService';
import { ICalService } from '../services/ICalService';
import './Settings.css';

interface SettingsProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose, onRefresh }) => {
  const [subscriptionUrl, setSubscriptionUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 导出为iCal
  const handleExport = async () => {
    try {
      const events = await StorageService.getAllEvents();
      if (events.length === 0) {
        alert('没有事件可导出');
        return;
      }
      ICalService.downloadICal(events, `calendar_${Date.now()}.ics`);
      alert('导出成功！');
    } catch (error) {
      alert('导出失败，请重试');
    }
  };

  // 导入iCal文件
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const icalString = event.target?.result as string;
        const events = ICalService.importFromICal(icalString);
        
        if (events.length === 0) {
          alert('文件中没有找到有效的事件');
          return;
        }

        await StorageService.importEvents(events);
        alert(`成功导入 ${events.length} 个事件！`);
        onRefresh();
      } catch (error) {
        alert('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
  };

  // 订阅网络日历
  const handleSubscribe = async () => {
    if (!subscriptionUrl.trim()) {
      alert('请输入订阅地址');
      return;
    }

    setIsLoading(true);
    try {
      const events = await ICalService.fetchICalFromUrl(subscriptionUrl);
      
      if (events.length === 0) {
        alert('订阅的日历中没有事件');
        setIsLoading(false);
        return;
      }

      await StorageService.importEvents(events);
      alert(`成功订阅并导入 ${events.length} 个事件！`);
      setSubscriptionUrl('');
      onRefresh();
    } catch (error) {
      alert('订阅失败：无法访问该地址或格式不正确');
    } finally {
      setIsLoading(false);
    }
  };

  // 清空所有数据
  const handleClearAll = async () => {
    if (!window.confirm('确定要清空所有事件吗？此操作不可恢复！')) {
      return;
    }

    try {
      await StorageService.clearAllEvents();
      alert('已清空所有事件');
      onRefresh();
    } catch (error) {
      alert('清空失败，请重试');
    }
  };

  // 请求通知权限
  const handleRequestNotification = async () => {
    if (!('Notification' in window)) {
      alert('您的浏览器不支持通知功能');
      return;
    }

    if (Notification.permission === 'granted') {
      alert('通知权限已开启');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('通知权限已开启');
      new Notification('日历应用', {
        body: '您将收到事件提醒通知',
      });
    } else {
      alert('通知权限被拒绝');
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>设置</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          {/* 导入导出 */}
          <section className="settings-section">
            <h3>📤 导入/导出</h3>
            
            <div className="setting-item">
              <button className="action-btn" onClick={handleExport}>
                导出为 iCal 文件
              </button>
              <p className="setting-desc">将所有事件导出为 .ics 文件</p>
            </div>

            <div className="setting-item">
              <label htmlFor="import-file" className="action-btn">
                导入 iCal 文件
              </label>
              <input
                id="import-file"
                type="file"
                accept=".ics,.ical"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
              <p className="setting-desc">从 .ics 文件导入事件</p>
            </div>
          </section>

          {/* 网络订阅 */}
          <section className="settings-section">
            <h3>🌐 网络订阅</h3>
            
            <div className="setting-item">
              <input
                type="url"
                className="url-input"
                placeholder="输入日历订阅地址 (URL)"
                value={subscriptionUrl}
                onChange={(e) => setSubscriptionUrl(e.target.value)}
              />
              <button
                className="action-btn"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? '订阅中...' : '订阅日历'}
              </button>
              <p className="setting-desc">从网络地址订阅 iCal 日历</p>
            </div>
          </section>

          {/* 通知设置 */}
          <section className="settings-section">
            <h3>🔔 通知</h3>
            
            <div className="setting-item">
              <button className="action-btn" onClick={handleRequestNotification}>
                开启通知权限
              </button>
              <p className="setting-desc">
                当前状态: {
                  Notification.permission === 'granted' ? '✅ 已开启' :
                  Notification.permission === 'denied' ? '❌ 已拒绝' : '⚠️ 未设置'
                }
              </p>
            </div>
          </section>

          {/* 数据管理 */}
          <section className="settings-section">
            <h3>🗑️ 数据管理</h3>
            
            <div className="setting-item">
              <button className="action-btn danger-btn" onClick={handleClearAll}>
                清空所有事件
              </button>
              <p className="setting-desc">删除所有事件数据（不可恢复）</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
