import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import Carousel from '@/components/Carousel';
import GridMediaItem from '@/components/GridMediaItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const placeholderMediaItems = (category: string, count: number) => Array.from({ length: count }, (_, i) => ({
  id: `${category.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
  imageUrl: `https://placehold.co/300x300/7EBBF5/FFFFFF?text=${encodeURIComponent(category)}+${i+1}`,
  title: `${category} Item ${i + 1}`,
  subtitle: `Artist ${i + 1}`,
  type: (['album', 'playlist', 'artist'] as const)[i % 3],
}));

const HomePage = () => {
  console.log('HomePage loaded');

  const featuredPlaylists = placeholderMediaItems("Dora's Grooves", 6).map(item => <GridMediaItem {...item} key={item.id} onClick={(id, type) => console.log(`Clicked ${type}: ${id}`)} onPlayClick={(id, type) => console.log(`Play ${type}: ${id}`)} />);
  const newReleases = placeholderMediaItems("New Releases", 6).map(item => <GridMediaItem {...item} key={item.id} type="album" onClick={(id, type) => console.log(`Clicked ${type}: ${id}`)} onPlayClick={(id, type) => console.log(`Play ${type}: ${id}`)} />);
  const recentlyPlayed = placeholderMediaItems("Recently Played", 4).map(item => <GridMediaItem {...item} key={item.id} onClick={(id, type) => console.log(`Clicked ${type}: ${id}`)} onPlayClick={(id, type) => console.log(`Play ${type}: ${id}`)} />);


  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64"> {/* Sidebar width w-64 */}
        <ScrollArea className="flex-1 p-6 pb-28"> {/* MusicPlayerBar height h-20 + padding */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-blue-400 mb-2">Welcome to DoraPlay!</h1>
            <p className="text-lg text-gray-300">Discover your next favorite tune, inspired by Doraemon's world.</p>
            <div className="relative mt-4 max-w-md">
              <Input 
                type="search" 
                placeholder="Search for songs, artists, gadgets..." 
                className="bg-gray-800 border-gray-700 placeholder-gray-500 text-white pl-10 focus:ring-blue-500 focus:border-blue-500" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </header>

          <section className="mb-10">
            <Carousel title="Doraemon's Gadget Grooves" slides={featuredPlaylists} slideClassName="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] p-2" />
          </section>

          <section className="mb-10">
            <Carousel title="New Releases" slides={newReleases} slideClassName="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] p-2" />
          </section>
          
          <section className="mb-10">
             <h2 className="text-2xl font-semibold mb-4 px-2 text-blue-300">Recently Played</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recentlyPlayed.map(item => item)}
             </div>
          </section>

        </ScrollArea>
        <MusicPlayerBar />
      </div>
    </div>
  );
};

export default HomePage;