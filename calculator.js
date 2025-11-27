let display = document.getElementById('display');
let history = [];
let angleMode = 'deg';
let currentInput = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    setupModeButtons();
    setupAngleModeButtons();
});

/**
 * Setup mode switching functionality
 */
function setupModeButtons() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchMode(this.dataset.mode);
        });
    });
}

/**
 * Switch between calculator modes
 */
function switchMode(mode) {
    const modeContents = document.querySelectorAll('.mode-content');
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeContents.forEach(content => content.classList.remove('active'));
    modeButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${mode}-mode`).classList.add('active');
    event.target.classList.add('active');
}

/**
 * Setup angle mode toggle (DEG/RAD)
 */
function setupAngleModeButtons() {
    const degBtn = document.getElementById('degBtn');
    const radBtn = document.getElementById('radBtn');
    
    degBtn.addEventListener('click', function() {
        angleMode = 'deg';
        degBtn.classList.add('active');
        radBtn.classList.remove('active');
    });
    
    radBtn.addEventListener('click', function() {
        angleMode = 'rad';
        radBtn.classList.add('active');
        degBtn.classList.remove('active');
    });
}

/**
 * Append number to display
 */
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

/**
 * Append operator to calculation
 */
function appendOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = parseFloat(currentInput);
    operation = op;
    shouldResetDisplay = true;
}

/**
 * Clear display and reset calculator
 */
function clearDisplay() {
    currentInput = '0';
    previousValue = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Update display with current input
 */
function updateDisplay() {
    try {
        display.value = currentInput;
    } catch (e) {
        display.value = 'Error';
        console.error('Display error:', e);
    }
}

/**
 * Main calculation function
 */
function calculate() {
    try {
        if (operation === null || previousValue === null) {
            return;
        }
        
        const current = parseFloat(currentInput);
        let result = 0;
        
        switch(operation) {
            case '+':
                result = previousValue + current;
                break;
            case '-':
                result = previousValue - current;
                break;
            case '*':
                result = previousValue * current;
                break;
            case '/':
                if (current === 0) {
                    throw new Error('Division by zero');
                }
                result = previousValue / current;
                break;
            case '^':
                result = Math.pow(previousValue, current);
                break;
            case '%':
                if (current === 0) {
                    throw new Error('Modulo by zero');
                }
                result = previousValue % current;
                break;
            default:
                throw new Error('Unknown operation');
        }
        
        currentInput = formatResult(result);
        addToHistory(`${previousValue} ${operation} ${current} = ${currentInput}`);
        operation = null;
        previousValue = null;
        shouldResetDisplay = true;
        updateDisplay();
        
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Calculation error:', e);
        setTimeout(clearDisplay, 2000);
    }
}

/**
 * Trigonometric: Sine
 */
function sine() {
    try {
        const value = parseFloat(currentInput);
        let angle = angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.sin(angle);
        addToHistory(`sin(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in sine';
        console.error('Sine error:', e);
    }
}

/**
 * Trigonometric: Cosine
 */
function cosine() {
    try {
        const value = parseFloat(currentInput);
        let angle = angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.cos(angle);
        addToHistory(`cos(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in cosine';
        console.error('Cosine error:', e);
    }
}

/**
 * Trigonometric: Tangent
 */
function tangent() {
    try {
        const value = parseFloat(currentInput);
        let angle = angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.tan(angle);
        addToHistory(`tan(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in tangent';
        console.error('Tangent error:', e);
    }
}

/**
 * Square root calculation
 */
function sqrt() {
    try {
        const value = parseFloat(currentInput);
        if (value < 0) {
            throw new Error('Cannot take square root of negative number');
        }
        const result = Math.sqrt(value);
        addToHistory(`√(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Square root error:', e);
    }
}

/**
 * Logarithm (base 10)
 */
function logarithm() {
    try {
        const value = parseFloat(currentInput);
        if (value <= 0) {
            throw new Error('Logarithm of non-positive number');
        }
        const result = Math.log10(value);
        addToHistory(`log(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Logarithm error:', e);
    }
}

/**
 * Natural logarithm (base e)
 */
function naturalLog() {
    try {
        const value = parseFloat(currentInput);
        if (value <= 0) {
            throw new Error('Natural logarithm of non-positive number');
        }
        const result = Math.log(value);
        addToHistory(`ln(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Natural logarithm error:', e);
    }
}

/**
 * Factorial calculation
 */
function factorial() {
    try {
        const value = parseInt(currentInput);
        if (value < 0 || !Number.isInteger(parseFloat(currentInput))) {
            throw new Error('Factorial only for non-negative integers');
        }
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        addToHistory(`${value}! = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Factorial error:', e);
    }
}

/**
 * Permutation calculation P(n,r)
 */
function permutation() {
    try {
        const input = prompt('Enter n,r for P(n,r):');
        if (!input) return;
        const [n, r] = input.split(',').map(x => parseInt(x.trim()));
        
        if (n < 0 || r < 0 || r > n) {
            throw new Error('Invalid values for permutation');
        }
        
        let result = 1;
        for (let i = 0; i < r; i++) {
            result *= (n - i);
        }
        
        addToHistory(`P(${n},${r}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Permutation error:', e);
    }
}

/**
 * Combination calculation C(n,r)
 */
function combination() {
    try {
        const input = prompt('Enter n,r for C(n,r):');
        if (!input) return;
        const [n, r] = input.split(',').map(x => parseInt(x.trim()));
        
        if (n < 0 || r < 0 || r > n) {
            throw new Error('Invalid values for combination');
        }
        
        const factorial = (num) => {
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            return result;
        };
        
        const result = factorial(n) / (factorial(r) * factorial(n - r));
        addToHistory(`C(${n},${r}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Combination error:', e);
    }
}

/**
 * Hyperbolic sine
 */
function sinh() {
    try {
        const value = parseFloat(currentInput);
        const result = Math.sinh(value);
        addToHistory(`sinh(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in sinh';
        console.error('Sinh error:', e);
    }
}

/**
 * Hyperbolic cosine
 */
function cosh() {
    try {
        const value = parseFloat(currentInput);
        const result = Math.cosh(value);
        addToHistory(`cosh(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in cosh';
        console.error('Cosh error:', e);
    }
}

/**
 * Hyperbolic tangent
 */
function tanh() {
    try {
        const value = parseFloat(currentInput);
        const result = Math.tanh(value);
        addToHistory(`tanh(${value}) = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = 'Error in tanh';
        console.error('Tanh error:', e);
    }
}

/**
 * Exponential (e^x)
 */
function exponential() {
    try {
        const value = parseFloat(currentInput);
        if (value > 700) {
            throw new Error('Result too large to compute');
        }
        const result = Math.exp(value);
        addToHistory(`e^${value} = ${formatResult(result)}`);
        currentInput = formatResult(result);
        shouldResetDisplay = true;
        updateDisplay();
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Exponential error:', e);
    }
}

/**
 * Toggle sign of number
 */
function toggleSign() {
    const value = parseFloat(currentInput);
    currentInput = formatResult(-value);
    updateDisplay();
}

/**
 * Add constants
 */
function pi() {
    currentInput = formatResult(Math.PI);
    shouldResetDisplay = true;
    updateDisplay();
}

function euler() {
    currentInput = formatResult(Math.E);
    shouldResetDisplay = true;
    updateDisplay();
}

function degree() {
    currentInput += '°';
    updateDisplay();
}

/**
 * Statistics functions
 */
function calculateMean() {
    try {
        const numbers = parseStatsInput();
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        addToHistory(`Mean = ${formatResult(mean)}`);
        display.value = formatResult(mean);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Mean error:', e);
    }
}

function calculateMedian() {
    try {
        const numbers = parseStatsInput().sort((a, b) => a - b);
        const median = numbers.length % 2 === 0 
            ? (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2
            : numbers[Math.floor(numbers.length / 2)];
        addToHistory(`Median = ${formatResult(median)}`);
        display.value = formatResult(median);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Median error:', e);
    }
}

function calculateStdDev() {
    try {
        const numbers = parseStatsInput();
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numbers.length;
        const stdDev = Math.sqrt(variance);
        addToHistory(`Std Dev = ${formatResult(stdDev)}`);
        display.value = formatResult(stdDev);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Std Dev error:', e);
    }
}

function calculateVariance() {
    try {
        const numbers = parseStatsInput();
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numbers.length;
        addToHistory(`Variance = ${formatResult(variance)}`);
        display.value = formatResult(variance);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Variance error:', e);
    }
}

function calculateSum() {
    try {
        const numbers = parseStatsInput();
        const sum = numbers.reduce((a, b) => a + b, 0);
        addToHistory(`Sum = ${formatResult(sum)}`);
        display.value = formatResult(sum);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Sum error:', e);
    }
}

function calculateCount() {
    try {
        const numbers = parseStatsInput();
        addToHistory(`Count = ${numbers.length}`);
        display.value = numbers.length;
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Count error:', e);
    }
}

/**
 * Parse statistics input from textarea
 */
function parseStatsInput() {
    const input = document.getElementById('statsInput').value;
    if (!input.trim()) {
        throw new Error('Please enter numbers');
    }
    const numbers = input.split(',').map(x => {
        const num = parseFloat(x.trim());
        if (isNaN(num)) {
            throw new Error(`Invalid number: ${x}`);
        }
        return num;
    });
    if (numbers.length === 0) {
        throw new Error('No valid numbers found');
    }
    return numbers;
}

/**
 * Clear statistics section
 */
function clearStats() {
    document.getElementById('statsInput').value = '';
    currentInput = '0';
    updateDisplay();
}

/**
 * Format result to reasonable decimal places
 */
function formatResult(num) {
    if (isNaN(num) || !isFinite(num)) {
        return 'Error';
    }
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return parseFloat(num.toFixed(10)).toString();
}

/**
 * Add calculation to history
 */
function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 20) {
        history.pop();
    }
    updateHistoryDisplay();
}

/**
 * Update history display
 */
function updateHistoryDisplay() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = history.map((item, index) => 
        `<div class="history-item">${index + 1}. ${item}</div>`
    ).join('');
}
