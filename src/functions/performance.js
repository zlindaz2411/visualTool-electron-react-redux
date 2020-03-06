import {Algorithm} from '../constants/algorithms';
import {kruskals, prims, boruvkas, parallel, parallelPromise} from '../functions/mstAlgorithms'
import {esauWilliams} from '../functions/cmstAlgorithms'
import {kruskalConstrained, simulatedAnnealing} from'./dcmstAlgorithms'
import {performance} from 'perf_hooks'
import {ErrMessage} from'../constants/errorMessage'
import {getWeight} from '../functions/util'


/**
 * Compare performance based on a given list of algorithms
 * Return a list of times of given algorithms
 * @param {*} list 
 * @param {*} graph 
 */
export function comparePerformanceByTime(list, graph,degree, capacity){
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
        else if(list[i] == Algorithm.SIMULATED){
            if(simulatedAnnealing(graph, degree) == ErrMessage.DCMST_NOT_FOUND){
                result.push(-1)
            }
            else{
            result.push(calculateTime(function() {simulatedAnnealing(graph, degree)}))
            }
        }

    }
    return result;
}

/**
 * Compare performance based on a given list of algorithms
 * Return a list of weights of given algorithms
 * @param {*} list 
 * @param {*} graph 
 */
export function comparePerformanceByWeight(list, graph, degree, capacity){
    let result = [];
    for(let i =0;i<list.length;i++){
        if(list[i] == Algorithm.KRUSKAL ){
            result.push(getWeight(kruskals(graph)))
        }
        else if(list[i] == Algorithm.PRIM){
            getWeight(prims(graph))
            result.push(getWeight(prims(graph)))
        }
        else if(list[i] == Algorithm.BORUVKA){
            result.push(getWeight(boruvkas(graph)))
        }
        else if(list[i] == Algorithm.PARALLEL){
            result.push(getWeight(boruvkas(graph)))    
        }
        else if((list[i] == Algorithm.ESAU)){
            if(esauWilliams(graph, capacity) == ErrMessage.CMST_NOT_FOUND){
                result.push(-1)
            }
            else{
                result.push(getWeight(esauWilliams(graph, capacity)))
            }
        }
        else if((list[i] == Algorithm.CONSTRAINED)){
            if(kruskalConstrained(graph,degree) == ErrMessage.DCMST_NOT_FOUND){
                result.push(-1)
            }
            else{
                result.push(getWeight(kruskalConstrained(graph, degree)))
            }
        }
        else if(list[i] == Algorithm.SIMULATED){
            if(simulatedAnnealing(graph, degree) == ErrMessage.DCMST_NOT_FOUND){
                result.push(-1)
            }
            else{
            result.push(getWeight(simulatedAnnealing(graph, degree)))
            }
        }
    }
    return result;
}

/**
 * Calculate time from start time to end time
 * @param {*} func 
 */
function calculateTime(func){
    
    let startTime = performance.now();
    func();
    let endTime = performance.now();

    return endTime - startTime;
    }
