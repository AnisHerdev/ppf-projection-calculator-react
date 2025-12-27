import React from 'react';
import type { InvestmentFrequency } from '../types';
import { Info } from 'lucide-react';

interface InputFormProps {
    ppfAmount: number;
    setPpfAmount: (val: number) => void;
    frequency: InvestmentFrequency;
    setFrequency: (val: InvestmentFrequency) => void;
    investmentAmount: number;
    setInvestmentAmount: (val: number) => void;
    rateOfInterest: number;
    setRateOfInterest: (val: number) => void;
    duration: number;
    setDuration: (val: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({
    ppfAmount,
    setPpfAmount,
    frequency,
    setFrequency,
    investmentAmount,
    setInvestmentAmount,
    rateOfInterest,
    setRateOfInterest,
    duration,
    setDuration,
}) => {
    const maxInvestment = 150000;
    const isMonthly = frequency === 'Monthly';
    const yearlyInvestment = isMonthly ? investmentAmount * 12 : investmentAmount;
    const isOverLimit = yearlyInvestment > maxInvestment;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            {/* Left Column */}
            <div className="space-y-6">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        Current PPF Balance
                        <span className="text-gray-400" title="Enter the initial lump sum deposit for your PPF account.">
                            <Info size={14} />
                        </span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                        <input
                            type="number"
                            value={ppfAmount?ppfAmount:""}
                            onChange={(e) => setPpfAmount(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                            min={0}
                            max={1000000}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Investment Frequency</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                checked={frequency === 'Monthly'}
                                onChange={() => setFrequency('Monthly')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-gray-700 dark:text-gray-300">Monthly</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                checked={frequency === 'Yearly'}
                                onChange={() => setFrequency('Yearly')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-gray-700 dark:text-gray-300">Yearly</span>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        {frequency} Investment Amount
                        <span className="text-gray-400" title={`Enter the amount you want to invest ${frequency.toLowerCase()} in your PPF account.`}>
                            <Info size={14} />
                        </span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                        <input
                            type="number"
                            value={investmentAmount?investmentAmount:""}
                            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                            className={`w-full pl-8 pr-4 py-2 border rounded-lg outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isOverLimit ? 'border-red-300 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/50' : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                            min={0}
                        />
                    </div>
                    {isOverLimit && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                            Note: Maximum investment in PPF is ₹1.5 Lakhs per year.
                        </p>
                    )}
                    <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                        {isMonthly
                            ? 'Note: This calculation assumes investment is made before the 5th of every month.'
                            : 'Note: This calculation assumes investment is made before the 5th of April every year.'}
                    </p>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        Rate of Interest (%)
                        <span className="text-gray-400" title="Enter the rate of interest for your PPF account.">
                            <Info size={14} />
                        </span>
                    </label>
                    <input
                        type="number"
                        value={rateOfInterest?rateOfInterest:""}
                        onChange={(e) => setRateOfInterest(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        step={0.1}
                        min={0}
                        max={100}
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        Duration (Years)
                        <span className="text-gray-400" title="Enter the duration for your PPF account.">
                            <Info size={14} />
                        </span>
                    </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${duration < 15 ? 'border-red-300 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/50' : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        min={15}
                        max={100}
                        step={5}
                    />
                    {duration < 15 && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">Duration should be a minimum of 15 years</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputForm;
