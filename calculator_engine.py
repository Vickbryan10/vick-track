import math
import cmath
from typing import Union, Tuple, List, Dict
import re

class AdvancedMathCalculator:
    """World-class scientific calculator with equation solving capabilities."""
    
    def __init__(self):
        self.last_result = 0
        self.error_message = ""
        self.variables = {}  # Store variable values
    
    def basic_operations(self, num1: float, num2: float, operation: str) -> float:
        """Perform basic arithmetic operations."""
        try:
            if operation == '+':
                return num1 + num2
            elif operation == '-':
                return num1 - num2
            elif operation == '*':
                return num1 * num2
            elif operation == '/':
                if num2 == 0:
                    raise ValueError("Division by zero is undefined")
                return num1 / num2
            elif operation == '^':
                return num1 ** num2
            elif operation == '%':
                if num2 == 0:
                    raise ValueError("Modulo by zero is undefined")
                return num1 % num2
            else:
                raise ValueError(f"Unknown operation: {operation}")
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def trigonometric(self, value: float, function: str, mode: str = 'deg') -> float:
        """Calculate trigonometric functions."""
        try:
            if mode == 'deg':
                value = math.radians(value)
            
            if function == 'sin':
                return math.sin(value)
            elif function == 'cos':
                return math.cos(value)
            elif function == 'tan':
                return math.tan(value)
            elif function == 'asin':
                if mode == 'deg':
                    value = math.degrees(value)
                return math.asin(float(value))
            elif function == 'acos':
                if mode == 'deg':
                    value = math.degrees(value)
                return math.acos(float(value))
            elif function == 'atan':
                if mode == 'deg':
                    value = math.degrees(value)
                return math.atan(float(value))
            else:
                raise ValueError(f"Unknown trigonometric function: {function}")
        except ValueError as e:
            self.error_message = f"Domain error: {str(e)}"
            return None
    
    def logarithmic(self, value: float, base: float = 10) -> float:
        """Calculate logarithmic functions."""
        try:
            if value <= 0:
                raise ValueError("Logarithm of non-positive number is undefined")
            if base <= 0 or base == 1:
                raise ValueError("Base must be positive and not equal to 1")
            
            return math.log(value, base)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def exponential(self, value: float, base: float = math.e) -> float:
        """Calculate exponential functions."""
        try:
            return base ** value
        except OverflowError:
            self.error_message = "Result is too large to compute"
            return None
    
    def factorial(self, n: int) -> Union[int, None]:
        """Calculate factorial of n."""
        try:
            if not isinstance(n, int) or n < 0:
                raise ValueError("Factorial is only defined for non-negative integers")
            return math.factorial(n)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def permutation(self, n: int, r: int) -> Union[int, None]:
        """Calculate permutation P(n,r)."""
        try:
            if n < 0 or r < 0 or r > n:
                raise ValueError("Invalid values for permutation")
            return math.factorial(n) // math.factorial(n - r)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def combination(self, n: int, r: int) -> Union[int, None]:
        """Calculate combination C(n,r)."""
        try:
            if n < 0 or r < 0 or r > n:
                raise ValueError("Invalid values for combination")
            return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def standard_deviation(self, data: list) -> Union[float, None]:
        """Calculate standard deviation."""
        try:
            if len(data) < 2:
                raise ValueError("Need at least 2 data points")
            mean = sum(data) / len(data)
            variance = sum((x - mean) ** 2 for x in data) / len(data)
            return math.sqrt(variance)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def hyperbolic(self, value: float, function: str) -> float:
        """Calculate hyperbolic functions."""
        try:
            if function == 'sinh':
                return math.sinh(value)
            elif function == 'cosh':
                return math.cosh(value)
            elif function == 'tanh':
                return math.tanh(value)
            else:
                raise ValueError(f"Unknown hyperbolic function: {function}")
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def complex_operations(self, real1: float, imag1: float, 
                          real2: float, imag2: float, 
                          operation: str) -> Tuple[float, float]:
        """Perform operations on complex numbers."""
        try:
            z1 = complex(real1, imag1)
            z2 = complex(real2, imag2)
            
            if operation == '+':
                result = z1 + z2
            elif operation == '-':
                result = z1 - z2
            elif operation == '*':
                result = z1 * z2
            elif operation == '/':
                if z2 == 0:
                    raise ValueError("Division by zero")
                result = z1 / z2
            else:
                raise ValueError(f"Unknown operation: {operation}")
            
            return (result.real, result.imag)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def matrix_determinant(self, matrix: list) -> Union[float, None]:
        """Calculate 2x2 or 3x3 matrix determinant."""
        try:
            n = len(matrix)
            if n == 2 and all(len(row) == 2 for row in matrix):
                return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0]
            elif n == 3 and all(len(row) == 3 for row in matrix):
                a = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[1][2]*matrix[2][1])
                b = matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
                c = matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0])
                return a - b + c
            else:
                raise ValueError("Only 2x2 and 3x3 matrices supported")
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def format_result(self, result: Union[float, int]) -> str:
        """Format result for display."""
        try:
            if result is None:
                return self.error_message
            if isinstance(result, float):
                if result == int(result):
                    return str(int(result))
                return f"{result:.10g}"
            return str(result)
        except Exception as e:
            return f"Error: {str(e)}"
    
    # ==================== ADVANCED EQUATION SOLVING ====================
    
    def solve_quadratic(self, a: float, b: float, c: float) -> Dict:
        """
        Solve quadratic equation: ax² + bx + c = 0
        Returns both real and complex solutions
        """
        try:
            if a == 0:
                if b == 0:
                    raise ValueError("Not a valid equation")
                return {'type': 'linear', 'solution': -c / b}
            
            discriminant = b**2 - 4*a*c
            
            if discriminant > 0:
                sqrt_disc = math.sqrt(discriminant)
                x1 = (-b + sqrt_disc) / (2*a)
                x2 = (-b - sqrt_disc) / (2*a)
                return {
                    'type': 'real_distinct',
                    'solutions': [x1, x2],
                    'discriminant': discriminant
                }
            elif discriminant == 0:
                x = -b / (2*a)
                return {
                    'type': 'real_repeated',
                    'solution': x,
                    'discriminant': 0
                }
            else:
                sqrt_disc = cmath.sqrt(discriminant)
                x1 = (-b + sqrt_disc) / (2*a)
                x2 = (-b - sqrt_disc) / (2*a)
                return {
                    'type': 'complex',
                    'solutions': [x1, x2],
                    'discriminant': discriminant
                }
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def solve_cubic(self, a: float, b: float, c: float, d: float) -> Dict:
        """
        Solve cubic equation: ax³ + bx² + cx + d = 0
        Uses Cardano's formula
        """
        try:
            if a == 0:
                return self.solve_quadratic(b, c, d)
            
            # Normalize to x³ + px + q = 0
            a, b, c, d = float(a), float(b), float(c), float(d)
            p = (3*a*c - b**2) / (3*a**2)
            q = (2*b**3 - 9*a*b*c + 27*a**2*d) / (27*a**3)
            
            discriminant = -(4*p**3 + 27*q**2)
            
            # Cardano's solution
            inner = (q/2)**2 + (p/3)**3
            sqrt_inner = cmath.sqrt(inner)
            
            c1 = ((-q/2) + sqrt_inner) ** (1/3)
            c2 = ((-q/2) - sqrt_inner) ** (1/3)
            
            if abs(c1) < 1e-10:
                c1_val = c2
            else:
                c1_val = c1
            
            omega = complex(-1/2, math.sqrt(3)/2)  # Cube root of unity
            
            x1 = c1_val + c2 - b/(3*a)
            x2 = omega*c1_val + omega**2*c2 - b/(3*a)
            x3 = omega**2*c1_val + omega*c2 - b/(3*a)
            
            return {
                'type': 'cubic',
                'solutions': [x1, x2, x3],
                'discriminant': discriminant
            }
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def solve_linear(self, a: float, b: float) -> Dict:
        """Solve linear equation: ax + b = 0"""
        try:
            if a == 0:
                if b == 0:
                    return {'type': 'infinite', 'message': 'All numbers are solutions'}
                else:
                    return {'type': 'no_solution', 'message': 'No solution exists'}
            return {'type': 'linear', 'solution': -b / a}
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== MATRIX OPERATIONS ====================
    
    def matrix_determinant(self, matrix: List[List[float]]) -> Union[float, None]:
        """Calculate matrix determinant for 2x2 and 3x3 matrices."""
        try:
            n = len(matrix)
            
            if n == 1:
                return matrix[0][0]
            
            if n == 2:
                return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0]
            
            if n == 3:
                a = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[1][2]*matrix[2][1])
                b = matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
                c = matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0])
                return a - b + c
            
            raise ValueError("Only 1x1, 2x2, and 3x3 matrices supported")
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def matrix_inverse_2x2(self, matrix: List[List[float]]) -> Union[List[List[float]], None]:
        """Calculate inverse of 2x2 matrix."""
        try:
            det = self.matrix_determinant(matrix)
            if det == 0:
                raise ValueError("Matrix is singular (determinant = 0)")
            
            return [
                [matrix[1][1]/det, -matrix[0][1]/det],
                [-matrix[1][0]/det, matrix[0][0]/det]
            ]
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def matrix_transpose(self, matrix: List[List[float]]) -> List[List[float]]:
        """Calculate matrix transpose."""
        try:
            rows = len(matrix)
            cols = len(matrix[0])
            return [[matrix[i][j] for i in range(rows)] for j in range(cols)]
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def matrix_multiply(self, mat1: List[List[float]], 
                       mat2: List[List[float]]) -> Union[List[List[float]], None]:
        """Multiply two matrices."""
        try:
            rows1, cols1 = len(mat1), len(mat1[0])
            rows2, cols2 = len(mat2), len(mat2[0])
            
            if cols1 != rows2:
                raise ValueError(f"Cannot multiply {rows1}x{cols1} by {rows2}x{cols2}")
            
            result = [[0]*cols2 for _ in range(rows1)]
            
            for i in range(rows1):
                for j in range(cols2):
                    for k in range(cols1):
                        result[i][j] += mat1[i][k] * mat2[k][j]
            
            return result
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== POLYNOMIAL OPERATIONS ====================
    
    def polynomial_evaluate(self, coefficients: List[float], x: float) -> float:
        """
        Evaluate polynomial at x using Horner's method.
        coefficients: [a₀, a₁, a₂, ...] for a₀ + a₁x + a₂x² + ...
        """
        try:
            result = 0
            for i, coef in enumerate(reversed(coefficients)):
                result = result * x + coef
            return result
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def polynomial_derivative(self, coefficients: List[float]) -> List[float]:
        """Get derivative coefficients of polynomial."""
        try:
            if len(coefficients) <= 1:
                return [0]
            return [i * coefficients[i] for i in range(1, len(coefficients))]
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def find_polynomial_roots_newton(self, coefficients: List[float], 
                                     initial_guess: float = 1.0, 
                                     tolerance: float = 1e-10, 
                                     max_iterations: int = 100) -> List[float]:
        """Use Newton-Raphson method to find polynomial roots."""
        try:
            roots = []
            working_coeffs = coefficients.copy()
            
            for _ in range(len(coefficients) - 1):
                root = initial_guess
                x = root
                
                for iteration in range(max_iterations):
                    f_x = self.polynomial_evaluate(working_coeffs, x)
                    
                    if abs(f_x) < tolerance:
                        break
                    
                    # Calculate derivative
                    deriv_coeffs = self.polynomial_derivative(working_coeffs)
                    f_prime = self.polynomial_evaluate(deriv_coeffs, x)
                    
                    if abs(f_prime) < 1e-15:
                        break
                    
                    x = x - f_x / f_prime
                
                roots.append(x)
                initial_guess += 0.5
            
            return roots
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== TRIGONOMETRIC WITH INVERSE ====================
    
    def inverse_sine(self, value: float, mode: str = 'deg') -> Union[float, None]:
        """Calculate inverse sine (arcsin)."""
        try:
            if abs(value) > 1:
                raise ValueError("arcsin input must be in [-1, 1]")
            result = math.asin(value)
            if mode == 'deg':
                result = math.degrees(result)
            return result
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def inverse_cosine(self, value: float, mode: str = 'deg') -> Union[float, None]:
        """Calculate inverse cosine (arccos)."""
        try:
            if abs(value) > 1:
                raise ValueError("arccos input must be in [-1, 1]")
            result = math.acos(value)
            if mode == 'deg':
                result = math.degrees(result)
            return result
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def inverse_tangent(self, value: float, mode: str = 'deg') -> Union[float, None]:
        """Calculate inverse tangent (arctan)."""
        try:
            result = math.atan(value)
            if mode == 'deg':
                result = math.degrees(result)
            return result
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== CALCULUS APPROXIMATIONS ====================
    
    def numerical_derivative(self, coefficients: List[float], x: float, 
                            h: float = 1e-7) -> float:
        """Approximate derivative using numerical differentiation."""
        try:
            f_x_plus = self.polynomial_evaluate(coefficients, x + h)
            f_x_minus = self.polynomial_evaluate(coefficients, x - h)
            return (f_x_plus - f_x_minus) / (2 * h)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def numerical_integral_trapezoid(self, coefficients: List[float], 
                                    a: float, b: float, n: int = 1000) -> float:
        """Calculate definite integral using trapezoid rule."""
        try:
            h = (b - a) / n
            result = (self.polynomial_evaluate(coefficients, a) + 
                     self.polynomial_evaluate(coefficients, b)) / 2
            
            for i in range(1, n):
                x = a + i * h
                result += self.polynomial_evaluate(coefficients, x)
            
            return result * h
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def numerical_integral_simpson(self, coefficients: List[float], 
                                  a: float, b: float, n: int = 1000) -> float:
        """Calculate definite integral using Simpson's rule."""
        try:
            if n % 2 != 0:
                n += 1
            
            h = (b - a) / n
            result = (self.polynomial_evaluate(coefficients, a) + 
                     self.polynomial_evaluate(coefficients, b))
            
            for i in range(1, n, 2):
                x = a + i * h
                result += 4 * self.polynomial_evaluate(coefficients, x)
            
            for i in range(2, n-1, 2):
                x = a + i * h
                result += 2 * self.polynomial_evaluate(coefficients, x)
            
            return result * h / 3
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== COMPLEX NUMBER OPERATIONS ====================
    
    def complex_to_polar(self, real: float, imag: float) -> Dict:
        """Convert complex number to polar form."""
        try:
            z = complex(real, imag)
            magnitude = abs(z)
            angle_rad = cmath.phase(z)
            angle_deg = math.degrees(angle_rad)
            return {
                'magnitude': magnitude,
                'angle_radians': angle_rad,
                'angle_degrees': angle_deg
            }
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def complex_from_polar(self, magnitude: float, angle: float, 
                          mode: str = 'deg') -> Dict:
        """Convert polar form to complex number."""
        try:
            if mode == 'deg':
                angle = math.radians(angle)
            real = magnitude * math.cos(angle)
            imag = magnitude * math.sin(angle)
            return {'real': real, 'imag': imag}
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def complex_power(self, real: float, imag: float, 
                     power_real: float, power_imag: float = 0) -> Dict:
        """Calculate complex number raised to complex power."""
        try:
            z = complex(real, imag)
            power = complex(power_real, power_imag)
            result = z ** power
            return {'real': result.real, 'imag': result.imag}
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== SYSTEM OF LINEAR EQUATIONS ====================
    
    def solve_2x2_system(self, a1: float, b1: float, c1: float,
                        a2: float, b2: float, c2: float) -> Dict:
        """
        Solve 2x2 system:
        a1*x + b1*y = c1
        a2*x + b2*y = c2
        """
        try:
            det = a1*b2 - a2*b1
            
            if det == 0:
                return {'type': 'no_unique_solution', 'message': 'Lines are parallel or identical'}
            
            x = (c1*b2 - c2*b1) / det
            y = (a1*c2 - a2*c1) / det
            
            return {'type': 'unique', 'x': x, 'y': y}
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def solve_3x3_system(self, matrix: List[List[float]], 
                        constants: List[float]) -> Dict:
        """Solve 3x3 system using Cramer's rule."""
        try:
            det = self.matrix_determinant(matrix)
            
            if det == 0:
                return {'type': 'no_unique_solution'}
            
            solutions = {}
            
            for j in range(3):
                # Create modified matrix with constants
                mod_matrix = [row.copy() for row in matrix]
                for i in range(3):
                    mod_matrix[i][j] = constants[i]
                
                det_mod = self.matrix_determinant(mod_matrix)
                solutions[chr(120 + j)] = det_mod / det  # x, y, z
            
            return {'type': 'unique', 'solutions': solutions}
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== ADVANCED STATISTICS ====================
    
    def calculate_quartiles(self, data: List[float]) -> Dict:
        """Calculate Q1, Q2 (median), Q3."""
        try:
            sorted_data = sorted(data)
            n = len(sorted_data)
            
            q2 = sorted_data[n//2] if n % 2 == 1 else (sorted_data[n//2-1] + sorted_data[n//2]) / 2
            q1 = sorted_data[n//4] if n % 4 == 0 else (sorted_data[n//4] + sorted_data[n//4+1]) / 2
            q3 = sorted_data[3*n//4] if n % 4 == 0 else (sorted_data[3*n//4] + sorted_data[3*n//4+1]) / 2
            
            iqr = q3 - q1
            
            return {
                'Q1': q1,
                'Q2_median': q2,
                'Q3': q3,
                'IQR': iqr,
                'lower_fence': q1 - 1.5*iqr,
                'upper_fence': q3 + 1.5*iqr
            }
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def calculate_skewness(self, data: List[float]) -> Union[float, None]:
        """Calculate coefficient of skewness."""
        try:
            n = len(data)
            mean = sum(data) / n
            std = (sum((x - mean)**2 for x in data) / n) ** 0.5
            skewness = sum((x - mean)**3 for x in data) / (n * std**3)
            return skewness
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def calculate_kurtosis(self, data: List[float]) -> Union[float, None]:
        """Calculate coefficient of kurtosis."""
        try:
            n = len(data)
            mean = sum(data) / n
            std = (sum((x - mean)**2 for x in data) / n) ** 0.5
            kurtosis = (sum((x - mean)**4 for x in data) / (n * std**4)) - 3
            return kurtosis
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== VECTOR OPERATIONS ====================
    
    def vector_magnitude(self, vector: List[float]) -> Union[float, None]:
        """Calculate magnitude (length) of vector."""
        try:
            return math.sqrt(sum(x**2 for x in vector))
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def vector_dot_product(self, vec1: List[float], vec2: List[float]) -> Union[float, None]:
        """Calculate dot product of two vectors."""
        try:
            if len(vec1) != len(vec2):
                raise ValueError("Vectors must have same dimension")
            return sum(a*b for a, b in zip(vec1, vec2))
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def vector_cross_product(self, vec1: List[float], vec2: List[float]) -> Union[List[float], None]:
        """Calculate cross product of two 3D vectors."""
        try:
            if len(vec1) != 3 or len(vec2) != 3:
                raise ValueError("Cross product requires 3D vectors")
            
            return [
                vec1[1]*vec2[2] - vec1[2]*vec2[1],
                vec1[2]*vec2[0] - vec1[0]*vec2[2],
                vec1[0]*vec2[1] - vec1[1]*vec2[0]
            ]
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def vector_angle_between(self, vec1: List[float], vec2: List[float], 
                            mode: str = 'deg') -> Union[float, None]:
        """Calculate angle between two vectors."""
        try:
            dot = self.vector_dot_product(vec1, vec2)
            mag1 = self.vector_magnitude(vec1)
            mag2 = self.vector_magnitude(vec2)
            
            if mag1 == 0 or mag2 == 0:
                raise ValueError("Cannot calculate angle with zero-magnitude vector")
            
            cos_angle = dot / (mag1 * mag2)
            # Clamp to [-1, 1] to handle floating point errors
            cos_angle = max(-1, min(1, cos_angle))
            angle_rad = math.acos(cos_angle)
            
            if mode == 'deg':
                return math.degrees(angle_rad)
            return angle_rad
        except Exception as e:
            self.error_message = str(e)
            return None
    
    # ==================== SPECIAL FUNCTIONS ====================
    
    def gamma_function(self, x: float) -> Union[float, None]:
        """Calculate gamma function Γ(x) = (x-1)!"""
        try:
            return math.gamma(x)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def beta_function(self, x: float, y: float) -> Union[float, None]:
        """Calculate beta function B(x,y)."""
        try:
            return math.gamma(x) * math.gamma(y) / math.gamma(x + y)
        except Exception as e:
            self.error_message = str(e)
            return None
    
    def error_function(self, x: float) -> Union[float, None]:
        """Calculate error function erf(x)."""
        try:
            return math.erf(x)
        except Exception as e:
            self.error_message = str(e)
            return None
