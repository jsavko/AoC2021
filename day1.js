const fs = require("fs");

const buffer = fs.readFileSync("day1input.txt");
const fileContent = buffer.toString();
let array = fileContent.split('\n');

let count = 0;
let current;
let last = array[0];

for (let item in array) { 
    current = item;
    if (Number(array[item]) > Number(array[item-1]))count++;
    last = current;
}

console.log('Total Increases: ' + count);

