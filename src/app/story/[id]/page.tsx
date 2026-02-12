"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { X, Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getUserById } from "@/lib/dummyData"

export default function StoryPage() {
    const params = useParams()
    const router = useRouter()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    // Get user data
    const user = id ? getUserById(id) : undefined

    // Story State
    const [progress, setProgress] = useState(0)
    const [storyIndex, setStoryIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Stories (Mock data based on user photos)
    const stories = user ? [
        { type: 'image', url: user.photos[1], duration: 5000 },
        { type: 'image', url: user.photos[2], duration: 5000 },
        { type: 'image', url: user.avatar, duration: 5000 },
    ] : []

    const currentStory = stories[storyIndex]

    // Timer Logic
    useEffect(() => {
        if (!currentStory || isPaused) return

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    // Next story
                    if (storyIndex < stories.length - 1) {
                        setStoryIndex(i => i + 1)
                        return 0
                    } else {
                        router.back() // Close if finished
                        return 100
                    }
                }
                return prev + (100 / (currentStory.duration / 100))
            })
        }, 100)

        return () => clearInterval(interval)
    }, [storyIndex, isPaused, currentStory, router, stories.length])

    // Tap Navigation
    const handleTap = (e: React.MouseEvent) => {
        const width = window.innerWidth
        const x = e.clientX

        if (x < width / 3) {
            // Previous
            if (storyIndex > 0) {
                setStoryIndex(i => i - 1)
                setProgress(0)
            }
        } else {
            // Next
            if (storyIndex < stories.length - 1) {
                setStoryIndex(i => i + 1)
                setProgress(0)
            } else {
                router.back()
            }
        }
    }

    if (!user || !currentStory) return <div className="bg-black h-screen w-full" />

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Story Content */}
            <div
                className="relative flex-1 bg-gray-900"
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onClick={handleTap}
            >
                {/* Progress Bars */}
                <div className="absolute top-4 left-2 right-2 flex gap-1 z-20">
                    {stories.map((_, i) => (
                        <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={{ width: i < storyIndex ? "100%" : "0%" }}
                                animate={{ width: i === storyIndex ? `${progress}%` : i < storyIndex ? "100%" : "0%" }}
                                transition={{ duration: 0 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-20 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden relative">
                            <Image src={user.avatar} alt={user.username} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-sm drop-shadow-md">{user.username}</span>
                        <span className="text-white/60 text-xs">2h ago</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MoreHorizontal className="w-6 h-6 drop-shadow-md" />
                        <div
                            className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-all border border-white/10 shadow-lg group"
                            onClick={(e) => { e.stopPropagation(); router.back(); }}
                        >
                            <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-white tracking-wide">CLOSE</span>
                        </div>
                    </div>
                </div>

                {/* Media */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={storyIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentStory.url}
                            alt="Story"
                            fill
                            className="object-contain bg-black/50 backdrop-blur-3xl"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Reply */}
            <div className="p-4 pb-6 bg-black flex items-center gap-4 z-20">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder={`Message ${user.username}...`}
                        className="w-full bg-transparent border border-white/20 rounded-full py-3 px-5 text-white placeholder:text-gray-400 focus:border-white/50 focus:outline-none"
                    />
                </div>
                <Heart className="w-8 h-8 text-white hover:text-red-500 transition-colors cursor-pointer" />
                <Send className="w-7 h-7 text-white -rotate-12 cursor-pointer" />
            </div>
        </div>
    )
}
