import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

const salesData = [
    { name: "Jul", sales: 4000 },
    { name: "Aug", sales: 3000 },
    { name: "Sep", sales: 2000 },
    { name: "Oct", sales: 2780 },
    { name: "Nov", sales: 1890 },
    { name: "Dec", sales: 2390 },
    { name: "Jan", sales: 3490 },
    { name: "Feb", sales: 3490 },
    { name: "Mar", sales: 3490 },
    { name: "Apr", sales: 3490 },
    { name: "May", sales: 3490 },
    { name: "Jun", sales: 3490 },
]

const SalesOverviewChart = () => {
    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{delay: 0.2}}
        >
            <h2 className='text-gray-100 font-medium text-lg mb-4'>Sales Overview</h2>
            <div className='h-80 '>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#4b5563'/>
                        <XAxis dataKey="name"/>
                        <YAxis stroke='#9cabaf'/>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                                borderColor: '#4b5563',
                            }}
                            itemStyle={{color: '#e5e7eb'}}
                        />
                            <Line 
                                type='monotone' 
                                dataKey='sales' 
                                stroke='#6366f1' 
                                strokeWidth={3} 
                                dot={{fill: '#6366f1', strokeWidth: 2, r:6}}
                                activeDot={{strokeWidth: 2, r: 8}}
                            />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default SalesOverviewChart;