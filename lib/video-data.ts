export interface Video {
  id: string
  videoUrl: string
  author: {
    username: string
    avatar: string
  }
  description: string
  music: string
  likes: number
  comments: number
  bookmarks: number
  shares: number
}

import { getStoredVideos } from './video-storage'

// Default videos (fallback if no stored videos)
const defaultVideos: Video[] = [
  {
    id: "1",
    videoUrl: "/video1.mp4",
    author: {
      username: "your_video",
      avatar: "/placeholder-user.jpg",
    },
    description: "Testing my own video! 🌽 #test #myvideo #cornhub",
    music: "Test Track",
    likes: 100,
    comments: 5,
    bookmarks: 10,
    shares: 2,
  },
  {
    id: "2",
    videoUrl: "/video2.mp4",
    author: {
      username: "user167",
      avatar: "/placeholder-user.jpg",
    },
    description: "I just wanted a snack, not a tiny, crunchy attitude problem. The disrespect is real. 🍿🖕 #popcorn #funny #fail #snacktime #unexpected #comedy #viral #fyp #middlefinger #attitude",
    music: "Snack Time Beats",
    likes: 2500,
    comments: 89,
    bookmarks: 156,
    shares: 67,
  },
  {
    id: "3",
    videoUrl: "/video3.mp4",
    author: {
      username: "cornfarmer_mike",
      avatar: "/farmer-avatar.png",
    },
    description: "Amazing corn harvest this year! 🌽 #corn #harvest #farmlife #agriculture",
    music: "Country Harvest Vibes",
    likes: 3200,
    comments: 145,
    bookmarks: 234,
    shares: 89,
  },
  {
    id: "4",
    videoUrl: "/video4.mp4",
    author: {
      username: "cornqueen_sarah",
      avatar: "/woman-farmer.jpg",
    },
    description: "Teaching the next generation about corn farming 🌱 #education #familyfarm #cornplanting",
    music: "Learning Farm Songs",
    likes: 4500,
    comments: 267,
    bookmarks: 189,
    shares: 156,
  },
  {
    id: "5",
    videoUrl: "/video5.mp4",
    author: {
      username: "tractor_driver_tom",
      avatar: "/tractor-driver.jpg",
    },
    description: "New equipment day! This beast is ready for the season 🚜 #newtractor #farmequipment #cornseason",
    music: "Tractor Power Beats",
    likes: 5600,
    comments: 334,
    bookmarks: 278,
    shares: 123,
  },
  {
    id: "6",
    videoUrl: "/video6.mp4",
    author: {
      username: "sunny_acres_farm",
      avatar: "/farm-logo.png",
    },
    description: "Sunrise over the cornfields never gets old 🌅 #farmlife #sunrise #peaceful #cornfields",
    music: "Morning on the Farm",
    likes: 8900,
    comments: 445,
    bookmarks: 567,
    shares: 234,
  },
  {
    id: "7",
    videoUrl: "/video7.mp4",
    author: {
      username: "cornmaze_master",
      avatar: "/maze-designer.jpg",
    },
    description: "Building the world's biggest corn maze! Come visit us this fall 🌽🎃 #cornmaze #fall #halloween",
    music: "Spooky Farm Vibes",
    likes: 12300,
    comments: 678,
    bookmarks: 890,
    shares: 456,
  },
  {
    id: "8",
    videoUrl: "/video8.mp4",
    author: {
      username: "organic_corn_co",
      avatar: "/organic-farm.png",
    },
    description: "100% organic, non-GMO corn ready for market! 🌽✨ #organic #nongmo #healthyfood #localfarm",
    music: "Green Fields Forever",
    likes: 7800,
    comments: 334,
    bookmarks: 445,
    shares: 178,
  },
  {
    id: "9",
    videoUrl: "/video9.mp4",
    author: {
      username: "farm_dog_buddy",
      avatar: "/farm-dog.jpg",
    },
    description: "My dog thinks he's helping with the harvest 😂🐕 #farmdog #funny #cornharvest #dogsofinstagram",
    music: "Who Let The Dogs Out - Farm Edition",
    likes: 15600,
    comments: 890,
    bookmarks: 1234,
    shares: 567,
  },
  {
    id: "10",
    videoUrl: "/video10.mp4",
    author: {
      username: "drone_farmer_tech",
      avatar: "/drone-pilot.png",
    },
    description: "Drone footage of our 1000 acre corn farm 🚁 #dronefootage #farmlife #aerial #cornfields",
    music: "Sky High Country",
    likes: 9800,
    comments: 456,
    bookmarks: 678,
    shares: 234,
  },
  {
    id: "11",
    videoUrl: "/video11.mp4",
    author: {
      username: "corn_enthusiast",
      avatar: "/placeholder-user.jpg",
    },
    description: "Corn facts you didn't know! 🌽 #cornfacts #education #agriculture #farming",
    music: "Educational Beats",
    likes: 4200,
    comments: 189,
    bookmarks: 234,
    shares: 89,
  },
  {
    id: "12",
    videoUrl: "/video12.mp4",
    author: {
      username: "harvest_time",
      avatar: "/farmer-avatar.png",
    },
    description: "Perfect timing for corn harvest! 🕐 #harvest #timing #corn #farmlife",
    music: "Harvest Time Jams",
    likes: 6700,
    comments: 345,
    bookmarks: 456,
    shares: 167,
  },
  {
    id: "13",
    videoUrl: "/video13.mp4",
    author: {
      username: "cornfield_runner",
      avatar: "/woman-farmer.jpg",
    },
    description: "Morning run through the corn maze! 🏃‍♀️ #running #cornmaze #morning #fitness",
    music: "Morning Run Vibes",
    likes: 5400,
    comments: 278,
    bookmarks: 345,
    shares: 123,
  },
  {
    id: "14",
    videoUrl: "/video14.mp4",
    author: {
      username: "corn_photographer",
      avatar: "/placeholder-user.jpg",
    },
    description: "Golden hour in the cornfields 📸 #photography #goldenhour #corn #nature",
    music: "Golden Hour Melodies",
    likes: 8300,
    comments: 567,
    bookmarks: 789,
    shares: 345,
  },
  {
    id: "15",
    videoUrl: "/video15.mp4",
    author: {
      username: "corn_cooking_chef",
      avatar: "/farmer-avatar.png",
    },
    description: "Cooking with fresh corn from the farm! 👨‍🍳 #cooking #corn #fresh #recipes",
    music: "Cooking with Corn",
    likes: 9200,
    comments: 678,
    bookmarks: 890,
    shares: 456,
  },
  {
    id: "16",
    videoUrl: "/video16.mp4",
    author: {
      username: "corn_weather_watcher",
      avatar: "/placeholder-user.jpg",
    },
    description: "Weather conditions perfect for corn growth! 🌤️ #weather #corn #growth #farming",
    music: "Weather Watch Sounds",
    likes: 3600,
    comments: 189,
    bookmarks: 234,
    shares: 89,
  },
  {
    id: "17",
    videoUrl: "/video17.mp4",
    author: {
      username: "corn_innovation_lab",
      avatar: "/tractor-driver.jpg",
    },
    description: "New corn varieties in development! 🧬 #innovation #corn #research #agriculture",
    music: "Innovation Station",
    likes: 7100,
    comments: 445,
    bookmarks: 567,
    shares: 234,
  },
  {
    id: "18",
    videoUrl: "/video18.mp4",
    author: {
      username: "corn_market_trader",
      avatar: "/farm-logo.png",
    },
    description: "Corn market prices looking good this season! 📈 #market #corn #prices #trading",
    music: "Market Pulse",
    likes: 4800,
    comments: 267,
    bookmarks: 345,
    shares: 123,
  },
  {
    id: "19",
    videoUrl: "/video19.mp4",
    author: {
      username: "corn_festival_organizer",
      avatar: "/maze-designer.jpg",
    },
    description: "Annual corn festival coming up! 🎪 #festival #corn #celebration #community",
    music: "Festival Fun",
    likes: 11200,
    comments: 789,
    bookmarks: 1234,
    shares: 567,
  },
]

// Get videos from storage or return defaults
export function getVideos(): Video[] {
  if (typeof window === 'undefined') {
    return defaultVideos
  }
  
  const storedVideos = getStoredVideos()
  return storedVideos.length > 0 ? storedVideos : defaultVideos
}

// Export videos array for backward compatibility
export const videos = getVideos()
