export type Event = {
  id: string;
  title: string;
  opponent: string;
  venue: string;
  date: string;
  time: string;
  theme?: string;
  status: "upcoming" | "live" | "completed";
  sport: string;
  momentsCount: number;
};

export type Moment = {
  id: string;
  eventId: string;
  time: string;
  title: string;
  description: string;
  owner: string;
  type: "scheduled" | "trigger";
  triggerCondition?: string;
  status: "pending" | "active" | "completed";
  assets: Asset[];
  sponsor?: string;
};

export type Asset = {
  id: string;
  name: string;
  type: "video" | "audio" | "graphic" | "script";
  url?: string;
  duration?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  logo?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  activationsTarget: number;
  activationsCompleted: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  assignedMoments: number;
};

export const mockEvents: Event[] = [
  {
    id: "evt-001",
    title: "Home Opener vs Lions",
    opponent: "Metro Lions",
    venue: "Thunder Arena",
    date: "2026-01-18",
    time: "7:00 PM",
    theme: "Fan Appreciation Night",
    status: "upcoming",
    sport: "Basketball",
    momentsCount: 24,
  },
  {
    id: "evt-002",
    title: "Rivalry Game",
    opponent: "State Wildcats",
    venue: "Thunder Arena",
    date: "2026-01-25",
    time: "3:00 PM",
    theme: "Throwback Night",
    status: "upcoming",
    sport: "Basketball",
    momentsCount: 28,
  },
  {
    id: "evt-003",
    title: "Conference Matchup",
    opponent: "Valley Hawks",
    venue: "Thunder Arena",
    date: "2026-01-11",
    time: "7:30 PM",
    status: "completed",
    sport: "Basketball",
    momentsCount: 22,
  },
];

export const mockMoments: Moment[] = [
  {
    id: "mom-001",
    eventId: "evt-001",
    time: "-0:30:00",
    title: "Doors Open",
    description: "Main gates open, concessions active",
    owner: "Operations",
    type: "scheduled",
    status: "pending",
    assets: [],
  },
  {
    id: "mom-002",
    eventId: "evt-001",
    time: "-0:15:00",
    title: "DJ Warmup Set",
    description: "High energy playlist to build atmosphere",
    owner: "Audio Team",
    type: "scheduled",
    status: "pending",
    assets: [
      { id: "ast-001", name: "Warmup Playlist", type: "audio", duration: "15:00" },
    ],
  },
  {
    id: "mom-003",
    eventId: "evt-001",
    time: "-0:05:00",
    title: "Sponsor Video - AutoMax",
    description: "30-second sponsor spot on jumbotron",
    owner: "Video Production",
    type: "scheduled",
    status: "pending",
    sponsor: "AutoMax Dealerships",
    assets: [
      { id: "ast-002", name: "AutoMax Promo", type: "video", duration: "0:30" },
    ],
  },
  {
    id: "mom-004",
    eventId: "evt-001",
    time: "-0:02:00",
    title: "Starting Lineup Intro",
    description: "Player introductions with graphics and pyro",
    owner: "Game Experience",
    type: "scheduled",
    status: "pending",
    assets: [
      { id: "ast-003", name: "Lineup Graphics", type: "graphic" },
      { id: "ast-004", name: "Intro Script", type: "script" },
    ],
  },
  {
    id: "mom-005",
    eventId: "evt-001",
    time: "0:00:00",
    title: "Tip-Off",
    description: "Game begins",
    owner: "Officials",
    type: "scheduled",
    status: "pending",
    assets: [],
  },
  {
    id: "mom-006",
    eventId: "evt-001",
    time: "Q1",
    title: "First Timeout - T-Shirt Toss",
    description: "Crowd engagement during first media timeout",
    owner: "Promotions",
    type: "trigger",
    triggerCondition: "First media timeout of Q1",
    status: "pending",
    sponsor: "Campus Bookstore",
    assets: [],
  },
  {
    id: "mom-007",
    eventId: "evt-001",
    time: "Q2",
    title: "Halftime Show Setup",
    description: "Transition to halftime entertainment",
    owner: "Stage Manager",
    type: "trigger",
    triggerCondition: "End of Q2",
    status: "pending",
    assets: [
      { id: "ast-005", name: "Halftime Script", type: "script" },
    ],
  },
  {
    id: "mom-008",
    eventId: "evt-001",
    time: "HT",
    title: "Halftime Performance",
    description: "Dance team and local performer",
    owner: "Entertainment",
    type: "scheduled",
    status: "pending",
    assets: [
      { id: "ast-006", name: "Performance Audio", type: "audio", duration: "8:00" },
    ],
  },
];

export const mockSponsors: Sponsor[] = [
  {
    id: "sp-001",
    name: "AutoMax Dealerships",
    tier: "platinum",
    activationsTarget: 12,
    activationsCompleted: 8,
  },
  {
    id: "sp-002",
    name: "First National Bank",
    tier: "gold",
    activationsTarget: 8,
    activationsCompleted: 6,
  },
  {
    id: "sp-003",
    name: "Campus Bookstore",
    tier: "silver",
    activationsTarget: 6,
    activationsCompleted: 4,
  },
  {
    id: "sp-004",
    name: "Pizza Palace",
    tier: "bronze",
    activationsTarget: 4,
    activationsCompleted: 3,
  },
];

export const mockTeam: TeamMember[] = [
  { id: "tm-001", name: "Sarah Chen", role: "Game Experience Director", assignedMoments: 8 },
  { id: "tm-002", name: "Mike Torres", role: "Video Production Lead", assignedMoments: 6 },
  { id: "tm-003", name: "Lisa Park", role: "Audio Engineer", assignedMoments: 5 },
  { id: "tm-004", name: "James Wilson", role: "Promotions Coordinator", assignedMoments: 7 },
  { id: "tm-005", name: "Alex Rivera", role: "Sponsorship Manager", assignedMoments: 4 },
];
