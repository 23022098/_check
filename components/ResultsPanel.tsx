
import React, { useState } from 'react';
import { Polynomial } from '../types';
import { formatPolynomial } from '../services/polynomial';

interface ResultsPanelProps {
    coloringResult: string;
    chromaticPolynomial: Polynomial | null;
    polyResult: { k: number; result: string } | null;
    onEvaluatePoly: (k: number) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
    coloringResult,
    chromaticPolynomial,
    polyResult,
    onEvaluatePoly
}) => {
    const [kValue, setKValue] = useState<string>('3');
    const formattedPoly = chromaticPolynomial ? formatPolynomial(chromaticPolynomial) : '';

    const handleEval = () => {
        const numK = parseInt(kValue, 10);
        if (!isNaN(numK) && numK > 0) {
            onEvaluatePoly(numK);
        }
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg ring-1 ring-white/10">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Results & Explanations</h2>
            
            <div className="space-y-6">
                {/* Coloring Result */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-200">Coloring Status</h3>
                    <p className={`mt-2 text-sm p-3 rounded-md ${
                        coloringResult.startsWith('Success') ? 'bg-green-500/20 text-green-300' : 
                        coloringResult.startsWith('Failed') ? 'bg-red-500/20 text-red-300' :
                        'bg-slate-700/50 text-slate-300'
                    }`}>
                        {coloringResult || 'Ready to run.'}
                    </p>
                </div>

                {/* Polynomial Result */}
                <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-slate-200">Chromatic Polynomial P(G, k)</h3>
                    {formattedPoly ? (
                        <>
                            <div className="mt-2 text-md p-3 rounded-md bg-slate-900/50 font-mono text-cyan-300 overflow-x-auto">
                                {formattedPoly}
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-slate-400 mb-2">Evaluate the polynomial for a given k to find the number of valid colorings.</p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={kValue}
                                        onChange={(e) => setKValue(e.target.value)}
                                        min="0"
                                        className="w-20 bg-slate-700 border-slate-600 rounded-md py-1 px-2 text-center focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                    />
                                    <button onClick={handleEval} className="px-4 py-1 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
                                        Evaluate
                                    </button>
                                </div>
                                {polyResult && (
                                    <p className="mt-3 text-sm">
                                        For <span className="font-bold text-cyan-400">k = {polyResult.k}</span>, there are <span className="font-bold text-cyan-400">{polyResult.result}</span> valid colorings.
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="mt-2 text-sm text-slate-400">
                            Awaiting calculation. The chromatic polynomial P(G, k) counts the number of proper k-colorings of a graph G.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsPanel;
