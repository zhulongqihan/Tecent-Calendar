import React, { useState, useEffect } from 'react';
import { Subscription, SubscriptionService } from '../services/SubscriptionService';
import './SubscriptionModal.css';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onUpdate }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [newSub, setNewSub] = useState({
    name: '',
    url: '',
    color: '#00f3ff'
  });

  useEffect(() => {
    if (isOpen) {
      loadSubscriptions();
    }
  }, [isOpen]);

  const loadSubscriptions = () => {
    setSubscriptions(SubscriptionService.getSubscriptions());
  };

  const handleAdd = () => {
    if (!newSub.name || !newSub.url) {
      alert('请填写完整信息');
      return;
    }

    SubscriptionService.addSubscription({
      id: Date.now().toString(),
      name: newSub.name,
      url: newSub.url,
      color: newSub.color
    });

    setNewSub({ name: '', url: '', color: '#00f3ff' });
    loadSubscriptions();
    onUpdate();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定取消订阅该日历吗？')) {
      SubscriptionService.removeSubscription(id);
      loadSubscriptions();
      onUpdate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="sub-modal-overlay" onClick={onClose}>
      <div className="sub-modal" onClick={e => e.stopPropagation()}>
        <div className="sub-header">
          <h3>📡 战术情报订阅 (Network Feed)</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sub-content">
          <div className="add-sub-form cyber-card">
            <h4>新增接入点</h4>
            <div className="form-group">
              <label>订阅源名称</label>
              <input 
                type="text" 
                value={newSub.name} 
                onChange={e => setNewSub({...newSub, name: e.target.value})}
                placeholder="例如: 学校课表"
              />
            </div>
            <div className="form-group">
              <label>iCal 链接 (URL)</label>
              <input 
                type="text" 
                value={newSub.url} 
                onChange={e => setNewSub({...newSub, url: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label>标识颜色</label>
              <input 
                type="color" 
                value={newSub.color} 
                onChange={e => setNewSub({...newSub, color: e.target.value})}
              />
            </div>
            <button className="cyber-btn-block" onClick={handleAdd}>
              + 建立连接
            </button>
          </div>

          <div className="sub-list">
            <h4>已接入信号源</h4>
            {subscriptions.length === 0 ? (
              <div className="empty-state">暂无订阅源</div>
            ) : (
              subscriptions.map(sub => (
                <div key={sub.id} className="sub-item cyber-card" style={{borderColor: sub.color}}>
                  <div className="sub-info">
                    <span className="sub-name" style={{color: sub.color}}>{sub.name}</span>
                    <span className="sub-url">{sub.url}</span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(sub.id)}>
                    断开
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
