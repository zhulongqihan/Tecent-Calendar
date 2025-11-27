import React, { useState, useEffect } from 'react';
import { CalendarView } from './components/CalendarView';
import { EventEditor } from './components/EventEditor';
import { Settings } from './components/Settings';
import { ThemeToggle } from './components/ThemeToggle';
import { QuickAdd } from './components/QuickAdd';
import { StatsPanel } from './components/StatsPanel';
import { DailyQuote } from './components/DailyQuote';
import { TagFilter } from './components/TagFilter';
import { TodayFocus } from './components/TodayFocus';
import { ShortcutHelp } from './components/ShortcutHelp';
import { PomodoroTimer } from './components/PomodoroTimer';
import { ParticleBackground } from './components/ParticleBackground';
import { GameLayout } from './components/GameLayout';
import { PlayerProfile } from './components/PlayerProfile';
import { AbilityRadar } from './components/AbilityRadar';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { SoundScapes } from './components/SoundScapes';
import { PomodoroWidget } from './components/PomodoroWidget';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CalendarEvent } from './types';
import { StorageService } from './services/StorageService';
import { SubscriptionService } from './services/SubscriptionService';
import './App.css';

function App() {
  // 核心状态
  const [events, setEvents] = useState<CalendarEvent[]>([]); // 用于全局统计，特别是雷达图
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDates, setNewEventDates] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedTag, setSelectedTag] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // 玩家状态 (游戏化核心) - 优先从本地存储读取
  const [playerLevel, setPlayerLevel] = useState(() => parseInt(localStorage.getItem('player_level') || '1'));
  const [playerXp, setPlayerXp] = useState(() => parseInt(localStorage.getItem('player_xp') || '0'));
  const [achievements, setAchievements] = useState<string[]>([]);
  const [focusTime, setFocusTime] = useState(1250); // 这里也可以持久化
  const nextLevelXp = playerLevel * 1000;

  // UI 开关
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showPomodoroFull, setShowPomodoroFull] = useState(false);
  const [showParticles, setShowParticles] = useState(true); // 默认开启
  const [showSubscription, setShowSubscription] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // 默认开启

  // 初始化
  useEffect(() => {
    document.body.classList.add('dark-mode');
    if (showParticles) document.body.classList.add('particles-active');
  }, []);

  // 加载全局事件数据（用于雷达图等统计），并初始化 XP (如果还没初始化过)
  useEffect(() => {
    const loadAllData = async () => {
      const local = await StorageService.getAllEvents();
      const subs = await SubscriptionService.fetchAllSubscribedEvents();
      const all = [...local, ...subs];
      setEvents(all);

      // 简单的成就计算
      const newBadges: string[] = [];
      if (all.length >= 5) newBadges.push('初出茅庐');
      if (all.length >= 20) newBadges.push('任务狂');
      if (all.length >= 50) newBadges.push('战术大师');
      setAchievements(newBadges);

      // 如果是新用户(XP为0)且有历史数据，根据历史数据计算初始 XP
      const currentXp = parseInt(localStorage.getItem('player_xp') || '0');
      if (currentXp === 0 && local.length > 0) {
        const initialXp = local.length * 50;
        setPlayerXp(initialXp);
        // 简单估算等级
        const estLevel = Math.floor(initialXp / 1000) + 1;
        setPlayerLevel(estLevel);
        localStorage.setItem('player_xp', initialXp.toString());
        localStorage.setItem('player_level', estLevel.toString());
      }
    };
    loadAllData();
  }, [refreshTrigger]);

  // 增加经验值
  const addXp = (amount: number) => {
    setPlayerXp(prev => {
      const newXp = prev + amount;
      let currentLevel = playerLevel;
      let currentNextXp = currentLevel * 1000;
      
      // 升级逻辑
      if (newXp >= currentNextXp) {
        currentLevel += 1;
        setPlayerLevel(currentLevel);
        localStorage.setItem('player_level', currentLevel.toString());
        alert(`🎉 恭喜升级！当前等级: Lv.${currentLevel}`);
      }
      
      localStorage.setItem('player_xp', newXp.toString());
      return newXp;
    });
  };

  // 快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch(e.key.toLowerCase()) {
        case 'n': handleQuickAdd(); break;
        case 't': setShowFocus(prev => !prev); break;
        case 's': setShowStats(prev => !prev); break;
        case 'p': setShowPomodoroFull(prev => !prev); break;
        case 'b': setShowParticles(prev => !prev); break;
        case '?': setShowShortcuts(prev => !prev); break;
        case 'escape':
          setShowSettings(false);
          setShowStats(false);
          setShowFocus(false);
          setShowShortcuts(false);
          setShowPomodoroFull(false);
          setShowSubscription(false);
          if (selectedEvent || newEventDates) handleCloseEditor();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEvent, newEventDates]);

  // 粒子开关
  useEffect(() => {
    if (showParticles) {
      document.body.classList.add('particles-active');
    } else {
      document.body.classList.remove('particles-active');
    }
  }, [showParticles]);

  const handleSelectEvent = (event: CalendarEvent) => setSelectedEvent(event);
  const handleSelectSlot = (start: Date, end: Date) => setNewEventDates({ start, end });
  const handleCloseEditor = () => {
    setSelectedEvent(null);
    setNewEventDates(null);
  };
  const handleSaveEvent = () => {
    setRefreshTrigger(prev => prev + 1);
    // 保存事件增加经验值
    addXp(50);
  };
  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);
  
  const handleQuickAdd = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    setNewEventDates({ start, end });
  };

  // 组件组装
  const LeftPanel = (
    <>
      <PlayerProfile 
        level={playerLevel} 
        xp={playerXp} 
        nextLevelXp={nextLevelXp} 
        focusTime={focusTime} 
        achievements={achievements}
      />
      <AbilityRadar events={events} />
      <ActivityHeatmap events={events} />
      
      <div className="cyber-card" style={{ padding: '15px', marginTop: '20px' }}>
        <h4 style={{ color: 'var(--cyber-primary)', marginTop: 0 }}>🏷️ 任务过滤</h4>
        <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />
      </div>
      <div style={{ marginTop: '20px' }}>
         <button className="cyber-btn-block" onClick={() => setShowStats(true)}>📊 数据统计</button>
         <div style={{ height: '10px' }}></div>
         <button className="cyber-btn-block" onClick={() => setShowSettings(true)}>⚙️ 系统设置</button>
      </div>
    </>
  );

  const MainPanel = (
    <>
      <DailyQuote />
      <CalendarView
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        refreshTrigger={refreshTrigger}
        selectedTag={selectedTag}
      />
    </>
  );

  const RightPanel = (
    <>
      <PomodoroWidget onFullMode={() => setShowPomodoroFull(true)} />
      <SoundScapes />
      
      <div className="cyber-card" style={{ padding: '15px', marginBottom: '20px', marginTop: '20px' }}>
        <h4 style={{ color: 'var(--cyber-accent)', marginTop: 0, display: 'flex', justifyContent: 'space-between' }}>
          <span>⚠️ 高危任务警告</span>
          <span style={{ fontSize: '10px' }}>DEADLINE</span>
        </h4>
        <div style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: 'bold', color: 'white' }}>
          期末系统架构设计
        </div>
        <div style={{ color: 'var(--cyber-danger)', fontSize: '14px', marginTop: '5px' }}>
          剩余时间: 2 天
        </div>
      </div>

      <div className="cyber-card" style={{ padding: '15px' }}>
        <h4 style={{ color: 'var(--cyber-secondary)', marginTop: 0 }}>🚀 快速指令</h4>
        <button className="cyber-btn-block" onClick={handleQuickAdd}>⚡ 新建任务</button>
        <div style={{ height: '10px' }}></div>
        <button className="cyber-btn-block" onClick={() => setShowFocus(true)}>🎯 专注模式</button>
        <div style={{ height: '10px' }}></div>
        <button className="cyber-btn-block" onClick={() => setShowSubscription(true)}>📡 订阅日历</button>
        <div style={{ height: '10px' }}></div>
        <button className="cyber-btn-block" onClick={() => setShowParticles(!showParticles)}>
          {showParticles ? '🚫 关闭特效' : '✨ 开启特效'}
        </button>
      </div>
    </>
  );

  return (
    <div className="App">
      <header className="app-header">
        <h1>🛡️ 人生重构系统 <span style={{ fontSize: '12px', marginLeft: '10px', opacity: 0.7 }}>LIFE OS v2.0</span></h1>
        <div className="header-actions">
          <div style={{ fontSize: '12px', color: 'var(--cyber-primary)' }}>
            系统状态: 在线
          </div>
        </div>
      </header>

      <GameLayout 
        leftPanel={LeftPanel}
        mainPanel={MainPanel}
        rightPanel={RightPanel}
      />

      {/* 弹窗层 */}
      {(selectedEvent || newEventDates) && (
        <EventEditor
          event={selectedEvent}
          initialStart={newEventDates?.start}
          initialEnd={newEventDates?.end}
          onClose={handleCloseEditor}
          onSave={handleSaveEvent}
        />
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} onRefresh={handleRefresh} />}
      {showStats && <StatsPanel onClose={() => setShowStats(false)} />}
      {showSubscription && <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} onUpdate={handleRefresh} />}
      <TodayFocus isOpen={showFocus} onClose={() => setShowFocus(false)} onEventClick={handleSelectEvent} />
      <ShortcutHelp isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <PomodoroTimer isOpen={showPomodoroFull} onClose={() => setShowPomodoroFull(false)} />
      
      {showParticles && <ParticleBackground />}
      <QuickAdd onQuickAdd={handleQuickAdd} />
    </div>
  );
}

export default App;
