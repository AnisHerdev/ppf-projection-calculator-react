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
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                    <Wallet size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Total Investment</p>
                    <p className="text-xl font-bold text-gray-900">{formatIndianCurrency(totalInvestment)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-full text-green-600">
                    <PiggyBank size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Maturity Value</p>
                    <p className="text-xl font-bold text-gray-900">{formatIndianCurrency(maturityValue)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Total Interest</p>
                    <p className="text-xl font-bold text-gray-900">{formatIndianCurrency(totalInterest)}</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
