import {Algorithm} from '../constants/algorithms';
import {kruskals, prims, boruvkas, parallel} from '../functions/mstAlgorithms'
import {esauWilliams} from '../functions/cmstAlgorithms'
import {kruskalConstrained} from'./dcmstAlgorithms'
import {performance} from 'perf_hooks'
import {ErrMessage} from'../constants/errorMessage'


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
            if(esauWilliams(graph, capacity) == ErrMessage.CMST_NOT_FOUND){
                result.push(-1)
            }
            else{
                result.push(calculateTime(function() {esauWilliams(graph, capacity)}))
            }
        }
        else if((list[i] == Algorithm.CONSTRAINED)){
            if(kruskalConstrained(graph,degree) == ErrMessage.DCMST_NOT_FOUND){
                result.push(-1)
            }
            else{
            result.push(calculateTime(function() {kruskalConstrained(graph, degree)}))
            }
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
