// option one of representing the graph

const graph = {
  a: {
    value: 'a',
    edges: { b: 10, c: 20 },
    minWeight: null
  },
  b: {
    value: 'b',
    edges: { d: 50, e: 10 },
    minWeight: null
  },
  c: {
    value: 'c',
    edges: { d: 20, e: 33 },
    minWeight: null
  },
  d: {
    value: 'd',
    edges: { e: 20, f: 2 },
    minWeight: null
  },
  e: {
    value: 'e',
    edges: { f: 1 },
    minWeight: null
  },
  f: {
    value: 'f',
    edges: {},
    minWeight: null
  }
}

function dijkstra(graph, root) {
  const newGraph = JSON.parse(JSON.stringify(graph));
  root = newGraph[root];
  const queue = new Queue();
  const result = {
    weigths: [],
    paths: {}
  };
  let currentNode;

  root.minWeight = 0;
  queue.insert(root);
  currentNode = queue.next();

  while(currentNode) {
    for (let key in currentNode.edges) {
      if (!newGraph[key].minWeight || currentNode.edges[key] + currentNode.minWeight <= newGraph[key].minWeight) {
        newGraph[key].minWeight = currentNode.edges[key] + currentNode.minWeight;
        newGraph[key].previous = currentNode;
      }
      queue.insert(newGraph[key]);
    }
    currentNode = queue.next();
  }

  for (let node in newGraph) {
    result.weigths.push(newGraph[node].minWeight);

    result.paths[node] = generatePath(newGraph[node]);
  }
  console.log(result.paths);

  return result.weigths;

  function generatePath (node) {
    const path = [];
    while(node.previous) {
      path.unshift(node.value);
      node = node.previous;
    }
    path.unshift(node.value);
    return path;
  }
}

function Queue() {
  this.storage = [];
}

Queue.prototype.insert = function (element) {
  if (!this.storage.includes(element)) this.storage.push(element);
  this.storage.sort((a, b) => a.minWeight - b.minWeight);
};

Queue.prototype.next = function () {
  if (this.isEmpty()) return undefined;
  return this.storage.shift();
};

Queue.prototype.isEmpty = function () {
  return !this.storage.length;
};

console.log('weights', dijkstra(graph, 'a'));
// console.assert(dijkstra(graph, graph.a), [0, 10, 20, 40, 20, 21]);

// const queue = new Queue();
// let nodeb = Object.assign({}, graph.b, {minWeight: 10});
// let nodec = Object.assign({}, graph.c, {minWeight: 20});
// console.log('isEmpty:', queue.isEmpty());
// queue.insert(nodec);
// queue.insert(nodeb);
// console.log('isEmpty:', queue.isEmpty());

// console.assert(queue.storage[0] === nodeb);
// console.assert(queue.storage[1] === nodec);
