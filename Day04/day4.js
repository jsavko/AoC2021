
//import{ BingoCard } from "./bingo.js";


const fs = require("fs");
const { endianness } = require("os");
const { exit } = require("process");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();


let Winner = false;
let winnerArray = [];
let winningCard;
class BingoCard { 

    constructor(options) {
        this.data = []
        this.winner = false;
        this.original = options.original
        this._makeData();
    }

    async _makeData(){
        //console.log('Organize Data');
        let numbersArray = this.original.match(/\d?\d/g);
        this.original = numbersArray;
        //console.log(numbersArray)
        for (let i = 0; i < 10; i++) {
            let data = {};
            data.data = [];
            data.id = i;
            data.winner = false;
            let innerDataArray = []
            if (i < 5) { 
            for (let ii = 0; ii <5; ii++){
                let innerData = {}
                let loc = i*5 + ii
                innerData.id = ii;
                innerData.value = numbersArray[loc];
                innerData.pos = loc;
                innerData.called = false;
                //console.log(innerData)
                data.data.push(innerData);
                //console.log(innerDataArray)
            }

            //console.log('\r\n')
            //console.log(innerDataArray);
            } else {
            innerDataArray = []
            for (let ii = 0; ii <5; ii++){
                let innerData = {}
                let loc = i-5 + ii*5
                innerData.id = ii;
                innerData.value = numbersArray[loc];
                innerData.pos = loc;
                innerData.called = false;
                //console.log(innerData)
                data.data.push(innerData);
                //console.log(innerDataArray)
            }
            //data.data.push(innerDataArray);
            //console.log(data.data)
        }
            this.data.push(data)
        }
    }

    

    async _callNumber(number) {
        //console.log(this.data);
        if (!this.winner){ 
            for (item of this.data){
                if (this.winner) break;
                //console.log(item)
                //console.log(item.data);
                let found = item.data.find(i => i.value == number);
                //console.log(number);
                //console.log(found);
                if (!!found) { 
                    item.data[found.id].called = true;
                    this.data[item.id].data[found.id].called = true;
                }
    
                //Check for Winner
               let winner = this.data.map(i => { 
                   //console.log(i.data)
                   let count = i.data.filter(i => i.called === true);
                    //console.log(count)
                    if (count.length == 5) {
                    //    return true;
                    //console.log("We have a winner")
                    this.data[item.id].winner=true;
                    this.winner = true;
                    Winner = true;
                    winnerArray = count;
                    winningCard = this;
                    return true;
                    }
                    return false;
                    //console.log('\r\n')
               });
               if (this.winner) break;
    
            }
        }
        
        //console.log(this.data[0])
    }

};


async function start(){ 

let array = fileContent.split('\r\n\r\n');

let callArray = array[0].split(',');
let bingoCardArray = [];





console.log('\r\n')
for (let i = 1; i< array.length; i++) {
    //console.log(array[i])
    //cleanArray = array[1].replace(/\r\n/g, "\n");
    let bCard = new BingoCard({original:array[i]})
    bingoCardArray.push(bCard)
    //console.log('\r\n')
}

let currentNumber = 0;
for (number of callArray) {
    if (Winner) break;
    for (item of bingoCardArray) {
        currentNumber = number;
        if (item.winner) break;
        if (Winner) break;
        await item._callNumber(number);
    }
}

//console.log(bingoCardArray[0]._callNumber(7))
//console.log(bingoCardArray)
console.log(winnerArray);
console.log(currentNumber);
let winningSum = 0;
let unusedSum = 0;


for (number of winnerArray) {
    winningSum += Number(number.value);
}

unusedArray = [];
unusedSum = 0;
for(let i = 0; i < 5; i++){
    //console.log(winningCard.data[i].data)
    let data = winningCard.data[i].data.filter(i => i.called === false);
    //console.log(data)
    for (item of data){
        //console.log(item);
        unusedArray.push(item);
        unusedSum += Number(item.value);
    }
}

console.log(unusedSum);
console.log(unusedSum * currentNumber)

}
start();