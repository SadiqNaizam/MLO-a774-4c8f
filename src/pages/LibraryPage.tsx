import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import GridMediaItem from '@/components/GridMediaItem';
import TrackItem from '@/components/TrackItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';

const placeholderLikedSongs = Array.from({ length: 15 }, (_, i) => ({
  id: `liked-track-${i + 1}`,
  title: `Favorite Dora-Tune ${i + 1}`,
  artist: `Nobita & Friends`,
  album: `Friendship Melodies`,
  albumArtUrl: `https://placehold.co/100x100/ADD8E6/FFFFFF?text=L${i+1}`,
  duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
}));

const placeholderPlaylists = Array.from({ length: 5 }, (_, i) => ({
  id: `playlist-lib-${i + 1}`,
  imageUrl: `https://placehold.co/300x300/4682B4/FFFFFF?text=PlaylistL${i+1}`,
  title: i === 0 ? "Nobita's Study Mix" : `My Dora Playlist ${i + 1}`,
  subtitle: `${Math.floor(Math.random() * 20) + 5} songs`,
  type: 'playlist' as const,
}));

const LibraryPage = () => {
  console.log('LibraryPage loaded');

  const handlePlayTrack = (trackId: string | number) => {
    console.log(`LibraryPage: Play track ${trackId}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <ScrollArea className="flex-1 p-6 pb-28">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400">Your Library</h1>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Playlist
            </Button>
          </div>
          
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 rounded-lg mb-6">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Artists</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="liked_songs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Liked Songs</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderPlaylists.map(playlist => (
                  <GridMediaItem {...playlist} key={playlist.id} onClick={(id, type) => console.log(`Clicked ${type}: ${id}`)} onPlayClick={(id, type) => console.log(`Play ${type}: ${id}`)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <p className="text-center text-gray-500 py-8">Followed artists would appear here.</p>
            </TabsContent>
            <TabsContent value="albums">
              <p className="text-center text-gray-500 py-8">Saved albums would appear here.</p>
            </TabsContent>
             <TabsContent value="liked_songs">
              <div className="space-y-2">
                {placeholderLikedSongs.map(track => (
                  <TrackItem {...track} key={track.id} onPlayClick={handlePlayTrack} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

        </ScrollArea>
        <MusicPlayerBar />
      </div>
    </div>
  );
};

export default LibraryPage;