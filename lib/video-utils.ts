// Video optimization utilities
export interface VideoOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  bitrate?: string;
  duration?: number; // max duration in seconds
}

export interface OptimizedVideo {
  originalUrl: string;
  optimizedUrl: string;
  thumbnailUrl?: string;
  size: {
    original: number; // bytes
    optimized: number; // bytes
  };
  duration: number; // seconds
  resolution: string;
}

// Cloudinary configuration
export const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfibzn9tz',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '426976627892939',
  api_secret: process.env.CLOUDINARY_API_SECRET || '4aVTSalCMGPtV_vFn2z2p3wC09E',
  upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'
}

// Generate optimized video URL using Cloudinary transformations
export function getOptimizedVideoUrl(
  publicId: string, 
  options: VideoOptimizationOptions = {}
): string {
  const {
    maxWidth = 720,
    maxHeight = 1280,
    quality = 80,
    bitrate = '1m'
  } = options;

  const transformations = [
    `w_${maxWidth},h_${maxHeight},c_fill`,
    `q_${quality}`,
    `br_${bitrate}`,
    'f_mp4',
    'vc_h264'
  ].join(',');

  return `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/video/upload/${transformations}/${publicId}.mp4`;
}

// Generate thumbnail URL
export function getThumbnailUrl(publicId: string): string {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloud_name}/image/upload/w_720,h_1280,c_fill,f_auto,q_auto/${publicId}.jpg`;
}

// FFmpeg compression command (for local optimization)
export function getFFmpegCommand(
  inputPath: string,
  outputPath: string,
  options: VideoOptimizationOptions = {}
): string {
  const {
    maxWidth = 720,
    maxHeight = 1280,
    quality = 28, // lower = better quality, higher = smaller file
    bitrate = '1M'
  } = options;

  return `ffmpeg -i "${inputPath}" -vcodec libx264 -crf ${quality} -preset fast -vf "scale=${maxWidth}:${maxHeight}:force_original_aspect_ratio=decrease,pad=${maxWidth}:${maxHeight}:(ow-iw)/2:(oh-ih)/2" -maxrate ${bitrate} -bufsize ${bitrate} -acodec aac -ar 44100 -b:a 128k -movflags +faststart "${outputPath}"`;
}

// Video size recommendations
export const VIDEO_RECOMMENDATIONS = {
  // For TikTok-style vertical videos
  vertical: {
    width: 720,
    height: 1280,
    bitrate: '1M',
    quality: 28,
    maxDuration: 60
  },
  // For landscape videos
  landscape: {
    width: 1280,
    height: 720,
    bitrate: '2M',
    quality: 28,
    maxDuration: 60
  },
  // For mobile-optimized
  mobile: {
    width: 480,
    height: 854,
    bitrate: '500k',
    quality: 32,
    maxDuration: 30
  }
};

// Calculate estimated file size
export function estimateFileSize(
  duration: number, // seconds
  bitrate: string, // e.g., "1M", "500k"
  audioBitrate: string = "128k"
): number {
  const videoBitrateBytes = parseInt(bitrate.replace('k', '').replace('M', '000')) * 1000;
  const audioBitrateBytes = parseInt(audioBitrate.replace('k', '')) * 1000;
  const totalBitrateBytes = videoBitrateBytes + audioBitrateBytes;
  
  return (totalBitrateBytes * duration) / 8; // Convert to bytes
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
