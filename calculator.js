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
    initializeOfflineSupport();
    initDarkMode();
});

/**
 * Initialize offline support and PWA features
 */
function initializeOfflineSupport() {
    // Add offline status indicator
    const statusDiv = document.createElement('div');
    statusDiv.id = 'offline-status';
    statusDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff6b6b;
        color: white;
        padding: 8px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        display: none;
        z-index: 10000;
        font-family: Arial, sans-serif;
    `;
    statusDiv.textContent = '📡 Offline - App working locally';
    document.body.insertBefore(statusDiv, document.body.firstChild);
    
    // Monitor online/offline status
    function updateOnlineStatus() {
        const statusDiv = document.getElementById('offline-status');
        if (!navigator.onLine) {
            statusDiv.style.display = 'block';
            statusDiv.textContent = '📡 Offline - App working locally (service worker active)';
            statusDiv.style.background = '#ff6b6b';
        } else {
            statusDiv.style.display = 'none';
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();
    
    // Request persistent storage (optional)
    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(persistent => {
            console.log('Persistent storage granted:', persistent);
        });
    }
    
    // Log service worker status
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            console.log('[Calculator] Service Worker registrations:', registrations.length);
        });
    }
}

/**
 * Setup mode switching functionality
 */
function setupModeButtons() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            switchMode(this.dataset.mode, this);
        });
    });
}

/**
 * Switch between calculator modes
 */
function switchMode(mode, buttonEl) {
    const modeContents = document.querySelectorAll('.mode-content');
    const modeButtons = document.querySelectorAll('.mode-btn');

    modeContents.forEach(content => content.classList.remove('active'));
    modeButtons.forEach(btn => btn.classList.remove('active'));

    const targetContent = document.getElementById(`${mode}-mode`);
    if (targetContent) targetContent.classList.add('active');

    // If button element provided, mark it active, otherwise find by data-mode
    if (buttonEl && buttonEl.classList) {
        buttonEl.classList.add('active');
    } else {
        const btn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
        if (btn) btn.classList.add('active');
    }
}

/* Dark mode initialization and toggle */
function initDarkMode() {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.body.classList.add('dark');
    }

    const isDark = document.body.classList.contains('dark');
    btn.setAttribute('aria-pressed', isDark);
    btn.textContent = isDark ? 'Light Mode' : 'Dark Mode';

    btn.addEventListener('click', function() {
        toggleDarkMode();
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        btn.setAttribute('aria-pressed', isDark);
        btn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
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

// ==================== ADVANCED EQUATION SOLVERS ====================

/**
 * Switch equation type in solver
 */
function switchEquationType(type) {
    const contents = document.querySelectorAll('.eq-content');
    const tabs = document.querySelectorAll('.eq-tab');
    
    contents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${type}-solver`).classList.add('active');
    event.target.classList.add('active');
}

/**
 * Solve linear equation ax + b = 0
 */
function solveLinear() {
    try {
        const a = parseFloat(document.getElementById('lin-a').value);
        const b = parseFloat(document.getElementById('lin-b').value);
        
        if (isNaN(a) || isNaN(b)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (a === 0) {
            if (b === 0) {
                display.value = 'All numbers are solutions';
            } else {
                display.value = 'No solution exists';
            }
        } else {
            const x = -b / a;
            display.value = `x = ${formatResult(x)}`;
            addToHistory(`Linear: ${a}x + ${b} = 0 → x = ${formatResult(x)}`);
        }
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Linear solver error:', e);
    }
}

/**
 * Solve quadratic equation ax² + bx + c = 0
 */
function solveQuadratic() {
    try {
        const a = parseFloat(document.getElementById('quad-a').value);
        const b = parseFloat(document.getElementById('quad-b').value);
        const c = parseFloat(document.getElementById('quad-c').value);
        
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (a === 0) {
            throw new Error('Coefficient a cannot be zero');
        }
        
        const discriminant = b * b - 4 * a * c;
        let result = `Equation: ${a}x² + ${b}x + ${c} = 0\n`;
        result += `Discriminant (Δ) = ${formatResult(discriminant)}\n\n`;
        
        if (discriminant > 0) {
            const sqrtDisc = Math.sqrt(discriminant);
            const x1 = (-b + sqrtDisc) / (2 * a);
            const x2 = (-b - sqrtDisc) / (2 * a);
            result += `Two distinct real roots:\n`;
            result += `x₁ = ${formatResult(x1)}\n`;
            result += `x₂ = ${formatResult(x2)}`;
            addToHistory(`Quadratic: ${a}x² + ${b}x + ${c} = 0 → x₁=${formatResult(x1)}, x₂=${formatResult(x2)}`);
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            result += `One repeated real root:\n`;
            result += `x = ${formatResult(x)}`;
            addToHistory(`Quadratic: ${a}x² + ${b}x + ${c} = 0 → x=${formatResult(x)} (repeated)`);
        } else {
            const sqrtDisc = Math.sqrt(-discriminant);
            const realPart = -b / (2 * a);
            const imagPart = sqrtDisc / (2 * a);
            result += `Two complex conjugate roots:\n`;
            result += `x₁ = ${formatResult(realPart)} + ${formatResult(imagPart)}i\n`;
            result += `x₂ = ${formatResult(realPart)} - ${formatResult(imagPart)}i`;
            addToHistory(`Quadratic complex roots: x₁=${formatResult(realPart)}+${formatResult(imagPart)}i`);
        }
        
        document.getElementById('quadratic-result').textContent = result;
        display.value = discriminant > 0 ? 'Two real roots' : (discriminant === 0 ? 'One root' : 'Two complex roots');
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Quadratic solver error:', e);
    }
}

/**
 * Solve cubic equation ax³ + bx² + cx + d = 0
 */
function solveCubic() {
    try {
        const a = parseFloat(document.getElementById('cub-a').value);
        const b = parseFloat(document.getElementById('cub-b').value);
        const c = parseFloat(document.getElementById('cub-c').value);
        const d = parseFloat(document.getElementById('cub-d').value);
        
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (a === 0) {
            solveQuadratic();
            return;
        }
        
        // Use Newton-Raphson method to find roots
        const roots = findCubicRootsNumerical(a, b, c, d);
        
        let result = `Equation: ${a}x³ + ${b}x² + ${c}x + ${d} = 0\n\n`;
        result += `Approximate roots:\n`;
        roots.forEach((root, idx) => {
            if (root.imag === undefined || root.imag === 0) {
                result += `x${idx + 1} = ${formatResult(root.real || root)}\n`;
            } else {
                result += `x${idx + 1} = ${formatResult(root.real)} ${root.imag >= 0 ? '+' : ''} ${formatResult(root.imag)}i\n`;
            }
        });
        
        document.getElementById('cubic-result').textContent = result;
        display.value = 'Cubic roots calculated';
        addToHistory(`Cubic solved: ${a}x³ + ${b}x² + ${c}x + ${d} = 0`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Cubic solver error:', e);
    }
}

/**
 * Find cubic roots using numerical methods
 */
function findCubicRootsNumerical(a, b, c, d) {
    const roots = [];
    const testPoints = [-10, -5, -1, 0, 1, 5, 10];
    
    // Try Newton-Raphson from different starting points
    testPoints.forEach(start => {
        let x = start;
        for (let i = 0; i < 50; i++) {
            const f = a*x*x*x + b*x*x + c*x + d;
            const df = 3*a*x*x + 2*b*x + c;
            
            if (Math.abs(df) < 1e-15) break;
            const xNew = x - f / df;
            
            if (Math.abs(xNew - x) < 1e-10) {
                // Check if root is new
                const isNew = roots.every(r => Math.abs(r - x) > 0.01);
                if (isNew && Math.abs(f) < 1e-6) {
                    roots.push(x);
                }
                break;
            }
            x = xNew;
        }
    });
    
    return roots.length > 0 ? roots : [0]; // Fallback
}

/**
 * Solve 2×2 system of equations
 */
function solve2x2System() {
    try {
        const a1 = parseFloat(document.getElementById('sys-a1').value);
        const b1 = parseFloat(document.getElementById('sys-b1').value);
        const c1 = parseFloat(document.getElementById('sys-c1').value);
        const a2 = parseFloat(document.getElementById('sys-a2').value);
        const b2 = parseFloat(document.getElementById('sys-b2').value);
        const c2 = parseFloat(document.getElementById('sys-c2').value);
        
        if ([a1, b1, c1, a2, b2, c2].some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }
        
        const det = a1*b2 - a2*b1;
        
        let result = `System:\n`;
        result += `${a1}x + ${b1}y = ${c1}\n`;
        result += `${a2}x + ${b2}y = ${c2}\n\n`;
        
        if (Math.abs(det) < 1e-10) {
            result += 'No unique solution (lines are parallel or identical)';
            display.value = 'No unique solution';
        } else {
            const x = (c1*b2 - c2*b1) / det;
            const y = (a1*c2 - a2*c1) / det;
            result += `Solution:\n`;
            result += `x = ${formatResult(x)}\n`;
            result += `y = ${formatResult(y)}`;
            display.value = `x = ${formatResult(x)}, y = ${formatResult(y)}`;
            addToHistory(`System: x=${formatResult(x)}, y=${formatResult(y)}`);
        }
        
        document.getElementById('system-result').textContent = result;
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('System solver error:', e);
    }
}

// ==================== MATRIX OPERATIONS ====================

/**
 * Switch matrix operation type
 */
function switchMatrixType(type) {
    const contents = document.querySelectorAll('.mat-content');
    const tabs = document.querySelectorAll('.mat-tab');
    
    contents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${type}-calc`).classList.add('active');
    event.target.classList.add('active');
}

/**
 * Toggle between 2×2 and 3×3 matrix
 */
function toggleMatrixSize() {
    const inputs = document.querySelectorAll('.matrix-input:nth-child(n+3) .mat-input');
    inputs.forEach(input => {
        const display = input.style.display;
        input.style.display = display === 'none' ? 'block' : 'none';
    });
}

/**
 * Calculate determinant
 */
function calculateDeterminant() {
    try {
        const inputs = document.querySelectorAll('.mat-input:not([style*="display: none"])');
        const size = inputs.length === 4 ? 2 : 3;
        
        if (size === 2) {
            const m = [
                [parseFloat(inputs[0].value), parseFloat(inputs[1].value)],
                [parseFloat(inputs[2].value), parseFloat(inputs[3].value)]
            ];
            
            if (m.some(row => row.some(isNaN))) {
                throw new Error('Please enter valid numbers');
            }
            
            const det = m[0][0]*m[1][1] - m[0][1]*m[1][0];
            const result = `Matrix:\n[${m[0][0]}, ${m[0][1]}]\n[${m[1][0]}, ${m[1][1]}]\n\nDeterminant = ${formatResult(det)}`;
            document.getElementById('matrix-result').textContent = result;
            display.value = formatResult(det);
            addToHistory(`Det = ${formatResult(det)}`);
        }
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Determinant error:', e);
    }
}

/**
 * Calculate matrix inverse
 */
function calculateInverse() {
    try {
        const inputs = document.querySelectorAll('.mat-inv-input');
        const m = [
            [parseFloat(inputs[0].value), parseFloat(inputs[1].value)],
            [parseFloat(inputs[2].value), parseFloat(inputs[3].value)]
        ];
        
        if (m.some(row => row.some(isNaN))) {
            throw new Error('Please enter valid numbers');
        }
        
        const det = m[0][0]*m[1][1] - m[0][1]*m[1][0];
        
        if (Math.abs(det) < 1e-10) {
            throw new Error('Matrix is singular (determinant = 0)');
        }
        
        const inv = [
            [m[1][1]/det, -m[0][1]/det],
            [-m[1][0]/det, m[0][0]/det]
        ];
        
        let result = `Original Matrix:\n[${m[0][0]}, ${m[0][1]}]\n[${m[1][0]}, ${m[1][1]}]\n\n`;
        result += `Inverse Matrix:\n[${formatResult(inv[0][0])}, ${formatResult(inv[0][1])}]\n`;
        result += `[${formatResult(inv[1][0])}, ${formatResult(inv[1][1])}]`;
        
        document.getElementById('inverse-result').textContent = result;
        display.value = 'Inverse calculated';
        addToHistory('Matrix inverse calculated');
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Inverse error:', e);
    }
}

/**
 * Calculate matrix transpose
 */
function calculateTranspose() {
    try {
        const inputs = document.querySelectorAll('.mat-trans-input');
        const m = [
            [parseFloat(inputs[0].value), parseFloat(inputs[1].value)],
            [parseFloat(inputs[2].value), parseFloat(inputs[3].value)]
        ];
        
        if (m.some(row => row.some(isNaN))) {
            throw new Error('Please enter valid numbers');
        }
        
        const mT = [
            [m[0][0], m[1][0]],
            [m[0][1], m[1][1]]
        ];
        
        let result = `Original Matrix:\n[${m[0][0]}, ${m[0][1]}]\n[${m[1][0]}, ${m[1][1]}]\n\n`;
        result += `Transposed Matrix:\n[${mT[0][0]}, ${mT[0][1]}]\n[${mT[1][0]}, ${mT[1][1]}]`;
        
        document.getElementById('transpose-result').textContent = result;
        display.value = 'Transpose calculated';
        addToHistory('Matrix transposed');
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Transpose error:', e);
    }
}

/**
 * Calculate matrix multiplication
 */
function calculateMultiply() {
    try {
        const inputsA = document.querySelectorAll('.mat-mul-a');
        const inputsB = document.querySelectorAll('.mat-mul-b');
        
        const a = [
            [parseFloat(inputsA[0].value), parseFloat(inputsA[1].value)],
            [parseFloat(inputsA[2].value), parseFloat(inputsA[3].value)]
        ];
        
        const b = [
            [parseFloat(inputsB[0].value), parseFloat(inputsB[1].value)],
            [parseFloat(inputsB[2].value), parseFloat(inputsB[3].value)]
        ];
        
        if (a.some(row => row.some(isNaN)) || b.some(row => row.some(isNaN))) {
            throw new Error('Please enter valid numbers');
        }
        
        const c = [
            [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
            [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]]
        ];
        
        let result = `A × B =\n[${formatResult(c[0][0])}, ${formatResult(c[0][1])}]\n`;
        result += `[${formatResult(c[1][0])}, ${formatResult(c[1][1])}]`;
        
        document.getElementById('multiply-result').textContent = result;
        display.value = 'Matrices multiplied';
        addToHistory('Matrices multiplied');
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Multiply error:', e);
    }
}

// ==================== VECTOR OPERATIONS ====================

/**
 * Switch vector operation type
 */
function switchVectorType(type) {
    const contents = document.querySelectorAll('.vec-content');
    const tabs = document.querySelectorAll('.vec-tab');
    
    contents.forEach(content => content.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${type}-calc`).classList.add('active');
    event.target.classList.add('active');
}

/**
 * Parse vector input string
 */
function parseVector(input) {
    return input.split(',').map(x => {
        const num = parseFloat(x.trim());
        if (isNaN(num)) throw new Error(`Invalid vector component: ${x}`);
        return num;
    });
}

/**
 * Calculate vector magnitude
 */
function calculateMagnitude() {
    try {
        const input = document.getElementById('mag-vector').value;
        const vector = parseVector(input);
        
        const magnitude = Math.sqrt(vector.reduce((sum, x) => sum + x*x, 0));
        
        const result = `Vector: [${vector.join(', ')}]\n|v| = √(${vector.map(x => x + '²').join(' + ')})\n|v| = ${formatResult(magnitude)}`;
        document.getElementById('magnitude-result').textContent = result;
        display.value = formatResult(magnitude);
        addToHistory(`|v| = ${formatResult(magnitude)}`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Magnitude error:', e);
    }
}

/**
 * Calculate dot product
 */
function calculateDotProduct() {
    try {
        const u = parseVector(document.getElementById('dot-u').value);
        const v = parseVector(document.getElementById('dot-v').value);
        
        if (u.length !== v.length) {
            throw new Error('Vectors must have same dimension');
        }
        
        const dotProduct = u.reduce((sum, val, i) => sum + val * v[i], 0);
        
        const result = `u = [${u.join(', ')}]\nv = [${v.join(', ')}]\nu · v = ${formatResult(dotProduct)}`;
        document.getElementById('dot-result').textContent = result;
        display.value = formatResult(dotProduct);
        addToHistory(`u · v = ${formatResult(dotProduct)}`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Dot product error:', e);
    }
}

/**
 * Calculate cross product
 */
function calculateCrossProduct() {
    try {
        const u = parseVector(document.getElementById('cross-u').value);
        const v = parseVector(document.getElementById('cross-v').value);
        
        if (u.length !== 3 || v.length !== 3) {
            throw new Error('Cross product requires 3D vectors');
        }
        
        const cross = [
            u[1]*v[2] - u[2]*v[1],
            u[2]*v[0] - u[0]*v[2],
            u[0]*v[1] - u[1]*v[0]
        ];
        
        const result = `u = [${u.join(', ')}]\nv = [${v.join(', ')}]\nu × v = [${cross.map(x => formatResult(x)).join(', ')}]`;
        document.getElementById('cross-result').textContent = result;
        display.value = `[${cross.map(x => formatResult(x)).join(', ')}]`;
        addToHistory(`u × v = [${cross.map(x => formatResult(x)).join(', ')}]`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Cross product error:', e);
    }
}

let angleDisplayMode = 'deg';

/**
 * Toggle angle display mode
 */
function toggleAngleMode() {
    angleDisplayMode = angleDisplayMode === 'deg' ? 'rad' : 'deg';
    document.getElementById('angle-mode-display').textContent = angleDisplayMode.toUpperCase();
}

/**
 * Calculate angle between vectors
 */
function calculateAngleBetween() {
    try {
        const u = parseVector(document.getElementById('angle-u').value);
        const v = parseVector(document.getElementById('angle-v').value);
        
        if (u.length !== v.length) {
            throw new Error('Vectors must have same dimension');
        }
        
        const dotProd = u.reduce((sum, val, i) => sum + val * v[i], 0);
        const magU = Math.sqrt(u.reduce((sum, x) => sum + x*x, 0));
        const magV = Math.sqrt(v.reduce((sum, x) => sum + x*x, 0));
        
        if (magU === 0 || magV === 0) {
            throw new Error('Cannot calculate angle with zero-magnitude vector');
        }
        
        const cosAngle = Math.max(-1, Math.min(1, dotProd / (magU * magV)));
        const angleRad = Math.acos(cosAngle);
        const angleDeg = angleRad * 180 / Math.PI;
        
        const angle = angleDisplayMode === 'deg' ? angleDeg : angleRad;
        const result = `u = [${u.join(', ')}]\nv = [${v.join(', ')}]\nθ = ${formatResult(angle)}${angleDisplayMode === 'deg' ? '°' : ' rad'}`;
        document.getElementById('angle-result').textContent = result;
        display.value = formatResult(angle) + (angleDisplayMode === 'deg' ? '°' : ' rad');
        addToHistory(`θ = ${formatResult(angle)}${angleDisplayMode === 'deg' ? '°' : ''}`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Angle error:', e);
    }
}

// ==================== ADDITIONAL STATISTICS ====================

/**
 * Calculate quartiles
 */
function calculateQuartiles() {
    try {
        const numbers = parseStatsInput().sort((a, b) => a - b);
        const n = numbers.length;
        
        const q2 = n % 2 === 1 ? numbers[Math.floor(n/2)] : (numbers[n/2-1] + numbers[n/2]) / 2;
        const q1 = numbers[Math.floor(n/4)];
        const q3 = numbers[Math.floor(3*n/4)];
        const iqr = q3 - q1;
        
        const result = `Q1 (Lower Quartile) = ${formatResult(q1)}\nQ2 (Median) = ${formatResult(q2)}\nQ3 (Upper Quartile) = ${formatResult(q3)}\nIQR = ${formatResult(iqr)}`;
        display.value = `Q1=${formatResult(q1)}, Q3=${formatResult(q3)}`;
        addToHistory(`Quartiles: Q1=${formatResult(q1)}, Q3=${formatResult(q3)}`);
        document.getElementById('statistics-mode').nextElementSibling.textContent = result;
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Quartiles error:', e);
    }
}

/**
 * Calculate skewness
 */
function calculateSkewness() {
    try {
        const numbers = parseStatsInput();
        const n = numbers.length;
        const mean = numbers.reduce((a, b) => a + b, 0) / n;
        const std = Math.sqrt(numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);
        const skewness = numbers.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0) / n;
        
        const result = `Skewness = ${formatResult(skewness)}`;
        display.value = formatResult(skewness);
        addToHistory(`Skewness = ${formatResult(skewness)}`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Skewness error:', e);
    }
}

/**
 * Calculate kurtosis
 */
function calculateKurtosis() {
    try {
        const numbers = parseStatsInput();
        const n = numbers.length;
        const mean = numbers.reduce((a, b) => a + b, 0) / n;
        const std = Math.sqrt(numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);
        const kurtosis = (numbers.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0) / n) - 3;
        
        const result = `Kurtosis = ${formatResult(kurtosis)}`;
        display.value = formatResult(kurtosis);
        addToHistory(`Kurtosis = ${formatResult(kurtosis)}`);
    } catch (e) {
        display.value = `Error: ${e.message}`;
        console.error('Kurtosis error:', e);
    }
}
