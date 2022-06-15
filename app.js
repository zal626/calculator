let currentNum = "";
let previousNum = "";
let operator = "";

const numBtn = document.querySelectorAll('.numbers');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.getElementById('equals');
const delBtn = document.getElementById('delete');
const allClearBtn = document.getElementById('all-clear');
const pointBtn = document.getElementById('dot');
const previousDisplay = document.getElementById('previous');
const currentDisplay = document.getElementById('current');

window.addEventListener('keydown', getKeyPress)
numBtn.forEach(button => 
  button.addEventListener('click', () => getNumber(button.textContent)))
operatorBtn.forEach(button => 
  button.addEventListener('click', () => getOperator(button.textContent)))
equalsBtn.addEventListener('click', () => {
  if(currentNum != "" && previousNum != "") operate();
})
delBtn.addEventListener('click', deleteNum)
allClearBtn.addEventListener('click', clearAll)
pointBtn.addEventListener('click', appendPoint)

function getNumber(number){
  if(previousNum !== "" && currentNum !== "" && operator === ""){
    previousNum = "";
    currentDisplay.textContent = currentNum;
  }
  if(currentNum.length <= 14){
    currentNum += number;
    currentDisplay.textContent = currentNum;
  }
}
function getOperator(op){
  if(previousNum === ""){
    previousNum = currentNum;
    operatorCheck(op);
  } else if(currentNum === ""){
    operatorCheck(op);
  } else{
    operate();
    operator = op;
    currentDisplay.textContent = "";
    previousDisplay.textContent = `${previousNum} ${operator}`;
  }
}
const add = (a, b) =>  a + b;
const subtract = (a, b) =>  a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;

function operate(){
  previousNum = Number(previousNum)
  currentNum = Number(currentNum)

  if(operator === "+"){
    previousNum = add(previousNum, currentNum);
  } else if(operator === "-"){
    previousNum = subtract(previousNum, currentNum);
  } else if(operator === "×"){
    previousNum = multiply(previousNum, currentNum);
  } else if(operator === "÷"){
    if(currentNum <= 0){
      previousNum = "Syntax Error";
      updateDisplay();
      return;
    } else{
      previousNum = divide(previousNum, currentNum);
    }
  }
  previousNum = roundNum(previousNum)
  previousNum = previousNum.toString();
  updateDisplay();
}
function roundNum(num){
  return Math.round(num * 100000) / 100000;
}
function operatorCheck(ops){
  operator = ops;
  previousDisplay.textContent = `${previousNum} ${operator}`;
  currentDisplay.textContent = "";
  currentNum = "";
}
function updateDisplay(){
  if(previousNum.length <= 14){
    currentDisplay.textContent = previousNum;
  } else{
    currentDisplay.textContent = previousNum.slice(0, 14) + "...";
  }
  previousDisplay.textContent = "";
  operator = "";
  currentNum = "";
}
function clearAll(){
  currentDisplay.textContent = "";
  previousDisplay.textContent = "";
  previousNum = "";
  currentNum = "";
  operator = null;
}
function deleteNum(){
  if(currentNum !== ""){
    currentNum = currentNum.slice(0, -1);
    currentDisplay.textContent = currentNum;
    if(currentNum === ""){
      currentDisplay.textContent = "0";
    }
  }
  if(currentNum === "" && previousNum !== "" && operator === ""){
    previousNum = previousNum.slice(0, -1);
    currentDisplay.textContent = previousNum;
  }
}
function appendPoint(){
  if(!currentNum.includes('.')){
    currentNum += ".";
    currentDisplay.textContent = currentNum;
  }
}
function getKeyPress(e){
  e.preventDefault();
  if(e.key >= 0 && e.key <= 9){
    getNumber(e.key);
  }
  if(e.key === "Enter" || (e.key === "=" && currentNum != "" && previousNum != "")){
    operate();
  }
  if(e.key === "+" || e.key === "-"){
    getOperator(e.key);
  }
  if(e.key === "*"){
    getOperator("×");
  }
  if(e.key === "/"){
    getOperator("÷");
  }
  if(e.key === "."){
    appendPoint();
  }
  if(e.key === "Backspace"){
    deleteNum();
  }
}

