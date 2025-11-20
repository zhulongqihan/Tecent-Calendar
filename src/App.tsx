import React, { useState } from 'react';
import { CalendarView } from './components/CalendarView';
import { EventEditor } from './components/EventEditor';
import { Settings } from './components/Settings';
import { CalendarEvent } from './types';
import './App.css';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEventDates, setNewEventDates] = useState<{ start: Date; end: Date } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  return (
    <div className="App">
      <header className="app-header">
        <h1>📅 日历应用</h1>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>
          ⚙️ 设置
        </button>
      </header>

      <CalendarView
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        refreshTrigger={refreshTrigger}
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
    </div>
  );
}

export default App;
