import type { CalculationResult, InvestmentFrequency, ProjectionRow } from '../types';

export const formatIndianCurrency = (value: number | string): string => {
    const val = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(val)) return '₹ 0.00';

    const s = val.toFixed(2);
    const [integerPart, decimalPart] = s.split('.');

    if (integerPart.length <= 3) {
        return `₹ ${integerPart}.${decimalPart}`;
    }

    const last3 = integerPart.slice(-3);
    const rest = integerPart.slice(0, -3);

    // Insert commas every 2 digits in 'rest' from right to left
    const restReversed = rest.split('').reverse().join('');
    const chunks = [];
    for (let i = 0; i < restReversed.length; i += 2) {
        chunks.push(restReversed.slice(i, i + 2));
    }
    const restFormatted = chunks.join(',').split('').reverse().join('');

    return `₹ ${restFormatted},${last3}.${decimalPart}`;
};

export const calculatePPF = (
    initialPpfAmount: number,
    rateOfInterest: number,
    durationYears: number,
    investmentAmount: number,
    frequency: InvestmentFrequency
): CalculationResult => {
    let ppfAmount = initialPpfAmount;
    let lifetimeInterest = 0;
    let totalInterestYearly = 0;
    let cumulativeInvestment = initialPpfAmount;

    const projection: ProjectionRow[] = [];

    for (let i = 0; i < durationYears * 12; i++) {
        // Add investment based on frequency
        if (frequency === 'Monthly') {
            ppfAmount += investmentAmount;
            cumulativeInvestment += investmentAmount;
        } else if (frequency === 'Yearly') {
            // Add yearly investment at the start of the financial year (Month 1, 13, 25...)
            // i is 0-indexed, so month 1 is i=0
            if (i % 12 === 0) {
                ppfAmount += investmentAmount;
                cumulativeInvestment += investmentAmount;
            }
        }

        const interest = ppfAmount * (rateOfInterest / 1200);
        totalInterestYearly += interest;
        lifetimeInterest += interest;

        // End of financial year (March)
        if ((i + 1) % 12 === 0) {
            ppfAmount += totalInterestYearly;
            totalInterestYearly = 0;
        }

        projection.push({
            Month: i + 1,
            Amount_in_account: ppfAmount,
            Interest: interest,
            Invested_Amount: cumulativeInvestment,
            Interest_Accumulated: ppfAmount - cumulativeInvestment,
        });
    }

    return {
        totalAmount: Number(ppfAmount.toFixed(2)),
        totalInterest: Number(lifetimeInterest.toFixed(2)),
        cumulativeInvestment: cumulativeInvestment,
        projection: projection,
    };
};
