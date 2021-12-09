const fs = require("fs");
const { endianness } = require("os");
const { exit } = require("process");
const { start } = require("repl");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

let LineGrid= {}

const regex = /(\d?\d?\d,\d?\d?\d) -> (\d?\d?\d,\d?\d?\d)/gm;
LineArray = [];


let pt1count = 0;

while ((m = regex.exec(fileContent)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    let object = {text: m[0], startX:m[1].split(',')[0], startY:m[1].split(',')[1], endX:m[2].split(',')[0], endY:m[2].split(',')[1]}
    LineArray.push(object)
}

function operators(operation, a, b) {
    if (operation == '<=') { return a <= b }
    if (operation == '>=') { return a >= b }
    return false;
}

for(line of LineArray) {
    //Straight Lines only
    if ((line.startX == line.endX) || (line.startY == line.endY)) {
        for (let x = Math.min(line.startX, line.endX); x <= Math.max(line.startX, line.endX); x++) {
            for(let y = Math.min(line.startY, line.endY); y <= Math.max(line.startY, line.endY); y++) {
                //console.log(`${x},${y}`)
                let value = LineGrid[`${x},${y}`]  ?? 0;
                LineGrid[`${x},${y}`] = value +1;
                if (value === 1 ) pt1count++;
            }
        }
    } else { 
        //Find Direction of line (part 2)

        //Find Slope
        let m = (line.endY - line.startY)/(line.endX - line.startX);
        let b = line.startY - m*line.startX;
        // Y = mx+b;
        let YY = m*line.startX + b;
        //console.log(line); 
        for (let x = Math.min(line.startX, line.endX); x <= Math.max(line.startX, line.endX); x++) {
            let y = m*x + b;
            //console.log(`${x},${y}`)
            let value = LineGrid[`${x},${y}`]  ?? 0;
            LineGrid[`${x},${y}`] = value +1;
            if (value === 1 ) pt1count++;
        }
    }


}


//console.log(LineGrid)
console.log(pt1count)