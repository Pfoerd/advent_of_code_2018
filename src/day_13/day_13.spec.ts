import {expect} from 'chai';
import * as fs from 'fs';
import {day13_part1} from './day_13_1';
import {day13_part2} from './day_13_2';

const rawFileData = fs.readFileSync('./res/day_13.txt', 'utf8');

describe('day 13, part 1', () => {
    it('should return "39,52"', () => {
        const result = day13_part1(rawFileData);
        expect(result).to.equal('39,52');
    });
});

function jo(car1, car2): number {
    return (car1[0] - car2[0]) || (car1[1] - car2[1]);
}

describe('day 13, part 2', () => {
    it('should return 1234', () => {
        const result = day13_part2(rawFileData);
        expect(result).to.equal(1234);
    });
});
