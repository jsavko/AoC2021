const fs = require("fs");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();
let array = fileContent.split('\r\n');

let bitCount = {};
let bitCode ="";

let OxGen = 0;
let CoScrub = 0;
let lifeSupportRating = 0;

let NumberLength = (array[0]).toString().length;


// Create Descimal Number from Binary
function _toDecimal(number){
    let decimal = 0;
    for (let i = 0; i < number.length; i++){ 
        let digit = number.charAt(i);
        let dec = Number(digit) * (Math.pow(2, Number(number.length-(i+1))));
        decimal += dec;
    }
    return decimal;
}

function _countDigit(array, digit) {
    let bitCount = {0:0, 1:0};
    let numberArray = {0:[], 1:[]}
    let countObject = {}
    let most = 0;

    for( let item of array){
        if (!!bitCount[item.charAt(digit)] == false) bitCount[item.charAt(digit)] = 0;
        bitCount[item.charAt(digit)]++;
        numberArray[item.charAt(digit)].push(item)
    }
    if (bitCount[0] <= bitCount[1]) most = 1
    countObject.most = most;
    countObject.counts = bitCount;
    countObject.array = numberArray
    return countObject;
}



// Find Ox
let keepLooking = true;
let keepArray = array;
for(let i= 0; i < NumberLength; i++){
    
    let DigitArray = _countDigit(keepArray,i);
    if (DigitArray.most == 1){
        keepArray = DigitArray.array[1];
    } else {
        keepArray = DigitArray.array[0];
    }
    
    if (keepArray.length == 1) keepLooking = false;

    if (!keepLooking) break;
}
OxGen = keepArray[0];


// Find Co
keepLooking = true;
keepArray = array;
for(let i= 0; i < NumberLength; i++){
    let DigitArray = _countDigit(keepArray,i);
    //console.log(DigitArray)
    if (DigitArray.most == 1){
        keepArray = DigitArray.array[0];
    } else {
        keepArray = DigitArray.array[1];
    }
    if (keepArray.length == 1) keepLooking = false;

    if (!keepLooking) break;
}
CoScrub = keepArray[0];

let CoScrubDec = _toDecimal(CoScrub);
let OxGenDec = _toDecimal(OxGen);
lifeSupportRating = CoScrubDec * OxGenDec;
console.log('Life Support Rating: ' + lifeSupportRating)


