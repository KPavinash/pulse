"use client"

import { useState, useMemo } from "react";
import { useNearbyUsers } from "@/hooks/useNearbyUsers";
import { PulseGrid } from "@/components/grid/PulseGrid";
import { DiscoveryHeader } from "@/components/home/DiscoveryHeader";
import { PulseRail } from "@/components/home/PulseRail";
import { HeatPill } from "@/components/home/HeatPill";

export default function Home() {
  const { users, loading } = useNearbyUsers();

  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Nearby");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Filter Logic
  const filteredUsers = useMemo(() => {
    let result = users;

    // 1. Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.username.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q)
      );
    }

    // 2. Toggle "Online Only"
    if (showOnlineOnly) {
      result = result.filter(u => u.isOnline);
    }

    // 3. Category Filters
    switch (activeFilter) {
      case "Online Now":
        result = result.filter(u => u.isOnline);
        break;
      case "New":
        result = result.filter(u => u.isNew);
        break;
      case "Verified":
        result = result.filter(u => u.isVerified);
        break;
      case "Events":
        result = result.filter(u => u.isEvent);
        break;
      default:
        break;
    }

    return result;

  }, [users, searchQuery, activeFilter, showOnlineOnly]);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-brand-primary animate-pulse font-mono tracking-widest text-xs">INITIALIZING SYSTEM...</div>

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-hidden relative selection:bg-brand-primary/30">
      {/* Background: Solid Theme (Hidden images/gradients) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-60 hidden dark:block"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1974&auto=format&fit=crop')", // Cyberpunk neon city
          filter: "blur(4px) brightness(0.6) contrast(1.2)"
        }}
      />
      {/* Neon Streaks/Glows (Dark Mode Only) */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-purple-900/40 via-blue-900/20 to-transparent pointer-events-none hidden dark:block" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-brand-primary/20 blur-[100px] pointer-events-none rounded-full hidden dark:block" />

      <main className="relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Fixed Header & Rail Area */}
        <div className="flex-none bg-background dark:bg-gradient-to-b dark:from-black/90 dark:via-black/80 dark:to-transparent pb-4">
          <DiscoveryHeader
            onSearch={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            showOnlineOnly={showOnlineOnly}
            onToggleOnline={() => setShowOnlineOnly(!showOnlineOnly)}
          />
          <PulseRail />
        </div>

        {/* Scrollable Grid Area */}
        <div className="flex-1 overflow-hidden relative">
          <PulseGrid users={filteredUsers} />
        </div>

        {/* Floating Heat Pill */}
        <HeatPill />
      </main>
    </div>
  );
}
