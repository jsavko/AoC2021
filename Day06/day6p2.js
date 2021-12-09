const fs = require("fs");
const { endianness } = require("os");
const { exit } = require("process");
const { start } = require("repl");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

//console.log(fileContent);

let Fish = {
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
};

//Add Fish Count to the Object
for (newfish of fileContent.split(',')){ 
    //console.log(newfish);
    Fish[`${newfish}`] += 1;
}

days = 256;
for (let i=0; i < days; i++) {
    let spawnedFish = Fish[0];
    let adult = Fish[0] + Fish[7];
    let NewFish = {
        0:Fish[1],
        1:Fish[2],
        2:Fish[3],
        3:Fish[4],
        4:Fish[5],
        5:Fish[6],
        6:adult,
        7:Fish[8],
        8:spawnedFish ?? 0,
    }
    Fish = NewFish;
}

console.log(Fish)

//count Fish
let FishCount = 0;
for (let i = 0; i<9; i++ ){
    FishCount += Fish[i];
}

console.log(FishCount)