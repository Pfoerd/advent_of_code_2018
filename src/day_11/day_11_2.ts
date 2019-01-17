import {day11_part1} from './day_11_1';

export function day11_part2(rawFileData: string) {
    let highestTotalPowerSquare;

    for (let squareSize = 1; squareSize < 300; squareSize++) {
        const highestForSquareSize = day11_part1(rawFileData, squareSize);
        if (!highestTotalPowerSquare || highestForSquareSize.totalPower > highestTotalPowerSquare.totalPower) {
            highestTotalPowerSquare = highestForSquareSize;
            highestTotalPowerSquare.squareSize = squareSize;
        }
    }

    return highestTotalPowerSquare;
}
