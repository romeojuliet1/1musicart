
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  price: number;
  preview?: string;
}

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer = ({ track }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [track]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-psyco-black-DEFAULT border-t border-psyco-green-muted glassmorphism z-50">
      <audio
        ref={audioRef}
        src={track.preview || "/placeholder-audio.mp3"}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img
              src={track.cover}
              alt={track.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-medium truncate">{track.title}</h4>
              <p className="text-gray-400 text-sm truncate">{track.artist}</p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-2 rounded-full transition-colors ${
                  isShuffle ? 'text-psyco-green-DEFAULT' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Shuffle size={18} />
              </button>
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={togglePlay}
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white rounded-full p-3 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipForward size={20} />
              </button>
              
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`p-2 rounded-full transition-colors ${
                  isRepeat ? 'text-psyco-green-DEFAULT' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Repeat size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(currentTime)}
              </span>
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer"
              >
                <div
                  className="h-full bg-psyco-green-DEFAULT rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume & Additional Controls */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Volume2 size={20} />
              </button>
              <div className="w-20 h-1 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-psyco-green-DEFAULT rounded-full"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                />
              </div>
            </div>
            
            <div className="text-psyco-green-DEFAULT font-medium">
              ${track.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
