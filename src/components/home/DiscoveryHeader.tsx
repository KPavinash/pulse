import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DiscoveryHeaderProps {
    onSearch: (query: string) => void;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    showOnlineOnly: boolean;
    onToggleOnline: () => void;
}

export function DiscoveryHeader({
    onSearch,
    activeFilter,
    onFilterChange,
    showOnlineOnly,
    onToggleOnline
}: DiscoveryHeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(true); // Default open

    const handleSearchChange = (val: string) => {
        setInputValue(val);
        onSearch(val);
    }

    const closeSearch = () => {
        setIsSearchOpen(false);
        setInputValue("");
        onSearch("");
    }

    return (
        <div className="w-full flex flex-col gap-4 p-4 pb-2 z-20 relative bg-gradient-to-b from-black/90 to-transparent">
            {/* Top Row: Title & Actions */}
            <div className="flex justify-between items-center h-12">
                <AnimatePresence mode="wait">
                    {isSearchOpen ? (
                        <motion.div
                            initial={{ opacity: 0, width: "50%" }}
                            animate={{ opacity: 1, width: "100%" }}
                            exit={{ opacity: 0, width: "50%" }}
                            className="flex items-center gap-2 flex-1 mr-2"
                        >
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                placeholder="Search nearby..."
                                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary placeholder:text-gray-500"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={closeSearch}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1"
                        >
                            <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                Discovery
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-primary uppercase">
                                    NEARBY • {showOnlineOnly ? 'ONLINE ONLY' : 'ALL'}
                                </span>
                                {showOnlineOnly && (
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isSearchOpen && (
                    <div className="flex items-center gap-3">
                        {/* Toggle Switch (Online Only) */}
                        <div
                            onClick={onToggleOnline}
                            className={`relative w-12 h-6 rounded-full border flex items-center px-1 cursor-pointer transition-colors duration-300 ${showOnlineOnly ? 'bg-brand-primary/20 border-brand-primary' : 'bg-white/10 border-white/20'
                                }`}
                        >
                            <motion.div
                                animate={{ x: showOnlineOnly ? 24 : 0 }}
                                className={`w-4 h-4 rounded-full shadow-lg ${showOnlineOnly ? 'bg-brand-primary box-shadow-[0_0_10px_rgba(168,85,247,0.8)]' : 'bg-gray-400'
                                    }`}
                            />
                        </div>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsSearchOpen(true)}
                            className="text-white hover:bg-white/10 rounded-full"
                        >
                            <Search className="w-5 h-5 text-gray-300" />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className={`rounded-full transition-colors ${isFiltersOpen ? 'bg-brand-primary/20 text-brand-primary' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            <SlidersHorizontal className={`w-5 h-5 ${isFiltersOpen ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-brand-primary drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]'}`} />
                        </Button>
                    </div>
                )}
            </div>

            {/* Filter Chips - Collapsible */}
            <AnimatePresence>
                {isFiltersOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {["All Nearby", "Online Now", "New", "Verified", "Events"].map((filter, i) => (
                                <button
                                    key={filter}
                                    onClick={() => onFilterChange(filter)}
                                    className={`
                        whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md transition-all
                        ${activeFilter === filter
                                            ? "bg-brand-primary/20 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30"
                                        }
                        `}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
