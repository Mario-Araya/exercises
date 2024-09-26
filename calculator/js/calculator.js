var input = document.getElementById("input");
var digitButtons = document.getElementsByClassName("digitButton");
var operatorButtons = document.getElementsByClassName("operatorButton");
var operation = "";
var temporary = 0;
Array.from(digitButtons).forEach(function (button) {
    button.addEventListener('click', function () {
        add(button.textContent  || "");
    });
});
Array.from(operatorButtons).forEach(function (button) {
    button.addEventListener('click', function () {
        handleOperator(button.textContent  || "");
    });
});
function add(num) {
    if (num === "." && input.value.includes("."))
        return;
    input.value += num;
}
function operationFunction(operator) {
    operation = operator;
    temporary = parseFloat(input.value);
    input.value = "";
}
function equals() {
    if (operation && temporary !== null) {
        var result = eval("".concat(temporary, " ").concat(operation, " ").concat(parseFloat(input.value)));
        operation = "";
        temporary = 0;
        input.value = result.toString();
    }
}
function toggleSign() {
    input.value = String(parseFloat(input.value) * -1);
}
function percentage() {
    input.value = String(parseFloat(input.value) / 100);
}
function clearInput() {
    input.value = "";
    temporary = 0;
    operation = "";
}
function handleOperator(operator) {
    switch (operator) {
        case "C":
            clearInput();
            break;
        case "+/-":
            toggleSign();
            break;
        case "%":
            percentage();
            break;
        case "=":
            equals();
            break;
        case "x":
            operationFunction('*');
            break;
        case "÷":
            operationFunction('/');
            break;
        default:
            operationFunction(operator);
            break;
    }
}