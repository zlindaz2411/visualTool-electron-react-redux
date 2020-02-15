import {Algorithm} from '../constants/algorithms';
import {kruskals, prims, boruvkas, parallel} from '../functions/mstAlgorithms'
import {esauWilliams} from '../functions/cmstAlgorithms'
import {kruskalConstrained} from'./dcmstAlgorithms'
import {performance} from 'perf_hooks'


/**
 * Compare performance based on a given list of algorithms
 * Return a list of times of given algorithms
 * @param {*} list 
 * @param {*} graph 
 */
export function comparePerformance(list, graph,degree, capacity){
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
        else if((list[i] == Algorithm.ESAU)){
            result.push(calculateTime(function() {esauWilliams(graph, capacity)}))
        }
        else if((list[i] == Algorithm.CONSTRAINED)){
            result.push(calculateTime(function() {kruskalConstrained(graph, degree)}))
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
    try{
    func();
    }
    catch(e){
        console.log(e)
        return -1;
    }
    let endTime = performance.now();

    return endTime - startTime;
    }
