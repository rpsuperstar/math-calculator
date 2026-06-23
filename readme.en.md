# 📐 Advanced Math Calculator

> English | [中文](readme.md)

A natural language math calculator supporting complex number operations, trigonometric functions, logarithms, roots, and more.

## ✨ Features

- **Natural Language Input**: Supports Chinese commands like "30开5次根号" (30th root of 5), "2的10次方" (2 to the power of 10)
- **Complex Number Operations**: Supports imaginary unit i, can calculate Euler's formula e^(iπ) = -1
- **Trigonometric Functions**: sin, cos, tan (supports degree input)
- **Logarithmic Functions**: ln (natural logarithm), log (common logarithm)
- **Root Operations**: Square root, cube root, Nth root
- **Constants**: π (pi), e (Euler's number), i (imaginary unit)
- **Absolute Value**: Supports negative number absolute value
- **Percentage**: Supports percentage input

## 🚀 Getting Started

### Online Usage

Visit the online version: [https://rpsuperstar.github.io/newcomer/](https://rpsuperstar.github.io/newcomer/)

### Local Development

```bash
git clone https://github.com/rpsuperstar/newcomer.git
cd newcomer
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## 📝 Usage Examples

| Input | Result |
|-------|--------|
| 30开5次根号 | ~1.9744 |
| 2的10次方 | 1024 |
| sin(90) | 1 |
| cos(60) | 0.5 |
| ln(10) | ~2.3026 |
| e的iπ次方 | -1 |
| 根号(-1) | i |
| 绝对值(-20) | 20 |
| 30%开3次根号 | ~0.6694 |

## 🔢 Supported Operations

- Basic arithmetic: addition, subtraction, multiplication, division, modulo
- Power operations: square, cube, Nth power
- Root operations: square root, cube root, Nth root
- Trigonometric functions: sin, cos, tan
- Logarithmic functions: ln, log
- Absolute value
- Constants: π, e, i

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript
- [Math.js](https://mathjs.org/) - Math library

## 📄 License

MIT License
