"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatFileSize, estimateFileSize, VIDEO_RECOMMENDATIONS } from "@/lib/video-utils"

interface VideoOptimizerProps {
  onOptimize?: (file: File, options: any) => void
}

export default function VideoOptimizer({ onOptimize }: VideoOptimizerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [optimizationPreset, setOptimizationPreset] = useState<string>("vertical")
  const [estimatedSize, setEstimatedSize] = useState<number>(0)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Estimate optimized size
      const preset = VIDEO_RECOMMENDATIONS[optimizationPreset as keyof typeof VIDEO_RECOMMENDATIONS]
      const estimated = estimateFileSize(30, preset.bitrate) // Assume 30 seconds for estimation
      setEstimatedSize(estimated)
    }
  }

  const handleOptimize = () => {
    if (selectedFile && onOptimize) {
      const preset = VIDEO_RECOMMENDATIONS[optimizationPreset as keyof typeof VIDEO_RECOMMENDATIONS]
      onOptimize(selectedFile, preset)
    }
  }

  const presets = [
    { key: "vertical", label: "Vertical (TikTok-style)", description: "720x1280, 1M bitrate" },
    { key: "landscape", label: "Landscape", description: "1280x720, 2M bitrate" },
    { key: "mobile", label: "Mobile Optimized", description: "480x854, 500k bitrate" }
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Video Optimizer</CardTitle>
        <CardDescription>
          Compress your videos for better performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="video-file">Select Video</Label>
          <Input
            id="video-file"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="mt-1"
          />
        </div>

        {selectedFile && (
          <div className="space-y-2">
            <div className="text-sm">
              <strong>Original:</strong> {formatFileSize(selectedFile.size)}
            </div>
            <div className="text-sm">
              <strong>Estimated optimized:</strong> {formatFileSize(estimatedSize)}
            </div>
            <div className="text-sm text-green-600">
              <strong>Size reduction:</strong> ~{Math.round((1 - estimatedSize / selectedFile.size) * 100)}%
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="preset">Optimization Preset</Label>
          <Select value={optimizationPreset} onValueChange={setOptimizationPreset}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset) => (
                <SelectItem key={preset.key} value={preset.key}>
                  <div>
                    <div className="font-medium">{preset.label}</div>
                    <div className="text-xs text-gray-500">{preset.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleOptimize} 
          disabled={!selectedFile}
          className="w-full"
        >
          Optimize Video
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <div>💡 <strong>Tips:</strong></div>
          <div>• Keep videos under 60 seconds</div>
          <div>• Use vertical format for best mobile experience</div>
          <div>• Compress before uploading for faster loading</div>
        </div>
      </CardContent>
    </Card>
  )
}
