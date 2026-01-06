# 🎯 Quick Reference & Formula Guide

## Mathematical Formulas Used

### Equation Solving

#### Linear Equation: ax + b = 0
- **Solution**: x = -b/a

#### Quadratic Equation: ax² + bx + c = 0
- **Discriminant**: Δ = b² - 4ac
- **Solutions**: x = (-b ± √Δ) / 2a
- **Type of roots**:
  - Δ > 0: Two distinct real roots
  - Δ = 0: One repeated root
  - Δ < 0: Two complex conjugate roots

#### Cubic Equation: ax³ + bx² + cx + d = 0
- Uses Cardano's formula
- Numerical methods find roots with precision

---

## Trigonometry

### Basic Relations
- **sin(θ) = opposite/hypotenuse**
- **cos(θ) = adjacent/hypotenuse**
- **tan(θ) = opposite/adjacent**

### Pythagorean Identities
- **sin²(θ) + cos²(θ) = 1**
- **1 + tan²(θ) = sec²(θ)**
- **1 + cot²(θ) = csc²(θ)**

### Inverse Trigonometric
- **sin⁻¹(x)** returns angle where sin(θ) = x
- **cos⁻¹(x)** returns angle where cos(θ) = x
- **tan⁻¹(x)** returns angle where tan(θ) = x

### Hyperbolic Functions
- **sinh(x) = (eˣ - e⁻ˣ) / 2**
- **cosh(x) = (eˣ + e⁻ˣ) / 2**
- **tanh(x) = sinh(x) / cosh(x)**

---

## Logarithms & Exponentials

### Common Logarithm
- **log₁₀(x)** - base 10 logarithm
- Only defined for x > 0

### Natural Logarithm
- **ln(x)** - base e logarithm
- **ln(eˣ) = x** and **e^(ln x) = x**

### Exponential
- **eˣ** - exponential function
- Inverse of natural logarithm

### Logarithm Laws
- **log(a·b) = log(a) + log(b)**
- **log(a/b) = log(a) - log(b)**
- **log(aⁿ) = n·log(a)**

---

## Combinatorics

### Factorial
- **n! = n × (n-1) × (n-2) × ... × 1**
- **0! = 1**

### Permutation (Order matters)
- **P(n,r) = n! / (n-r)!**
- Number of ways to arrange r items from n

### Combination (Order doesn't matter)
- **C(n,r) = n! / (r!(n-r)!)**
- Number of ways to choose r items from n

---

## Matrix Operations

### Determinant (2×2)
- **det(A) = ad - bc** for [[a, b], [c, d]]

### Determinant (3×3) - Expansion
- Use first row expansion:
- **det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)**

### Matrix Inverse (2×2)
- **A⁻¹ = (1/det(A)) × [[d, -b], [-c, a]]**
- Only exists if det(A) ≠ 0

### Matrix Multiplication
- **Result[i][j] = Σ A[i][k] × B[k][j]**
- Number of columns in A must equal rows in B

### Matrix Transpose
- **Aᵀ[i][j] = A[j][i]**
- Swap rows and columns

---

## Vector Operations

### Magnitude (Euclidean Norm)
- **|v| = √(x² + y² + z² + ...)**
- Always non-negative

### Dot Product (Scalar Product)
- **u · v = Σ uᵢ × vᵢ**
- **u · v = |u| × |v| × cos(θ)**

### Cross Product (3D only)
- **u × v = [u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁]**
- Result perpendicular to both vectors
- **|u × v| = |u| × |v| × sin(θ)**

### Angle Between Vectors
- **cos(θ) = (u · v) / (|u| × |v|)**
- **θ = arccos[(u · v) / (|u| × |v|)]**

---

## Statistics

### Central Tendency

#### Mean (Average)
- **μ = Σx / n**
- Sum of all values divided by count

#### Median
- Middle value when data is sorted
- For even n: average of two middle values

#### Mode
- Most frequently occurring value

### Dispersion Measures

#### Variance
- **σ² = Σ(x - μ)² / n**
- Average squared deviation from mean

#### Standard Deviation
- **σ = √[Σ(x - μ)² / n]**
- Square root of variance
- Same units as original data

#### Interquartile Range
- **IQR = Q₃ - Q₁**
- Range of middle 50% of data

### Quartiles
- **Q1**: 25th percentile
- **Q2**: 50th percentile (median)
- **Q3**: 75th percentile

### Distribution Properties

#### Skewness
- **Skew = Σ[(x - μ) / σ]³ / n**
- Measures asymmetry
- Skew > 0: Right-skewed
- Skew < 0: Left-skewed

#### Kurtosis
- **Kurt = [Σ(x - μ)⁴ / n] / σ⁴ - 3**
- Excess kurtosis (compared to normal)
- Kurt > 0: Heavy tails
- Kurt < 0: Light tails

---

## System of Linear Equations: Cramer's Rule

### For 2×2 System:
```
a₁x + b₁y = c₁
a₂x + b₂y = c₂
```

- **Det(A) = a₁b₂ - a₂b₁**
- **x = (c₁b₂ - c₂b₁) / Det(A)**
- **y = (a₁c₂ - a₂c₁) / Det(A)**

If Det(A) = 0: No unique solution

---

## Special Constants

### π (Pi)
- **π ≈ 3.14159265359**
- Circumference = 2πr
- Area of circle = πr²

### e (Euler's Number)
- **e ≈ 2.71828182846**
- Base of natural logarithm
- **e = lim(1 + 1/n)ⁿ as n → ∞**

### Golden Ratio
- **φ = (1 + √5) / 2 ≈ 1.618**

---

## Conversion Factors

### Angle Conversion
- **1 radian = 180/π degrees ≈ 57.2958°**
- **1 degree = π/180 radians ≈ 0.01745 rad**
- **Full circle = 2π radians = 360°**

---

## Numerical Methods

### Newton-Raphson (Finding Roots)
- **x_{n+1} = x_n - f(x_n) / f'(x_n)**
- Iterative method for root finding
- Fast convergence near roots

### Numerical Integration

#### Trapezoid Rule
- **∫ f(x)dx ≈ Σ h(f(xᵢ) + f(xᵢ₊₁))/2**

#### Simpson's Rule
- More accurate than trapezoid
- Uses parabolic approximations

---

## Common Mistakes to Avoid

❌ **Don't forget to convert angles**: Ensure DEG/RAD mode matches your inputs
❌ **Avoid division by zero**: Always check denominators
❌ **Watch matrix dimensions**: A(m×n) × B(p×q) requires n = p
❌ **Check discriminant**: Tells you if quadratic has real solutions
❌ **Verify non-singular**: Matrix determinant ≠ 0 for inversion

---

## Tips for Accuracy

✅ Use more decimal places for intermediate steps
✅ Verify results with known test cases
✅ Check units consistency
✅ Use history to review calculations
✅ Round final answers appropriately
✅ Validate vector dimensions before operations

---

**Reference compiled for Further Maths Scientific Calculator** 📚
