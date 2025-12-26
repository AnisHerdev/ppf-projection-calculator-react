import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const InfoSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Info size={20} className="text-blue-600" />
                    Important Information about PPF
                </div>
                {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>

            {isOpen && (
                <div className="p-6 text-gray-600 space-y-4 text-sm leading-relaxed">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Why invest before the 5th?</h4>
                        <p>
                            Interest in a PPF account is calculated on the <strong className="text-gray-900">lowest balance</strong> between the 5th and the last day of the month.
                            If you deposit after the 5th, you lose interest on that deposit for the entire month.
                            To maximize returns, always deposit on or before the 5th.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Key Rules</h4>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li><strong className="text-gray-900">Interest Rate</strong>: Currently 7.1% p.a. (subject to quarterly revision by the Govt).</li>
                            <li><strong className="text-gray-900">Investment Limits</strong>: Minimum ₹500, Maximum ₹1.5 Lakh per financial year.</li>
                            <li><strong className="text-gray-900">Lock-in Period</strong>: 15 years. Partial withdrawals allowed after 5 years.</li>
                            <li><strong className="text-gray-900">Tax Benefits</strong>: EEE Status - Principal, Interest, and Maturity amount are all tax-free.</li>
                            <li><strong className="text-gray-900">Compounding</strong>: Interest is calculated monthly but compounded annually.</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800">
                        <strong>Note</strong>: This calculator projects returns based on the current interest rate and does not account for <strong>inflation</strong>. The real value of the maturity amount may be lower in terms of purchasing power.
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoSection;
