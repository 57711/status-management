import { canTransferState, findRoute } from './shortPath.js'

const graph = {
    "A": ["C", "D"],
    "B": ["B", "D"],
    "C": ["B"],
    "D": ["C"],
}

describe('the short path', () => {
    test('canTransferState happy path', () => {
        const { canTransfer } = canTransferState(graph, "C", "D")
        expect(canTransfer).toBeTruthy();
    });
    test('canTransferState error path', () => {
        const { canTransfer } = canTransferState(graph, "C", "A")
        expect(canTransfer).toBeFalsy();
    });
    test('canTransferState empty start', () => {
        const { canTransfer } = canTransferState(graph, null, "A")
        expect(canTransfer).toBeTruthy();
    });
    test('findRoute happy path', () => {
        expect(findRoute(graph, "A", "B")).toBe("A => C => B");
    });
    test('findRoute error path', () => {
        expect(findRoute(graph, "A", "A")).toBe("");
    });
    test('findRoute empty path', () => {
        expect(findRoute(graph, null, "A")).toBe(" => A");
    });
})
