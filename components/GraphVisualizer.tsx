
import React from 'react';
import { Node, Edge } from '../types';
import { GRAPH_COLORS } from '../constants';

interface GraphVisualizerProps {
    nodes: Node[];
    edges: Edge[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ nodes, edges }) => {
    return (
        <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
            </defs>

            {edges.map((edge, i) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                return (
                    <line
                        key={`${edge.source}-${edge.target}-${i}`}
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke="#64748b"
                        strokeWidth="2"
                    />
                );
            })}

            {nodes.map(node => (
                <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                    <circle
                        cx="0"
                        cy="0"
                        r="15"
                        fill={node.color ? GRAPH_COLORS[node.color - 1] : '#1e293b'}
                        stroke="#94a3b8"
                        strokeWidth="2"
                    />
                    <text
                        textAnchor="middle"
                        dy=".3em"
                        fill={node.color ? "#FFFFFF" : "#94a3b8"}
                        fontSize="12"
                        fontWeight="bold"
                    >
                        {node.id.replace('n', '')}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default GraphVisualizer;
