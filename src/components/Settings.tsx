import React from 'react';
import { StorageService } from '../services/StorageService';
import './Settings.css';

interface SettingsProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose, onRefresh }) => {
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
          <h2>系统设置</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          {/* 通知设置 */}
          <section className="settings-section">
            <h3>🔔 通知权限</h3>
            
            <div className="setting-item">
              <button className="action-btn" onClick={handleRequestNotification}>
                开启系统通知
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
            <h3>🗑️ 数据重置</h3>
            
            <div className="setting-item">
              <button className="action-btn danger-btn" onClick={handleClearAll}>
                格式化系统数据
              </button>
              <p className="setting-desc">删除所有本地存储的事件数据（不可恢复）</p>
            </div>
          </section>
          
          <div className="settings-footer" style={{marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666'}}>
            Life OS v2.0 | Cyber-Tech Edition
          </div>
        </div>
      </div>
    </div>
  );
};
