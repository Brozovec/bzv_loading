import React, { useState, useEffect } from 'react';
import Slideshow from '../components/Slideshow';
import MusicPlayer from '../components/MusicPlayer';
import LoadingBar from '../components/LoadingBar';
import SocialInfo from '../components/SocialInfo';

const Index: React.FC = () => {
  // Array of images for the slideshow - using the newly uploaded FiveM game images
  const images = [
    '/lovable-uploads/userbg21.png', // Character with car
    '/lovable-uploads/userbg20.png', // Character with car
    '/lovable-uploads/userbg17.png', // Character with car
    '/lovable-uploads/userbg18.png', // Character with car
    '/lovable-uploads/userbg19.png', // Character with car
    '/lovable-uploads/bg14.png', // Character with car
    '/lovable-uploads/bg15.png', // Character with car
    '/lovable-uploads/bg16.png', // Character with car
    '/lovable-uploads/bg1.png', // Car on bridge
    '/lovable-uploads/bg2.png', // Character with car
    '/lovable-uploads/bg3.png', // Character with car
    '/lovable-uploads/bg4.png', // Character with car
    '/lovable-uploads/bg5.png', // Character with car
    '/lovable-uploads/bg6.png', // Character with car
    '/lovable-uploads/bg7.png', // Character with car
    '/lovable-uploads/bg8.png', // Character with car
    '/lovable-uploads/bg9.png', // Character with car
    '/lovable-uploads/bg10.png', // Character with car
    '/lovable-uploads/bg11.png', // Character with car
    '/lovable-uploads/bg12.png', // Character with car
    '/lovable-uploads/bg13.png', // Character with car
    '/lovable-uploads/bg14.png', // Character with car
    '/lovable-uploads/bg15.png', // Character with car
    '/lovable-uploads/bg16.png', // Character with car




  ];

  // Array of YouTube video IDs for music
  const youtubeVideoIds: string[] = [
    'GrFmM7m_i38', // Video 1
    'Gg5KfL-4asE', // Video 2
    'PEnwXYJcSZc', // Video 3
    'R0IUR4gkPIE', // Video 4
    'oOi3oJmfz4o', // Video 4
    '2B0mMBTwQqA', // Video 4
    'haCN6Fc5Qtw', // Video 4
    'OtFu51V_atA', // Video 4
    'ZG6xZzwXc7E',
    'ZG6xZzwXc7E',
    'fNFzfwLM72c',
    'fNFzfwLM72c',



  ];

  // State to store the randomly selected YouTube video ID
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');

  // Social media handle
  const socialHandle = '@waxanityfivem';

  // Randomly select a YouTube video ID when the component is mounted
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * youtubeVideoIds.length); // Get random index
    setSelectedVideoId(youtubeVideoIds[randomIndex]); // Set random video ID
  }, []); // Runs only when the component is mounted

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Slideshow Background */}
      <Slideshow images={images} interval={8000} />

      {/* Music Player (hidden but functional) */}
      {/* Render only if selectedVideoId is set */}
      {selectedVideoId && <MusicPlayer videoId={selectedVideoId} />}
      
      {/* Loading Progress Bar */}
      <LoadingBar />
      
      {/* Social Info */}
      <SocialInfo socialHandle={socialHandle} />
    </div>
  );
};

export default Index;
