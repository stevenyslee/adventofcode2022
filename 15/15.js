const fs = require('fs');

const input = [];

function createInterval(sensorX, sensorY, beaconX, beaconY, y, x) {
    const interval = [];
    sensorX - x
    sensorX + x

    if 

}

(function () {
    function countNonDistressLocation() {
        const row = Number(process.argv[2]);
        if (isNaN(row)) {
            console.log('Provide number');
            return row;
        }

        const beaconMap = [];

        for (let i = 0; i < input.length; i++) {
            const {sensorX, sensorY, beaconX, beaconY, xDiff, yDiff } = input[i];
            const dist = xDiff + yDiff;
            
            for (let x = -xDiff; x <= xDiff; x++) {
                let y = 0;

                // Start from sensor row and go up/down
                let currentRow = beaconMap[sensorY];
                if (!currentRow) {
                    const topInterval = [];
                    
                    createInterval(sensorX, sensorY, beaconX, beaconY, y, x);

                    beaconMap[sensorY - xDiff - yDiff].push([sensorY + y + x, sensorY + y - x]);
                    if (y === 0) continue;
                    beaconMap[sensorY - xDiff - yDiff].push([sensorY - y + x, sensorY - y - x]);

                }

                // add interval
                for (let j = 0; j < beaconMap[sensorY - xDiff - yDiff].length; j++) {
                    let rowIntervals = beaconMap[sensorY - xDiff - yDiff];
                    rowIntervals[j]
                }

            }




        }

        // create array, index is the row
        // each row will contain intervals of non-valid beacons (edge case, if there's a beacon)
        // split or adjust inervals as necessary when there is a beacon


        return row;
    }

    const useExample = process.argv[3] === '-e';

    fs.readFile(useExample ? '/Users/stevenyslee/Projects/adventofcode2022/15/example.txt' : '/Users/stevenyslee/Projects/adventofcode2022/15/input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lines = data.split("\n");
        lines.forEach(line => {
            const sensorXStart = line.indexOf("=") + 1;
            const sensorXEnd = line.indexOf(",", sensorXStart);
            const sensorX = Number(line.substring(sensorXStart, sensorXEnd));

            const sensorYStart = line.indexOf("=", sensorXEnd) + 1;
            const sensorYEnd = line.indexOf(":", sensorYStart);
            const sensorY = Number(line.substring(sensorYStart, sensorYEnd));

            const beaconXStart = line.indexOf("=", sensorYEnd) + 1;
            const beaconXEnd = line.indexOf(",", beaconXStart);
            const beaconX = Number(line.substring(beaconXStart, beaconXEnd));

            const beaconYStart = line.indexOf("=", beaconXEnd) + 1;
            const beaconY = Number(line.substring(beaconYStart, line.length));

            if (!!sensorX || !!sensorY || !!beaconX || !!beaconY) {
                input.push({ sensorX, sensorY, beaconX, beaconY, xDiff: Math.abs(sensorX - beaconX), yDiff: Math.abs(sensorY - beaconY) });
            }

            console.log(input);
            console.log(countNonDistressLocation());
        });
    });
})();