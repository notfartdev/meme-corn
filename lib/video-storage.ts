// Simple video storage using localStorage (for demo purposes)
// In a real app, this would be a database
import { Video } from './video-data'

const STORAGE_KEY = 'cornhub_videos'

// Get all videos from storage
export function getStoredVideos(): Video[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading videos from storage:', error)
    return []
  }
}

// Save videos to storage
export function saveVideos(videos: Video[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
  } catch (error) {
    console.error('Error saving videos to storage:', error)
  }
}

// Add a new video
export function addVideo(video: Video): void {
  const videos = getStoredVideos()
  videos.unshift(video) // Add to beginning of array
  saveVideos(videos)
}

// Get video by ID
export function getVideoById(id: string): Video | null {
  const videos = getStoredVideos()
  return videos.find(video => video.id === id) || null
}

// Update video
export function updateVideo(id: string, updates: Partial<Video>): void {
  const videos = getStoredVideos()
  const index = videos.findIndex(video => video.id === id)
  
  if (index !== -1) {
    videos[index] = { ...videos[index], ...updates }
    saveVideos(videos)
  }
}

// Delete video
export function deleteVideo(id: string): void {
  const videos = getStoredVideos()
  const filtered = videos.filter(video => video.id !== id)
  saveVideos(filtered)
}

// Clear all videos (useful for testing)
export function clearAllVideos(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
