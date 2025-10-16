// Video upload utilities
import { Video } from './video-data'
import { uploadToCloudinary, getCloudinaryVideoUrl, CLOUDINARY_PRESETS } from './cloudinary-upload'
import { simpleUploadToCloudinary, basicUploadToCloudinary } from './simple-cloudinary-upload'

export interface UploadedVideo {
  file: File
  username: string
  description: string
  id: string
}

// Generate a unique ID for new videos
export function generateVideoId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// Convert uploaded video data to Video format with Cloudinary URL
export function createVideoFromUpload(uploadedVideo: UploadedVideo, cloudinaryResult: any): Video {
  const videoId = generateVideoId()
  const optimizedUrl = getCloudinaryVideoUrl(cloudinaryResult.public_id, CLOUDINARY_PRESETS.vertical)
  
  return {
    id: videoId,
    videoUrl: optimizedUrl,
    author: {
      username: uploadedVideo.username,
      avatar: "/placeholder-user.jpg"
    },
    description: uploadedVideo.description,
    music: "Original Sound",
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    bookmarks: Math.floor(Math.random() * 20) + 1,
    shares: Math.floor(Math.random() * 10) + 1
  }
}

// Handle file upload to Cloudinary
export async function handleVideoUpload(uploadedVideo: UploadedVideo): Promise<Video> {
  try {
    console.log('🎬 Starting video upload process...')
    
    // Try simple upload first
    let cloudinaryResult
    try {
      console.log('📤 Attempting simple upload...')
      cloudinaryResult = await simpleUploadToCloudinary(uploadedVideo.file)
    } catch (simpleError) {
      console.log('⚠️ Simple upload failed, trying basic upload...')
      try {
        cloudinaryResult = await basicUploadToCloudinary(uploadedVideo.file)
      } catch (basicError) {
        console.log('⚠️ Basic upload failed, trying original method...')
        cloudinaryResult = await uploadToCloudinary(uploadedVideo.file, {
          folder: 'cornhub-videos',
          resource_type: 'video',
          quality: 'auto',
          transformation: CLOUDINARY_PRESETS.vertical
        })
      }
    }

    console.log('✅ Upload successful, creating video object...')
    
    // Create video object with Cloudinary URL
    const video = createVideoFromUpload(uploadedVideo, cloudinaryResult)
    return video
  } catch (error) {
    console.error('❌ All upload methods failed:', error)
    throw new Error('Failed to upload video. Please check your Cloudinary setup.')
  }
}

// Validate uploaded video
export function validateVideo(file: File, username: string, description: string): string[] {
  const errors: string[] = []
  
  if (!file) {
    errors.push("Please select a video file")
  } else {
    // Check file type
    if (!file.type.startsWith('video/')) {
      errors.push("Please select a valid video file")
    }
    
    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      errors.push("Video file is too large. Please keep it under 50MB")
    }
  }
  
  if (!username.trim()) {
    errors.push("Please enter a username")
  } else if (!username.startsWith('@')) {
    errors.push("Username should start with @")
  }
  
  if (!description.trim()) {
    errors.push("Please enter a video description")
  } else if (description.length > 500) {
    errors.push("Description is too long. Please keep it under 500 characters")
  }
  
  return errors
}
