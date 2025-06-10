import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat, ListMusic, Maximize2
} from 'lucide-react'; // Standard icons
// For Doraemon-themed icons, these would be replaced or styled
import { cn } from '@/lib/utils';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  duration: number; // in seconds
  audioSrc: string; // URL to the audio file
}

interface MusicPlayerBarProps {
  // This component will likely manage its own state internally for playback
  // Or receive track info and control functions via props or context
  initialTrack?: CurrentTrack; // To load a track initially
}

// Doraemon theme: Blue accents, custom icons
const DORAEMON_PLAYER_BG = 'bg-gray-800'; // Example player background
const DORAEMON_ACCENT_BLUE = 'text-blue-400'; // For icons, progress

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ initialTrack }) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(initialTrack || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(0.5); // 0-1
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false); // 'off', 'one', 'all'
  const [currentTime, setCurrentTime] = useState(0); // in seconds

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initialTrack) setCurrentTrack(initialTrack);
  }, [initialTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if(audio && currentTrack) {
        audio.src = currentTrack.audioSrc;
        audio.load(); // Load the new source
        if(isPlaying) { // If it was playing, try to play new track
            audio.play().catch(e => console.error("Failed to play new track:", e));
        }
    }
  }, [currentTrack?.audioSrc]);


  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing track" : "Playing track:", currentTrack.title);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newProgress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentTrack) {
      const newTime = (value[0] / 100) * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
    console.log("Seek to:", value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false); // Unmute if volume is changed manually
    console.log("Volume changed to:", value[0]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmuting" : "Muting");
  };
  
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  console.log("Rendering MusicPlayerBar. Track:", currentTrack?.title, "Playing:", isPlaying);

  // This is a placeholder. In a real app, you'd use React Context or Zustand/Redux for global state
  // and to allow other components (like TrackItem) to set the currentTrack.
  // For demonstration, we'll use a mock function to load a track.
  const loadDemoTrack = () => {
      setCurrentTrack({
          id: 'dora-1',
          title: "Doraemon's Theme",
          artist: "Nobiyo Nobi",
          albumArtUrl: "/placeholder.svg", // Replace with actual or placeholder
          duration: 180, // 3 minutes
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder audio
      });
      setIsPlaying(false); // Start paused
      setProgress(0);
  }
  useEffect(() => { if (!currentTrack) loadDemoTrack(); }, []); // Load demo track on mount if none


  return (
    <footer className={cn(
      'fixed bottom-0 left-0 right-0 h-20 text-white p-3 z-50 border-t border-gray-700',
      DORAEMON_PLAYER_BG, // Doraemon theme background
      'flex items-center justify-between space-x-4'
    )}>
      {currentTrack && <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onEnded={() => setIsPlaying(false)} loop={isRepeat} />}

      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 w-1/4 min-w-[200px]">
        {currentTrack ? (
          <>
            <AspectRatio ratio={1/1} className="w-12 h-12 rounded overflow-hidden">
                <img src={currentTrack.albumArtUrl || '/placeholder.svg'} alt={currentTrack.title} className="object-cover w-full h-full" />
            </AspectRatio>
            <div>
              <p className="text-sm font-medium truncate" title={currentTrack.title}>{currentTrack.title}</p>
              <p className="text-xs text-gray-400 truncate" title={currentTrack.artist}>{currentTrack.artist}</p>
            </div>
          </>
        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
            <ListMusic className="w-6 h-6 text-gray-500"/>
          </div>
        )}
      </div>

      {/* Center: Playback Controls & Seek Bar */}
      <div className="flex flex-col items-center justify-center flex-grow max-w-2xl">
        <div className="flex items-center space-x-3 mb-1">
          <Button variant="ghost" size="icon" onClick={() => setIsShuffle(!isShuffle)} className={cn('hover:text-white', isShuffle ? DORAEMON_ACCENT_BLUE : 'text-gray-400')}>
            <Shuffle className="w-5 h-5" /> {/* Doraemon-themed icon */}
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <SkipBack className="w-5 h-5" /> {/* Doraemon-themed icon */}
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={handlePlayPause}
            className={cn('rounded-full w-10 h-10 bg-white text-black hover:bg-gray-200 disabled:opacity-50', DORAEMON_ACCENT_BLUE /* Button color */)}
            disabled={!currentTrack}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />} {/* Doraemon-themed icon */}
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <SkipForward className="w-5 h-5" /> {/* Doraemon-themed icon */}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsRepeat(!isRepeat)} className={cn('hover:text-white', isRepeat ? DORAEMON_ACCENT_BLUE : 'text-gray-400')}>
            <Repeat className="w-5 h-5" /> {/* Doraemon-themed icon */}
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeek}
                className={cn('[&>span:first-child]:h-1', '[&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0')}
                // Apply Doraemon theme to slider track/thumb
                // e.g. [&>span:first-child_span]:bg-blue-400 for progress part
                disabled={!currentTrack}
            />
            <span className="text-xs text-gray-400 w-10 text-left">{currentTrack ? formatTime(currentTrack.duration) : '0:00'}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center space-x-3 w-1/4 justify-end min-w-[150px]">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-300 hover:text-white">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3"
        />
        {/* Example: Fullscreen or Queue button */}
        {/* <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Maximize2 className="w-5 h-5" />
        </Button> */}
      </div>
    </footer>
  );
};

export default MusicPlayerBar;