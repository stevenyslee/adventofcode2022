import * as fs from 'fs';
import {
    MaxHeap
} from '@datastructures-js/heap';


const example = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

function mostCalories(elvesCalorieInput) {
    let maxCalorie = 0;
    let currentCalorie = 0;
    const calorieArray = elvesCalorieInput.split("\n");

    for (let i = 0; i < calorieArray.length; i++) {
        let calorie = parseInt(calorieArray[i]);
        if (isNaN(calorie) || i === calorieArray.length - 1) {
            maxCalorie = Math.max(maxCalorie, currentCalorie);
            currentCalorie = 0;
        } else {
            currentCalorie += calorie;
        }
    }

    return maxCalorie;
}

console.assert(mostCalories(example) === 24000);

function topThreeCalorieSum(elvesCalorieInput) {
    let currentCalorie = 0;
    let heap = new MaxHeap();
    const calorieArray = elvesCalorieInput.split("\n");

    for (let i = 0; i < calorieArray.length; i++) {
        let calorie = parseInt(calorieArray[i]);
        if (isNaN(calorie)) {
            heap.insert(currentCalorie);
            currentCalorie = 0;
        } else if (i === calorieArray.length - 1) {
            heap.insert(currentCalorie + calorie);
        } else {
            currentCalorie += calorie;
        }
    }
    return heap.extractRoot() + heap.extractRoot() + heap.extractRoot();
}

console.assert(topThreeCalorieSum(example) === 45000);

fs.readFile('/Users/stevenyslee/Projects/adventofcode2022/1/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("mostCalories: " + mostCalories(data));
    console.log("topThreeCalorieSum: " + topThreeCalorieSum(data));
});

