"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const controlClassName =
  "grid size-11 place-items-center rounded-full border border-white/40 bg-black/35 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function SuccessVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch {
        setIsPlaying(!video.paused && !video.ended);
      }
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src="/success-page.mp4"
        width={854}
        height={480}
        className="block h-auto w-full"
        aria-label="Registration success video"
        autoPlay
        muted={isMuted}
        playsInline
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
      />
      <div className="absolute right-3 bottom-3 flex gap-2">
        <button
          type="button"
          className={controlClassName}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause size={19} aria-hidden="true" /> : <Play size={19} aria-hidden="true" />}
        </button>
        <button
          type="button"
          className={controlClassName}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
