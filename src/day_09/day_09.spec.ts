import {expect} from 'chai';
import * as fs from 'fs';
import {day9_part1} from './day_09_1';
import {day9_part2} from './day_09_2';

const rawFileData = fs.readFileSync('./res/day_09.txt', 'utf8');

describe('day 9, part 1', () => {
    it('should return 423717', () => {
        const result = day9_part1(rawFileData);
        expect(result).to.equal(423717);
    });
});

describe('day 9, part 2', () => {
    it('should return 3553108197', () => {
        const result = day9_part2(rawFileData);
        expect(result).to.equal(3553108197);
    }).timeout(5000);
});
