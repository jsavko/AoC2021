console.time("exetime");
const fs = require("fs");
const { endianness } = require("os");
const { exit } = require("process");
const { start } = require("repl");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

//console.log(fileContent);

let fishArray = [];


class Fish { 
    constructor(options) {
        this.number = options.number ?? 0;
        this.spawnCount = 0;
        this.internalTimer = options.internalTimer ?? 0;
    }

    _nextDay(){
        this.internalTimer -= 1;
        if (this.internalTimer < 0) {
            //spawn New fish
            let newFish = new Fish({number:ii, internalTimer:9})
            ii++;
            fishArray.push(newFish);
            this.internalTimer = 6;
        }
    }
}

let ii = 0;
for (newfish of fileContent.split(',')){ 
    //console.log(newfish);
    let thisFish = new Fish({number:Number(ii), internalTimer:Number(newfish)})
    fishArray.push(thisFish);
    ii++;
}

let days = 80;
for (let i=0; i < days; i++) {
    for(fish of fishArray) {
        fish._nextDay();
    }
}

console.log('Fish Count on Day %d is: %d', days, fishArray.length)
console.timeEnd("exetime");