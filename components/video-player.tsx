"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Search, Home, Compass, Plus, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Video } from "@/lib/video-data"

interface VideoPlayerProps {
  video: Video
  isActive: boolean
  hasUserInteracted: boolean
}

export default function VideoPlayer({ video, isActive, hasUserInteracted }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isActive && hasUserInteracted) {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            playPromiseRef.current = videoElement.play()
            return playPromiseRef.current
          })
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            // Ignore AbortError as it's expected when switching videos
            if (error.name !== "AbortError") {
              console.error("[v0] Video play error:", error)
            }
            setIsPlaying(false)
          })
      } else {
        playPromiseRef.current = videoElement.play()
        playPromiseRef.current
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              console.error("[v0] Video play error:", error)
            }
            setIsPlaying(false)
          })
      }
    } else {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            videoElement.pause()
            videoElement.currentTime = 0 // Reset to beginning
            setIsPlaying(false)
            playPromiseRef.current = null
          })
          .catch(() => {
            videoElement.pause()
            videoElement.currentTime = 0 // Reset to beginning
            setIsPlaying(false)
            playPromiseRef.current = null
          })
      } else {
        videoElement.pause()
        videoElement.currentTime = 0 // Reset to beginning
        setIsPlaying(false)
      }
    }
  }, [isActive, hasUserInteracted])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            videoElement.pause()
            videoElement.currentTime = 0 // Reset to beginning
            setIsPlaying(false)
            playPromiseRef.current = null
          })
          .catch(() => {
            videoElement.pause()
            videoElement.currentTime = 0 // Reset to beginning
            setIsPlaying(false)
            playPromiseRef.current = null
          })
      } else {
        videoElement.pause()
        videoElement.currentTime = 0 // Reset to beginning
        setIsPlaying(false)
      }
    } else {
      playPromiseRef.current = videoElement.play()
      playPromiseRef.current
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("[v0] Video play error:", error)
          }
          setIsPlaying(false)
        })
    }
  }

  return (
    <div className="relative h-screen w-full max-w-[500px] mx-auto snap-item bg-black flex items-center justify-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20" onClick={togglePlay}>
          <div className="rounded-full bg-background/80 p-6">
            <Play className="h-12 w-12 text-foreground" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        <div className="text-base font-bold text-white">🌽 CornHub</div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Search className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-4 right-4 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-bold text-base">@{video.author.username}</span>
        </div>
        <p className="mb-3 text-sm leading-relaxed line-clamp-2">{video.description}</p>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-black/60 backdrop-blur-md py-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-0.5 text-white hover:bg-white/10 h-auto py-2"
        >
          <Home className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Home</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-0.5 text-white/60 hover:bg-white/10 h-auto py-2"
        >
          <Compass className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Discover</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center text-white/30 h-auto py-2 px-4"
          disabled
        >
          <div className="flex items-center gap-1">
            <div className="h-6 w-[2px] bg-gray-500 rounded-full" />
            <Plus className="h-7 w-7" strokeWidth={2.5} />
            <div className="h-6 w-[2px] bg-gray-500 rounded-full" />
          </div>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-0.5 text-white/60 hover:bg-white/10 h-auto py-2"
        >
          <Mail className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Inbox</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-0.5 text-white/60 hover:bg-white/10 h-auto py-2"
        >
          <User className="h-6 w-6" strokeWidth={2} />
          <span className="text-[10px] font-medium">Profile</span>
        </Button>
      </div>
    </div>
  )
}
