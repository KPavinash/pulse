import { useEffect, useState } from 'react'
import { generateDummyUsers, User } from '@/lib/dummyData'

export function useNearbyUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState<{ lat: number; long: number } | null>(null)

    useEffect(() => {
        // 1. Get Device Location
        if (!navigator.geolocation) {
            console.warn('Geolocation is not supported by this browser.')
            loadFallbackData()
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setLocation({ lat: latitude, long: longitude })
                // Simulate delay
                setTimeout(() => loadFallbackData(), 500)
            },
            (error) => {
                console.error('Error getting location:', error)
                loadFallbackData()
            }
        )
    }, [])

    function loadFallbackData() {
        setUsers(generateDummyUsers(2000))
        setLoading(false)
    }

    return { users, loading, location }
}
