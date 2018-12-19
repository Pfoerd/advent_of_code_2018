import {expect} from 'chai';
import * as fs from 'fs';
import {day4_part1} from './day4_1';
import {day4_part2} from './day4_2';

const rawFileData = fs.readFileSync('./res/day4.txt', 'utf8');

describe('day 4, part 1', () => {
    it('should return 8421', () => {
        const result = day4_part1(rawFileData);
        expect(result).to.equal(8421);
    });
});

describe('day 4, part 2', () => {
    it('should return 83359', () => {
        const result = day4_part2(rawFileData);
        expect(result).to.equal(83359);
    });
});
