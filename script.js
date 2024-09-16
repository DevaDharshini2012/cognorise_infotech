// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '';
            } else if (button.id === 'equals') {
                if (previousInput && operator && currentInput) {
                    currentInput = evaluateExpression(previousInput, operator, currentInput);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                    resultDisplayed = true;
                }
            } else if (button.id === 'erase') {
                currentInput = currentInput.slice(0, -1); // Remove last character
                display.textContent = currentInput || `${previousInput} ${operator}`;
            } else if (button.classList.contains('operator')) {
                if (previousInput && operator && currentInput) {
                    currentInput = evaluateExpression(previousInput, operator, currentInput);
                    display.textContent = currentInput;
                }
                previousInput = currentInput;
                operator = value;
                currentInput = '';
                display.textContent = `${previousInput} ${operator}`;
            } else {
                if (resultDisplayed) {
                    currentInput = value; // Start a new calculation after the result is displayed
                    resultDisplayed = false;
                } else {
                    currentInput += value;
                }
                display.textContent = `${previousInput} ${operator} ${currentInput}`;
            }
        });
    });

    function evaluateExpression(a, op, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
