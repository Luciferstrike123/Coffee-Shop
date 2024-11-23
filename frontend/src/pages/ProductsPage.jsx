import React from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import ProductTable from "../components/products/ProductTable";

const ProductsPage = () => {    
    return (
        <div className="flex-1 relative z-10 overflow-auto">
            <Header title="Products"/>

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Stats Card */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Products" icon={Package} value='1234' color="#6366f1"/>
                    <StatCard name="Top Selling" icon={TrendingUp} value='1234' color="#8b56f6"/>
                    <StatCard name="Low Stock" icon={AlertTriangle} value='567' color="#f59e0b"/>
                    <StatCard name="Total Revenue" icon={DollarSign} value='567' color="#ef4444"/>
                </motion.div>

                <ProductTable/>
            </main>
        </div>
    )
}

export default ProductsPage;