// Cloudinary upload utilities
import { cloudinaryConfig } from './video-utils'

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration: number
  format: string
}

export interface UploadOptions {
  folder?: string
  resource_type?: 'video' | 'image'
  quality?: string
  transformation?: string
}

// Upload file to Cloudinary
export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const {
    folder = 'cornhub-videos',
    resource_type = 'video',
    quality = 'auto',
    transformation = 'q_auto,f_mp4'
  } = options

  // Create FormData
  const formData = new FormData()
  formData.append('file', file)
  
  // Use unsigned upload (no preset required)
  formData.append('upload_preset', 'ml_default')
  formData.append('folder', folder)
  formData.append('resource_type', resource_type)
  formData.append('quality', quality)

  try {
    console.log('📤 Uploading to Cloudinary:', {
      cloudName: cloudinaryConfig.cloud_name,
      fileSize: file.size,
      fileName: file.name,
      folder,
      resource_type
    })

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/${resource_type}/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Cloudinary upload failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      throw new Error(`Upload failed: ${response.statusText} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Cloudinary upload successful:', result)
    return result
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error)
    throw new Error('Failed to upload video to Cloudinary')
  }
}

// Generate video URL with transformations
export function getCloudinaryVideoUrl(
  publicId: string,
  transformations: string = 'q_auto,f_mp4,w_720,h_1280,c_fill'
): string {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/video/upload/${transformations}/${publicId}.mp4`
}

// Generate thumbnail URL
export function getCloudinaryThumbnailUrl(
  publicId: string,
  transformations: string = 'w_720,h_1280,c_fill,f_auto,q_auto'
): string {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload/${transformations}/${publicId}.jpg`
}

// Delete video from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = await generateSignature(publicId, timestamp)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/video/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_id: publicId,
          timestamp,
          signature
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete video from Cloudinary')
  }
}

// Generate signature for authenticated requests
async function generateSignature(publicId: string, timestamp: number): Promise<string> {
  const params = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.api_secret}`
  
  // Simple hash function (in production, use crypto.subtle)
  const encoder = new TextEncoder()
  const data = encoder.encode(params)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

// Video optimization presets for Cloudinary
export const CLOUDINARY_PRESETS = {
  vertical: 'q_auto,f_mp4,w_720,h_1280,c_fill',
  landscape: 'q_auto,f_mp4,w_1280,h_720,c_fill',
  mobile: 'q_auto,f_mp4,w_480,h_854,c_fill',
  high_quality: 'q_auto:high,f_mp4,w_1080,h_1920,c_fill',
  compressed: 'q_auto:low,f_mp4,w_720,h_1280,c_fill'
}
