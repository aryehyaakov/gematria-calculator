const gematriaValues = {
    standard: {'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
               'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
               'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400, 'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90},
    ordinal: {'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
              'י': 10, 'כ': 11, 'ל': 12, 'מ': 13, 'נ': 14, 'ס': 15, 'ע': 16, 'פ': 17, 'צ': 18,
              'ק': 19, 'ר': 20, 'ש': 21, 'ת': 22},
    reduced: {'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
              'י': 1, 'כ': 2, 'ל': 3, 'מ': 4, 'נ': 5, 'ס': 6, 'ע': 7, 'פ': 8, 'צ': 9,
              'ק': 1, 'ר': 2, 'ש': 3, 'ת': 4, 'ך': 2, 'ם': 4, 'ן': 5, 'ף': 8, 'ץ': 9},
};

const descriptions = {
    standard: "Standard Gematria: Each Hebrew letter is assigned a numerical value according to its position in the alphabet (e.g., א = 1, ב = 2, ... ת = 400).",
    ordinal: "Ordinal Gematria: Each Hebrew letter is assigned a value according to its order in the alphabet from 1 to 22 (e.g., א = 1, ב = 2, ... ת = 22).",
    reduced: "Reduced Gematria: Each Hebrew letter's value is reduced to a single digit (e.g., א = 1, ב = 2, ... י = 1, כ = 2, ...).",
    integralReduced: "Integral Reduced Gematria: Similar to reduced gematria but retains full values for sums.",
    small: "Small Gematria: The sum of the values of the word is reduced to a single digit (e.g., שלום = 300 + 30 + 6 + 40 = 376; 3 + 7 + 6 = 16; 1 + 6 = 7).",
    absolute: "Absolute Gematria: Adds the number of letters in the word to the standard gematria value.",
    atbash: "Atbash Gematria: A substitution cipher where the first letter is substituted with the last, the second with the second last, and so on (e.g., א = ת, ב = ש, ...).",
    albam: "Albam Gematria: A substitution cipher where the alphabet is split in half and letters are swapped across the two halves (e.g., א = ל, ב = מ, ...).",
    avgad: "Avgad Gematria: Each letter is incremented by 3 positions forward in the alphabet (e.g., א = ד, ב = ה, ...).",
    ayakBakar: "Ayak Bakar Gematria: Each letter is incremented by 9 positions forward in the alphabet (e.g., א = י, ב = כ, ...).",
    misparHaKadmi: "Mispar HaKadmi: Adds the sum of all preceding ordinal values to the current letter's ordinal value."
};

function atbash(char) {
    const atbashMapping = {'א': 'ת', 'ב': 'ש', 'ג': 'ר', 'ד': 'ק', 'ה': 'צ', 'ו': 'פ', 'ז': 'ע', 'ח': 'ס', 'ט': 'נ',
                           'י': 'מ', 'כ': 'ל', 'ך': 'ם', 'ל': 'כ', 'מ': 'י', 'ם': 'ך', 'נ': 'ט', 'ן': 'ט', 'ס': 'ח', 
                           'ע': 'ז', 'פ': 'ו', 'ף': 'ו', 'צ': 'ה', 'ץ': 'ה', 'ק': 'ד', 'ר': 'ג', 'ש': 'ב', 'ת': 'א'};
    return atbashMapping[char] || char;
}

function albam(char) {
    const albamMapping = {'א': 'ל', 'ב': 'מ', 'ג': 'נ', 'ד': 'ס', 'ה': 'ע', 'ו': 'פ', 'ז': 'צ', 'ח': 'ק', 'ט': 'ר',
                          'י': 'ש', 'כ': 'ת', 'ך': 'ם', 'ל': 'א', 'מ': 'ב', 'ם': 'ך', 'נ': 'ג', 'ן': 'ג', 'ס': 'ד', 
                          'ע': 'ה', 'פ': 'ו', 'ף': 'ו', 'צ': 'ז', 'ץ': 'ז', 'ק': 'ח', 'ר': 'ט', 'ש': 'י', 'ת': 'כ'};
    return albamMapping[char] || char;
}

function avgad(char) {
    const avgadMapping = {'א': 'ד', 'ב': 'ה', 'ג': 'ו', 'ד': 'ז', 'ה': 'ח', 'ו': 'ט', 'ז': 'י', 'ח': 'כ', 'ט': 'ל',
                          'י': 'מ', 'כ': 'נ', 'ך': 'ן', 'ל': 'ס', 'מ': 'ע', 'ם': 'פ', 'נ': 'צ', 'ן': 'צ', 'ס': 'ק', 
                          'ע': 'ר', 'פ': 'ש', 'ף': 'ש', 'צ': 'ת', 'ץ': 'ת', 'ק': 'א', 'ר': 'ב', 'ש': 'ג', 'ת': 'ה'};
    return avgadMapping[char] || char;
}

function ayakBakar(char) {
    const ayakBakarMapping = {'א': 'י', 'ב': 'כ', 'ג': 'ל', 'ד': 'מ', 'ה': 'נ', 'ו': 'ס', 'ז': 'ע', 'ח': 'פ', 'ט': 'צ',
                              'י': 'ק', 'כ': 'ר', 'ך': 'ר', 'ל': 'ש', 'מ': 'ת', 'ם': 'ת', 'נ': 'א', 'ן': 'א', 'ס': 'ב', 
                              'ע': 'ג', 'פ': 'ד', 'ף': 'ד', 'צ': 'ה', 'ץ': 'ה', 'ק': 'ו', 'ר': 'ז', 'ש': 'ח', 'ת': 'ט'};
    return ayakBakarMapping[char] || char;
}

function misparHaKadmi(char) {
    const ordinalValues = {'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
                           'י': 10, 'כ': 11, 'ל': 12, 'מ': 13, 'נ': 14, 'ס': 15, 'ע': 16, 'פ': 17, 'צ': 18,
                           'ק': 19, 'ר': 20, 'ש': 21, 'ת': 22};
    let sum = 0;
    for (let i = 1; i <= ordinalValues[char]; i++) {
        sum += i;
    }
    return sum;
}

function calculateGematria() {
    const input = document.getElementById('hebrew-input').value;
    const type = document.getElementById('gematria-type').value;
    let total = 0;

    switch (type) {
        case 'standard':
        case 'ordinal':
        case 'reduced':
            for (let char of input) {
                if (gematriaValues[type][char]) {
                    total += gematriaValues[type][char];
                }
            }
            break;
        case 'integralReduced':
            let integralSum = 0;
            for (let char of input) {
                if (gematriaValues.standard[char]) {
                    integralSum += gematriaValues.standard[char];
                }
            }
            total = integralSum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
            break;
        case 'small':
            for (let char of input) {
                if (gematriaValues.standard[char]) {
                    total += gematriaValues.standard[char];
                }
            }
            total = total.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
            break;
        case 'absolute':
            for (let char of input) {
                if (gematriaValues.standard[char]) {
                    total += gematriaValues.standard[char];
                }
            }
            total += input.length;
            break;
        case 'atbash':
            for (let char of input) {
                const transformedChar = atbash(char);
                if (gematriaValues.standard[transformedChar]) {
                    total += gematriaValues.standard[transformedChar];
                }
            }
            break;
        case 'albam':
            for (let char of input) {
                const transformedChar = albam(char);
                if (gematriaValues.standard[transformedChar]) {
                    total += gematriaValues.standard[transformedChar];
                }
            }
            break;
        case 'avgad':
            for (let char of input) {
                const transformedChar = avgad(char);
                if (gematriaValues.standard[transformedChar]) {
                    total += gematriaValues.standard[transformedChar];
                }
            }
            break;
        case 'ayakBakar':
            for (let char of input) {
                const transformedChar = ayakBakar(char);
                if (gematriaValues.standard[transformedChar]) {
                    total += gematriaValues.standard[transformedChar];
                }
            }
            break;
        case 'misparHaKadmi':
            for (let char of input) {
                if (gematriaValues.ordinal[char]) {
                    total += misparHaKadmi(char);
                }
            }
            break;
        default:
            break;
    }

    document.getElementById('result').innerText = `Total ${type.charAt(0).toUpperCase() + type.slice(1)} Gematria: ${total}`;
    document.getElementById('description').innerText = descriptions[type];
}

