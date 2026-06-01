"use client";

import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  audioLink: string;
  bookId: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioLink, bookId }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [audioLink, bookId]);

  function updateDuration() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  }

  function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio.play();
      return;
    }

    audio.pause();
  }

  function seekTo(value: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = value;
    setCurrentTime(value);
  }

  function skipBy(seconds: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
    seekTo(nextTime);
  }

  return (
    <section className="audio-player" aria-label="Book audio player">
      <audio
        ref={audioRef}
        src={audioLink}
        preload="metadata"
        onDurationChange={updateDuration}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={updateDuration}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />

      <div className="audio-player__controls">
        <button
          className="audio-player__button"
          onClick={() => skipBy(-10)}
          type="button"
          aria-label="Skip backward 10 seconds"
        >
          -10
        </button>
        <button
          className="audio-player__play"
          onClick={togglePlayback}
          type="button"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="audio-player__button"
          onClick={() => skipBy(10)}
          type="button"
          aria-label="Skip forward 10 seconds"
        >
          +10
        </button>
      </div>

      <div className="audio-player__timeline">
        <span className="audio-player__time">{formatTime(currentTime)}</span>
        <input
          className="audio-player__seek"
          max={duration || 0}
          min="0"
          onChange={(event) => seekTo(Number(event.target.value))}
          step="0.1"
          type="range"
          value={Math.min(currentTime, duration || currentTime)}
          aria-label="Audio progress"
        />
        <span className="audio-player__time">{formatTime(duration)}</span>
      </div>
    </section>
  );
}
