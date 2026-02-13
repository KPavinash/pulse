"use client"

import { useNearbyUsers } from "@/hooks/useNearbyUsers"
import dynamic from "next/dynamic"

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex items-center justify-center bg-black text-brand-primary animate-pulse">
            LOADING MAP SATELLITE...
        </div>
    )
})

export default function MapPage() {
    const { users } = useNearbyUsers()

    // Limit to 40 users for cleaner map view
    const displayUsers = users.slice(0, 40);

    return (
        <div className="w-full h-screen bg-background relative">
            <div className="absolute top-4 left-4 z-10 bg-[#4e3fd6] dark:bg-black/60 dark:backdrop-blur-md px-4 py-2 rounded-xl border border-[#5d4ce6] dark:border-white/10">
                <h1 className="text-xl font-bold text-white">Live Map</h1>
                <p className="text-xs text-gray-400">Warsaw, Poland ({displayUsers.length} Users)</p>
            </div>

            <MapComponent users={displayUsers} />
        </div>
    )
}
