import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlayCircle, DiscAlbum, UserCircle, ListMusic } from 'lucide-react'; // Icons for type
import { cn } from '@/lib/utils';

// Doraemon theme: Rounded corners and blue accents
const DORAEMON_BLUE_ACCENT_BORDER = 'border-blue-500'; // Placeholder
const DORAEMON_ROUNDED = 'rounded-lg'; // Placeholder

interface GridMediaItemProps {
  id: string | number;
  imageUrl: string;
  title: string;
  subtitle?: string;
  type: 'album' | 'artist' | 'playlist' | 'track' | 'genre'; // Added more types
  onClick?: (id: string | number, type: GridMediaItemProps['type']) => void;
  onPlayClick?: (id: string | number, type: GridMediaItemProps['type']) => void; // For direct play
  className?: string;
}

const TypeIcon: React.FC<{ type: GridMediaItemProps['type'] }> = ({ type }) => {
  switch (type) {
    case 'album': return <DiscAlbum className="w-4 h-4 mr-1" />;
    case 'artist': return <UserCircle className="w-4 h-4 mr-1" />;
    case 'playlist': return <ListMusic className="w-4 h-4 mr-1" />;
    default: return null;
  }
};

const GridMediaItem: React.FC<GridMediaItemProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  type,
  onClick,
  onPlayClick,
  className,
}) => {
  console.log("Rendering GridMediaItem:", title, "Type:", type);

  const handleItemClick = () => {
    console.log(`GridMediaItem clicked: ${title} (ID: ${id}, Type: ${type})`);
    if (onClick) {
      onClick(id, type);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to the Card's onClick
    console.log(`Play clicked on GridMediaItem: ${title} (ID: ${id}, Type: ${type})`);
    if (onPlayClick) {
      onPlayClick(id, type);
    }
  };

  return (
    <Card
      className={cn(
        'w-full overflow-hidden group transition-all hover:shadow-xl',
        DORAEMON_ROUNDED, // Apply Doraemon theme rounded corners
        // DORAEMON_BLUE_ACCENT_BORDER, // Apply Doraemon theme accent (e.g., on hover)
        'hover:border-blue-500 border-2 border-transparent', // Example hover effect
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick ? handleItemClick : undefined}
    >
      <CardContent className="p-0 relative">
        <AspectRatio ratio={1 / 1} className={cn('bg-muted', DORAEMON_ROUNDED)}>
          <img
            src={imageUrl || '/placeholder.svg'} // Use placeholder if no image
            alt={title}
            className={cn('object-cover w-full h-full transition-transform group-hover:scale-105', DORAEMON_ROUNDED)}
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-blue-500 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="h-8 w-8" />
          </Button>
        )}
      </CardContent>
      <CardFooter className="p-3 flex flex-col items-start">
        <h3 className="font-semibold text-md truncate w-full" title={title}>{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground truncate w-full" title={subtitle}>{subtitle}</p>}
        <div className="text-xs text-muted-foreground mt-1 flex items-center">
          <TypeIcon type={type} />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default GridMediaItem;