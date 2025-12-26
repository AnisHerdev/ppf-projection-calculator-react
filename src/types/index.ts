export interface ProjectionRow {
  Month: number;
  Interest: number;
  Amount_in_account: number;
  Invested_Amount: number;
  Interest_Accumulated: number;
}

export interface CalculationResult {
  totalAmount: number;
  totalInterest: number;
  cumulativeInvestment: number;
  projection: ProjectionRow[];
}

export type InvestmentFrequency = 'Monthly' | 'Yearly';
