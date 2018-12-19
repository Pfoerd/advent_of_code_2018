import {expect} from 'chai';
import * as fs from 'fs';
import {day5_part1} from './day_05_1';
import {day5_part2} from './day_05_2';

const rawFileData = fs.readFileSync('./res/day_05.txt', 'utf8');

describe('day 5, part 1', () => {
    it('should return 9704', () => {
        const result = day5_part1(rawFileData);
        expect(result).to.equal(9704);
    });
});

describe('day 5, part 2', () => {
    it('should return 6942', () => {
        const result = day5_part2(rawFileData);
        expect(result).to.equal(6942);
    }).timeout(5000); // obviously my implementation is not very efficient :)
});
