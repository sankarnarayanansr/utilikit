export declare class GraphNode<T> {
    value: T;
    neighbors: Map<GraphNode<T>, number>;
    /**
     * Creates a new graph node.
     * @param value The value to store in the node
     */
    constructor(value: T);
}
export declare class GraphUtils<T> {
    private nodes;
    /**
     * Initializes an empty graph.
     *
     * @example
     * const graph = new GraphUtils<number>();
     */
    constructor();
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
    addNode(value: T): GraphNode<T>;
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
    addEdge(source: GraphNode<T>, target: GraphNode<T>, weight?: number): void;
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
    bfs(start: GraphNode<T>): GraphNode<T>[];
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
    dfs(start: GraphNode<T>): GraphNode<T>[];
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
    findShortestPath(start: GraphNode<T>, end: GraphNode<T>): GraphNode<T>[] | null;
}
//# sourceMappingURL=GraphUtils.d.ts.map