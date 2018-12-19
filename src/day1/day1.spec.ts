import {expect} from 'chai';
import * as fs from 'fs';
import {day1_part1} from './day1_1';
import {day1_part2} from './day1_2';

const rawFileData = fs.readFileSync('./res/day1.txt', 'utf8');

describe('day 1, part 1', () => {
    it('should return 472', () => {
        const result = day1_part1(rawFileData);
        expect(result).to.equal(472);
    });
});

describe('day 1, part 2', () => {
    it('should return 66932', () => {
        const result = day1_part2(rawFileData);
        expect(result).to.equal(66932);
    });
});
