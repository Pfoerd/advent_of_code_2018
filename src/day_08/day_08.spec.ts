import {expect} from 'chai';
import * as fs from 'fs';
import {day8_part1} from './day_08_1';
import {day8_part2} from './day_08_2';

const rawFileData = fs.readFileSync('./res/day_08.txt', 'utf8');

describe('day 8, part 1', () => {
    it('should return 36566', () => {
        const result = day8_part1(rawFileData);
        expect(result).to.equal(36566);
    });
});

describe('day 8, part 2', () => {
    it('should return 66', () => {
        const result = day8_part2(rawFileData);
        expect(result).to.equal(66);
    });
});
