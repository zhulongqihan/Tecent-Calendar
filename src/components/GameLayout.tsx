import React, { ReactNode } from 'react';
import './GameLayout.css';

interface GameLayoutProps {
  leftPanel: ReactNode;
  mainPanel: ReactNode;
  rightPanel: ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ leftPanel, mainPanel, rightPanel }) => {
  return (
    <div className="game-layout">
      <div className="layout-column left-column">
        <div className="column-content">
          {leftPanel}
        </div>
      </div>
      
      <div className="layout-column main-column">
        <div className="main-hud-border">
          {mainPanel}
        </div>
      </div>
      
      <div className="layout-column right-column">
        <div className="column-content">
          {rightPanel}
        </div>
      </div>
    </div>
  );
};
