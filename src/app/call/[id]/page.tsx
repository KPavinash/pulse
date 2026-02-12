"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getChatById } from "@/lib/dummyChatData"
import { Phone, Video, Mic, MicOff, VideoOff, Volume2, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function CallPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id
    const type = searchParams.get('type') || 'audio' // 'audio' | 'video'

    const chat = id ? getChatById(id) : undefined
    const [status, setStatus] = useState<'calling' | 'ringing' | 'connected'>('calling')
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(type === 'audio')
    const [isSpeakerOn, setIsSpeakerOn] = useState(false)

    useEffect(() => {
        // Simulate connection flow
        const t1 = setTimeout(() => setStatus('ringing'), 1500)
        const t2 = setTimeout(() => setStatus('connected'), 4000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [])

    useEffect(() => {
        if (status === 'connected') {
            const interval = setInterval(() => {
                setDuration(prev => prev + 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [status])

    const formatDuration = (sek: number) => {
        const m = Math.floor(sek / 60).toString().padStart(2, '0')
        const s = (sek % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    if (!chat) return <div className="h-screen bg-black text-white flex items-center justify-center">User not found</div>

    return (
        <div className="h-screen w-full bg-black text-white relative overflow-hidden flex flex-col items-center pt-20 pb-10">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black opacity-80 z-0" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center flex-1 w-full max-w-md">

                {/* Avatar / Video Area */}
                <div className="relative mb-8">
                    {/* Ringing Animation */}
                    {status !== 'connected' && (
                        <>
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-brand-primary/20 blur-xl"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute inset-0 rounded-full bg-brand-secondary/20 blur-md"
                            />
                        </>
                    )}

                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                        <Image
                            src={chat.user.avatar}
                            alt={chat.user.username}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold mb-2">{chat.user.username}</h1>
                    <p className="text-brand-primary/80 font-medium tracking-wide">
                        {status === 'connected' ? formatDuration(duration) : status === 'ringing' ? 'Ringing...' : 'Calling...'}
                    </p>
                </div>

                {/* Video Feed Placeholder (if connected & video on) */}
                {status === 'connected' && !isVideoOff && (
                    <div className="absolute inset-0 z-20 bg-black">
                        <Image src={chat.user.avatar} alt="Video Feed" fill className="object-cover opacity-60 blur-sm scale-110" />
                        <div className="absolute bottom-32 right-6 w-24 h-32 bg-black/50 rounded-xl border border-white/20 overflow-hidden shadow-lg">
                            <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center text-xs text-gray-500">YOU</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="relative z-30 w-full max-w-sm px-8 grid grid-cols-4 gap-4 items-center mb-10">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-4 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>

                <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-4 rounded-full flex items-center justify-center transition-all ${isSpeakerOn ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    <Volume2 className="w-6 h-6" />
                </button>

                <button
                    onClick={() => router.back()}
                    className="p-4 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                >
                    <X className="w-8 h-8" />
                </button>
            </div>
        </div>
    )
}
