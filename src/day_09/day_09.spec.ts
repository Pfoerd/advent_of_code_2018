import {expect} from 'chai';
import * as fs from 'fs';
import {day9_part1} from './day_09_1';
import {day9_part2} from './day_09_2';

const rawFileData = fs.readFileSync('./res/day_09.txt', 'utf8');

describe('day 8, part 1', () => {
    it('should return 0', () => {
        const result = day9_part1(rawFileData);
        expect(result).to.equal(0);
    });
});

describe('day 8, part 2', () => {
    it('should return 0', () => {
        const result = day9_part2(rawFileData);
        expect(result).to.equal(0);
    });
});
