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
import { CalendarEvent } from './types';
import './App.css';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDates, setNewEventDates] = useState<{ start: Date; end: Date } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTag, setSelectedTag] = useState('all');
  const [showParticles, setShowParticles] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // 快捷键监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 如果正在编辑输入框，忽略快捷键
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(e.key.toLowerCase()) {
        case 'n':
          handleQuickAdd();
          break;
        case 't':
          setShowFocus(prev => !prev);
          break;
        case 's':
          setShowStats(prev => !prev);
          break;
        case 'd':
          handleToggleTheme();
          break;
        case 'p':
          setShowPomodoro(prev => !prev);
          break;
        case 'b':
          setShowParticles(prev => !prev);
          break;
        case '?':
          setShowShortcuts(prev => !prev);
          break;
        case 'escape':
          setShowSettings(false);
          setShowStats(false);
          setShowFocus(false);
          setShowShortcuts(false);
          setShowPomodoro(false);
          if (selectedEvent || newEventDates) {
            handleCloseEditor();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedEvent, newEventDates]);

  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // 管理粒子背景的body class
  useEffect(() => {
    if (showParticles) {
      document.body.classList.add('particles-active');
    } else {
      document.body.classList.remove('particles-active');
    }
  }, [showParticles]);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (start: Date, end: Date) => {
    setNewEventDates({ start, end });
  };

  const handleCloseEditor = () => {
    setSelectedEvent(null);
    setNewEventDates(null);
  };

  const handleSaveEvent = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleQuickAdd = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    setNewEventDates({ start, end });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📅 智能日历</h1>
        <div className="header-actions">
          <button className="focus-btn" onClick={() => setShowFocus(true)} title="今日聚焦 (T)">
            🎯
          </button>
          <button className="pomodoro-btn" onClick={() => setShowPomodoro(true)} title="番茄钟 (P)">
            🍅
          </button>
          <button className="stats-btn" onClick={() => setShowStats(true)} title="查看统计 (S)">
            📊
          </button>
          <button className="particle-btn" onClick={() => setShowParticles(!showParticles)} title="粒子效果 (B)">
            {showParticles ? '✨' : '💫'}
          </button>
          <button className="shortcut-btn" onClick={() => setShowShortcuts(true)} title="快捷键 (?)">
            ⌨️
          </button>
          <button className="settings-btn" onClick={() => setShowSettings(true)} title="设置">
            ⚙️
          </button>
        </div>
      </header>

      <DailyQuote />
      
      <TagFilter selectedTag={selectedTag} onTagChange={setSelectedTag} />

      <CalendarView
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        refreshTrigger={refreshTrigger}
        selectedTag={selectedTag}
      />

      {(selectedEvent || newEventDates) && (
        <EventEditor
          event={selectedEvent}
          initialStart={newEventDates?.start}
          initialEnd={newEventDates?.end}
          onClose={handleCloseEditor}
          onSave={handleSaveEvent}
        />
      )}

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onRefresh={handleRefresh}
        />
      )}

      {showStats && (
        <StatsPanel onClose={() => setShowStats(false)} />
      )}

      <TodayFocus
        isOpen={showFocus}
        onClose={() => setShowFocus(false)}
        onEventClick={handleSelectEvent}
      />

      <ShortcutHelp
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      <PomodoroTimer
        isOpen={showPomodoro}
        onClose={() => setShowPomodoro(false)}
      />

      {showParticles && <ParticleBackground />}

      <QuickAdd onQuickAdd={handleQuickAdd} />
      <ThemeToggle isDark={isDarkMode} onToggle={handleToggleTheme} />
    </div>
  );
}

export default App;
