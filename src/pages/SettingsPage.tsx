import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/layout/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Shield, FileText, Palette } from 'lucide-react';

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <ScrollArea className="flex-1 p-6 pb-28">
          <h1 className="text-3xl font-bold text-blue-400 mb-8">Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Account Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300"><User className="mr-2 h-5 w-5" /> Account Details</CardTitle>
                <CardDescription className="text-gray-400">Manage your profile and login information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://placehold.co/100x100/007ACC/FFFFFF?text=Dora" alt="Doraemon Avatar" />
                    <AvatarFallback>DD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
                    <Input id="displayName" defaultValue="Doraemon Fan 123" className="bg-gray-700 border-gray-600 text-white mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input id="email" type="email" defaultValue="dora_fan@example.com" className="bg-gray-700 border-gray-600 text-white mt-1" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Account Changes</Button>
              </CardFooter>
            </Card>

            {/* Preferences Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300"><Palette className="mr-2 h-5 w-5" /> Application Preferences</CardTitle>
                <CardDescription className="text-gray-400">Customize your DoraPlay experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="audioQuality" className="text-gray-300">High Quality Audio</Label>
                  <Switch id="audioQuality" defaultChecked className="data-[state=checked]:bg-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="explicitFilter" className="text-gray-300">Filter Explicit Content (for Nobita)</Label>
                  <Switch id="explicitFilter" className="data-[state=checked]:bg-blue-500" />
                </div>
                 <div className="flex items-center justify-between">
                  <Label htmlFor="theme" className="text-gray-300">Doraemon Theme Variant</Label>
                   <select id="theme" className="bg-gray-700 border-gray-600 text-white p-2 rounded-md">
                     <option>Classic Blue</option>
                     <option>Future Gadget Teal</option>
                     <option>Pink Anywhere Door</option>
                   </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
              </CardFooter>
            </Card>
            
            {/* Notifications Card */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300"><Bell className="mr-2 h-5 w-5" /> Notifications</CardTitle>
                <CardDescription className="text-gray-400">Manage how you receive updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="newReleaseNotifs" className="text-gray-300">New Releases from Dorami</Label>
                  <Switch id="newReleaseNotifs" defaultChecked className="data-[state=checked]:bg-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="playlistUpdates" className="text-gray-300">Playlist Updates</Label>
                  <Switch id="playlistUpdates" className="data-[state=checked]:bg-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Legal Card */}
            <Card className="bg-gray-800 border-gray-700 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-300"><FileText className="mr-2 h-5 w-5" /> Legal & About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="link" className="text-blue-400 p-0 h-auto">Terms of Service</Button><br/>
                <Button variant="link" className="text-blue-400 p-0 h-auto">Privacy Policy</Button><br/>
                <Button variant="link" className="text-blue-400 p-0 h-auto">About DoraPlay v1.0</Button>
              </CardContent>
            </Card>

          </div>
        </ScrollArea>
        <MusicPlayerBar />
      </div>
    </div>
  );
};

export default SettingsPage;