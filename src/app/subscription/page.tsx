"use client"

import { Check, Star, Zap, Crown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SubscriptionPage() {
    const plans = [
        {
            name: "Gold",
            price: "9.99",
            period: "/mo",
            icon: <Star className="w-6 h-6 text-amber-400" />,
            color: "from-amber-400 to-yellow-600",
            features: ["See who likes you", "Unlimited swipes", "5 Super Likes per day", "Hide ads"]
        },
        {
            name: "Platinum",
            price: "19.99",
            period: "/mo",
            icon: <Crown className="w-6 h-6 text-gray-200" />,
            color: "from-gray-300 via-white to-gray-400",
            features: ["Priority Likes", "Message before matching", "See read receipts", "Everything in Gold"],
            popular: true
        },
        {
            name: "Diamond",
            price: "29.99",
            period: "/mo",
            icon: <Zap className="w-6 h-6 text-cyan-400" />,
            color: "from-cyan-400 to-blue-600",
            features: ["Top Picks access", " incognito mode", "Travel mode", "Everything in Platinum"]
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />
            <div className="fixed top-[-20%] left-[-20%] w-[500px] h-[500px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-6 flex items-center">
                <Link href="/">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <div className="ml-4">
                    <h1 className="text-2xl font-black italic tracking-tighter">
                        PRISM <span className="text-brand-primary">PREMIUM</span>
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 px-6 pb-12 overflow-y-auto">
                <div className="text-center mb-10 space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Unlock Full Access
                    </h2>
                    <p className="text-gray-400">See everyone nearby and make deeper connections.</p>
                </div>

                <div className="flex flex-col gap-6 max-w-md mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-[1px] rounded-3xl bg-gradient-to-br ${plan.color} ${plan.popular ? 'shadow-[0_0_30px_rgba(168,85,247,0.3)]' : ''}`}
                        >
                            <div className="bg-gray-900/90 backdrop-blur-xl rounded-[23px] p-6 h-full flex flex-col relative overflow-hidden">
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-primary to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-full bg-gradient-to-br ${plan.color} bg-opacity-10`}>
                                        {plan.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                                        {plan.name}
                                    </h3>
                                </div>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-gray-400 font-medium">{plan.period}</span>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className={`w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity text-black shadow-lg`}>
                                    Select Plan
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
