import {expect} from 'chai';
import * as fs from 'fs';
import {day2_part1} from './day2_1';
import {day2_part2} from './day2_2';

const rawFileData = fs.readFileSync('./res/day2.txt', 'utf8');

describe('day 2, part 1', () => {
    it('should return 6944', () => {
        const result = day2_part1(rawFileData);
        expect(result).to.equal(6944);
    });
});

describe('day 2, part 2', () => {
    it('should return \'srijafjzloguvlntqmphenbkd\'', () => {
        const result = day2_part2(rawFileData);
        expect(result).to.equal('srijafjzloguvlntqmphenbkd');
    });
});
