import * as os from 'os';

export function day6_part1(rawFileData: string) {
    const rawData: string[] = rawFileData.split(os.EOL);

    // Why not working? Error:(4, 11) TS2322: Type 'number[][]' is not assignable to type '[number, number][]'.
    //   Type 'number[]' is not assignable to type '[number, number]'.
    //     Property '0' is missing in type 'number[]'.
    // const coordinates: [number, number][] =
    //  rawData.map(v => v.split(', ')).map(strings => [parseInt(strings[0], 10), parseInt(strings[1], 10)]);

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

    const grid: number[][] = Array.from(Array(width), () => Array(height));

    // now we walk through the grid once for each location
    // and determine the distance between the position in the grid and that location
    for (let i = 0; i < coordinates.length; i++) {
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                const xDistance = Math.abs(coordinates[i][0] - xOffset - x);
                const yDistance = Math.abs(coordinates[i][1] - yOffset - y);

                const gridElement = grid[x][y];

                // when the distance is smaller then the previous one for this grid position, the actual position is the new nearest one
                if (!gridElement ||
                    xDistance + yDistance <
                    Math.abs(coordinates[gridElement][0] - xOffset - x) + Math.abs(coordinates[gridElement][1] - yOffset - y)) {
                    grid[x][y] = i;
                }
            }
        }
    }

    // determine all coordinates that areas are not next to an edge
    // only those aren't infinite
    const coordinateIds = new Set(Array.from(Array(coordinates.length), (v, k) => k));
    for (const coordinateId of grid[0]) {
        coordinateIds.delete(coordinateId);
    }
    for (const coordinateId of grid[grid.length - 1]) {
        coordinateIds.delete(coordinateId);
    }
    for (const coordinateId of grid.map(v => v[0])) {
        coordinateIds.delete(coordinateId);
    }
    for (const coordinateId of grid.map(v => v[grid[0].length - 1])) {
        coordinateIds.delete(coordinateId);
    }

    // determine the area sizes for each coordinate that isn't infinite
    const areaSizeById = new Map<number, number>();
    for (let x = 1; x < grid.length - 1; x++) {
        for (let y = 1; y < grid[x].length - 1; y++) {
            if (coordinateIds.has(grid[x][y])) {
                if (!areaSizeById.has(grid[x][y])) {
                    areaSizeById.set(grid[x][y], 0);
                }
                areaSizeById.set(grid[x][y], areaSizeById.get(grid[x][y]) + 1);
            }
        }
    }

    // prints a really nice ascii art of the areas :)
    // especially when pasted into excel and then highlighting the resulting area-id
    /*
    for (let y = 0; y < grid[0].length; y++) {
        let message = '';
        for (let x = 0; x < grid.length; x++) {
            message += grid[x][y] + '\t';
        }
        console.log(message);
    }
    */

    return Math.max(...areaSizeById.values());
}
