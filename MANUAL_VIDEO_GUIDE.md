# Manual Video Addition Guide

## 🎬 How to Add Videos Manually

Since the upload functionality is disabled, you can add videos by directly editing the video data file.

### 📁 **File to Edit:**
`lib/video-data.ts`

### 🔧 **How to Add a Video:**

1. **Open** `lib/video-data.ts`
2. **Find the** `defaultVideos` array
3. **Add a new video object** like this:

```typescript
{
  id: "3",
  videoUrl: "/your-video.mp4",  // Put your video file in /public/ folder
  author: {
    username: "your_username",
    avatar: "/placeholder-user.jpg"
  },
  description: "Your video description here! 🌽 #hashtags #corn #farm",
  music: "Your Music Track",
  likes: 1000,
  comments: 50,
  bookmarks: 25,
  shares: 10
}
```

### 📝 **Required Fields:**

- **`id`**: Unique identifier (string)
- **`videoUrl`**: Path to your video file (put in `/public/` folder)
- **`author.username`**: Creator's username (with @)
- **`description`**: Video description with hashtags

### 📝 **Optional Fields:**

- **`author.avatar`**: Profile picture (use existing ones in `/public/`)
- **`music`**: Music track name
- **`likes`, `comments`, `bookmarks`, `shares`**: Engagement numbers

### 📱 **Steps to Add Video:**

1. **Put your video file** in the `/public/` folder (e.g., `/public/my-video.mp4`)
2. **Edit** `lib/video-data.ts`
3. **Add your video object** to the `defaultVideos` array
4. **Save the file**
5. **Refresh your browser**

### 💡 **Tips:**

- **Video format**: MP4 works best
- **File size**: Keep under 50MB for good performance
- **Duration**: 15-60 seconds works well for TikTok-style
- **Vertical videos**: Look best on mobile

### 🎯 **Example:**

```typescript
// In lib/video-data.ts
const defaultVideos: Video[] = [
  // ... existing videos ...
  {
    id: "3",
    videoUrl: "/my-corn-video.mp4",
    author: {
      username: "cornlover123",
      avatar: "/placeholder-user.jpg"
    },
    description: "Amazing corn harvest this year! 🌽 #corn #harvest #farmlife",
    music: "Country Corn Vibes",
    likes: 2500,
    comments: 89,
    bookmarks: 156,
    shares: 67
  }
]
```

That's it! Your video will appear in the feed automatically. 🌽
