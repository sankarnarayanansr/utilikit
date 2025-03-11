import { GraphUtils, GraphNode } from '../../src/dspkg/GraphUtils';

describe('GraphUtils', () => {
    let graph: GraphUtils<number>;

    beforeEach(() => {
        graph = new GraphUtils<number>();
    });

    describe('addNode', () => {
        it('should add a node to the graph', () => {
            const node = graph.addNode(1);
            expect(node.value).toBe(1);
            expect(node.neighbors.size).toBe(0);
        });

        it('should create unique nodes for same values', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(1);
            expect(node1).not.toBe(node2);
        });
    });

    describe('addEdge', () => {
        it('should add an edge between nodes', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            graph.addEdge(node1, node2, 5);

            expect(node1.neighbors.get(node2)).toBe(5);
        });

        it('should use default weight of 1', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            graph.addEdge(node1, node2);

            expect(node1.neighbors.get(node2)).toBe(1);
        });

        it('should throw error for non-existent nodes', () => {
            const node1 = graph.addNode(1);
            const invalidNode = new GraphNode(2);

            expect(() => graph.addEdge(node1, invalidNode)).toThrow("Both nodes must exist in the graph");
        });
    });

    describe('BFS', () => {
        it('should perform breadth-first search', () => {
            // Create a graph:
            //     1
            //    / \
            //   2   3
            //  /     \
            // 4       5
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);
            const node4 = graph.addNode(4);
            const node5 = graph.addNode(5);

            graph.addEdge(node1, node2);
            graph.addEdge(node1, node3);
            graph.addEdge(node2, node4);
            graph.addEdge(node3, node5);

            const result = graph.bfs(node1);
            expect(result.map(node => node.value)).toEqual([1, 2, 3, 4, 5]);
        });

        it('should handle cycles', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);

            graph.addEdge(node1, node2);
            graph.addEdge(node2, node3);
            graph.addEdge(node3, node1);

            const result = graph.bfs(node1);
            expect(result.map(node => node.value)).toEqual([1, 2, 3]);
        });
    });

    describe('DFS', () => {
        it('should perform depth-first search', () => {
            // Create a graph:
            //     1
            //    / \
            //   2   3
            //  /     \
            // 4       5
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);
            const node4 = graph.addNode(4);
            const node5 = graph.addNode(5);

            graph.addEdge(node1, node2);
            graph.addEdge(node1, node3);
            graph.addEdge(node2, node4);
            graph.addEdge(node3, node5);

            const result = graph.dfs(node1);
            // DFS should visit one complete path before backtracking
            expect(result.map(node => node.value)).toEqual([1, 2, 4, 3, 5]);
        });

        it('should handle cycles', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);

            graph.addEdge(node1, node2);
            graph.addEdge(node2, node3);
            graph.addEdge(node3, node1);

            const result = graph.dfs(node1);
            expect(result.map(node => node.value)).toEqual([1, 2, 3]);
        });
    });

    describe('findShortestPath', () => {
        it('should find shortest path between nodes', () => {
            // Create a graph:
            //     1
            //    / \
            //   2   3
            //    \ /
            //     4
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);
            const node4 = graph.addNode(4);

            graph.addEdge(node1, node2, 1);
            graph.addEdge(node1, node3, 2);
            graph.addEdge(node2, node4, 3);
            graph.addEdge(node3, node4, 1);

            const path = graph.findShortestPath(node1, node4);
            expect(path?.map(node => node.value)).toEqual([1, 3, 4]);
        });

        it('should return null when no path exists', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);

            const path = graph.findShortestPath(node1, node2);
            expect(path).toBeNull();
        });

        it('should handle zero-weight paths', () => {
            const node1 = graph.addNode(1);
            const node2 = graph.addNode(2);
            const node3 = graph.addNode(3);

            graph.addEdge(node1, node2, 0);
            graph.addEdge(node2, node3, 0);

            const path = graph.findShortestPath(node1, node3);
            expect(path?.map(node => node.value)).toEqual([1, 2, 3]);
        });
    });
}); 