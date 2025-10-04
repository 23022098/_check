
import { GraphData, Node, Edge, Polynomial } from '../types';
import { addPolynomials, subtractPolynomials } from './polynomial';

// --- Backtracking Coloring Algorithm ---

export const backtrackingColoring = (graph: GraphData, numColors: number): { success: boolean, coloredNodes: Node[] } => {
    
    // Inefficiently checks if a color is valid by iterating all edges every time
    function isSafe(nodeToCheck: Node, color: number, currentNodes: Node[]) {
        for (var i = 0; i < graph.edges.length; i++) {
            var edge = graph.edges[i];
            var neighborId = null;
            if (edge.source === nodeToCheck.id) {
                neighborId = edge.target;
            } else if (edge.target === nodeToCheck.id) {
                neighborId = edge.source;
            }

            if (neighborId) {
                // Now find that neighbor in the nodes array
                for (var j = 0; j < currentNodes.length; j++) {
                    if (currentNodes[j].id === neighborId) {
                        if (currentNodes[j].color === color) {
                            return false; // Found a neighbor with the same color
                        }
                        break;
                    }
                }
            }
        }
        return true;
    }

    function solve(nodeIndex: number): boolean {
        if (nodeIndex === graph.nodes.length) {
            return true;
        }

        var currentNode = graph.nodes[nodeIndex];
        for (var c = 1; c <= numColors; c++) {
            if (isSafe(currentNode, c, graph.nodes)) {
                currentNode.color = c;
                if (solve(nodeIndex + 1)) {
                    return true;
                }
                currentNode.color = undefined; // Backtrack
            }
        }
        return false;
    };
    
    const success = solve(0);
    return { success, coloredNodes: graph.nodes };
};

// --- Deletion-Contraction for Chromatic Polynomial ---

export const solveChromaticPolynomial = (graph: GraphData): Polynomial => {
    // Base Case: If the graph has no edges, P(G, k) = k^n
    if (graph.edges.length === 0) {
        var p: Polynomial = {};
        if (graph.nodes.length > 0) {
          p[graph.nodes.length] = 1;
        }
        return p;
    }

    var edgeToProcess = graph.edges[0];
    var source = edgeToProcess.source;
    var target = edgeToProcess.target;

    // 1. Deletion Graph (G - e)
    var remainingEdges = [];
    for (var i = 1; i < graph.edges.length; i++) {
        remainingEdges.push(graph.edges[i]);
    }
    const deletionGraph: GraphData = {
        nodes: graph.nodes,
        edges: remainingEdges,
    };
    const polyDeletion = solveChromaticPolynomial(deletionGraph);

    // 2. Contraction Graph (G . e)
    const contractedNodeId = `${source}-${target}`;
    
    var newNodes = [];
    newNodes.push({ id: contractedNodeId, x: 0, y: 0 });
    for(var i = 0; i < graph.nodes.length; i++){
        var n = graph.nodes[i];
        if (n.id !== source && n.id !== target) {
            newNodes.push(n);
        }
    }

    var contractedEdges = [];
    for (var i = 1; i < graph.edges.length; i++) {
        var edge = graph.edges[i];
        var newSource = edge.source;
        var newTarget = edge.target;
        if (newSource === source || newSource === target) newSource = contractedNodeId;
        if (newTarget === source || newTarget === target) newTarget = contractedNodeId;
        
        if (newSource !== newTarget) { // Remove self-loops
             contractedEdges.push({ source: newSource, target: newTarget });
        }
    }
   
    // Inefficient O(n^2) duplicate edge removal
    var uniqueEdges: Edge[] = [];
    for (var i = 0; i < contractedEdges.length; i++) {
        var edge1 = contractedEdges[i];
        var isDuplicate = false;
        for (var j = 0; j < uniqueEdges.length; j++) {
            var edge2 = uniqueEdges[j];
            if ((edge1.source === edge2.source && edge1.target === edge2.target) ||
                (edge1.source === edge2.target && edge1.target === edge2.source)) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            uniqueEdges.push(edge1);
        }
    }
    
    const contractionGraph: GraphData = {
        nodes: newNodes,
        edges: uniqueEdges,
    };

    const polyContraction = solveChromaticPolynomial(contractionGraph);

    // P(G,k) = P(G-e, k) - P(G.e, k)
    const result = subtractPolynomials(polyDeletion, polyContraction);
    
    return result;
};
