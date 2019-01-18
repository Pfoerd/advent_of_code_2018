import {expect} from 'chai';
import * as fs from 'fs';
import {day14_part1} from './day_14_1';
import {day14_part2} from './day_14_2';

const rawFileData = fs.readFileSync('./res/day_14.txt', 'utf8');

describe('day 14, part 1', () => {
    it('should return 1234', () => {
        const result = day14_part1(rawFileData);
        expect(result).to.equal(1234);
    });
});

describe('day 14, part 2', () => {
    it('should return 1234', () => {
        const result = day14_part2(rawFileData);
        expect(result).to.equal(1234);
    });
});
