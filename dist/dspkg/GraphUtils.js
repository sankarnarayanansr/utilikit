"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphUtils = exports.GraphNode = void 0;
class GraphNode {
    /**
     * Creates a new graph node.
     * @param value The value to store in the node
     */
    constructor(value) {
        this.value = value;
        this.neighbors = new Map();
    }
}
exports.GraphNode = GraphNode;
class GraphUtils {
    /**
     * Initializes an empty graph.
     *
     * @example
     * const graph = new GraphUtils<number>();
     */
    constructor() {
        this.nodes = new Set();
    }
    /**
     * Adds a node to the graph.
     * @param value The value to add
     * @returns The created node
     *
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * // Graph now contains nodes with values 1 and 2
     */
    addNode(value) {
        const node = new GraphNode(value);
        this.nodes.add(node);
        return node;
    }
    /**
     * Adds an edge between two nodes with an optional weight.
     * @param source Source node
     * @param target Target node
     * @param weight Edge weight (default: 1)
     *
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * graph.addEdge(node1, node2, 5);
     * // Adds edge from node1 to node2 with weight 5
     */
    addEdge(source, target, weight = 1) {
        if (!this.nodes.has(source) || !this.nodes.has(target)) {
            throw new Error("Both nodes must exist in the graph");
        }
        source.neighbors.set(target, weight);
    }
    /**
     * Performs Breadth-First Search starting from a node.
     * @param start Starting node
     * @returns Array of nodes in BFS order
     *
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * const node3 = graph.addNode(3);
     * graph.addEdge(node1, node2);
     * graph.addEdge(node2, node3);
     *
     * const bfsResult = graph.bfs(node1);
     * // Result: [node1, node2, node3]
     */
    bfs(start) {
        const visited = new Set();
        const result = [];
        const queue = [start];
        visited.add(start);
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);
            for (const [neighbor] of Array.from(current.neighbors.entries())) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    /**
     * Performs Depth-First Search starting from a node.
     * @param start Starting node
     * @returns Array of nodes in DFS order
     *
     * @example
     * const graph = new GraphUtils<number>();
     * const node1 = graph.addNode(1);
     * const node2 = graph.addNode(2);
     * const node3 = graph.addNode(3);
     * graph.addEdge(node1, node2);
     * graph.addEdge(node2, node3);
     *
     * const dfsResult = graph.dfs(node1);
     * // Result: [node1, node2, node3]
     */
    dfs(start) {
        const visited = new Set();
        const result = [];
        const dfsHelper = (node) => {
            visited.add(node);
            result.push(node);
            for (const [neighbor] of Array.from(node.neighbors.entries())) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };
        dfsHelper(start);
        return result;
    }
    /**
     * Finds the shortest path between two nodes using Dijkstra's algorithm.
     * @param start Starting node
     * @param end Ending node
     * @returns Array of nodes representing the shortest path, or null if no path exists
     *
     * @example
     * const graph = new GraphUtils<string>();
     * const nodeA = graph.addNode("A");
     * const nodeB = graph.addNode("B");
     * const nodeC = graph.addNode("C");
     * graph.addEdge(nodeA, nodeB, 4);
     * graph.addEdge(nodeB, nodeC, 3);
     * graph.addEdge(nodeA, nodeC, 8);
     *
     * const path = graph.findShortestPath(nodeA, nodeC);
     * // Result: [nodeA, nodeB, nodeC] (path with total weight 7)
     */
    findShortestPath(start, end) {
        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();
        // Initialize distances
        for (const node of Array.from(this.nodes)) {
            distances.set(node, node === start ? 0 : Infinity);
            unvisited.add(node);
        }
        while (unvisited.size > 0) {
            // Find node with minimum distance
            let current = Array.from(unvisited).reduce((min, node) => (distances.get(node) < distances.get(min)) ? node : min);
            if (current === end)
                break;
            unvisited.delete(current);
            // Update distances to neighbors
            for (const [neighbor, weight] of Array.from(current.neighbors.entries())) {
                if (!unvisited.has(neighbor))
                    continue;
                const distance = distances.get(current) + weight;
                if (distance < distances.get(neighbor)) {
                    distances.set(neighbor, distance);
                    previous.set(neighbor, current);
                }
            }
        }
        // Reconstruct path
        if (!previous.has(end))
            return null;
        const path = [];
        let current = end;
        while (current !== start) {
            path.unshift(current);
            current = previous.get(current);
        }
        path.unshift(start);
        return path;
    }
}
exports.GraphUtils = GraphUtils;
