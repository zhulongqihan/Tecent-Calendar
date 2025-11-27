import React, { useState, useRef, useEffect } from 'react';
import './SoundScapes.css';

export const SoundScapes: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mode, setMode] = useState<'rain' | 'white' | 'pink'>('rain');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<ScriptProcessorNode | null>(null);

  // 初始化音频上下文
  useEffect(() => {
    return () => stopSound();
  }, []);

  // 生成白噪音/粉红噪音
  const createNoise = (type: 'white' | 'pink') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const bufferSize = 4096;
    const noiseNode = ctx.createScriptProcessor(bufferSize, 1, 1);
    noiseNodeRef.current = noiseNode;

    noiseNode.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        if (type === 'white') {
          output[i] = Math.random() * 2 - 1;
        } else {
          // 简单的粉红噪音近似
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; 
        }
      }
    };
    let lastOut = 0;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.1; // 噪音音量要小一点
    gainNodeRef.current = gainNode;

    noiseNode.connect(gainNode);
    gainNode.connect(ctx.destination);
  };

  // 模拟雨声 (用低频噪音 + 滤波器)
  const createRain = () => {
    // 这里为了简化，暂时用粉红噪音代替雨声，或者可以使用 <audio> 标签播放在线资源
    // 鉴于纯代码生成雨声比较复杂，我们这里用一个简单的在线音频作为 Fallback
    // 但为了演示“代码生成”，我们继续用 Pink Noise 模拟
    createNoise('pink');
  };

  const playSound = () => {
    stopSound(); // 先停止之前的
    
    if (mode === 'rain' || mode === 'pink') {
      createNoise('pink');
    } else {
      createNoise('white');
    }
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (noiseNodeRef.current) {
      noiseNodeRef.current.disconnect();
      noiseNodeRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = val * 0.1;
    }
  };

  return (
    <div className="sound-scapes cyber-card">
      <div className="sound-header">
        <span className="sound-icon">{isPlaying ? '🔊' : '🔇'}</span>
        <span className="sound-title">神经元降噪 (NOISE)</span>
      </div>
      
      <div className="sound-controls">
        <div className="sound-modes">
          <button 
            className={`mode-btn ${mode === 'rain' ? 'active' : ''}`}
            onClick={() => { setMode('rain'); if(isPlaying) playSound(); }}
          >
            🌧️
          </button>
          <button 
            className={`mode-btn ${mode === 'white' ? 'active' : ''}`}
            onClick={() => { setMode('white'); if(isPlaying) playSound(); }}
          >
            ⚡
          </button>
        </div>

        <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
          {isPlaying ? 'STOP' : 'PLAY'}
        </button>
      </div>

      <div className="volume-control">
        <input 
          type="range" 
          min="0" max="1" step="0.01" 
          value={volume} 
          onChange={handleVolumeChange} 
          className="volume-slider"
        />
      </div>
    </div>
  );
};
