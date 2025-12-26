import { useState, useEffect } from 'react';
import { calculatePPF } from './utils/calculator';
import type { InvestmentFrequency, CalculationResult } from './types';
import InputForm from './components/InputForm';
import SummaryCards from './components/SummaryCards';
import ProjectionTable from './components/ProjectionTable';
import Charts from './components/Charts';
import InfoSection from './components/InfoSection';
import { Calculator } from 'lucide-react';

function App() {
  // State for inputs
  const [ppfAmount, setPpfAmount] = useState<number>(100000);
  const [frequency, setFrequency] = useState<InvestmentFrequency>('Monthly');
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [rateOfInterest, setRateOfInterest] = useState<number>(7.1);
  const [duration, setDuration] = useState<number>(15);

  // State for results
  const [result, setResult] = useState<CalculationResult | null>(null);
  // Calculate on mount and when inputs change
  useEffect(() => {
    // Basic validation before calculating
    if (duration >= 15) {
      const res = calculatePPF(
        ppfAmount,
        rateOfInterest,
        duration,
        investmentAmount,
        frequency
      );
      setResult(res);
    }
  }, [ppfAmount, frequency, investmentAmount, rateOfInterest, duration]);

  // return (<div><p>App Component Is Rendering! </p>
  // <h1 className="text-xl font-bold text-gray-900 tracking-tight">PPF Projection Calculator</h1></div>);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Calculator size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">PPF Projection Calculator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Configuration</h2>
              </div>
              <InputForm
                ppfAmount={ppfAmount}
                setPpfAmount={setPpfAmount}
                frequency={frequency}
                setFrequency={setFrequency}
                investmentAmount={investmentAmount}
                setInvestmentAmount={setInvestmentAmount}
                rateOfInterest={rateOfInterest}
                setRateOfInterest={setRateOfInterest}
                duration={duration}
                setDuration={setDuration}
              />
            </div>

            <div className="hidden lg:block">
              <InfoSection />
            </div>
          </div>

          {/* Right Content - Results */}
          <div className="lg:col-span-8 space-y-8">
            {result && (
              <>
                <SummaryCards
                  totalInvestment={result.cumulativeInvestment}
                  maturityValue={result.totalAmount}
                  totalInterest={result.totalInterest}
                />

                <Charts
                  data={result.projection}
                  totalInvestment={result.cumulativeInvestment}
                  totalInterest={result.totalInterest}
                />

                <ProjectionTable data={result.projection} />
              </>
            )}
            <div className="lg:hidden">
              <InfoSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
