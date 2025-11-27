import math
import cmath
from typing import Union, Tuple

class ScientificCalculator:
    """Advanced scientific calculator for further mathematics."""
    
    def __init__(self):
        self.last_result = 0
        self.error_message = ""
    
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
