// Simple Cloudinary upload without presets
export interface SimpleUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration: number
  format: string
}

// Simple upload function that works without presets
export async function simpleUploadToCloudinary(file: File): Promise<SimpleUploadResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ml_default') // This should work with default settings

  console.log('🚀 Starting simple upload:', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  })

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dfibzn9tz/video/upload',
      {
        method: 'POST',
        body: formData
      }
    )

    console.log('📡 Upload response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Upload failed:', errorText)
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('✅ Upload successful:', result)
    return result
  } catch (error) {
    console.error('❌ Upload error:', error)
    throw error
  }
}

// Even simpler - just upload without any preset
export async function basicUploadToCloudinary(file: File): Promise<SimpleUploadResult> {
  const formData = new FormData()
  formData.append('file', file)
  // No upload_preset - use basic upload

  console.log('🚀 Starting basic upload:', {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  })

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dfibzn9tz/video/upload',
      {
        method: 'POST',
        body: formData
      }
    )

    console.log('📡 Basic upload response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Basic upload failed:', errorText)
      throw new Error(`Basic upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('✅ Basic upload successful:', result)
    return result
  } catch (error) {
    console.error('❌ Basic upload error:', error)
    throw error
  }
}
