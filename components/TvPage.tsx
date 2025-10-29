import React, { useEffect, useRef } from 'react';
import { ProgramItem } from '../types';
// Fix: Import MenuIcon from the central Icons component and remove unused icon imports.
import { MenuIcon } from './Icons';

// This is required to inform TypeScript about the Hls object loaded from the CDN
declare var Hls: any;

const TV_URL = "https://paracatu.moxapps.shop/live/57NDM4gFomQwxiU4rq2pdVRstPY2/index.m3u8";

// Mock data for TV schedule as fetching and scraping is unreliable due to CORS.
const mockSchedule: ProgramItem[] = [
  { time: '10:00h', title: 'Jornal da Manhã', description: 'ST Inan' },
  { time: '11:30h', title: 'Pucida Vlerde', description: 'MSVna2' },
  { time: '11:30h', title: 'Documentário Amazônia Viva', description: 'Amazônia' },
  { time: '13:00h', title: 'Cultura', description: '1 Emba' },
  { time: '13:00h', title: 'Cultura Conectada', description: 'RSinai' },
  { time: '14:00h', title: 'Sessão da Tarde', description: 'Filme' },
  { time: '16:00h', title: 'Vale a Pena Ver de Novo', description: 'Novela' },
];


const TvPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(TV_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        // You can uncomment the line below to autoplay, but it's often blocked by browsers.
        // video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = TV_URL;
    }

  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="relative aspect-video bg-black">
        <video ref={videoRef} controls className="w-full h-full" poster="https://picsum.photos/seed/webtv/800/450" />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <h2 className="text-xl font-bold text-white">Daqui a Pouco</h2>
        </div>
        <div className="space-y-2">
          {mockSchedule.map((item, index) => (
            <div key={index} className="flex items-center bg-[#1F1433] p-3 rounded-lg">
              <div className="w-20 text-center border-r border-purple-400/30 pr-3">
                <span className="font-bold text-lg text-gray-200">{item.time}</span>
              </div>
              <div className="pl-4 flex-grow">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-white">
                <MenuIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Fix: Removed local definition of MenuIcon as it's now imported.


export default TvPage;