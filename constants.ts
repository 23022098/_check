
import { GraphData } from './types';

export const GRAPH_COLORS = [
    '#F97316', // Orange 500
    '#22C55E', // Green 500
    '#3B82F6', // Blue 500
    '#EC4899', // Pink 500
    '#EAB308', // Yellow 500
    '#8B5CF6', // Violet 500
    '#14B8A6', // Teal 500
    '#EF4444', // Red 500
];

export const GRAPH_TYPES = ['TRIANGLE', 'SQUARE', 'K5', 'K5_SUB', 'PETERSEN'];

const K3: GraphData = {
    nodes: [
        { id: 'n1', x: 250, y: 100 },
        { id: 'n2', x: 100, y: 350 },
        { id: 'n3', x: 400, y: 350 },
    ],
    edges: [
        { source: 'n1', target: 'n2' },
        { source: 'n2', target: 'n3' },
        { source: 'n3', target: 'n1' },
    ],
};

const C4: GraphData = {
    nodes: [
        { id: 'n1', x: 150, y: 150 },
        { id: 'n2', x: 350, y: 150 },
        { id: 'n3', x: 350, y: 350 },
        { id: 'n4', x: 150, y: 350 },
    ],
    edges: [
        { source: 'n1', target: 'n2' },
        { source: 'n2', target: 'n3' },
        { source: 'n3', target: 'n4' },
        { source: 'n4', target: 'n1' },
    ],
};

const K5: GraphData = {
    nodes: [
        { id: 'n1', x: 250, y: 50 },
        { id: 'n2', x: 450, y: 200 },
        { id: 'n3', x: 375, y: 450 },
        { id: 'n4', x: 125, y: 450 },
        { id: 'n5', x: 50, y: 200 },
    ],
    edges: [
        { source: 'n1', target: 'n2' },
        { source: 'n1', target: 'n3' },
        { source: 'n1', target: 'n4' },
        { source: 'n1', target: 'n5' },
        { source: 'n2', target: 'n3' },
        { source: 'n2', target: 'n4' },
        { source: 'n2', target: 'n5' },
        { source: 'n3', target: 'n4' },
        { source: 'n3', target: 'n5' },
        { source: 'n4', target: 'n5' },
    ],
};

const K5_SUB: GraphData = {
    nodes: [
        { id: 'n1', x: 250, y: 50 },
        { id: 'n2', x: 450, y: 200 },
        { id: 'n3', x: 375, y: 450 },
        { id: 'n4', x: 125, y: 450 },
        { id: 'n5', x: 50, y: 200 },
        { id: 'n6', x: 188, y: 250 }, // Subdivision node
    ],
    edges: [
        { source: 'n1', target: 'n2' },
        { source: 'n1', target: 'n3' },
        { source: 'n1', target: 'n4' },
        { source: 'n1', target: 'n5' },
        { source: 'n2', target: 'n3' },
        { source: 'n2', target: 'n4' },
        { source: 'n2', target: 'n5' },
        { source: 'n3', target: 'n5' },
        { source: 'n4', target: 'n5' },
        // Subdivided edge n3-n4
        { source: 'n3', target: 'n6' },
        { source: 'n4', target: 'n6' },
    ],
};

const PETERSEN: GraphData = {
    nodes: [
        // Outer pentagon
        { id: 'n0', x: 250, y: 50 },
        { id: 'n1', x: 438, y: 190 },
        { id: 'n2', x: 363, y: 450 },
        { id: 'n3', x: 137, y: 450 },
        { id: 'n4', x: 62, y: 190 },
        // Inner star
        { id: 'n5', x: 250, y: 155 },
        { id: 'n6', x: 344, y: 228 },
        { id: 'n7', x: 294, y: 375 },
        { id: 'n8', x: 206, y: 375 },
        { id: 'n9', x: 156, y: 228 },
    ],
    edges: [
        // Outer edges
        { source: 'n0', target: 'n1' },
        { source: 'n1', target: 'n2' },
        { source: 'n2', target: 'n3' },
        { source: 'n3', target: 'n4' },
        { source: 'n4', target: 'n0' },
        // Spoke edges
        { source: 'n0', target: 'n5' },
        { source: 'n1', target: 'n6' },
        { source: 'n2', target: 'n7' },
        { source: 'n3', target: 'n8' },
        { source: 'n4', target: 'n9' },
        // Inner edges
        { source: 'n5', target: 'n7' },
        { source: 'n5', target: 'n8' },
        { source: 'n6', target: 'n8' },
        { source: 'n6', target: 'n9' },
        { source: 'n7', target: 'n9' },
    ],
};

export const PRESET_GRAPHS: Record<string, GraphData> = {
    TRIANGLE: K3,
    SQUARE: C4,
    K5: K5,
    K5_SUB: K5_SUB,
    PETERSEN: PETERSEN,
};
