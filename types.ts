
export interface Node {
    id: string;
    x: number;
    y: number;
    color?: number;
}

export interface Edge {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

// Represents a polynomial as an object where key is the power and value is the coefficient.
// Example: k^3 - 2k^2 + k would be { "3": 1, "2": -2, "1": 1 }
export type Polynomial = { [power: number]: number };
