import {expect} from 'chai';
import * as fs from 'fs';
import {day12_part1} from './day_12_1';
import {day12_part2} from './day_12_2';

const rawFileData = fs.readFileSync('./res/day_12.txt', 'utf8');

describe('day 12, part 1', () => {
    it('should return 2045', () => {
        const result = day12_part1(rawFileData);
        expect(result).to.equal(2045);
    });
});

describe('day 12, part 2', () => {
    it('should return 2100000000428', () => {
        const result = day12_part2(rawFileData);
        expect(result).to.equal(2100000000428);
    });
});
