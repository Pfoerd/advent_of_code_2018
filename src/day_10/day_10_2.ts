import * as os from 'os';

export function day10_part2(rawFileData: string) {
    const vectors: number[][] = rawFileData.split(os.EOL)
        .map(s => s.match(/position=<([-\s]\d+), ([-\s]\d+)> velocity=<([-\s]\d+), ([-\s]\d+)>/))
        .map(tokens => tokens.slice(1).map(v => parseInt(v, 10)));

    let seconds = 0;
    let lastAreaSize: number;

    while (true) {
        // check bounds
        const xBounds = Math.max(...vectors.map(v => v[0] + v[2])) - Math.min(...vectors.map(v => v[0] + v[2]));
        const yBounds = Math.max(...vectors.map(v => v[1] + v[3])) - Math.min(...vectors.map(v => v[1] + v[3]));

        // we assume that:
        // * the size of the bounded area is getting smaller with each step
        // * the size of the bounded area is increasing after the message was visible
        // so the moment the message is visible is the minimum of the bounded area size
        if (lastAreaSize && (lastAreaSize <= (xBounds * yBounds))) {
            break;
        }

        lastAreaSize = xBounds * yBounds;

        // move vectors
        vectors.forEach(point => {
            point[0] += point[2];
            point[1] += point[3];
        });

        seconds++;
    }

    const xOffset = -Math.min(...vectors.map(v => v[0]));
    const yOffset = -Math.min(...vectors.map(v => v[1]));
    const xBoundsResult = Math.max(...vectors.map(v => v[0])) + xOffset;
    const yBoundsResult = Math.max(...vectors.map(v => v[1])) + yOffset;
    const resultAsciiPic: string[][] = Array.from(Array(xBoundsResult + 1), row => Array.from(Array(yBoundsResult + 1), item => ' '));

    vectors.forEach(point => {
        resultAsciiPic[point[0] + xOffset][point[1] + yOffset] = '#';
    });

    let message = '';
    for (let y = 0; y < resultAsciiPic[0].length; y++) {
        for (let x = 0; x < resultAsciiPic.length; x++) {
            message += resultAsciiPic[x][y];
        }
        message += '\n';
    }

    return {message: message, seconds: seconds};
}
