/**
 * On receiving the message, the function is triggered. 
 * We find the smallest edge of a vertex
 */
self.onmessage = function(event) {
    if(event.data.u!=event.data.v) {
        if(event.data.cheapest[event.data.u] == -1 || event.data.edge.weight < event.data.cheapest[event.data.u].weight) event.data.cheapest[event.data.u]=event.data.edge
        if(event.data.cheapest[event.data.v] == -1 || event.data.edge.weight < event.data.cheapest[event.data.v].weight) event.data.cheapest[event.data.v]=event.data.edge
    }
    self.postMessage(event.data.cheapest);
};

