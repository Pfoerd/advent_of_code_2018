export function day11_part1(rawFileData: string, squareSize: number) {
    // using https://en.wikipedia.org/wiki/Summed-area_table
    // https://www.seas.upenn.edu/~cis565/Lectures2011/Lecture15_SAT.pdf
    const serialNumber: number = parseInt(rawFileData, 10);

    const summedAreaTablePowerLevels: number[][] = Array.from(Array(301), row => Array.from(Array(301), item => 0));
    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            const rackId = x + 10;
            const powerLevel = Math.floor(((rackId * y + serialNumber) * rackId) / 100) % 10 - 5;

            /*
             A short comment on this:
             * A is the (3,3) value in the SAT we want to calculate.
             * B (3,2) and C (2,3) and D (2,2) are yet calculated values in the SAT
             a, b, c and d marked fields in the SAT below are values that are part of the sum in A/B/C/D

             abcd | abcd | ab
             ------------------
             abcd | abcD | aB
             ------------------
             a c  | a C  | A

            Here you can see that the area of A consists of the value of A plus the areas of B and C. The overlapping area of B and C is D
            so to not count that area twice we have to subtract that area once.
            So in the end A can be calculated as:
            A = value_of_a + B + C - D
            */
            summedAreaTablePowerLevels[x][y] =
                powerLevel +
                summedAreaTablePowerLevels[x - 1][y] +
                summedAreaTablePowerLevels[x][y - 1] -
                summedAreaTablePowerLevels[x - 1][y - 1];
        }
    }

    let highestTotalPower, xOfHighest, yOfHighest: number;
    for (let x = 1; x <= 300 - squareSize; x++) {
        for (let y = 1; y <= 300 - squareSize; y++) {
            const totalPowerOfSquare =
                summedAreaTablePowerLevels[x + squareSize - 1][y + squareSize - 1] -
                summedAreaTablePowerLevels[x - 1][y + squareSize - 1] -
                summedAreaTablePowerLevels[x + squareSize - 1][y - 1] +
                summedAreaTablePowerLevels[x - 1][y - 1];
            if (!highestTotalPower || totalPowerOfSquare > highestTotalPower) {
                highestTotalPower = totalPowerOfSquare;
                xOfHighest = x;
                yOfHighest = y;
            }
        }
    }

    return {totalPower: highestTotalPower, x: xOfHighest, y: yOfHighest};
}
