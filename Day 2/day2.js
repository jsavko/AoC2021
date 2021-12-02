const fs = require("fs");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();
let array = fileContent.split('\n');

let h = 0;
let d = 0;
let a = 0;

const regex = /(\w+) (\d)/gm;

for (let item of array) {
    //console.log(item)
    while ((m = regex.exec(item)) !== null) {
        //console.log(m)
        switch (m[1]) {
            case "forward":
                h = h + Number(m[2]);
                d = d + (a * Number(m[2]));
                break;
            case "back":
                h = h - Number(m[2]);
                break;
            case "up":
                //d = d -  Number(m[2]);
                a = a -  Number(m[2]);
                break;
            case "down":
                //d = d +  Number(m[2]);
                a = a + Number(m[2]);
                break;
        }
        //console.log("h: " + h)
        //console.log("d: " +d)  
        //console.log("a: " + a)
    }
}
console.log(h)
console.log(d)
console.log(d*h)