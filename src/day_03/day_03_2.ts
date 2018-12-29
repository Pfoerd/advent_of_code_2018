import * as os from 'os';

export function day3_part2(rawFileData: string) {
    const rawData: string[] = rawFileData.split(os.EOL);

    function Claim(id: string, x: number, y: number, width: number, height: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    const claims = [];

    for (const rawDate of rawData) {
        const data = rawDate.split(' ');
        const claim = new Claim(
            data[0].substr(1),
            parseInt(data[2].slice(0, -1).split(',')[0], 10),
            parseInt(data[2].slice(0, -1).split(',')[1], 10),
            parseInt(data[3].split('x')[0], 10),
            parseInt(data[3].split('x')[1], 10)
        );

        claims.push(claim);
    }

    // init 1000x1000 array with default value '0'
    const fabric = Array.from(Array(1000), () => Array(1000));
    const claimIds = Array.from(claims, v => v.id);

    claimIteration: for (const claim of claims) {
        for (let i = 0; i < claim.width; i++) {
            for (let j = 0; j < claim.height; j++) {
                const fabricSquareInch = fabric[claim.x + i][claim.y + j];
                if (fabricSquareInch != null) {
                    const index1 = claimIds.indexOf(fabricSquareInch);
                    const index2 = claimIds.indexOf(claim.id);
                    if (index1 !== -1) {
                        claimIds.splice(index1, 1);
                    }
                    if (index2 !== -1) {
                        claimIds.splice(index2, 1);
                    }

                    if (claimIds.length <= 1) {
                        // premature stop if there is only one Id left
                        break claimIteration;
                    }
                }
                fabric[claim.x + i][claim.y + j] = claim.id;
            }
        }
    }

    return claimIds[0];
}
