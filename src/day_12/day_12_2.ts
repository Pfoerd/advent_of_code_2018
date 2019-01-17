import * as os from 'os';

export function day12_part2(rawFileData: string) {
    const inputData: string[] = rawFileData.split(os.EOL);
    let pots: string = inputData.splice(0, 2)[0].substr(15);
    const spreadRules = inputData.filter(v => v.indexOf('=> #') !== -1).map(v => v.substr(0, 5));

    const currentSum: () => number = () => {
        let sum = 0;
        for (let i = 0; i < pots.length; i++) {
            if (pots[i] === '#') {
                sum += (i - zeroPotPosition);
            }
        }
        return sum;
    };

    const diffs: number[] = [];
    let lastSum = 0;

    let zeroPotPosition = 0;
    for (let generation = 1; generation <= 500; generation++) {
        // insert missing pots
        const missingPotsCountBeginning = Math.max(0, 5 - pots.indexOf('#'));
        const missingPotsCountEnd = Math.max(0, 5 - (pots.length - 1 - pots.lastIndexOf('#')));
        zeroPotPosition += missingPotsCountBeginning;
        pots = Array.from(Array(missingPotsCountBeginning), () => '.').reduce((a, v) => a + v, '')
            + pots
            + Array.from(Array(missingPotsCountEnd), () => '.').reduce((a, v) => a + v, '');

        let newGeneration = '..';
        for (let pot = 2; pot < pots.length - 2; pot++) {
            const nearbyPots = pots.slice(pot - 2, pot + 3);

            const newPotValue = spreadRules.indexOf(nearbyPots) !== -1 ? '#' : '.';
            newGeneration += newPotValue;
        }
        pots = newGeneration;

        const sum = currentSum();
        diffs.push(sum - lastSum);
        lastSum = sum;
    }

    const avgDiff = diffs.slice(-100).reduce((a, v) => a + v) / 100;
    return currentSum() + ((50000000000 - 500) * avgDiff);
}
