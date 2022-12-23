import * as fs from 'fs';

const example = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

function itemPriorityFromCharCode(charCode) {
    if (charCode <= 90) {
        return charCode - 38;
    } else {
        return charCode - 96;
    }
}

function sumPriority(rucksacksInput) {
    const rucksacks = rucksacksInput.split('\n');
    let totalPriority = 0;

    rucksacks.forEach(rucksack => {
        let itemSet = new Set();
        for (let i = 0; i < rucksack.length / 2; i++) {
            itemSet.add(rucksack[i]);
        }
        for (let j = rucksack.length / 2; j < rucksack.length; j++) {
            if (itemSet.has(rucksack[j])) {
                const charCode = rucksack[j].charCodeAt();
                totalPriority += itemPriorityFromCharCode(charCode);
                break;
            }
        }
    });

    return totalPriority
}

console.assert(sumPriority(example) === 157);

function sumBadgePriorityByGroup(rucksacksInput) {
    const rucksacks = rucksacksInput.split('\n');
    let totalPriority = 0;

    for (let i = 0; i < rucksacks.length; i = i + 3) {
        let itemMap = {};
        const r1 = rucksacks[i], r2 =  rucksacks[i + 1], r3 = rucksacks[i + 2];

        if (!r1 || !r2 || !r3) {
            break;
        }

        const rSet1 = new Set(r1.split(''));
        const rSet2 = new Set(r2.split(''));
        const rSet3 = new Set(r3.split(''));

        for (const v of rSet1) {
            if (rSet2.has(v) && rSet3.has(v)) {
                totalPriority += itemPriorityFromCharCode(v.charCodeAt());
                break;
            }
        }
    }

    return totalPriority
}

console.assert(sumBadgePriorityByGroup(example) === 70);

fs.readFile('/Users/stevenyslee/Projects/adventofcode2022/3/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("sumPriority: " + sumPriority(data));
    console.log("sumBadgePriorityByGroup: " + sumBadgePriorityByGroup(data));
});
