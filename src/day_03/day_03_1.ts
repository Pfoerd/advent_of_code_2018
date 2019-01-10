import * as os from 'os';

export function day3_part1(rawFileData: string) {
    class Claim {
        constructor(
            public id: number,
            public x: number,
            public y: number,
            public width: number,
            public height: number) {
        }
    }

    const rawData: string[] = rawFileData.split(os.EOL);

    const claims = [];

    for (const rawDate of rawData) {
        const data = rawDate.split(' ');
        const claim = new Claim(
            parseInt(data[0].substr(1), 10),
            parseInt(data[2].slice(0, -1).split(',')[0], 10),
            parseInt(data[2].slice(0, -1).split(',')[1], 10),
            parseInt(data[3].split('x')[0], 10),
            parseInt(data[3].split('x')[1], 10)
        );

        claims.push(claim);
    }

    // init 1000x1000 array with default value '0'
    const fabric = Array.from(Array(1000), () => Array.from(Array(1000), () => 0));

    for (const claim of claims) {
        for (let i = 0; i < claim.width; i++) {
            for (let j = 0; j < claim.height; j++) {
                fabric[claim.x + i][claim.y + j] = fabric[claim.x + i][claim.y + j] + 1;
            }
        }
    }

    let multiClaimCount = 0;

    for (let i = 0; i < fabric.length; i++) {
        for (let j = 0; j < fabric[i].length; j++) {
            if (fabric[i][j] > 1) {
                multiClaimCount++;
            }
        }
    }

    return multiClaimCount;
}
