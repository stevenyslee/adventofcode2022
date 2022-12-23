import * as fs from 'fs';

// A = Rock
// B = Paper
// C = Scissors

// X = Rock
// Y = Paper
// Z = Scissors

// Rock = 1
// Paper = 2
// Scissors = 3

// Lose = 0
// Draw = 3
// Win = 6

const example = `A Y
B X
C Z`;

function rpcScore(strategy) {
    let totalScore = 0;
    const rounds = strategy.split('\n');
    rounds.forEach(round => {
        const [opponent, me] = round.split(' ');
        let score = 0;

        // Points by choice
        switch (me) {
            case 'X':
                score += 1;
                break;
            case 'Y':
                score += 2;
                break;
            case 'Z':
                score += 3;
                break;
        }

        // Points by result
        if (opponent === 'A' && me === 'X') {
            score += 3;
        } else if (opponent === 'A' && me === 'Y') {
            score += 6;
        } else if (opponent === 'A' && me === 'Z') {
            score += 0;
        } else if (opponent === 'B' && me === 'X') {
            score += 0;
        } else if (opponent === 'B' && me === 'Y') {
            score += 3;
        } else if (opponent === 'B' && me === 'Z') {
            score += 6;
        } else if (opponent === 'C' && me === 'X') {
            score += 6;
        } else if (opponent === 'C' && me === 'Y') {
            score += 0;
        } else if (opponent === 'C' && me === 'Z') {
            score += 3;
        }
        totalScore += score;
    });
    return totalScore;
}

console.assert(rpcScore(example) === 15);

// X = lose
// Y = Draw
// Z = Win

function rpcScore2(strategy) {
    let totalScore = 0;
    const rounds = strategy.split('\n');
    const rpcPointsMap = new Map([['A', 1], ['B', 2], ['C', 3]]);
    rounds.forEach(round => {
        const [opponent, result] = round.split(' ');
        let score = 0;

        // Points by result
        if (result === 'X') {
            // Lose
            if (opponent === 'A') {
                score += rpcPointsMap.get('C');
            } else if (opponent === 'B') {
                score += rpcPointsMap.get('A');
            } else if (opponent === 'C') {
                score += rpcPointsMap.get('B');
            }
        } else if (result === 'Y') {
            // Draw
            score += 3 + rpcPointsMap.get(opponent);
        } else if (result === 'Z') {
            // Win
            score += 6;
            if (opponent === 'A') {
                score += rpcPointsMap.get('B');
            } else if (opponent === 'B') {
                score += rpcPointsMap.get('C');
            } else if (opponent === 'C') {
                score +=  rpcPointsMap.get('A');
            }
        }
        totalScore += score;
    });
    return totalScore;
}
console.assert(rpcScore2(example) === 12);

fs.readFile('/Users/stevenyslee/Projects/adventofcode2022/2/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("rpcScore: " + rpcScore(data));
    console.log("rpcScore2: " + rpcScore2(data));
});