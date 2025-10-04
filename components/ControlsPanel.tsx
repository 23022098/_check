
import React from 'react';
import { GRAPH_TYPES } from '../constants';

interface ControlsPanelProps {
    graphKey: string;
    onGraphChange: (key: string) => void;
    numColors: number;
    onNumColorsChange: (value: number) => void;
    onColoring: () => void;
    isColoring: boolean;
    onCalculatePolynomial: () => void;
    isCalculatingPoly: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
    graphKey,
    onGraphChange,
    numColors,
    onNumColorsChange,
    onColoring,
    isColoring,
    onCalculatePolynomial,
    isCalculatingPoly
}) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg ring-1 ring-white/10">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Controls</h2>

            <div className="space-y-6">
                {/* Graph Selection */}
                <div>
                    <label htmlFor="graph-select" className="block text-sm font-medium text-slate-300 mb-2">
                        1. Select a Graph
                    </label>
                    <select
                        id="graph-select"
                        value={graphKey}
                        onChange={(e) => onGraphChange(e.target.value)}
                        className="block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    >
                        {GRAPH_TYPES.map(key => (
                            <option key={key} value={key}>
                                {key.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Backtracking Algorithm */}
                <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-slate-200">Backtracking Coloring</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-4">Find a valid k-coloring for the graph.</p>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="num-colors" className="block text-sm font-medium text-slate-300">
                            Colors (k):
                        </label>
                        <input
                            type="number"
                            id="num-colors"
                            min="1"
                            max="8"
                            value={numColors}
                            onChange={(e) => onNumColorsChange(parseInt(e.target.value, 10))}
                            className="w-20 bg-slate-700 border-slate-600 rounded-md shadow-sm py-1 px-2 text-center focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                        />
                    </div>
                    <button
                        onClick={onColoring}
                        disabled={isColoring}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isColoring ? 'Coloring...' : 'Run Coloring'}
                    </button>
                </div>

                {/* Chromatic Polynomial */}
                <div className="border-t border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-slate-200">Chromatic Polynomial</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-4">Compute the polynomial P(G, k) using Deletion-Contraction. This can be slow for complex graphs.</p>
                     <button
                        onClick={onCalculatePolynomial}
                        disabled={isCalculatingPoly}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isCalculatingPoly ? 'Calculating...' : 'Calculate Polynomial'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlsPanel;
