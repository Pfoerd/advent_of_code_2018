import {expect} from 'chai';
import * as fs from 'fs';
import {day7_part1} from './day_07_1';

const rawFileData = fs.readFileSync('./res/day_07.txt', 'utf8');

describe('day 7, part 1', () => {
    it('should return "ADEFKLBVJQWUXCNGORTMYSIHPZ"', () => {
        const result = day7_part1(rawFileData);
        expect(result).to.equal('ADEFKLBVJQWUXCNGORTMYSIHPZ');
    });
});
