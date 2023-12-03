const { getInputData } = require('../utils');

const inputFileName = '2023/1_trebuchet.txt';

const partOne = (data) => {
    const InputNumbersMap = [];

    data.forEach((row) => {
        const numbersInRow = [];
        const phrase = row.split('');

        phrase.forEach((symbol) => {
            const number = parseInt(symbol);
            !isNaN(number) && numbersInRow.push(number);
        });

        let resultNumber = '';

        if (numbersInRow.length === 1) {
            resultNumber += numbersInRow[0];
            resultNumber += numbersInRow[0];
        }
        if (numbersInRow.length > 1) {
            resultNumber += numbersInRow[0];
            resultNumber += numbersInRow[numbersInRow.length - 1];
        }

        InputNumbersMap.push(parseInt(resultNumber));
    });
    const sum = InputNumbersMap.reduce((acc, value) => acc + value, 0);

    return sum;
};

const getArrayOfSpelledOutNumber = (phrase, number, indexArray = [], lastIndex = 0) => {
    if (lastIndex >= 0) {
        lastIndex = phrase.indexOf(number, lastIndex);
        if (lastIndex >= 0) {
            indexArray.push(lastIndex);
            return getArrayOfSpelledOutNumber(phrase, number, indexArray, lastIndex + 1);
        } else return getArrayOfSpelledOutNumber(phrase, number, indexArray, lastIndex);
    }
    return indexArray;
};

const getAllNumbersInPhrase = (phrase) => {
    const spelledOutNumbersInPhrase = {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: [],
        eight: [],
        nine: [],
    };
    const numberMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        zero: 0,
    };
    const allNumbers = [];
    for (number in numberMap) {
        const indexesArray = [];
        indexesArray.push(...getArrayOfSpelledOutNumber(phrase, number));
        indexesArray.push(...getArrayOfSpelledOutNumber(phrase, numberMap[number]));
        spelledOutNumbersInPhrase[number] = indexesArray;
    }
    for (numberArray in spelledOutNumbersInPhrase) {
        spelledOutNumbersInPhrase[numberArray].forEach((index) => {
            allNumbers.push({
                number: numberMap[numberArray],
                index: index,
            });
        });
    }
    const sortedAllNumber = allNumbers.toSorted((number1, number2) => number1.index - number2.index);
    let allNumbersInPhrase = '';
    sortedAllNumber.forEach((number) => (allNumbersInPhrase += number.number));
    return allNumbersInPhrase;
};

partTwo = (data) => {
    const newInput = data.map((row) => {
        return getAllNumbersInPhrase(row);
    });

    const InputNumbersMap = [];

    newInput.forEach((row) => {
        const numbersInRow = [];
        const phrase = row.split('');

        phrase.forEach((symbol) => {
            const number = parseInt(symbol);
            !isNaN(number) && numbersInRow.push(number);
        });

        let resultNumber = '';

        if (numbersInRow.length === 1) {
            resultNumber += numbersInRow[0];
            resultNumber += numbersInRow[0];
        }
        if (numbersInRow.length > 1) {
            resultNumber += numbersInRow[0];
            resultNumber += numbersInRow[numbersInRow.length - 1];
        }

        InputNumbersMap.push(parseInt(resultNumber));
    });
    const sum = InputNumbersMap.reduce((acc, value) => acc + value, 0);

    return sum;
};

getInputData(inputFileName).then((data) => {
    data = data.split('\n').map((value) => value.trim());
    console.log('Part 1: ', partOne(data));
    console.log('Part 2: ', partTwo(data));
});
