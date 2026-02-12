import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { User, generateDummyUsers } from "@/lib/dummyData"

// Generate a few users specifically for the rail
const railUsers = generateDummyUsers(10).filter(u => u.hasPulse);

export function PulseRail() {
    return (
        <div className="w-full overflow-x-auto pl-4 py-2 scrollbar-hide z-10 relative">
            <div className="flex gap-4">
                {/* Add Pulse Button */}
                <div className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center border-2 border-black">
                            <Plus className="w-3 h-3 text-black font-bold" />
                        </div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">Add Pulse</span>
                </div>

                {/* Stories */}
                {railUsers.map((user, i) => {
                    // Cycle ring colors
                    const ringColor = ["border-brand-primary", "border-brand-secondary", "border-amber-400", "border-pink-500"][i % 4];
                    const ringShadow = ["shadow-[0_0_10px_rgba(168,85,247,0.5)]", "shadow-[0_0_10px_rgba(59,130,246,0.5)]", "shadow-[0_0_10px_rgba(251,191,36,0.5)]", "shadow-[0_0_10px_rgba(236,72,153,0.5)]"][i % 4];

                    return (
                        <Link href={`/story/${user.id}`} key={user.id}>
                            <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                                <div className={`relative w-16 h-16 rounded-full border-2 ${ringColor} ${ringShadow} p-0.5`}>
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src={user.avatar}
                                            alt={user.username}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <span className="text-[10px] font-medium text-gray-300 truncate w-16 text-center group-hover:text-white transition-colors">
                                    {user.username}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
