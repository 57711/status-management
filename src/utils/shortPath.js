export function canTransferState(graph, start, end) {
    if(start === null){
        return {
            canTransfer: true,
            path: {[end]: null}
        }
    }
    const queue = [start]
    const visited = new Set()
    const dist = { [start]: 0 }
    const path = {}
    let isBreak = false

    while (queue.length) {
        const node = queue.shift()
        if (visited.has(node)) continue
        if (isBreak) break
        for (let child of graph[node]) {
            if (!dist[child] || dist[child] > dist[node]) {
                dist[child] = dist[node] + 1
                path[child] = node
                queue.push(child)
            }
            if (child == end) {
                isBreak = true
                break
            }
        }
        visited.add(node)
    }
    const canTransfer = dist[end] > 0

    return { canTransfer, path }
}

export function findRoute(graph, start, end) {
    const { path, canTransfer } = canTransferState(graph, start, end)
    if (!canTransfer) return ""
    let route = end

    do {
        end = path[end]
        route = `${end || ''} => ${route}`
    } while (end != start)

    return route
}
