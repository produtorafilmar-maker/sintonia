import React, { useState, useRef, useEffect } from 'react';
import { FeedIcon, PlayIcon, PauseIcon, VolumeUpIcon } from './Icons';

// Use the correct radio stream URL from the initial specification
const RADIO_STREAM_URL = 'https://hts07.brascast.com:9264/live';

const RadioPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // For some live streams, you might need to call load() before play()
        audioRef.current.load(); 
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-white">
      <audio ref={audioRef} src={RADIO_STREAM_URL} preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}></audio>
      
      <div className="text-center">
        <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-lg">
          <FeedIcon className="w-14 h-14 text-white" />
        </div>
        <p className={`text-green-300 font-semibold text-lg ${isPlaying ? 'animate-pulse' : ''}`}>Ao Vivo</p>
      </div>

      <div className="my-10 w-full max-w-xs flex flex-col items-center">
        <div className="bg-black/20 rounded-lg p-4 text-center w-full">
            <h2 className="font-semibold text-lg">SINTONIA RURAL</h2>
            <p className="text-gray-400">A rádio da família do campo.</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <button 
          onClick={togglePlayPause} 
          className={`rounded-full p-6 transition-colors duration-300 ${
            isPlaying 
              ? 'bg-green-500 animate-pulse' 
              : 'bg-white/20 hover:bg-white/30'
          }`}
          aria-label={isPlaying ? "Pausar" : "Tocar"}
        >
          {isPlaying ? (
            <PauseIcon className="w-10 h-10 text-white" />
          ) : (
            <PlayIcon className="w-10 h-10 text-white" />
          )}
        </button>
      </div>

      <div className="w-full max-w-xs mt-8 flex items-center space-x-2">
        <VolumeUpIcon className="w-6 h-6 text-gray-400" />
        <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
      </div>
    </div>
  );
};

export default RadioPage;