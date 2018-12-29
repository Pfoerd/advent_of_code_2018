import * as os from 'os';

export function day6_part2(rawFileData: string) {
    const rawData: string[] = rawFileData.split(os.EOL);

    // parse raw data
    const coordinates: [number, number][] = [];
    for (const rawDate of rawData) {
        const strings = rawDate.split(', ');
        coordinates.push([parseInt(strings[0], 10), parseInt(strings[1], 10)]);
    }

    // the mental model is a grid rectangle that is drawn surrounding the outermost locations in each direction
    const xOffset = Math.min(...coordinates.map(v => v[0]));
    const yOffset = Math.min(...coordinates.map(v => v[1]));
    const width = Math.max(...coordinates.map(v => v[0])) - xOffset;
    const height = Math.max(...coordinates.map(v => v[1])) - yOffset;

    // now we can walk through this grid and determine the cumulative distance to all locations
    let countOfResultRegions = 0;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let distanceSum = 0;
            for (const coordinate of coordinates) {
                const xDistance = Math.abs(coordinate[0] - xOffset - x);
                const yDistance = Math.abs(coordinate[1] - yOffset - y);
                distanceSum += xDistance + yDistance;
            }
            if (distanceSum < 10000) {
                countOfResultRegions++;
            }
        }
    }

    return countOfResultRegions;
}
