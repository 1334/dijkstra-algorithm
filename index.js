// option one of representing the graph

const graph = {
  a: {
    edges: {
      b: 10,
      c: 20
    },
    minWeight: Infinity
  },
  b: {
    d: 50,
    e: 10
  },
  c: {
    d: 20,
    e: 33
  },
  d: {
    e: 20,
    f: 2
  },
  e: {
    f: 1
  }
}

function dijkstra(graph) {

}

console.log(dijkstra(graph));
console.assert(dijkstra(graph), [0, 10, 20, 40, 20, 21]);
