import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';
import type { ProjectionRow } from '../types';
import { formatIndianCurrency } from '../utils/calculator';
import { useTheme } from '../context/ThemeContext';

interface ChartsProps {
    data: ProjectionRow[];
    totalInvestment: number;
    totalInterest: number;
}

const Charts: React.FC<ChartsProps> = ({ data, totalInvestment, totalInterest }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const pieData = [
        { name: 'Total Invested', value: totalInvestment },
        { name: 'Total Interest', value: totalInterest },
    ];

    const COLORS = ['#3b82f6', '#f97316']; // Blue-500, Orange-500

    // Chart colors based on theme
    const gridColor = isDark ? '#374151' : '#f0f0f0';
    const axisColor = isDark ? '#9ca3af' : '#acaf9cff';
    const tooltipContentStyle = {
        borderRadius: '8px',
        border: isDark ? '1px solid #374151' : 'none',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        backgroundColor: isDark ? '#1f2937' : '#fff',
        color: isDark ? '#fff' : '#000'
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 transition-colors duration-200">
            {/* Area Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Growth of Investment Over Time</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#eef916ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis
                                dataKey="Month"
                                tickFormatter={(value) => (value % 12 === 0 ? `${value / 12}Y` : '')}
                                stroke={axisColor}
                                tick={{ fontSize: 12, fill: axisColor }}
                            />
                            <YAxis
                                tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                                stroke={axisColor}
                                tick={{ fontSize: 12, fill: axisColor }}
                            />
                            <Tooltip
                                formatter={(value: number) => formatIndianCurrency(value)}
                                labelFormatter={(label) => `Month ${label}`}
                                contentStyle={tooltipContentStyle}
                                itemStyle={{ color: isDark ? '#fff' : undefined }}
                            />
                            <Area
                                type="monotone"
                                dataKey="Invested_Amount"
                                name="Invested Amount"
                                stackId={1}
                                stroke="#3b82f6"
                                fill="url(#colorInvested)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="Interest_Accumulated"
                                name="Interest Accumulated"
                                stroke="#f97316"
                                fill="url(#colorInterest)"
                                strokeWidth={2}
                            />
                            <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingTop: '10px' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Maturity Breakdown</h3>
                <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => formatIndianCurrency(value)}
                                contentStyle={tooltipContentStyle}
                                itemStyle={{ color: isDark ? '#fff' : undefined }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Charts;
