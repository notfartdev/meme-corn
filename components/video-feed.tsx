"use client"

import { useEffect, useRef, useState } from "react"
import VideoPlayer from "./video-player"
import { getVideos } from "@/lib/video-data"

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [videos, setVideos] = useState(getVideos())

  // Global click handler to enable autoplay for all videos
  useEffect(() => {
    const handleGlobalClick = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
      }
    }

    document.addEventListener('click', handleGlobalClick, { once: true })
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [hasUserInteracted])

  // Listen for new video uploads
  useEffect(() => {
    const handleStorageChange = () => {
      setVideos(getVideos())
    }

    window.addEventListener('storage', handleStorageChange)
    // Also check for updates every 2 seconds (for same-tab updates)
    const interval = setInterval(handleStorageChange, 2000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const videoHeight = container.clientHeight
      const newIndex = Math.round(scrollTop / videoHeight)

      if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
        setCurrentVideoIndex(newIndex)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [currentVideoIndex])

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div ref={containerRef} className="h-screen w-full max-w-[500px] overflow-y-scroll snap-container hide-scrollbar">
        {videos.map((video, index) => (
          <VideoPlayer 
            key={video.id} 
            video={video} 
            isActive={index === currentVideoIndex} 
            hasUserInteracted={hasUserInteracted}
          />
        ))}
      </div>
      
      {/* Click to start overlay */}
      {!hasUserInteracted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🌽</div>
            <h2 className="text-2xl font-bold mb-2">Welcome to CornHub!</h2>
            <p className="text-lg mb-4">Click anywhere to start watching</p>
            <div className="text-sm text-gray-300">Scroll to discover more corn content</div>
          </div>
        </div>
      )}
    </div>
  )
}
