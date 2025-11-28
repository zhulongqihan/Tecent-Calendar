import React, { useEffect, useState } from 'react';
import './ClickExplosion.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocity: { x: number, y: number };
  size: number;
}

export const ClickExplosion: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = [];
      const count = 8; // 每次点击产生的粒子数
      const colors = ['#00f3ff', '#ffffff', '#00ffaa']; // 赛博色系

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
          },
          size: Math.random() * 4 + 2
        });
      }

      setParticles(prev => [...prev, ...newParticles]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // 动画循环
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.velocity.x,
          y: p.y + p.velocity.y,
          size: p.size * 0.9 // 逐渐变小
        })).filter(p => p.size > 0.5) // 移除太小的
      );
    }, 20);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="click-explosion-layer">
      {particles.map(p => (
        <div 
          key={p.id}
          className="click-particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`
          }}
        />
      ))}
    </div>
  );
};
