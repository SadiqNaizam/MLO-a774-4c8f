import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Play, Pause, MoreVertical, ListPlus, Heart } from 'lucide-react'; // Standard icons
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Doraemon theme: Blue accents for playing state, hover effects
const DORAEMON_PLAYING_TEXT = 'text-blue-500'; // Placeholder

interface TrackItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  albumArtUrl?: string;
  duration?: string; // e.g., "3:45"
  isPlaying?: boolean; // To show a visual "playing" indicator
  isCurrentTrack?: boolean; // If this is the track currently loaded in player
  onPlayClick: (trackId: string | number) => void; // Handles play/pause for this track
  onAddToPlaylistClick?: (trackId: string | number) => void;
  onLikeClick?: (trackId: string | number) => void;
  className?: string;
}

const TrackItem: React.FC<TrackItemProps> = ({
  id,
  title,
  artist,
  album,
  albumArtUrl,
  duration,
  isPlaying = false,
  isCurrentTrack = false,
  onPlayClick,
  onAddToPlaylistClick,
  onLikeClick,
  className,
}) => {
  console.log("Rendering TrackItem:", title, "Playing:", isPlaying, "Current:", isCurrentTrack);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Play/Pause clicked for track: ${title} (ID: ${id})`);
    onPlayClick(id);
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Add to Playlist clicked for track: ${title} (ID: ${id})`);
    if (onAddToPlaylistClick) {
      onAddToPlaylistClick(id);
      // Toast/Sonner notification would be triggered here from the page/handler
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Like clicked for track: ${title} (ID: ${id})`);
    if (onLikeClick) onLikeClick(id);
  };

  return (
    <div
      className={cn(
        'flex items-center p-2 pr-3 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md group cursor-default',
        isCurrentTrack ? 'bg-blue-100 dark:bg-blue-900/50' : '', // Doraemon blue for current track
        className
      )}
      // Consider dblclick to play: onDoubleClick={handlePlay}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlay}
        className={cn(
          "w-10 h-10 rounded-full flex-shrink-0",
          isPlaying ? DORAEMON_PLAYING_TEXT : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
        )}
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      >
        {/* Show play icon on hover if not current playing track, else show current state */}
        {isCurrentTrack && isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
        ) : (
            <Play className="w-5 h-5 fill-current group-hover:block hidden" />
        )}
        {! (isCurrentTrack && isPlaying) && <span className="w-5 h-5 group-hover:hidden text-xs font-mono">{/* Track number or other indicator */}</span>}
      </Button>

      {albumArtUrl && (
        <AspectRatio ratio={1/1} className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
            <img src={albumArtUrl} alt={album || title} className="object-cover w-full h-full" />
        </AspectRatio>
      )}

      <div className="flex-grow min-w-0">
        <p className={cn("font-medium truncate", isCurrentTrack && isPlaying ? DORAEMON_PLAYING_TEXT : 'text-gray-900 dark:text-white')} title={title}>
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={artist}>
          {artist}
        </p>
      </div>

      {album && <p className="hidden md:block text-sm text-gray-600 dark:text-gray-300 truncate w-1/4" title={album}>{album}</p>}
      {duration && <p className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right tabular-nums flex-shrink-0">{duration}</p>}

      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onLikeClick && (
             <Button variant="ghost" size="icon" onClick={handleLike} aria-label="Like track">
                <Heart className="w-4 h-4" /> {/* Add fill if liked */}
             </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onAddToPlaylistClick && (
              <DropdownMenuItem onClick={handleAddToPlaylist}>
                <ListPlus className="mr-2 h-4 w-4" />
                Add to Playlist
              </DropdownMenuItem>
            )}
            {/* Other options: Add to queue, Go to album, Go to artist, etc. */}
            <DropdownMenuItem>View Album</DropdownMenuItem>
            <DropdownMenuItem>View Artist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TrackItem;