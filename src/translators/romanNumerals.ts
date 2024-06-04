const SYMBOL_NUMBERS = [
    {value: 1000, symbol: 'M'},
    {value: 900, symbol: 'CM'},
    {value: 500, symbol: 'D'},
    {value: 400, symbol: 'CD'},
    {value: 100, symbol: 'C'},
    {value: 90, symbol: 'XC'},
    {value: 50, symbol: 'L'},
    {value: 40, symbol: 'XL'},
    {value: 10, symbol: 'X'},
    {value: 9, symbol: 'IX'},
    {value: 5, symbol: 'V'},
    {value: 4, symbol: 'IV'},
    {value: 1, symbol: 'I'},
];

export function convertToRomanNumeral(num: number) {
    let result = '';
    let remainingValue = num;

    while (remainingValue > 0) {
        const symbol = SYMBOL_NUMBERS.find(s => remainingValue >= s.value);
        if (!symbol) {
            continue;
        }
        result += symbol.symbol;
        remainingValue = remainingValue - symbol.value;
    }
    return result;
}

export function convertToInteger(num: string) {
    let result = 0;
    let prev = 0;

    for (let digit of num.split('').reverse()) {
        let curr = SYMBOL_NUMBERS.find(s => s.symbol === digit)
        if (!curr) {
            continue;
        }
        if (prev > curr.value) {
            result -= curr.value;
        } else {
            result += curr.value;
        }
        prev = curr.value;
    }

    return result;
}