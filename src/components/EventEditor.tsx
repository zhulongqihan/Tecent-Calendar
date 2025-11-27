import React, { useState, useEffect } from 'react';
import { CalendarEvent, REMINDER_OPTIONS } from '../types';
import { StorageService } from '../services/StorageService';
import { TAGS } from './TagFilter';
import './EventEditor.css';

interface EventEditorProps {
  event?: CalendarEvent | null;
  initialStart?: Date;
  initialEnd?: Date;
  onClose: () => void;
  onSave: () => void;
}

export const EventEditor: React.FC<EventEditorProps> = ({
  event,
  initialStart,
  initialEnd,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    reminderMinutes: 0,
    color: '#3788d8',
    tags: [] as string[],
  });

  useEffect(() => {
    if (event) {
      // 编辑模式
      setFormData({
        title: event.title,
        description: event.description || '',
        location: event.location || '',
        startDate: formatDateForInput(event.startDate),
        startTime: formatTimeForInput(event.startDate),
        endDate: formatDateForInput(event.endDate),
        endTime: formatTimeForInput(event.endDate),
        reminderMinutes: event.reminderMinutes,
        color: event.color || '#3788d8',
        tags: event.tags || [],
      });
    } else if (initialStart && initialEnd) {
      // 新建模式
      setFormData({
        ...formData,
        startDate: formatDateForInput(initialStart),
        startTime: formatTimeForInput(initialStart),
        endDate: formatDateForInput(initialEnd),
        endTime: formatTimeForInput(initialEnd),
      });
    }
  }, [event, initialStart, initialEnd]);

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('请输入事件标题');
      return;
    }

    if (!formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      alert('请完整填写日期和时间');
      return;
    }

    const startDate = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDate = new Date(`${formData.endDate}T${formData.endTime}`);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert('日期格式无效');
      return;
    }

    if (endDate <= startDate) {
      alert('结束时间必须晚于开始时间');
      return;
    }

    const eventData: CalendarEvent = {
      id: event?.id || `event_${Date.now()}`,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      startDate,
      endDate,
      reminderMinutes: formData.reminderMinutes,
      color: formData.color,
      tags: formData.tags,
    };

    try {
      await StorageService.saveEvent(eventData);
      
      // 设置提醒
      scheduleReminder(eventData);
      
      onSave();
      onClose();
    } catch (error) {
      alert('保存失败，请重试');
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    
    if (window.confirm('确定要删除这个事件吗？')) {
      try {
        await StorageService.deleteEvent(event.id);
        onSave();
        onClose();
      } catch (error) {
        alert('删除失败，请重试');
      }
    }
  };

  const scheduleReminder = (evt: CalendarEvent) => {
    if (evt.reminderMinutes === 0) return;
    
    const now = new Date().getTime();
    const eventTime = evt.startDate.getTime();
    const reminderTime = eventTime - evt.reminderMinutes * 60 * 1000;
    const delay = reminderTime - now;

    if (delay > 0 && delay < 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('日历提醒', {
            body: `${evt.title} 将在 ${evt.reminderMinutes} 分钟后开始`,
            icon: '/logo192.png',
          });
        }
      }, delay);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="event-editor-overlay" onClick={onClose}>
      <div className="event-editor" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <h2>{event ? '编辑事件' : '新建事件'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="form-group">
            <label>标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="输入事件标题"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>开始日期 *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                required
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className="form-group">
              <label>开始时间 *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                required
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>结束日期 *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                required
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className="form-group">
              <label>结束时间 *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                required
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>地点</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="输入地点"
            />
          </div>

          <div className="form-group">
            <label>描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="输入事件描述"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>提醒</label>
            <select
              value={formData.reminderMinutes}
              onChange={(e) => handleChange('reminderMinutes', Number(e.target.value))}
            >
              {REMINDER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>标签</label>
            <div className="tag-selector">
              {TAGS.filter(tag => tag.id !== 'all').map(tag => (
                <label key={tag.id} className="tag-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag.id)}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...formData.tags, tag.id]
                        : formData.tags.filter(t => t !== tag.id);
                      handleChange('tags', newTags);
                    }}
                  />
                  <span className="tag-label" style={{ borderColor: tag.color, color: tag.color }}>
                    {tag.icon} {tag.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>颜色</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </div>

          <div className="editor-actions">
            {event && (
              <button type="button" className="delete-btn" onClick={handleDelete}>
                删除
              </button>
            )}
            <button type="button" className="cancel-btn" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="save-btn">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
