self.onmessage = function(event) {
    // console.log('Worker: Message received from main script');
    // console.log(event.data.cheapest)
    // self.postMessage(event.data.cheapest);
    if(event.data.u!=event.data.v) {
        if(event.data.cheapest[event.data.u] == -1 || event.data.edge.weight < event.data.cheapest[event.data.u].weight) event.data.cheapest[event.data.u]=event.data.edge
        if(event.data.cheapest[event.data.v] == -1 || event.data.edge.weight < event.data.cheapest[event.data.v].weight) event.data.cheapest[event.data.v]=event.data.edge
    }
    self.postMessage(event.data.cheapest);
};
// onmessage = function(e) {
//     console.log('Worker: Message received from main script');
//     let result = e.data[0] * e.data[1];
//     if (isNaN(result)) {
//       postMessage('Please write two numbers');
//     } else {
//       let workerResult = 'Result: ' + result;
//       console.log('Worker: Posting message back to main script');
//       postMessage(workerResult);
//     }
//   }