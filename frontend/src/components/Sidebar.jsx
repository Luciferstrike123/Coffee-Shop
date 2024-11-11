import React, { useState } from "react";
import { ChartNoAxesGantt, ShoppingCart, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
    { name: "Overview", icon: ChartNoAxesGantt, color: "#6366f1", href: "/" },
    { name: "Products", icon: ShoppingCart, color: "#8b56f6", href: "/products" },
]

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <motion.div 
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen} ? 'w-64' : 'w-20'`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="flex flex-col h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 border-r border-gray-700">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"    
                >
                    <Menu size={24}/>
                </motion.button>
                <nav className="mt-8 flex-grow ">
                    {SIDEBAR_ITEMS.map((item, index) => (
                        <Link key={index} to={item.href}>
                            <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                                <item.icon size={24} style={{color: item.color, minnWidth: "20px"}}/>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    )
}

export default Sidebar;