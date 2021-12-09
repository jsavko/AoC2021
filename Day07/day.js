console.time("exetime");
const fs = require("fs");
const { endianness } = require("os");
const { exit } = require("process");
const { start } = require("repl");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

let PosArray = fileContent.split(',');
let PosCalcs = {};
let PosCost = {}


for (let i = 0; i < Math.max(...PosArray); i++ ){ 
    for (pos of PosArray) {
        // Loop through and find difference in numbers
        if (!!PosCost[`${i}`] == false) PosCost[`${i}`] = 0
        if (!!PosCalcs[`${pos}`] == false) PosCalcs[`${pos}`] = {}
        PosCalcs[`${pos}`][`${i}`] = Math.abs(pos-i);
        PosCost[`${i}`] = Number(PosCost[`${i}`]) + Math.abs(pos-i)
    }
}

//console.log(PosCalcs)
//console.log(PosCost)
let PosCostArray = Object.values(PosCost);
let min = Math.min(...PosCostArray);
let max = Math.max(...PosCostArray);
console.log( `Min value: ${min}, max value: ${max}` );
console.timeEnd("exetime");