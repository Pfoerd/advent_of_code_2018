import {expect} from 'chai';
import * as fs from 'fs';
import {day3_part1} from './day3_1';
import {day3_part2} from './day3_2';

const rawFileData = fs.readFileSync('./res/day3.txt', 'utf8');

describe('day 3, part 1', () => {
    it('should return 105231', () => {
        const result = day3_part1(rawFileData);
        expect(result).to.equal(105231);
    });
});

describe('day 3, part 2', () => {
    it('should return 164', () => {
        const result = day3_part2(rawFileData);
        expect(result).to.equal('164');
    });
});
