import {expect} from 'chai';
import * as fs from 'fs';
import {day16_part1} from './day_16_1';
import {day16_part2} from './day_16_2';

const rawFileData = fs.readFileSync('./res/day_16.txt', 'utf8');

describe('day 16, part 1', () => {
    it('should return 544', () => {
        const result = day16_part1(rawFileData);
        expect(result).to.equal(544);
    });
});

describe('day 16, part 2', () => {
    it('should return 600', () => {
        const result = day16_part2(rawFileData);
        expect(result).to.equal(600);
    });
});

