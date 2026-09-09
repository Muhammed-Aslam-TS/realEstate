'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator, DollarSign, Percent, Calendar, PieChart, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

function MortgageCalculatorContent() {
  const searchParams = useSearchParams();
  const initialPriceParam = searchParams.get('price');

  const [homePrice, setHomePrice] = useState<number>(
    initialPriceParam ? Number(initialPriceParam) : 5000000
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(6000);
  const [hoaMonthly, setHoaMonthly] = useState<number>(450);

  // Calculations
  const downPaymentAmount = useMemo(
    () => (homePrice * downPaymentPercent) / 100,
    [homePrice, downPaymentPercent]
  );

  const loanAmount = useMemo(
    () => homePrice - downPaymentAmount,
    [homePrice, downPaymentAmount]
  );

  const monthlyPrincipalAndInterest = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const payment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return isNaN(payment) ? 0 : payment;
  }, [loanAmount, interestRate, loanTermYears]);

  const monthlyTax = useMemo(
    () => (homePrice * (propertyTaxRate / 100)) / 12,
    [homePrice, propertyTaxRate]
  );

  const monthlyInsurance = useMemo(
    () => insuranceAnnual / 12,
    [insuranceAnnual]
  );

  const totalMonthlyPayment = useMemo(
    () => monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance + hoaMonthly,
    [monthlyPrincipalAndInterest, monthlyTax, monthlyInsurance, hoaMonthly]
  );

  const totalInterestPaid = useMemo(
    () => monthlyPrincipalAndInterest * loanTermYears * 12 - loanAmount,
    [monthlyPrincipalAndInterest, loanTermYears, loanAmount]
  );

  // Percentage breakdown for progress bar
  const piPercent = totalMonthlyPayment > 0 ? (monthlyPrincipalAndInterest / totalMonthlyPayment) * 100 : 0;
  const taxPercent = totalMonthlyPayment > 0 ? (monthlyTax / totalMonthlyPayment) * 100 : 0;
  const insPercent = totalMonthlyPayment > 0 ? (monthlyInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaPercent = totalMonthlyPayment > 0 ? (hoaMonthly / totalMonthlyPayment) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
          <Calculator className="w-4 h-4" /> Financial Intelligence Tool
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Luxury Mortgage Calculator
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Estimate your total monthly investment, down payment split, interest costs, and tax breakdown for premier luxury real estate acquisitions.
        </p>
      </div>

      {/* Calculator Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders & Inputs Controls (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
          
          {/* Home Purchase Price Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Home Purchase Price ($)
              </label>
              <span className="text-2xl font-extrabold text-amber-400">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={30000000}
              step={100000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>$500K</span>
              <span>$15M</span>
              <span>$30M</span>
            </div>
          </div>

          {/* Down Payment % Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-lg font-bold text-white">
                ${downPaymentAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>5%</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Interest Rate & Loan Term Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Loan Duration
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setLoanTermYears(15)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    loanTermYears === 15 ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  15 Years
                </button>
                <button
                  onClick={() => setLoanTermYears(30)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    loanTermYears === 30 ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  30 Years
                </button>
              </div>
            </div>
          </div>

          {/* Taxes, Insurance & HOA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Property Tax Rate (%/yr)
              </label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Home Insurance ($/yr)
              </label>
              <input
                type="number"
                step="500"
                value={insuranceAnnual}
                onChange={(e) => setInsuranceAnnual(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                HOA / Condo Dues ($/mo)
              </label>
              <input
                type="number"
                step="50"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

        </div>

        {/* Breakdown Output Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-2xl pointer-events-none rounded-full" />

            <div className="space-y-1 border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Estimated Monthly Outlay
              </span>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-white bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
                ${Math.round(totalMonthlyPayment).toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / mo</span>
              </h3>
            </div>

            {/* Visual Colored Breakdown Bar */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
                <div style={{ width: `${piPercent}%` }} className="bg-amber-400 h-full" title="Principal & Interest" />
                <div style={{ width: `${taxPercent}%` }} className="bg-emerald-400 h-full" title="Property Tax" />
                <div style={{ width: `${insPercent}%` }} className="bg-indigo-400 h-full" title="Home Insurance" />
                <div style={{ width: `${hoaPercent}%` }} className="bg-rose-400 h-full" title="HOA Fees" />
              </div>

              {/* Legend Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-slate-300">Principal & Interest</span>
                  </div>
                  <strong className="text-white">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-slate-300">Property Taxes ({propertyTaxRate}%)</span>
                  </div>
                  <strong className="text-white">${Math.round(monthlyTax).toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-400" />
                    <span className="text-slate-300">Home Insurance</span>
                  </div>
                  <strong className="text-white">${Math.round(monthlyInsurance).toLocaleString()}</strong>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="text-slate-300">HOA & Community Fees</span>
                  </div>
                  <strong className="text-white">${Math.round(hoaMonthly).toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* Total Loan Summary */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Loan Principal:</span>
                <strong className="text-white">${loanAmount.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Interest ({loanTermYears} yrs):</span>
                <strong className="text-amber-400">${Math.round(totalInterestPaid).toLocaleString()}</strong>
              </div>
            </div>

            <Link
              href="/properties"
              className="w-full block text-center py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
            >
              Browse Estates in this Budget
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading mortgage calculator...</div>}>
      <MortgageCalculatorContent />
    </Suspense>
  );
}
