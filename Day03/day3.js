const fs = require("fs");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();
let array = fileContent.split('\r\n');

let bitCount = {};
let bitCode ="";
let gammaRate = "";
let gammaRateDec = 0;
let epsilonRate = ""
let epsilonRateDec = 0;
let powerConsumption = 0;


// Count each digit
for (let item of array ) {
    for (let i = 0; i < item.length; i++) {
        if (!!bitCount[i] == false) bitCount[i] = {};
        if (!!bitCount[i][item.charAt(i)] == false) bitCount[i][item.charAt(i)] = 0;
        bitCount[i][item.charAt(i)]++;
    }
}

// Make Binary Number
for (let item in bitCount){
    if (bitCount[item][0] > bitCount[item][1]){
        bitCode = bitCode + String("0");
        gammaRate = gammaRate + String("0");
        epsilonRate = epsilonRate + String("1");
    } 
    if (bitCount[item][0] < bitCount[item][1]){
        bitCode = bitCode + String("1");
        gammaRate = gammaRate + String("1");
        epsilonRate = epsilonRate + String("0");
    } 
}

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


decimal = _toDecimal(bitCode);

gammaRateDec = _toDecimal(gammaRate);
epsilonRateDec = _toDecimal(epsilonRate);
powerConsumption = gammaRateDec * epsilonRateDec;


console.log('Gamma: ' + gammaRateDec)
console.log('Epsilon: ' + epsilonRateDec)
console.log('Power Consumption: ' + powerConsumption)

