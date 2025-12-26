import React from 'react';
import { formatIndianCurrency } from '../utils/calculator';
import { Wallet, TrendingUp, PiggyBank } from 'lucide-react';

interface SummaryCardsProps {
    totalInvestment: number;
    maturityValue: number;
    totalInterest: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
    totalInvestment,
    maturityValue,
    totalInterest,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors duration-200">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                    <Wallet size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Investment</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{formatIndianCurrency(totalInvestment)}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors duration-200">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
                    <PiggyBank size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Maturity Value</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{formatIndianCurrency(maturityValue)}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors duration-200">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Interest</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{formatIndianCurrency(totalInterest)}</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
