"use client"

import { useState, useEffect } from "react"
import VideoOptimizer from "@/components/video-optimizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatFileSize } from "@/lib/video-utils"
import { handleVideoUpload, validateVideo } from "@/lib/video-upload"
import { addVideo } from "@/lib/video-storage"

export default function UploadPage() {
  // Redirect to main page since upload is disabled
  useEffect(() => {
    window.location.href = '/'
  }, [])

  const [optimizedFile, setOptimizedFile] = useState<File | null>(null)
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleOptimize = (file: File, options: any) => {
    // In a real app, you'd upload to Cloudinary or compress with FFmpeg
    console.log("Optimizing video:", file.name, "with options:", options)
    setOptimizedFile(file)
  }

  const handleUpload = async () => {
    if (!optimizedFile || !username || !description) {
      setUploadError("Please fill in all fields")
      return
    }

    // Validate the upload
    const errors = validateVideo(optimizedFile, username, description)
    if (errors.length > 0) {
      setUploadError(errors.join(", "))
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      console.log("🚀 Starting upload to Cloudinary...")
      
      // Create the video data
      const videoData = {
        file: optimizedFile,
        username,
        description,
        id: Date.now().toString()
      }

      // Upload the video to Cloudinary
      console.log("📤 Uploading file:", optimizedFile.name, "Size:", formatFileSize(optimizedFile.size))
      const newVideo = await handleVideoUpload(videoData)
      
      console.log("✅ Upload successful! Video URL:", newVideo.videoUrl)
      
      // Save to storage
      addVideo(newVideo)
      
      // Reset form
      setOptimizedFile(null)
      setUsername("")
      setDescription("")
      
      alert("🎉 Video uploaded to Cloudinary successfully! Check the main feed.")
    } catch (error) {
      console.error("❌ Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🌽 Upload to CornHub</h1>
          <p className="text-gray-400">Share your corn content with the world!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Optimizer */}
          <VideoOptimizer onOptimize={handleOptimize} />

          {/* Upload Form */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Video Details</CardTitle>
              <CardDescription className="text-gray-400">
                Add your video information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  placeholder="@your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your video... #corn #farm #funny"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              {optimizedFile && (
                <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <div className="text-green-400 text-sm font-medium">✅ Video Ready</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {optimizedFile.name} ({formatFileSize(optimizedFile.size)})
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <div className="text-red-400 text-sm font-medium">❌ Error</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {uploadError}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleUpload}
                disabled={!optimizedFile || !username || !description || isUploading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
              >
                {isUploading ? "Uploading..." : "Upload to CornHub"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">📋 Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2">
            <div>• <strong>Video Format:</strong> MP4 recommended</div>
            <div>• <strong>Duration:</strong> 15-60 seconds works best</div>
            <div>• <strong>Size:</strong> Keep under 50MB for fast loading</div>
            <div>• <strong>Content:</strong> Farm, corn, or agriculture related preferred</div>
            <div>• <strong>Quality:</strong> 720p or 1080p recommended</div>
          </CardContent>
        </Card>

        {/* Back to Feed */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            ← Back to Feed
          </Button>
        </div>
      </div>
    </div>
  )
}
