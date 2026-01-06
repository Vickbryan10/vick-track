# 🧮 Advanced Further Maths Scientific Calculator

A powerful, professional-grade scientific calculator with advanced equation solving, matrix operations, vector calculations, and comprehensive statistical analysis. Built with clean, documented code for educational and practical use.

---

## 📋 Features Overview

### 🔢 **Basic Mode**
- Standard arithmetic operations (+, −, ×, ÷)
- Power operations (x^y)
- Modulo calculations (%)
- Clean, intuitive interface

### 🔬 **Advanced Mode**
- **Trigonometry**: sin, cos, tan with degree/radian conversion
- **Hyperbolic Functions**: sinh, cosh, tanh
- **Logarithms**: log₁₀, ln (natural logarithm)
- **Exponentials**: e^x
- **Special Operations**: Factorial (n!), Square root (√x), Reciprocal (1/x)
- **Combinatorics**: Permutations P(n,r), Combinations C(n,r)
- **Constants**: π (pi), e (Euler's number)

### 📐 **Equation Solver Mode**
Solve complex mathematical equations symbolically:

#### Linear Equations
- Format: ax + b = 0
- Handles all cases (unique, infinite, no solution)

#### Quadratic Equations
- Format: ax² + bx + c = 0
- Calculates discriminant
- Shows real and complex solutions

#### Cubic Equations
- Format: ax³ + bx² + cx + d = 0
- Uses Cardano's formula with numerical refinement
- Finds all real and complex roots

#### Systems of Equations
- Solve 2×2 linear systems
- Uses Cramer's rule with determinants
- Handles dependent and parallel lines

### 📊 **Matrix Operations Mode**

#### Determinant Calculation
- Support for 2×2 and 3×3 matrices
- Used for system solving and matrix properties

#### Matrix Inverse
- 2×2 matrix inversion
- Checks for singular matrices
- Exact calculations

#### Matrix Transpose
- Swap rows and columns
- Works with any rectangular matrix

#### Matrix Multiplication
- 2×2 matrix multiplication
- Proper linear algebra operations

### 🎯 **Vector Operations Mode**

#### Magnitude (Norm)
- Calculate |v| = √(x² + y² + z² + ...)
- Works for any dimension

#### Dot Product (Scalar Product)
- u · v calculation
- Useful for projections and angles

#### Cross Product
- 3D vector cross product
- u × v = (u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁)

#### Angle Between Vectors
- Calculates angle using dot product
- Supports degrees and radians
- Uses: cos(θ) = (u·v)/(|u||v|)

### 📈 **Statistics Mode**

#### Basic Statistics
- Mean (μ): Average value
- Median: Middle value
- Sum (Σ): Total of all values
- Count (n): Number of data points

#### Spread Measures
- Variance: σ²
- Standard Deviation: σ
- Quartiles: Q1, Q2, Q3
- Interquartile Range (IQR)

#### Distribution Properties
- Skewness: Measure of asymmetry
- Kurtosis: Measure of tail heaviness

---

## 🛠️ Technical Implementation

### Project Structure
```
calculator_engine.py    # Python: Advanced mathematics library
calculator.js           # JavaScript: UI logic and calculations
index.html             # HTML: Calculator interface
styles.css             # CSS: Professional styling
README.md              # Documentation
```

### Core Technologies
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend Logic**: Python (for reference implementations)
- **Design Pattern**: Modular, single-responsibility functions
- **Error Handling**: Comprehensive try-catch with user feedback

---

## 📖 Usage Guide

### Basic Calculation
1. Select **Basic** mode
2. Click numbers and operators
3. Press **=** to calculate

### Solve Equations
1. Select **Equations** mode
2. Choose equation type (Linear/Quadratic/Cubic/System)
3. Enter coefficients
4. Click "Solve" to get solutions

### Matrix Operations
1. Select **Matrix** mode
2. Choose operation type
3. Enter matrix values
4. Click calculate button

### Vector Calculations
1. Select **Vector** mode
2. Choose operation
3. Enter components separated by commas
4. View results

### Statistical Analysis
1. Select **Statistics** mode
2. Enter numbers separated by commas
3. Click desired statistical measure

---

## 🔬 Mathematical Methods Used

### Equation Solving
- **Linear**: Direct formula: x = -b/a
- **Quadratic**: Quadratic formula with discriminant analysis
- **Cubic**: Cardano's formula with complex number support
- **Systems**: Cramer's rule with determinant method

### Vector/Matrix
- **Magnitude**: Euclidean norm
- **Dot Product**: Scalar projection
- **Cross Product**: 3D vector operation
- **Determinant**: Leibniz formula
- **Inverse**: Adjugate method for 2×2

### Statistics
- **Mean**: Arithmetic average
- **Median**: Middle value (with interpolation for even n)
- **Variance**: Population variance σ²
- **Standard Deviation**: √variance
- **Quartiles**: Percentile calculation
- **Skewness**: Fisher-Pearson coefficient
- **Kurtosis**: Excess kurtosis (kurt - 3)

---

## 🎨 User Interface Features

### Mode Navigation
- 6 distinct calculator modes accessible via buttons
- Clear visual indicators for active mode
- Smooth transitions between modes

### Result Display
- Large, readable display area
- Result boxes for complex operations
- History tracking (last 20 operations)

### Responsive Design
- Desktop-optimized layout
- Mobile-friendly interface
- Adaptable button grid

### Angle Mode Toggle
- Switch between Degrees (DEG) and Radians (RAD)
- Affects all trigonometric calculations

---

## ⚡ Error Handling

The calculator includes comprehensive error handling for:
- Division by zero
- Invalid matrix operations
- Domain errors (e.g., log of negative number)
- Singular matrices
- Invalid vector dimensions
- Non-numeric input

All errors display user-friendly messages.

---

## 📝 Code Quality

### JavaScript
- Modular function design
- Clear variable naming
- Extensive comments
- Try-catch error handling
- Input validation

### Python Backend Reference
- Type hints for all functions
- Docstrings for every method
- Comprehensive error messages
- Mathematical precision handling

### CSS Styling
- Professional gradient design
- Consistent color scheme
- Responsive media queries
- Smooth transitions and hover effects

---

## 🧪 Testing Guide

### Test Basic Operations
```
5 + 3 = 8
12 × 4 = 48
20 ÷ 4 = 5
2^10 = 1024
```

### Test Trigonometry
```
sin(30°) = 0.5
cos(60°) = 0.5
tan(45°) = 1
```

### Test Equation Solving
```
Linear: 2x + 4 = 0 → x = -2
Quadratic: x² - 5x + 6 = 0 → x = 2, 3
```

### Test Statistics
```
Data: 2, 4, 6, 8, 10
Mean = 6
Median = 6
Std Dev ≈ 2.83
```

---

## 🚀 Getting Started

### Installation
1. Place all files in the same directory
2. Open `index.html` in a web browser
3. No additional dependencies required

### Browser Support
- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### Requirements
- Modern web browser with JavaScript enabled
- Display resolution: 400px minimum width

---

## 📚 Educational Use

This calculator is ideal for:
- A-Level Further Maths students
- University mathematics courses
- Engineering calculations
- Physics problem-solving
- Data analysis projects
- Linear algebra study

---

## 💡 Advanced Features Explained

### Discriminant Analysis (Quadratic)
The discriminant (Δ = b² - 4ac) determines solution type:
- Δ > 0: Two distinct real roots
- Δ = 0: One repeated real root
- Δ < 0: Two complex conjugate roots

### Cramer's Rule (Systems)
For system with matrix determinant ≠ 0:
- x = det(A_x) / det(A)
- y = det(A_y) / det(A)

### Cross Product Direction
Result is perpendicular to both input vectors, useful for:
- Surface normal calculations
- Rotational physics
- 3D geometry

### Skewness Interpretation
- Skewness = 0: Symmetric distribution
- Skewness > 0: Right-skewed
- Skewness < 0: Left-skewed

---

## 🔒 Data Privacy

- All calculations performed locally in your browser
- No data sent to servers
- No tracking or analytics
- Complete user privacy

---

## 📞 Support & Documentation

- **Clear error messages** guide users when issues occur
- **Function comments** in code explain logic
- **History feature** tracks recent calculations
- **Input validation** prevents incorrect operations

---

## 🎯 Future Enhancement Ideas

- Graphing capabilities
- Numerical integration/differentiation
- Complex number polar conversions
- More statistical distributions
- Equation graphing
- Custom variable support
- Export results to file

---

## ✅ Code Standards

- **JavaScript**: ES6+ syntax
- **CSS**: Modern features (Flexbox, Grid)
- **HTML5**: Semantic markup
- **Accessibility**: Clear labels and descriptions
- **Performance**: Optimized calculations

---

## 📄 License & Usage

This calculator is free to use for educational and personal purposes. Feel free to modify and extend it for your needs.

---

**Built with precision and care for mathematical excellence** ✨
