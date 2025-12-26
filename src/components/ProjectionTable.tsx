import React, { useState } from 'react';
import type { ProjectionRow } from '../types';
import { formatIndianCurrency } from '../utils/calculator';

interface ProjectionTableProps {
    data: ProjectionRow[];
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({ data }) => {
    const [view, setView] = useState<'Monthly' | 'Yearly'>('Yearly');

    const displayData = view === 'Yearly'
        ? data.filter(row => row.Month % 12 === 0).map(row => ({ ...row, Year: row.Month / 12 }))
        : data;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-gray-800">Projection Table</h3>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setView('Monthly')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'Monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setView('Yearly')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${view === 'Yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3">{view === 'Yearly' ? 'Year' : 'Month'}</th>
                            <th className="px-6 py-3">Invested Amount</th>
                            <th className="px-6 py-3">Interest Earned</th>
                            <th className="px-6 py-3">Total Interest</th>
                            <th className="px-6 py-3">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((row, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {view === 'Yearly' ? (row as any).Year : row.Month}
                                </td>
                                <td className="px-6 py-4">{formatIndianCurrency(row.Invested_Amount)}</td>
                                <td className="px-6 py-4 text-green-600">+{formatIndianCurrency(row.Interest)}</td>
                                <td className="px-6 py-4">{formatIndianCurrency(row.Interest_Accumulated)}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900">{formatIndianCurrency(row.Amount_in_account)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectionTable;
