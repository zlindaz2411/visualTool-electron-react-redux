import {Algorithm} from '../constants/algorithms';
import {kruskals, prims, boruvkas, parallel} from '../functions/mstAlgorithms'
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
         result.push(calculateTime(function() {kruskals(graph)}))
        }
        else if(list[i] == Algorithm.PRIM){
            result.push(calculateTime(function() {prims(graph)}))
        }
        else if(list[i] == Algorithm.BORUVKA){
            result.push(calculateTime(function() {boruvkas(graph)}))
        }
        else if(list[i] == Algorithm.PARALLEL){
           result.push(calculateTime(function() {parallel(graph)}))
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