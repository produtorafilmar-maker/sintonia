import React, { useEffect, useRef } from 'react';

// This is required to inform TypeScript about the Hls object loaded from the CDN
declare var Hls: any;

const TV_URL = "https://paracatu.moxapps.shop/live/57NDM4gFomQwxiU4rq2pdVRstPY2/index.m3u8";

const TvPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(TV_URL);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = TV_URL;
        }
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <div className="relative aspect-video bg-black">
        <video ref={videoRef} controls className="w-full h-full" poster="https://i.ytimg.com/vi/t8eQ_c4a7-o/maxresdefault.jpg" />
      </div>

      <div className="p-4">
        <div className="bg-[#1F1433] p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg text-white">Programação da TV Paracatu:</h3>
          <p className="text-md text-gray-200 mt-1">
            De segunda a quarta, às 19h — ao vivo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TvPage;