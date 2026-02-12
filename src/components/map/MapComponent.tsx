"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { User } from "@/lib/dummyData"
import L from "leaflet"
import Link from "next/link"
import Image from "next/image"

// Fix Leaflet's default icon path issues in Next.js
// We'll use custom divIcons anyway, but this prevents 404s for default markers
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    users: User[]
}

export default function MapComponent({ users }: MapComponentProps) {
    // Warsaw Center
    const center: [number, number] = [52.2297, 21.0122]

    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            style={{ background: '#1a1a1a' }}
        >
            {/* Dark Mode Tiles */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {users.map((user) => {
                // Create custom HTML icon with user avatar
                const customIcon = L.divIcon({
                    className: "bg-transparent",
                    html: `
                        <div class="relative w-10 h-10">
                            <div class="absolute inset-0 rounded-full border-2 ${user.isOnline ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'border-gray-500'} overflow-hidden bg-black">
                                <img src="${user.avatar}" class="w-full h-full object-cover" />
                            </div>
                            <div class="absolute -bottom-1 -right-1 bg-black/80 text-[10px] px-1 rounded text-white border border-white/20">
                                ${user.vibe}
                            </div>
                        </div>
                    `,
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                })

                return (
                    <Marker
                        key={user.id}
                        position={[user.coordinates.lat, user.coordinates.lng]}
                        icon={customIcon}
                    >
                        <Popup className="custom-popup">
                            <div className="min-w-[150px] p-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                        <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{user.username}, {user.age}</h3>
                                        <p className="text-xs text-brand-primary">{user.role}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">"{user.bio}"</p>
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="block w-full text-center py-1 bg-brand-primary text-white text-xs font-bold rounded hover:bg-brand-primary/90 transition-colors"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}
