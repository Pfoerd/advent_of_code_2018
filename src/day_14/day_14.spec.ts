import {expect} from 'chai';
import * as fs from 'fs';
import {day14_part1} from './day_14_1';
import {day14_part2} from './day_14_2';

const rawFileData = fs.readFileSync('./res/day_14.txt', 'utf8');

describe('day 14, part 1', () => {
    it('should return 9315164154', () => {
        const result = day14_part1(rawFileData);
        expect(result).to.equal(9315164154);
    });
});

describe('day 14, part 2', () => {
    it('should return 20231866', () => {
        const result = day14_part2(rawFileData);
        expect(result).to.equal(20231866);
    }).timeout(20000);
});
