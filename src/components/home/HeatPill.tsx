import { Flame, ChevronRight } from "lucide-react"

export function HeatPill() {
    return (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-max max-w-[90%]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-black/70 hover:border-brand-primary/30 transition-all group">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span className="text-xs font-bold text-white flex-1 truncate">
                    <span className="text-orange-400">12 Users</span> are at <span className="text-brand-primary">The Ritz Bar</span> right now
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>
        </div>
    )
}
