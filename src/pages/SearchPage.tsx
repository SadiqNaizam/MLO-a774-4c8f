import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import GridMediaItem from '@/components/GridMediaItem';
import TrackItem from '@/components/TrackItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon } from 'lucide-react';

const placeholderTracks = Array.from({ length: 10 }, (_, i) => ({
  id: `track-search-${i + 1}`,
  title: `Dora-Song ${i + 1}`,
  artist: `Artist ${i % 3 + 1}`,
  album: `Album ${i % 2 + 1}`,
  albumArtUrl: `https://placehold.co/100x100/87CEEB/FFFFFF?text=S${i+1}`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
}));

const placeholderAlbums = Array.from({ length: 8 }, (_, i) => ({
  id: `album-search-${i + 1}`,
  imageUrl: `https://placehold.co/300x300/6495ED/FFFFFF?text=AlbumS${i+1}`,
  title: `Future Gadget Album ${i + 1}`,
  subtitle: `Artist ${i + 1}`,
  type: 'album' as const,
}));

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`SearchPage: Play track ${trackId}`);
    // Logic to interact with MusicPlayerBar, likely via context/global state
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <ScrollArea className="flex-1 p-6 pb-28">
          <div className="relative mb-8 max-w-xl mx-auto">
            <Input 
              type="search" 
              placeholder="Search for songs, artists, albums, Dora-gadgets..." 
              className="bg-gray-800 border-gray-700 placeholder-gray-500 text-white pl-12 pr-4 py-3 text-lg rounded-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>

          {searchTerm && (
            <p className="text-center text-gray-400 mb-6">Showing results for: <span className="font-semibold text-blue-300">{searchTerm}</span></p>
          )}
          
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 rounded-lg mb-6">
              <TabsTrigger value="songs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Artists</TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="songs">
              <div className="space-y-2">
                {placeholderTracks.map(track => (
                  <TrackItem {...track} key={track.id} onPlayClick={handlePlayTrack} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderAlbums.map(album => (
                  <GridMediaItem {...album} key={album.id} onClick={(id, type) => console.log(`Clicked ${type}: ${id}`)} onPlayClick={(id, type) => console.log(`Play ${type}: ${id}`)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
                 <p className="text-center text-gray-500 py-8">Artist results would appear here.</p>
                 {/* Placeholder for artist GridMediaItems */}
            </TabsContent>
            <TabsContent value="playlists">
                <p className="text-center text-gray-500 py-8">Playlist results would appear here.</p>
                {/* Placeholder for playlist GridMediaItems */}
            </TabsContent>
          </Tabs>

        </ScrollArea>
        <MusicPlayerBar />
      </div>
    </div>
  );
};

export default SearchPage;