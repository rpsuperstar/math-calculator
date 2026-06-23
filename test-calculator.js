const math = require('mathjs');

const testCases = [
    { input: '30%开3次根号', expected: '0.6694329501' },
    { input: '0.3开3次根号', expected: '0.6694329501' },
    { input: '1.5%开平方', expected: '0.1224744871' },
    { input: '-5开平方', expected: '2.2360679775i' },
    { input: '2的-1次方', expected: '0.5' },
    { input: 'sin(-30)', expected: '-0.5' },
    { input: '30%加50%', expected: '0.8' },
    { input: '30开', expected: null },
    { input: 'log(0.1)', expected: '-1' },
    { input: '1除以0', expected: 'Infinity' },
    { input: '(2+3)开平方', expected: null },
    { input: '2加3乘4', expected: '14' },
    { input: '2的10次方', expected: '1024' },
    { input: 'sin(90)', expected: '1' },
    { input: 'π', expected: '3.1415926536' },
    { input: 'e的值', expected: '2.7182818285' },
    { input: '50%的平方根', expected: '0.7071067812' },
    { input: '100%', expected: '1' },
    { input: '根号25', expected: '5' },
    { input: '开平方16', expected: '4' },
    { input: 'sqrt(16)', expected: '4' },
    { input: 'ln(1)', expected: '0' },
    { input: 'log(100)', expected: '2' },
    { input: '绝对值(-5)', expected: '5' },
    { input: 'abs(-3)', expected: '3' },
    { input: 'e的3次方', expected: '20.0855369232' },
    { input: '3平方', expected: '9' },
    { input: '3立方', expected: '27' },
    { input: 'cos(60)', expected: '0.5' },
    { input: 'tan(45)', expected: '1' },
    { input: '2乘3', expected: '6' },
    { input: '10减5', expected: '5' },
    { input: '10除以2', expected: '5' },
    { input: '7余3', expected: '1' },
    { input: '2的0次方', expected: '1' },
    { input: '0的0次方', expected: '1' },
    { input: '1.5平方', expected: '2.25' },
    { input: '0.5%开平方', expected: '0.0707106781' },
    { input: 'sin（90）', expected: '1' },
    { input: '绝对值（-5）', expected: '5' },
    { input: 'ln（1）', expected: '0' },
    { input: 'sqrt（16）', expected: '4' },
    { input: 'cos（60）', expected: '0.5' },
    { input: 'π除以2', expected: '1.5707963268' },
    { input: 'π加1', expected: '4.1415926536' },
    { input: 'e的值减1', expected: '1.7182818285' },
    { input: 'π乘2', expected: '6.2831853072' },
    { input: 'e的值加π', expected: '5.859874482' },
    { input: '根号2', expected: '1.4142135624' },
    { input: '根号3', expected: '1.7320508076' },
    { input: 'sin(45)', expected: '0.7071067812' },
    { input: 'e的iπ次方', expected: '-1' },
    { input: '根号(-1)', expected: 'i' },
    { input: '根号(-4)', expected: '2i' },
    { input: 'i的2次方', expected: '-1' },
    { input: '(1+i)的2次方', expected: '2i' },
    { input: '(1+i)乘(1-i)', expected: '2' },
    { input: 'i加i', expected: '2i' },
    { input: '1加i', expected: '1 + i' },
];

function parseNaturalLanguage(input) {
    let expression = input.trim();
    
    expression = expression.replace(/（/g, '(').replace(/）/g, ')');
    
    expression = expression.replace(/(-?\d+(?:\.\d+)?)(%)/g, function(match, num) {
        return (parseFloat(num) / 100).toString();
    });
    
    expression = expression.replace(/π|pi|圆周率/g, 'pi');
    expression = expression.replace(/(?<!Math\.)e值|(?<!Math\.)e的值/g, 'e');
    
    const numPattern = '(-?\\d+(?:\\.\\d+)?|pi|e|i)';
    
    const patterns = [
        { regex: /e\s*的\s*i\s*[乘×]?\s*(?:π|pi)\s*次方?/, replace: 'exp(i*pi)' },
        { regex: new RegExp('e\\s*的\\s*(-?\\d+(?:\\.\\d+)?)\\s*次方'), replace: 'exp($1)' },
        { regex: /虚数单位|i/g, replace: 'i' },
        { regex: /根号\s*\(\s*-(-?\d+(?:\.\d+)?)\s*\)/, replace: 'i*sqrt($1)' },
        { regex: /根号\s*(-?\d+(?:\.\d+)?)/, replace: 'sqrt($1)' },
        { regex: /开平方\s*(-?\d+(?:\.\d+)?)/, replace: 'sqrt($1)' },
        { regex: /开根号\s*(-?\d+(?:\.\d+)?)/, replace: 'sqrt($1)' },
        { regex: /绝对值\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'abs($1)' },
        { regex: /平方\s*根\s*(\(|)(-?\d+(?:\.\d+)?)(\)|)/, replace: 'sqrt($2)' },
        { regex: /立方\s*根\s*(\(|)(-?\d+(?:\.\d+)?)(\)|)/, replace: 'cbrt($2)' },
        { regex: /(?<!\.)sin\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'sin($1 * pi / 180)' },
        { regex: /(?<!\.)cos\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'cos($1 * pi / 180)' },
        { regex: /(?<!\.)tan\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'tan($1 * pi / 180)' },
        { regex: /(?<!\.)asin\s*\(\s*(-?[\d.]+)\s*\)/, replace: 'asin($1) * 180 / pi' },
        { regex: /(?<!\.)acos\s*\(\s*(-?[\d.]+)\s*\)/, replace: 'acos($1) * 180 / pi' },
        { regex: /(?<!\.)atan\s*\(\s*(-?[\d.]+)\s*\)/, replace: 'atan($1) * 180 / pi' },
        { regex: /(?<!\.)ln\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'log($1)' },
        { regex: /(?<!\.)log\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'log10($1)' },
        { regex: /(?<!\.)sqrt\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'sqrt($1)' },
        { regex: /(?<!\.)abs\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)/, replace: 'abs($1)' },
        { regex: new RegExp(numPattern + '\\s*开\\s*' + numPattern + '\\s*次\\s*根号?'), replace: 'pow($1, 1/$2)' },
        { regex: new RegExp(numPattern + '\\s*的\\s*' + numPattern + '\\s*次方'), replace: 'pow($1, $2)' },
        { regex: new RegExp(numPattern + '\\s*的\\s*' + numPattern + '\\s*次幂'), replace: 'pow($1, $2)' },
        { regex: new RegExp(numPattern + '\\s*平方'), replace: 'pow($1, 2)' },
        { regex: new RegExp(numPattern + '\\s*立方'), replace: 'pow($1, 3)' },
        { regex: new RegExp(numPattern + '\\s*开平方'), replace: 'sqrt($1)' },
        { regex: new RegExp(numPattern + '\\s*开根号'), replace: 'sqrt($1)' },
        { regex: new RegExp(numPattern + '\\s*开立方'), replace: 'cbrt($1)' },
        { regex: new RegExp(numPattern + '\\s*的平方根'), replace: 'sqrt($1)' },
        { regex: new RegExp(numPattern + '\\s*的立方根'), replace: 'cbrt($1)' },
        { regex: /e\^\s*(-?\d+(?:\.\d+)?)/, replace: 'exp($1)' },
        { regex: new RegExp(numPattern + '\\s*除以\\s*' + numPattern), replace: '$1 / $2' },
        { regex: new RegExp(numPattern + '\\s*乘\\s*' + numPattern), replace: '$1 * $2' },
        { regex: new RegExp(numPattern + '\\s*加\\s*' + numPattern), replace: '$1 + $2' },
        { regex: new RegExp(numPattern + '\\s*减\\s*' + numPattern), replace: '$1 - $2' },
        { regex: new RegExp(numPattern + '\\s*余\\s*' + numPattern), replace: '$1 % $2' },
        { regex: /(\([^)]+\))\s*乘\s*(\([^)]+\))/, replace: '$1 * $2' },
        { regex: /(\([^)]+\))\s*加\s*(\([^)]+\))/, replace: '$1 + $2' },
        { regex: /(\([^)]+\))\s*减\s*(\([^)]+\))/, replace: '$1 - $2' },
        { regex: /(\([^)]+\))\s*除以\s*(\([^)]+\))/, replace: '$1 / $2' },
        { regex: /(\([^)]+\))\s*乘\s*(-?\d+(?:\.\d+)?)/, replace: '$1 * $2' },
        { regex: /(-?\d+(?:\.\d+)?)\s*乘\s*(\([^)]+\))/, replace: '$1 * $2' },
        { regex: /(\([^)]+\))\s*加\s*(-?\d+(?:\.\d+)?)/, replace: '$1 + $2' },
        { regex: /(-?\d+(?:\.\d+)?)\s*加\s*(\([^)]+\))/, replace: '$1 + $2' },
        { regex: /(\([^)]+\))\s*的\s*(-?\d+(?:\.\d+)?)\s*次方/, replace: 'pow($1, $2)' }
    ];
    
    let originalExpression = expression;
    
    patterns.forEach(pattern => {
        expression = expression.replace(pattern.regex, pattern.replace);
    });
    
    if (!/(?:pow|exp|sqrt|cbrt|sin|cos|tan|log|log10|abs|asin|acos|atan)\(|pi|e|i|\d/.test(expression)) {
        expression = input;
    }
    
    return { expression, originalExpression };
}

function calculate(input) {
    try {
        const { expression } = parseNaturalLanguage(input);
        const result = math.evaluate(expression);
        
        let resultStr = '';
        if (typeof result === 'object' && result.im !== undefined) {
            const re = parseFloat(result.re.toFixed(10));
            const im = parseFloat(result.im.toFixed(10));
            if (re !== 0 && im !== 0) {
                const imStr = im === 1 ? 'i' : im === -1 ? '-i' : `${im}i`;
                resultStr = `${re} + ${imStr}`;
            } else if (re !== 0) {
                resultStr = `${re}`;
            } else {
                if (im === 1) {
                    resultStr = 'i';
                } else if (im === -1) {
                    resultStr = '-i';
                } else {
                    resultStr = `${im}i`;
                }
            }
        } else if (typeof result === 'number') {
            if (isNaN(result) || !isFinite(result)) {
                return result.toString();
            }
            resultStr = parseFloat(result.toFixed(10)).toString();
        } else {
            resultStr = result.toString();
        }
        
        return resultStr;
    } catch (error) {
        return null;
    }
}

let passed = 0;
let failed = 0;
let issues = [];

console.log('=== 输入异常自检报告 ===\n');

testCases.forEach((test, index) => {
    const result = calculate(test.input);
    let status = '';
    
    if (test.expected === null) {
        status = result === null ? '✓ 正确（预期失败）' : '✗ 失败（应报错）';
    } else if (result === test.expected) {
        status = '✓ 正确';
        passed++;
    } else {
        status = '✗ 失败';
        failed++;
        issues.push({ input: test.input, expected: test.expected, got: result });
    }
    
    console.log(`[${index + 1}] ${test.input}`);
    console.log(`    期望: ${test.expected || '错误'}`);
    console.log(`    实际: ${result || '错误'}`);
    console.log(`    状态: ${status}`);
    console.log('');
});

console.log('=== 发现的问题 ===');
if (issues.length === 0) {
    console.log('未发现问题');
} else {
    issues.forEach(issue => {
        console.log(`✗ ${issue.input}`);
        console.log(`   期望: ${issue.expected}`);
        console.log(`   实际: ${issue.got}`);
    });
}

console.log('\n=== 总结 ===');
console.log(`测试用例: ${testCases.length}`);
console.log(`通过: ${passed}`);
console.log(`失败: ${failed}`);