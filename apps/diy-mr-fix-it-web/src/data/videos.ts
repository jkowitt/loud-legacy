export type VideoTutorial = {
  title: string;
  duration: string;
  platform: "YouTube" | "TikTok";
  category: string;
  videoId: string;
};

export const videoTutorials: VideoTutorial[] = [
  {
    title: "Stop a Running Toilet",
    duration: "6:32",
    platform: "YouTube",
    category: "Plumbing",
    videoId: "dQw4w9WgXcQ"
  },
  {
    title: "Patch Drywall Like a Pro",
    duration: "9:04",
    platform: "YouTube",
    category: "Painting & Finishing",
    videoId: "V-_O7nl0Ii0"
  },
  {
    title: "Reset a GFCI Outlet",
    duration: "0:59",
    platform: "TikTok",
    category: "Electrical",
    videoId: "short-reset-gfci"
  }
];
