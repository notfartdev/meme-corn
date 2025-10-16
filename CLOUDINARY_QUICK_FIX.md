# Quick Fix for Cloudinary Upload

## 🚨 Current Issue
Upload is failing because we need to set up the upload preset in Cloudinary.

## 🔧 Quick Fix (2 minutes)

### Step 1: Go to Cloudinary Dashboard
1. Open: https://cloudinary.com/console
2. Login with your account

### Step 2: Create Upload Preset
1. Go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Fill in:
   - **Preset name**: `ml_default`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `cornhub-videos`
   - **Resource Type**: `Video`
   - **Quality**: `Auto`
   - **Format**: `MP4`
5. Click **Save**

### Step 3: Test Upload
1. Go back to your app: http://localhost:3001/upload
2. Try uploading a video again
3. Should work now! ✅

## 🔄 Alternative: Use Signed Upload

If you prefer signed uploads, we can use your API secret for authentication instead of presets.

## 📱 What Happens After Fix

- ✅ Videos upload to Cloudinary successfully
- ✅ Automatic optimization and compression
- ✅ Real URLs in your video feed
- ✅ Persistent storage (won't disappear)
- ✅ Global CDN delivery

## 🆘 Still Having Issues?

Let me know and I can:
1. Switch to signed upload method
2. Use a different upload approach
3. Help debug the specific error

The preset setup is the most common issue - once that's done, everything should work perfectly! 🌽
