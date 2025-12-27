import React, { useState } from 'react';
import type { ProjectionRow } from '../types';
import { formatIndianCurrency } from '../utils/calculator';

interface ProjectionTableProps {
    data: ProjectionRow[];
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({ data }) => {
    const [view, setView] = useState<'Monthly' | 'Yearly'>('Yearly');
    const currentYear = 2026;//new Date().getFullYear();
    const monthsNames = ["April","May","June","July","August","September","October","November","December","January","February","March"];
    const displayData = view === 'Yearly'
        ? data.filter(row => row.Month % 12 === 0).map(row => ({ ...row, Year: currentYear+Math.floor((row.Month+2)/12) }))
        : data.map(row=>({...row,Month:(currentYear +Math.floor((row.Month+2)/12))+" - "+monthsNames[(row.Month-1)%12]}));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Projection Table</h3>
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg transition-colors duration-200">
                    <button
                        onClick={() => setView('Monthly')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'Monthly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setView('Yearly')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'Yearly' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 sticky top-0 z-10 transition-colors duration-200">
                        <tr>
                            <th className="px-6 py-3">{view === 'Yearly' ? 'Year' : 'Month & Year'}</th>
                            <th className="px-6 py-3">Invested Amount</th>
                            <th className="px-6 py-3">Interest Earned</th>
                            <th className="px-6 py-3">Interest Credited</th>
                            <th className="px-6 py-3">Total Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {displayData.map((row, index) => (
                            <tr key={index} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                    {view === 'Yearly' ? (row as any).Year : row.Month}
                                </td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatIndianCurrency(row.Invested_Amount)}</td>
                                <td className="px-6 py-4 text-green-600 dark:text-green-400">+{formatIndianCurrency(row.Interest)}</td>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{formatIndianCurrency(row.Interest_Accumulated)}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">{formatIndianCurrency(row.Amount_in_account)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectionTable;
