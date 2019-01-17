import * as os from 'os';

export function day12_part2(rawFileData: string) {
    /*
    Strategy: after some (400) initial generations the resulting sum grows with a constant value.
    So lets just calculate 500 generations, get the average growth after the first 400 generations and then
    interpolate the sum after the 50 billion generations
    */
    const inputData: string[] = rawFileData.split(os.EOL);
    let pots: string = inputData.splice(0, 2)[0].substr(15);
    // we only need to know one side of the rules
    const spreadRules = inputData.filter(v => v.indexOf('=> #') !== -1).map(v => v.substr(0, 5));

    // calculates the sum of indices needed for the result
    const currentSum: () => number = () => {
        return [...pots].reduce((a, v, i) => a + (v === '#' ? i - zeroPotPosition : 0), 0);
    };

    const diffs: number[] = [];
    let lastSum = 0;

    let zeroPotPosition = 0;
    for (let generation = 1; generation <= 500; generation++) {
        // insert missing pots. We always want to start with a min of 5 empty
        // pots at the beginning and at the end to always cover the '.....' rule
        const missingPotsCountBeginning = Math.max(0, 5 - pots.indexOf('#'));
        const missingPotsCountEnd = Math.max(0, 5 - (pots.length - 1 - pots.lastIndexOf('#')));
        zeroPotPosition += missingPotsCountBeginning;
        pots = Array.from(Array(missingPotsCountBeginning), () => '.').reduce((a, v) => a + v, '')
            + pots
            + Array.from(Array(missingPotsCountEnd), () => '.').reduce((a, v) => a + v, '');

        let newGeneration = '';
        for (let pot = 2; pot < pots.length - 2; pot++) {
            const nearbyPots = pots.slice(pot - 2, pot + 3);

            const newPotValue = spreadRules.indexOf(nearbyPots) !== -1 ? '#' : '.';
            newGeneration += newPotValue;
        }
        zeroPotPosition -= 2;
        pots = newGeneration;

        const sum = currentSum();
        diffs.push(currentSum() - lastSum);
        lastSum = sum;
    }

    const avgDiff = diffs.slice(-100).reduce((a, v) => a + v) / 100;
    return currentSum() + ((50000000000 - 500) * avgDiff);
}
