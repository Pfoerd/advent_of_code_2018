import {day10_part2} from './day_10_2';

export function day10_part1(rawFileData: string) {
    const message = day10_part2(rawFileData).message;
    console.log(message);
    return message;
}
