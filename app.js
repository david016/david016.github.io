let numbers = document.querySelectorAll(".number");
let input = document.querySelector("input[type='text']")
let operators = document.querySelectorAll(".operation")
let equalsSign = document.querySelector(".equals")
let del = document.querySelector(".deleteOne")
let ce = document.querySelector(".deleteAll")
let squareRoot = document.querySelector(".squareRoot")
let decimal = document.querySelector(".decimal")

let storedInput = {
    "firstNumber": ["+"],
    "secondNumber": ["+"],
    "operation": [],
}

function returnCurrentInput() {
    if (storedInput["operation"].length === 0) {
        console.log("firstNumber")
        return "firstNumber"
    } else {
        console.log("secondNumber")
        return "secondNumber"
    }
}

let operations = {
    "x": function (a, b) {
        return a * b
    },
    "+": function (a, b) {
        return a + b
    },
    "-": function (a, b) {
        return a - b
    },
    "/": function (a, b) {
        return a / b
    },
    "√": function (a) {
        return Math.sqrt(a)
    },
}

function inputSquareRoot() {
    if (storedInput[returnCurrentInput()].length === 1) {
        input.value += squareRoot.textContent;
        storedInput[returnCurrentInput()].push(squareRoot.textContent);
    }
}
function writeSquareRoot() {
    squareRoot.addEventListener("click", () => inputSquareRoot())
}
writeSquareRoot()

function writeOperation() {
    for (let operator of operators) {
        operator.addEventListener("click", () => {
            if (storedInput["operation"].length === 1 && storedInput["secondNumber"].length > 1) {
                console.log(`Result is: `)
                return result()
            }
            if (input.value === "" && !/[x//]/.test(operator.textContent)) {
                input.value += operator.textContent;
                storedInput[returnCurrentInput()] = [operator.textContent];
            }
            if (storedInput[returnCurrentInput()][1] !== "√" && storedInput[returnCurrentInput()].length === 2 || storedInput[returnCurrentInput()].length > 2) {
                input.value += operator.textContent;
                storedInput["operation"].push(operator.textContent);
            }
        })
    }
}
writeOperation();

function writeNumbers() {
    for (let num of numbers) {
        num.addEventListener("click", () => {
            input.value += num.textContent;
            storedInput[returnCurrentInput()].push(parseInt(num.textContent));
        })
    }
}
writeNumbers()

function inputDecimal() {
    if (storedInput[returnCurrentInput()].indexOf(".") < 0 && /[0-9]/.test(storedInput[returnCurrentInput()])) {
        input.value += ".";
        storedInput[returnCurrentInput()].push(".")
    }
}
function writeDecimalSeparator() {
    decimal.addEventListener("click", inputDecimal)
}
writeDecimalSeparator()



function result() {
    let firstNum;
    let secondNum;
    let res;

    let firstInp = parseFloat(storedInput["firstNumber"].filter(el => {
        return typeof (el) === "number" || el === "."
    }).join(""))

    let secondInp = parseFloat(storedInput["secondNumber"].filter(el => {
        return typeof (el) === "number" || el === "."
    }).join(""))

    if (storedInput["firstNumber"][1] === "√") {
        firstNum = parseFloat(storedInput["firstNumber"][0] + operations["√"](firstInp))
    } else {
        firstNum = parseFloat(storedInput["firstNumber"][0] + firstInp)
    }

    if (storedInput["secondNumber"][1] === "√") {
        secondNum = parseFloat(storedInput["secondNumber"][0] + operations["√"](secondInp))
    } else {
        secondNum = parseFloat(storedInput["secondNumber"][0] + secondInp)
    }
    res = operations[storedInput["operation"]](firstNum, secondNum);
    input.value = res;

    function resultToFirstNumber() {
        let arrFromRes = res.toString().split("");
        let arrWithNumbers = [];
        for (let el of arrFromRes) {
            if (el !== "." && el !== "-") {
                arrWithNumbers.push(parseInt(el))
            } else arrWithNumbers.push(el)

        }
        return arrWithNumbers
    }

    if (res < 0) {
        storedInput = {
            "firstNumber": resultToFirstNumber(),
            "secondNumber": ["+"],
            "operation": [],
        }
    } else {
        storedInput = {
            "firstNumber": ["+", ...resultToFirstNumber()],
            "secondNumber": ["+"],
            "operation": [],
        }
    }

    return res
}
equalsSign.addEventListener("click", () => {
    if (storedInput["operation"].length === 0) {
        let firstInp = parseFloat(storedInput["firstNumber"].filter(el => {
            return typeof (el) === "number" || el === "."
        }).join(""))
        let firstNumm = parseFloat(storedInput["firstNumber"][0] + operations["√"](firstInp))
        input.value = firstNumm;
    } else result()

})


function deleteOne() {
    del.addEventListener("click", () => {
        input.value = input.value.slice(0, input.value.length - 1);
        if (returnCurrentInput() === "secondNumber" && storedInput["secondNumber"].length === 1) {
            storedInput["operation"].pop();
        } else {
            storedInput[returnCurrentInput()].pop();
        }
    })
};
deleteOne()

function deleteAll() {
    ce.addEventListener("click", () => {
        input.value = "";
        storedInput = {
            "firstNumber": ["+"],
            "secondNumber": ["+"],
            "operation": [],
        }
    })
}
deleteAll()