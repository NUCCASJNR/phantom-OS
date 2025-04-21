"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Upload } from "lucide-react"

export default function MediaPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [mediaSource, setMediaSource] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"audio" | "video" | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const togglePlay = () => {
    if (!mediaSource) return

    if (mediaType === "audio" && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    } else if (mediaType === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (mediaType === "audio" && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    } else if (mediaType === "video" && videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (mediaType === "audio" && audioRef.current) {
      setDuration(audioRef.current.duration)
    } else if (mediaType === "video" && videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)

    if (mediaType === "audio" && audioRef.current) {
      audioRef.current.currentTime = newTime
    } else if (mediaType === "video" && videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (mediaType === "audio" && audioRef.current) {
      audioRef.current.volume = newVolume / 100
    } else if (mediaType === "video" && videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (mediaType === "audio" && audioRef.current) {
      audioRef.current.muted = !isMuted
    } else if (mediaType === "video" && videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setMediaSource(url)

    if (file.type.startsWith("audio/")) {
      setMediaType("audio")
    } else if (file.type.startsWith("video/")) {
      setMediaType("video")
    }

    // Reset player state
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Media Display */}
      <div className="flex-1 flex items-center justify-center bg-black">
        {mediaType === "video" && mediaSource ? (
          <video
            ref={videoRef}
            src={mediaSource}
            className="max-h-full max-w-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : mediaType === "audio" && mediaSource ? (
          <div className="text-center">
            <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto flex items-center justify-center">
              <Volume2 className="h-16 w-16 text-white" />
            </div>
            <audio
              ref={audioRef}
              src={mediaSource}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        ) : (
          <div className="text-center text-white">
            <Upload className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <p>No media loaded</p>
            <Button variant="outline" onClick={handleFileUpload} className="mt-4">
              Upload Media
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*,video/*"
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        {/* Progress Bar */}
        <div className="flex items-center mb-2">
          <span className="text-xs text-white mr-2">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            disabled={!mediaSource}
            className="flex-1 mx-2"
          />
          <span className="text-xs text-white ml-2">{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white" disabled={!mediaSource}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white h-10 w-10 rounded-full"
              onClick={togglePlay}
              disabled={!mediaSource}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white" disabled={!mediaSource}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white" onClick={toggleMute} disabled={!mediaSource}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              disabled={!mediaSource}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
