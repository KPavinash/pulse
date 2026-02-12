export interface User {
    id: string
    username: string
    age: number
    avatar: string
    distance: number
    isOnline: boolean
    status?: string
    bio: string
    role: string
    location: string
    interests: { icon: string; label: string }[]
    photos: string[]
    vibe: string
    hasPulse: boolean
    isVerified: boolean
    isNew: boolean
    isEvent: boolean
    coordinates: {
        lat: number
        lng: number
    }
}

const INTERESTS_POOL = [
    { icon: "🎨", label: "Digital Art" },
    { icon: "✈️", label: "Travel" },
    { icon: "🎮", label: "Gaming" },
    { icon: "🎧", label: "Techno" },
    { icon: "🐕", label: "Dog Lover" },
    { icon: "🍜", label: "Foodie" },
    { icon: "🌱", label: "Sustainability" },
    { icon: "📸", label: "Photography" },
    { icon: "🧘", label: "Meditation" },
    { icon: "📚", label: "Reading" },
    { icon: "🍷", label: "Wine" },
];

const VIBES = ["🍷", "🏋️", "🔥", "💻", "🎨", "🌮", "🍸", "🎵", "🌙", "🚀"];

const ROLES = ["Graphic Designer", "Software Engineer", "Barista", "DJ", "Artist", "Student", "Photographer", "Chef", "Writer", "Musician", "Architect"];
const LOCATIONS = ["Brooklyn, NY", "Hell's Kitchen, NY", "West Village, NY", "Bushwick, NY", "Astoria, NY", "Chelsea, NY", "Lower East Side, NY", "Williamsburg, NY"];
const NAMES = [
    "Alex", "Jordan", "Taylor", "Casey", "Riley", "Jamie", "Morgan", "Quinn", "Avery", "Skyler", "Cameron", "Dakota", "Reese", "Rowan", "Sawyer", "Hayden", "Kai", "Elara", "Leo", "Nova", "Jasper", "Luna", "Finn", "River", "Axel", "Zane", "Cleo", "Milo", "Luca", "Arlo"
];

// Curated high-quality Unsplash portraits
const MALE_PORTRAITS = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513956589380-bad618211cf7?q=80&w=1000&auto=format&fit=crop", // "Tanya" equivalent but male
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop"
];

const FEMALE_PORTRAITS = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506934524189-7b316ae3e794?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514315384763-ba401779410f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514838838751-509b2e04e9c0?q=80&w=1000&auto=format&fit=crop"
];

// High quality lifestyle/aesthetic shots
const LIFESTYLE_SHOTS = [
    "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=800&auto=format&fit=crop", // Cyberpunk city
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop", // Neon
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop", // Event
    "https://images.unsplash.com/photo-1470229722913-7ea0510d9238?q=80&w=800&auto=format&fit=crop", // Party
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop", // Club
    "https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=800&auto=format&fit=crop" // Abstract
];

export function generateDummyUsers(count: number): User[] {
    return Array.from({ length: count }, (_, i) => {
        // Deterministic randomness based on index
        const role = ROLES[i % ROLES.length];
        const location = LOCATIONS[i % LOCATIONS.length];
        const name = NAMES[i % NAMES.length];
        const gender = i % 3 === 0 ? 'women' : 'men'; // Mix genders
        const age = 21 + (i % 15); // Ages 21-35
        const vibe = VIBES[i % VIBES.length];

        // Select avatar based on gender
        const avatarPool = gender === 'women' ? FEMALE_PORTRAITS : MALE_PORTRAITS;
        const avatar = avatarPool[i % avatarPool.length];

        // Pick 3-5 interests
        const numInterests = 3 + (i % 3);
        const shuffledInterests = [...INTERESTS_POOL].sort(() => 0.5 - Math.random()).slice(0, numInterests);

        // Warsaw Center: 52.2297, 21.0122
        // Generate random offset within ~5km
        const lat = 52.2297 + (Math.random() - 0.5) * 0.05;
        const lng = 21.0122 + (Math.random() - 0.5) * 0.08;

        return {
            id: `user-${i}`,
            username: name,
            age,
            avatar,
            distance: Number((Math.random() * 5).toFixed(1)), // 0.1 - 5.0 km
            isOnline: Math.random() > 0.7, // 30% online
            status: Math.random() > 0.8 ? ["Looking for chat", "At the gym", "Working remotely", "Bored"][Math.floor(Math.random() * 4)] : undefined,
            bio: `Just a ${age}-year-old ${role.toLowerCase()} living in ${location}. Love exploring the city and meeting new people.`,
            role,
            location,
            interests: shuffledInterests,
            photos: [
                avatar, // Main HD Portrait
                LIFESTYLE_SHOTS[i % LIFESTYLE_SHOTS.length], // HD Lifestyle 1
                LIFESTYLE_SHOTS[(i + 3) % LIFESTYLE_SHOTS.length] // HD Lifestyle 2 (Offset for variety)
            ],
            vibe,
            hasPulse: Math.random() > 0.6, // 40% have a pulse story
            isVerified: Math.random() > 0.7, // 30% verified
            isNew: Math.random() > 0.8, // 20% new
            isEvent: Math.random() > 0.9, // 10% hosting event
            coordinates: { lat, lng }
        };
    })
}

export function getUserById(id: string): User | undefined {
    // Extract index from "user-X"
    const index = parseInt(id.replace("user-", ""), 10);
    if (isNaN(index)) return undefined;

    // Re-generate user deterministically
    // Ideally we'd memoize or just generate one large array, but for demo this is fine
    const allUsers = generateDummyUsers(index + 10); // Generate enough to likely include it
    return allUsers.find(u => u.id === id);
}
