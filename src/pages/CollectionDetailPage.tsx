import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import TrackItem from '@/components/TrackItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Shuffle, Heart } from 'lucide-react';

// Mock data - in a real app, this would come from an API based on `id`
const mockCollection = {
  id: 'dora-album-1',
  type: 'Album', // Could be 'Playlist'
  title: "Doraemon's Greatest Hits",
  creator: 'The Dorayakis',
  coverArtUrl: 'https://placehold.co/400x400/1E90FF/FFFFFF?text=Dora+Hits',
  description: 'A collection of timeless tunes from the 22nd century and beyond. Perfect for any adventure with a time machine!',
  duration: '45 min',
  tracks: Array.from({ length: 12 }, (_, i) => ({
    id: `track-detail-${i + 1}`,
    title: `Gadget Song ${i + 1}`,
    artist: 'The Dorayakis',
    album: "Doraemon's Greatest Hits",
    albumArtUrl: `https://placehold.co/100x100/1E90FF/FFFFFF?text=T${i+1}`,
    duration: `${Math.floor(Math.random() * 2) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  })),
};

const CollectionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`CollectionDetailPage loaded for ID: ${id}. Displaying mock data.`);
  // In a real app, you'd fetch data based on `id` here.
  const collection = mockCollection;


  const handlePlayTrack = (trackId: string | number) => {
    console.log(`CollectionDetailPage: Play track ${trackId}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <ScrollArea className="flex-1 pb-28"> {/* No p-6, header will have its own padding */}
          <header className="p-8 bg-gradient-to-b from-blue-700 via-blue-800 to-gray-900 flex flex-col md:flex-row items-center md:items-end space-x-0 md:space-x-6">
            <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0 rounded-lg shadow-2xl overflow-hidden">
              <AspectRatio ratio={1/1}>
                <img src={collection.coverArtUrl} alt={collection.title} className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">{collection.type}</p>
              <h1 className="text-4xl md:text-6xl font-bold my-2 text-white">{collection.title}</h1>
              <p className="text-gray-300 text-sm mb-1">{collection.description}</p>
              <p className="text-gray-400 text-sm">
                Created by <span className="font-semibold text-blue-300">{collection.creator}</span> • {collection.tracks.length} songs, {collection.duration}
              </p>
              <div className="mt-6 flex space-x-3 justify-center md:justify-start">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-3">
                  <Play className="mr-2 h-6 w-6 fill-current" /> Play
                </Button>
                <Button variant="outline" size="lg" className="text-white border-gray-500 hover:bg-gray-700 rounded-full px-6 py-3">
                  <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="space-y-1">
              {collection.tracks.map((track, index) => (
                <TrackItem 
                  {...track} 
                  key={track.id} 
                  onPlayClick={handlePlayTrack} 
                  // You might want to pass track number or other info
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        <MusicPlayerBar />
      </div>
    </div>
  );
};

export default CollectionDetailPage;