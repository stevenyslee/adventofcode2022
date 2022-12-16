const useExample = process.argv[3] === '-e';

fs.readFile(useExample ? '/Users/stevenyslee/Projects/adventofcode2022/16/example.txt' : '/Users/stevenyslee/Projects/adventofcode2022/16/input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split("\n");
    lines.forEach(line => {
        // current valve
        // flow rate
        // children valves
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