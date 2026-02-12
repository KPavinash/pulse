"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Settings, Camera, MapPin, BadgeCheck, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
    return (
        <div className="min-h-screen w-full bg-black text-white pb-24 overflow-x-hidden relative">
            {/* Background: Blurred Urban Cityscape */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center opacity-60 pointer-events-none"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop')", // Cityscape placeholder
                    filter: "blur(8px) brightness(0.4)"
                }}
            />
            {/* Fallback gradient if image fails/loads slow */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-purple-900/20 to-black pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center p-6 pt-8">
                <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    Profile
                </h1>
                <div className="flex gap-4">
                    <Button size="icon" variant="ghost" className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-primary hover:bg-white/20 hover:text-brand-primary shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <main className="relative z-10 px-6 space-y-8">
                {/* Profile Grid */}
                <div className="grid grid-cols-[1.5fr_1fr] gap-4 h-auto aspect-[4/3]">
                    {/* Main Avatar */}
                    <div className="relative rounded-[2rem] overflow-hidden border-2 border-brand-primary/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] group">
                        {/* Variation 1: Main Portrait */}
                        <Image
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
                            alt="Alex Rivera"
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* MAIN Tag */}
                        <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-brand-primary text-black font-bold text-xs tracking-widest shadow-[0_0_10px_rgba(168,85,247,0.8)] border border-brand-primary">
                                MAIN
                            </span>
                        </div>
                    </div>

                    {/* Secondary Photos Column */}
                    <div className="flex flex-col gap-4 h-full">
                        {/* Variation 2: Lifestyle/Side Profile */}
                        <div className="relative flex-1 rounded-[1.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                            <Image
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
                                alt="Side Profile"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        {/* Variation 3: Artistic/Mood */}
                        <div className="relative flex-1 rounded-[1.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                            <Image
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
                                alt="Artistic Shot"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Identity Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Alex Rivera, 26
                            </h2>
                            <div className="flex items-center gap-2 text-brand-primary/90 mt-1 font-medium tracking-wide">
                                <BadgeCheck className="w-5 h-5 fill-brand-primary text-black" />
                                <span className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Verified</span>
                                <span className="text-white/40">•</span>
                                <span className="text-gray-300">Brooklyn, NY</span>
                            </div>
                        </div>

                        <Button className="rounded-full bg-brand-primary hover:bg-brand-primary/80 text-black font-bold px-6 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-brand-primary/50 transition-all hover:scale-105 active:scale-95">
                            Edit Profile
                        </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {["THEY / THEM", "QUEER", "NON-BINARY"].map((tag, i) => (
                            <span
                                key={tag}
                                className={`
                  px-4 py-1.5 rounded-full text-xs font-bold tracking-wider backdrop-blur-md border 
                  ${i === 0 ? 'bg-brand-primary/20 border-brand-primary/50 text-brand-primary shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                                        i === 1 ? 'bg-brand-secondary/20 border-brand-secondary/50 text-brand-secondary shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                                            'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    }
                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* About Me */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <Sparkles className="w-5 h-5 text-brand-primary" />
                        <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">About Me</span>
                    </h3>
                    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 leading-relaxed shadow-lg">
                        <p>
                            Graphic designer by day, amateur DJ by night. 🏳️‍🌈 Living my best life in Brooklyn. Coffee enthusiast, vintage vinyl collector, and always down for a spontaneous gallery hop. Looking for someone to share good vibes and even better tacos with.
                        </p>
                    </div>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" />
                        <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Interests</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { icon: "🎨", label: "Digital Art" },
                            { icon: "✈️", label: "Travel" },
                            { icon: "🎮", label: "Gaming" },
                            { icon: "🎧", label: "Techno" },
                            { icon: "🐕", label: "Dog Lover" },
                            { icon: "🍜", label: "Foodie" },
                            { icon: "🌱", label: "Sustainability" }
                        ].map((interest) => (
                            <div
                                key={interest.label}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-primary/30 transition-colors cursor-default"
                            >
                                <span className="text-sm">{interest.icon}</span>
                                <span className="text-xs font-medium text-gray-300">{interest.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dream Date */}
                <div className="rounded-[2rem] bg-gradient-to-br from-brand-primary/10 via-black/40 to-black/60 p-6 border border-brand-primary/20 relative overflow-hidden group hover:border-brand-primary/40 transition-colors">
                    <div className="absolute inset-0 bg-brand-primary/5 blur-xl group-hover:bg-brand-primary/10 transition-colors" />
                    <h3 className="text-xs font-bold text-brand-primary tracking-[0.2em] mb-3 uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                        My Dream Date
                    </h3>
                    <p className="text-xl font-medium text-white italic leading-relaxed font-serif relative z-10">
                        "Browsing a late-night bookstore then grabbing ramen in a rainy city."
                    </p>
                </div>

                {/* Footer Stats */}
                <div className="flex gap-4 pb-8">
                    <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Community Since</span>
                        <span className="text-lg font-bold text-brand-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">June 2022</span>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Safety Status</span>
                        <div className="flex items-center gap-1.5">
                            <BadgeCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                            <span className="text-lg font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">Trust+</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
