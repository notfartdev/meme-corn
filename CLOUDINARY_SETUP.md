# Cloudinary Setup Guide

## ✅ Environment Variables (Already Set)

Create a `.env.local` file in your project root with:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dfibzn9tz
NEXT_PUBLIC_CLOUDINARY_API_KEY=426976627892939
CLOUDINARY_API_SECRET=4aVTSalCMGPtV_vFn2z2p3wC09E
CLOUDINARY_URL=cloudinary://426976627892939:4aVTSalCMGPtV_vFn2z2p3wC09E@dfibzn9tz
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default

# Video optimization settings
NEXT_PUBLIC_MAX_VIDEO_SIZE_MB=50
NEXT_PUBLIC_DEFAULT_VIDEO_QUALITY=80
NEXT_PUBLIC_DEFAULT_VIDEO_BITRATE=1M
```

## 🔧 Upload Preset Setup

1. Go to your Cloudinary dashboard: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload**
3. Create a new upload preset:
   - **Preset name**: `ml_default`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `cornhub-videos`
   - **Resource Type**: `Video`
   - **Quality**: `Auto`
   - **Format**: `MP4`

## 🚀 Testing the Upload

1. **Restart your dev server** to load environment variables:
   ```bash
   npm run dev
   ```

2. **Go to `/upload`** page in your app

3. **Upload a video** - it should now upload to Cloudinary!

## 📊 What Happens Now

- ✅ **Videos upload to Cloudinary** (not localStorage)
- ✅ **Automatic optimization** (compression, format conversion)
- ✅ **CDN delivery** (fast loading worldwide)
- ✅ **Real URLs** (not local files)
- ✅ **Persistent storage** (videos stay uploaded)

## 🎯 Benefits

- **25GB free storage** (vs localStorage's ~10MB limit)
- **Automatic video optimization** (smaller files, faster loading)
- **Global CDN** (videos load fast worldwide)
- **Multiple formats** (auto-delivers best format for each device)
- **Thumbnail generation** (automatic video previews)

## 🔍 Troubleshooting

If upload fails:
1. **Check environment variables** are correct
2. **Verify upload preset** exists in Cloudinary dashboard
3. **Check browser console** for error messages
4. **Ensure file size** is under 100MB (Cloudinary free limit)

## 📱 Next Steps

Once working:
- Videos will be stored permanently in Cloudinary
- Feed will load videos from Cloudinary URLs
- Much better performance and reliability!
