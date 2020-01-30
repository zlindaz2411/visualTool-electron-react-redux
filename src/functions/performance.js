import {Algorithm} from '../constants/algorithms';
import {kruskals, prims, boruvkas, parallel} from '../functions/originalAlgorithms'
import {performance} from 'perf_hooks'


/**
 * Compare performance based on a given list of algorithms
 * Return a list of times of given algorithms
 * @param {*} list 
 * @param {*} graph 
 */
export function comparePerformance(list, graph){
    let result = [];
    for(let i =0;i<list.length;i++){
        if(list[i] == Algorithm.KRUSKAL ){
        //    let res = calculateTime(function() {kruskals(graph.nodes, graph.edges)})
        //    result.push(res)

         result.push(calculateTime(function() {kruskals(graph.nodes, graph.edges)}))
        }
        else if(list[i] == Algorithm.PRIM){
        //     let res = calculateTime(function() {prims(graph.nodes, graph.edges)})
        //    result.push(res)
            result.push(calculateTime(function() {prims(graph.nodes, graph.edges)}))
        }
        else if(list[i] == Algorithm.BORUVKA){
        //     let res = calculateTime(function() {boruvkas(graph.nodes, graph.edges)})
        //    result.push(res)
            result.push(calculateTime(function() {boruvkas(graph.nodes, graph.edges)}))
        }
        else if(list[i] == Algorithm.PARALLEL){
        //     let res = calculateTime(function() {parallel(graph.nodes, graph.edges)})
        //    result.push(res)
           result.push(calculateTime(function() {parallel(graph.nodes, graph.edges)}))
        }
    }
    return result;
}

/**
 * Calculate time from start time to end time
 * @param {*} func 
 */
export function calculateTime(func){
    let startTime = performance.now();
    func();
    let endTime = performance.now();

    return endTime - startTime;
}