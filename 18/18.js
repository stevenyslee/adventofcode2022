const fs = require('fs');

const input = `1,1,1
2,1,1`;

const input2 = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

function surfaceArea(dropletInput) {
    // DFS search each of the neighbors
    const resArr = dropletInput.split('\n');
    const resSet = new Set(resArr);
    const seenSet = new Set();
    let surfaceArea = 0;

    function dfsNeighbor(pixel) {
        // Pixel has been traversed before
        if (seenSet.has(pixel)) {
            return;
        }
        // Pixel not traversed and not in given set, meaning it is the edge
        if (!resSet.has(pixel)) {
            surfaceArea++;
            return;
        }

        seenSet.add(pixel);

        // console.log(pixel);
        const [x, y, z] = pixel.split(',').map(str => parseInt(str));

        let localArea = 0;

        localArea += dfsNeighbor(`${x + 1},${y},${z}`);
        localArea += dfsNeighbor(`${x - 1},${y},${z}`);
        localArea += dfsNeighbor(`${x},${y + 1},${z}`);
        localArea += dfsNeighbor(`${x},${y - 1},${z}`);
        localArea += dfsNeighbor(`${x},${y},${z + 1}`);
        localArea += dfsNeighbor(`${x},${y},${z - 1}`);


        // check neighbor
        // 6 neighbors
        // if no neighbor, increment
        // if neighbor, then recurse
        return;
    }

    for (const res of resSet) {
        // console.log(res);
        dfsNeighbor(res);
        // add to seen set
        // calculate all six neighbors
        // recurse

    }

    // if the neighbor does not exist, increment. If it does, search it's neighbors
    // calculate x

    // calculate y
    // 

    return surfaceArea;
}


// originally if one cube all 6 sides then subtract that
// but if bigger pocket, will require dfs that all parts air pocket are surrounded,
// then subtract from total area
function surfaceAreaNoPockets(dropletInput) {
    // DFS search each of the neighbors
    const resArr = dropletInput.split('\n');
    const resSet = new Set(resArr);
    const seenSet = new Set();
    const edgeSet = new Set();
    let surfaceArea = 0;

    function dfsNeighbor(pixel) {
        // Pixel has been traversed before
        if (seenSet.has(pixel)) {
            return;
        }
        // Pixel not traversed and not in given set, meaning it is the edge
        if (!resSet.has(pixel)) {
            surfaceArea++;
            edgeSet.add(pixel);
            return;
        }

        seenSet.add(pixel);

        const [x, y, z] = pixel.split(',').map(str => parseInt(str));

        dfsNeighbor(`${x + 1},${y},${z}`);
        dfsNeighbor(`${x - 1},${y},${z}`);
        dfsNeighbor(`${x},${y + 1},${z}`);
        dfsNeighbor(`${x},${y - 1},${z}`);
        dfsNeighbor(`${x},${y},${z + 1}`);
        dfsNeighbor(`${x},${y},${z - 1}`);
        return;
    }

    for (const res of resSet) {
        dfsNeighbor(res);
    }

    // calculate air bubble
    // all neighbors must be in the edgeSet or in the resSet for it to be an air bubble

    // case where it's at the edge
        // begins dfs
        // check in resSet or edgeSet
    // case where it's a bubble
    
    return surfaceArea;
}

console.assert(surfaceArea(input) === 10);
console.assert(surfaceArea(input2) === 64);

fs.readFile('/Users/stevenyslee/Projects/adventofcode2022/18/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("surfaceArea: " + surfaceArea(data));
    console.log("surfaceAreaNoPockets: " + surfaceAreaNoPockets(data));
}); 
