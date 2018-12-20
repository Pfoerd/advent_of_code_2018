import {expect} from 'chai';
import * as fs from 'fs';
import {day6_part1} from './day_06_1';
import {day6_part2} from './day_06_2';

const rawFileData = fs.readFileSync('./res/day_06.txt', 'utf8');

describe('day 6, part 1', () => {
    it('should return 4887', () => {
        const result = day6_part1(rawFileData);
        expect(result).to.equal(4887);
    });
});

describe('day 6, part 2', () => {
    it('should return 34096', () => {
        const result = day6_part2(rawFileData);
        expect(result).to.equal(34096);
    }).timeout(5000); // obviously my implementation is not very efficient :)
});
