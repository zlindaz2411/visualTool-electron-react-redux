/**
 * Check if input text is only digit
 * @param {*} text 
 */
export function validateNumber(text){
    console.log(text)
    return !isNaN(text)
}

/**
 * Check if input text is empty
 * @param {*} text 
 */
export function validateEmpty(text){
    return text.length == 0;
}