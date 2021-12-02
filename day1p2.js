const fs = require("fs");

const buffer = fs.readFileSync("day1input.txt");
const fileContent = buffer.toString();
let array = fileContent.split('\n');

let count = 0;
let last = 1000;

for (let i=0; i < array.length; i++) { 
    currentsum = Number(array[i])+ Number(array[i+1])+ Number(array[i+2])
    if (!!currentsum) if (Number(currentsum) > Number(last) )count++;
    last = currentsum;
}
console.log('Total Increases: ' + count);