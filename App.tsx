
import React, { useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import GraphVisualizer from './components/GraphVisualizer';
import ResultsPanel from './components/ResultsPanel';
import { GRAPH_TYPES, PRESET_GRAPHS } from './constants';
import { backtrackingColoring, solveChromaticPolynomial } from './services/graphService';
import { evaluatePolynomial } from './services/polynomial';
import { GraphData, Node, Polynomial } from './types';

const App: React.FC = () => {
    const [graphKey, setGraphKey] = useState<string>(GRAPH_TYPES[0]);
    const [graphData, setGraphData] = useState<GraphData>(PRESET_GRAPHS[graphKey]);
    const [numColors, setNumColors] = useState<number>(3);
    const [coloredNodes, setColoredNodes] = useState<Node[]>(graphData.nodes);
    const [isColoring, setIsColoring] = useState<boolean>(false);
    const [coloringResult, setColoringResult] = useState<string>('');
    
    const [isCalculatingPoly, setIsCalculatingPoly] = useState<boolean>(false);
    const [chromaticPolynomial, setChromaticPolynomial] = useState<Polynomial | null>(null);
    const [polyResult, setPolyResult] = useState<{ k: number; result: string } | null>(null);

    const handleGraphChange = (key: string) => {
        setGraphKey(key);
        const newGraphData = PRESET_GRAPHS[key];
        setGraphData(newGraphData);
        setColoredNodes(newGraphData.nodes);
        setChromaticPolynomial(null);
        setColoringResult('');
        setPolyResult(null);
        if (key === 'K5' || key === 'K5_SUB') {
            setNumColors(5);
        } else if (key === 'PETERSEN') {
            setNumColors(3);
        } else {
            setNumColors(3);
        }
    };

    const handleColoring = () => {
        setIsColoring(true);
        setColoringResult('Running backtracking algorithm...');
        
        const { success, coloredNodes: resultNodes } = backtrackingColoring(
            JSON.parse(JSON.stringify(graphData)), // Deep copy to avoid mutating state
            numColors
        );
        if (success) {
            setColoredNodes(resultNodes);
            setColoringResult(`Success! Found a valid ${numColors}-coloring.`);
        } else {
            setColoredNodes(graphData.nodes); // Reset to uncolored
            setColoringResult(`Failed. No valid ${numColors}-coloring exists.`);
        }
        setIsColoring(false);
    };

    const handleCalculatePolynomial = () => {
        setIsCalculatingPoly(true);
        setChromaticPolynomial(null);
        setPolyResult(null);

        const result = solveChromaticPolynomial(JSON.parse(JSON.stringify(graphData)));
        setChromaticPolynomial(result);
        setIsCalculatingPoly(false);
    };

    const handleEvaluatePoly = (k: number) => {
        if (chromaticPolynomial) {
            const value = evaluatePolynomial(chromaticPolynomial, k);
            setPolyResult({ k, result: value.toLocaleString() });
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">Graph Coloring & Chromatic Polynomials</h1>
                    <p className="mt-2 text-lg text-slate-400">An interactive tool for exploring graph theory concepts.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        <ControlsPanel
                            graphKey={graphKey}
                            onGraphChange={handleGraphChange}
                            numColors={numColors}
                            onNumColorsChange={setNumColors}
                            onColoring={handleColoring}
                            isColoring={isColoring}
                            onCalculatePolynomial={handleCalculatePolynomial}
                            isCalculatingPoly={isCalculatingPoly}
                        />
                        <ResultsPanel
                            coloringResult={coloringResult}
                            chromaticPolynomial={chromaticPolynomial}
                            polyResult={polyResult}
                            onEvaluatePoly={handleEvaluatePoly}
                        />
                    </div>
                    <main className="lg:col-span-2 bg-slate-800/50 rounded-xl shadow-lg ring-1 ring-white/10 p-4 min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
                        <GraphVisualizer nodes={coloredNodes} edges={graphData.edges} />
                    </main>
                </div>

                 <footer className="text-center mt-12 text-slate-500">
                   
                </footer>
            </div>
        </div>
    );
};

export default App;
