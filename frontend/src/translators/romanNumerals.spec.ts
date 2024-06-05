import {convertToRomanNumeral, convertToInteger} from "./romanNumerals.ts";


describe('convert integer to roman numeral', () => {
    describe("single symbol numbers", () => {
        test.each([
            [1, 'I'],
            [5, 'V'],
            [10, 'X'],
            [50, 'L'],
            [100, 'C'],
            [500, 'D'],
            [1000, 'M'],
        ])('when number is %s, returns %s', (number, expected) => {
            expect(convertToRomanNumeral(number)).toEqual(expected);
        })
    })

    describe("append to the back", () => {
        test("when number is 2, returns II", () => {
            expect(convertToRomanNumeral(2)).toEqual("II");
        })

        test('when number is 3, returns III', () => {
            expect(convertToRomanNumeral(3)).toEqual("III");
        })

        test('when number is 6, returns VI', () => {
            expect(convertToRomanNumeral(6)).toEqual("VI");
        })

        test('when number is 7, returns VII', () => {
            expect(convertToRomanNumeral(7)).toEqual("VII");
        })

        test('when number is 8, returns VIII', () => {
            expect(convertToRomanNumeral(8)).toEqual("VIII");
        })

        test('when number is 11, returns XI', () => {
            expect(convertToRomanNumeral(11)).toEqual("XI");
        })

        test('when number is 12, returns XII', () => {
            expect(convertToRomanNumeral(12)).toEqual("XII");
        })

        test('when number is 15, returns XV', () => {
            expect(convertToRomanNumeral(15)).toEqual("XV");
        })

        test('when number is 16, returns XVI', () => {
            expect(convertToRomanNumeral(16)).toEqual("XVI");
        })

        test('when number is 20, returns XX', () => {
            expect(convertToRomanNumeral(20)).toEqual("XX");
        })
    })

    describe('insert to front', () => {
        test('when number is 4, returns IV', () => {
            expect(convertToRomanNumeral(4)).toEqual("IV");
        })

        test('when number is 14, returns XIV', () => {
            expect(convertToRomanNumeral(14)).toEqual("XIV");
        })

        test('when number is 1004, returns MIV', () => {
            expect(convertToRomanNumeral(1004)).toEqual("MIV");
        })

        test('when number is 9, returns IX', () => {
            expect(convertToRomanNumeral(9)).toEqual("IX");
        })

        test('when number is 49, returns XLIX', () => {
            expect(convertToRomanNumeral(49)).toEqual("XLIX");
        })

        test('when number is 99, returns XCIX', () => {
            expect(convertToRomanNumeral(99)).toEqual("XCIX");
        })

        test('when number is 499, returns CDXCIX', () => {
            expect(convertToRomanNumeral(499)).toEqual("CDXCIX");
        })

        test('when number is 999, returns CMXCIX', () => {
            expect(convertToRomanNumeral(999)).toEqual("CMXCIX");
        })

        test('when number is 40, returns XL', () => {
            expect(convertToRomanNumeral(40)).toEqual("XL");
        })

        test('when number is 90, returns XC', () => {
            expect(convertToRomanNumeral(90)).toEqual("XC");
        })

        test('when number is 400, returns CD', () => {
            expect(convertToRomanNumeral(400)).toEqual("CD");
        })
    })

    describe('random number generator testing', () => {
        test.each([
            [857, 'DCCCLVII'],
            [484, 'CDLXXXIV'],
            [48, 'XLVIII'],
            [993, 'CMXCIII'],
            [96, 'XCVI'],
            [495, 'CDXCV']

        ])('when number is %s, returns %s', (number, expected) => {
            expect(convertToRomanNumeral(number)).toEqual(expected);
        })
    })
});

describe('convert roman numeral into integer', () => {
    describe('single symbol to integer', () => {
        test.each([
            ['I', 1],
            ['V', 5],
            ['X', 10],
            ['L', 50],
            ['C', 100],
            ['D', 500],
            ['M', 1000]
        ])('when numeral is %s, returns %s', (numeral, expected) => {
            expect(convertToInteger(numeral)).toEqual(expected);
        })
    });

    describe('adding up same digits', () => {
        test.each([
            ['II', 2],
            ['III', 3],
            ['XX', 20]
        ])('when numeral is %s, returns %s', (numeral, expected) => {
            expect(convertToInteger(numeral)).toEqual(expected);
        })
    })

    describe('adding up different digits', () => {
        test.each([
            ['VI', 6],
            ['VII', 7],
            ['XIII', 13],
            ['MVI', 1006]
        ])('when numeral is %s, returns %s', (numeral, expected) => {
            expect(convertToInteger(numeral)).toEqual(expected);
        })
    })

    describe('prefixed digits', () => {
        test.each([
            ['IV', 4],
            ['IX', 9],
            ['XL', 40],
            ['XC', 90],
            ['CD', 400],
            ['CM', 900]
        ])('when numeral is %s, returns %s', (numeral, expected) => {
            expect(convertToInteger(numeral)).toEqual(expected);
        })
    })

    describe('random number test', () => {
        test.each([
            [857, 'DCCCLVII'],
            [484, 'CDLXXXIV'],
            [48, 'XLVIII'],
            [993, 'CMXCIII'],
            [96, 'XCVI'],
            [495, 'CDXCV']
        ])('when numeral is %s, returns %s', (expected, numeral) => {
            expect(convertToInteger(numeral)).toEqual(expected);
        })
    })
});